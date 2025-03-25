# 🍽️ Projet GMF - Application de Recettes de Cuisine

## 📌 Présentation
**Projet GMF** est un site de recherche de recettes avec des filtres sur les ingrédients.  
L'utilisateur peut :
- 🔍 Rechercher des recettes selon des filtres précis
- ⭐ Mettre en favoris des recettes et des ingrédients
- 🏆 Voir les recettes les plus populaires
- ✍️ Créer, noter et commenter des recettes
- 🛠️ Adapter les quantités d'ingrédients selon le nombre de personnes  

Ce projet a été réalisé en groupe dans le cadre d'une **formation professionnelle**. Il sera présenté à l’examen pour l’obtention du **Titre Professionnel Développeur Web et Web Mobile**.  

---

## 🚀 Fonctionnalités principales
- 📚 **Affichage de listes de recettes**
- 🔍 **Recherche avancée avec filtres**
- ➕ **Ajout de nouvelles recettes**
- ⭐ **Mise en favoris de recettes et d'ingrédients**
- 🏆 **Classement des recettes les plus populaires**
- ✍️ **Notation et commentaires sur les recettes**
- ⚖️ **Adaptation automatique des ingrédients selon le nombre de portions**

---

## 🖥️ Démo  
⏳ **À venir...**

---

## 🛠️ Stack technique
### Front-end :
- ⚪ **React** (Librairie principale)
- 📞 **Axios** (Gestion des appels API)

### Back-end :
Le projet utilise une API back-end développée ici :  
🔗 [GMF-Back (GitHub)](https://github.com/IDK-JSP/GMF-back)  

---

## 📦 Installation & Exécution
### 1 Cloner le projet
```sh
git clone https://github.com/ton-utilisateur/GMF-front.git
cd GMF-front
```

### 2 Installer les dépendances
```sh
npm install
```
Certaines dépendances spécifiques peuvent être nécessaires.

### 3 Lancer l'application
```sh
npm start
```
L'application doit être connectée au **back-end** pour fonctionner.  
Assurez-vous que l'API est bien en place avec une base de données correcte.  

---

## 📂 Structure du projet
```
src/
│── types/              # Définition des types (TypeScript si utilisé)
│── api/                # Gestion des connexions API (Axios, Fetch)
│── components/         # Composants réutilisables
│   ├── auth/         # Gestion de l'authentification et des tokens
│   ├── button/       # Boutons personnalisés
│   ├── common/       # Composants réutilisables dans plusieurs pages
│   ├── layout/       # Structure de la mise en page
│   ├── skeleton/     # Chargements et placeholders
│   ├── hoc/         # Higher Order Components
│   ├── pages/       # Composants spécifiques aux pages du site
│── context/            # Gestion du state global (Context API)
│── hooks/              # Hooks personnalisés
│── observables/        # Gestion d'événements asynchrones
│── pages/              # Pages principales du site
│── routes/             # Configuration des routes (React Router)
│── styles/             # Feuilles de style et thèmes CSS
```

---

## 🤖 Auteurs & Contributeurs
🚀 **Équipe de développement :**
- **Gabriel** → [GitHub](https://github.com/gabrielloop/)
- **Martin** → [GitHub](https://github.com/IDK-JSP)
- **Florian** → [GitHub](https://github.com/Flo-Foui)

---

## 📚 Licence
Ce projet est open-source sous licence **MIT**.

---

🌟 **Merci d’avoir consulté ce projet ! Bon développement !** 🚀

