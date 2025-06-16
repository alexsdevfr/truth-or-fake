# 🎮 Truth or Fake

> **Projet réalisé dans le cadre du test technique React / TypeScript pour Base for Music.**

Ce mini-jeu permet à l'utilisateur de deviner si un conseil affiché est **réel** (provenant de l’API [Advice Slip](https://api.adviceslip.com/advice)) ou **faux** (issu d’une liste locale).
L’application est construite avec **React**, **TypeScript** et **Mantine**.

---

## 🧰 Stack utilisée

* ⚛️ React 18 + TypeScript
* 🎨 Mantine UI v7
* 💬 Mantine Notifications
* 🌐 API : [Advice Slip](https://api.adviceslip.com/advice)
* 📁 Fichier local `fakeAdvices.json` (faux conseils)
* 🚫 Pas de base de données (tout est en mémoire)

---

## ⚙️ Installation & lancement

1. **Cloner le dépôt** :

```bash
git clone https://github.com/alexsdevfr/truth-or-fake.git
cd truth-or-fake
```

2. **Installer les dépendances** :

```bash
npm install
```

3. **Lancer l’application** :

```bash
npm run dev
```

> L’application sera accessible sur `http://localhost:3000`.

---

## 🎮 Règles du jeu

* Le joueur commence avec **10 points**
* À chaque tour :

  * Un conseil est affiché (réel ou faux)
  * Le joueur choisit : ✅ « Vrai conseil » ou ❌ « Faux conseil »
* **+1 point** si bonne réponse / **-1 point** sinon
* **Victoire** à 20 points / **Défaite** à 0 point
* Un bouton permet de **rejouer**
* L’historique des **10 derniers conseils** est affiché

---

## 🧠 Architecture technique

* `App.tsx` : composant principal qui gère :

  * L’état global (score, conseil, historique, chargement…)
  * L’appel à l’API et au fichier `fakeAdvices.json`
  * L’interface et les interactions
* `public/fakeAdvices.json` : liste de 10 faux conseils
* `@mantine/core` : composants visuels, mise en page (Stack, Center, Group…)
* `@mantine/notifications` : affichage des notifications de réponse (bonne / mauvaise)

---

## 🚀 Fonctionnalités

* Affichage **aléatoire** d’un conseil
* Système de **score dynamique**
* Fin de partie (victoire ou défaite)
* **Notifications visuelles**
* Historique des **10 dernières réponses**
* **Bouton Rejouer**

---

## 🔧 Améliorations possibles

* Ajouter des **animations** entre les tours (fade, transitions…)
* Enregistrer le **meilleur score** avec `localStorage`
* Ajouter une vraie gestion de **thème** (mode sombre, thème personnalisé)
* Ajouter un bouton **« Voir la solution »** après chaque réponse
* Améliorer la **version mobile** (responsive)

---

## 👤 Auteur

**Alexis Soissons**
Étudiant diplomé BTS SIO – Option SLAM
Développeur débutant, motivé, passionné par le web et les projets concrets.

---

## 📩 Contact

* 📧 [alexissoissons1@gmail.com](mailto:alexissoissons1@gmail.com)
* 🔗 [GitHub – alexsdevfr](https://github.com/alexsdevfr)
