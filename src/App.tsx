import { useEffect, useState } from 'react';
import { MantineProvider, Title, Center, Text, Loader, Stack, Button, Group } from '@mantine/core';
import '@mantine/core/styles.css';
import { showNotification, Notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

// Type utilisé pour chaque réponse dans l'historique
type HistoryItem = {
  text: string;
  wasReal: boolean;
  userSaidReal: boolean;
  correct: boolean;
};

function App() {
  // États principaux du jeu
  const [advice, setAdvice] = useState<string | null>(null);
  const [isReal, setIsReal] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]); // Historique des réponses

  // Récupère un vrai conseil depuis l'API
  const fetchRealAdvice = async (): Promise<string> => {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    return data.slip.advice;
  };

  // Récupère un faux conseil depuis un fichier local
  const fetchFakeAdvice = async (): Promise<string> => {
    const response = await fetch('/fakeAdvices.json');
    const data = await response.json();
    const random = data[Math.floor(Math.random() * data.length)];
    return random;
  };

  // Choisit un conseil aléatoire (vrai ou faux)
  const fetchRandomAdvice = async () => {
    setLoading(true);
    const isTrueAdvice = Math.random() < 0.5; // 50% chance
    setIsReal(isTrueAdvice);

    await new Promise((r) => setTimeout(r, 1000)); // délai pour voir le loader

    const adviceText = isTrueAdvice ? await fetchRealAdvice() : await fetchFakeAdvice();
    setAdvice(adviceText);
    setLoading(false);
  };

  // Quand le joueur clique sur ✅ ou ❌
  const handleAnswer = (userSaidReal: boolean) => {
    if (isReal === null) return;

    const correct = userSaidReal === isReal;
    const newScore = score + (correct ? 1 : -1);
    setScore(newScore);

    // Ajoute la réponse à l'historique
    setHistory((prev) => [
      {
        text: advice ?? '',
        wasReal: isReal,
        userSaidReal,
        correct,
      },
      ...prev.slice(0, 9), // max 10
    ]);

    // Affiche une notification
    showNotification({
      title: correct ? '✅ Bonne réponse !' : '❌ Mauvaise réponse !',
      message: correct ? '+1 point' : '-1 point',
      color: correct ? 'green' : 'red',
      icon: correct ? <IconCheck /> : <IconX />,
    });

    // Vérifie si le joueur gagne ou perd
    if (newScore >= 20) {
      setWin(true);
      setGameOver(true);
    } else if (newScore <= 0) {
      setWin(false);
      setGameOver(true);
    } else {
      fetchRandomAdvice(); // passe à la prochaine question
    }
  };

  // Quand on clique sur "Rejouer"
  const restartGame = () => {
    setScore(10);
    setGameOver(false);
    setWin(false);
    setHistory([]);
    fetchRandomAdvice();
  };

  // Appel initial pour afficher un conseil au lancement
  useEffect(() => {
    fetchRandomAdvice();
  }, []);

  return (
    <MantineProvider>
      <Notifications />
      <Center style={{ height: '100vh', padding: '1rem' }}>
        {loading ? (
          <Loader size="xl" color="blue" />
        ) : gameOver ? (
          <Stack align="center" gap="md">
            <Title order={1}>{win ? '🎉 Tu as gagné !' : '💀 Tu as perdu...'}</Title>
            <Text>Score final : {score}</Text>
            <Button onClick={restartGame}>🔁 Rejouer</Button>
          </Stack>
        ) : (
          <Stack align="center" gap="md" w="100%" maw={500}>
            <Title order={2}>Truth or Fake 🎮</Title>
            <Text size="md">Score : {score}</Text>
            <Text size="lg" ta="center">💬 {advice}</Text>
            <Group>
              <Button color="green" onClick={() => handleAnswer(true)}>✅ Vrai conseil</Button>
              <Button color="red" onClick={() => handleAnswer(false)}>❌ Faux conseil</Button>
            </Group>

            {/* Historique des réponses */}
            {history.length > 0 && (
              <Stack gap={4} mt="md" w="100%">
                <Title order={4}>Historique</Title>
                {history.map((item, index) => (
                  <Text
                    key={index}
                    size="sm"
                    c={item.correct ? 'green' : 'red'}
                  >
                    {item.text} — {item.wasReal ? 'Vrai' : 'Faux'} — Réponse {item.correct ? '✅ correcte' : '❌ incorrecte'}
                  </Text>
                ))}
              </Stack>
            )}
          </Stack>
        )}
      </Center>
    </MantineProvider>
  );
}

export default App;