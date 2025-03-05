# GMF-front

Implémentation de la page de "détail de la recette" : RecipeDetails

📍 Résumé des améliorations et fonctionnalités

Ce projet implémente une page de détails de recette (RecipeDetails) avec des fonctionnalités avancées telles que :

- Chargement dynamique des recettes depuis l'API ou location.state.
- Gestion des erreurs et des états de chargement.
- Affichage de Skeleton Loaders pour améliorer l'expérience utilisateur.
- Refactoring et optimisation avec un HOC (withLoadingAndError).

📌 Gestion du Chargement et des Erreurs

→ Mise en place d'un HOC (withLoadingAndError)
Pour éviter de dupliquer la logique du chargement et des erreurs dans plusieurs composants (IngredientResume, StageResume, OpinionsResume), nous avons créé un Higher-Order Component (HOC) withLoadingAndError.

📂 Fichier : components/hoc/withLoadingAndError.tsx
Avantages :

- Évite de répéter isLoading et error dans chaque composant.
- Simplifie et améliore la lisibilité du code.
- Permet d'ajouter un SkeletonComponent spécifique par composant.

📌 Gestion du Chargement avec un Skeleton Loader

Au lieu d'afficher un simple "Chargement...", on a intégré des Skeletons avec react-loading-skeleton pour un rendu plus fluide.
Chaque section (ingrédients, étapes, avis) a son propre squelette de chargement.

📂 Fichiers :
!!! TODOSkeletonRecipeDetails.tsx (Skeleton général pour la page)

- StageSkeleton.tsx,
- IngredientSkeleton.tsx,
- OpinionsSkeleton.tsx

Installation de la dépendance :

- npm install react-loading-skeleton
  Import global dans App.tsx :
- import "react-loading-skeleton/dist/skeleton.css";

Chaque composant (StageResume, IngredientResume, OpinionsResume) a son propre SkeletonComponent.
