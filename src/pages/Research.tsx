import {FC, SetStateAction, useContext, useEffect, useState} from "react";
import {ResultsList$} from "../observables/ResultsList$";
import {RecipeType} from "../1_types/RecipeType";
import RecipeList from "../components/common/RecipeList";
import {IngredientType} from "../1_types/IngredientType";
import Presentation from "../components/layout/Presentation";
import RecipeCarousel from "../components/common/RecipeCarousel";
import ContentWithoutAside from "../components/layout/ContentWithoutAside";
import {SearchIngredientsList$} from "../observables/SearchIngredientsList$";
import DynamicFilter from "../components/common/DynamicFilter";
import {DynamicFilterContext} from "../context/DynamicFilterContext";
import Pages from "../components/layout/Pages";


const Research: FC<{}> = ({}) => {
  const [recipeCollection, setRecipeCollection] = useState<RecipeType[]>([]);
  const [ingredientCollection, setIngredientCollection] = useState<IngredientType[]>([]);
  const [isMatching, setIsMatching] = useState<boolean>(true);
  const [imagePresentation, setImagePresentation] = useState<string>("reseach.jpg");
  const filterContext = useContext(DynamicFilterContext);

  useEffect(() => {
    if (filterContext) {
      setIsMatching(filterContext.isMatching);
    }
  }, [filterContext]);


  useEffect(() => {
    // S'abonner à l'observable pour écouter les changements
      window.scrollTo({top: 0, behavior: "smooth"});
      const subscription = ResultsList$.subscribe(setRecipeCollection);
    return () => subscription.unsubscribe(); // Nettoyage de l'abonnement
  }, []);

// Récupération de la liste d'ingrédient
useEffect(() => {
  const subscription = SearchIngredientsList$.subscribe((newIngredients: SetStateAction<IngredientType[]>) => {
    setIngredientCollection(newIngredients);
  });

  return () => subscription.unsubscribe(); // Nettoyage de l'abonnement
}, [SearchIngredientsList$]);


// récupération de la premiere recette pour afficher l'image en fond
  useEffect(() => {
    if (recipeCollection.length > 0) {
      setImagePresentation("recipe/recipe_" + recipeCollection[0].id_recipe + ".jpg");
    }
  }, [recipeCollection]);

// Application du filtre du context (Matching des ingrédients)
const ingredientLength = ingredientCollection.length;
let filteredRecipes;
let matchingButton = false;
// S'il n'y a pas d'ingrédient selectionné on affiche toutes les recettes
if (ingredientLength === 0) {
  filteredRecipes = recipeCollection;
} else {
  matchingButton = true;
  // Si on veut afficher les recettes qui ont aussi des ingrédients non selectionnés
  filteredRecipes = filterContext?.isMatching
    ? recipeCollection
    : recipeCollection.filter(recipe => recipe.matching_ingredients === ingredientLength);

    // filteredRecipes = filterContext?.isMatching
    // ? recipeCollection.filter(recipe => recipe.matching_ingredients === ingredientLength)
    // : recipeCollection.filter(recipe => recipe.matching_ingredients !== ingredientLength);
}

  return (
    <Pages>
      <Presentation imgUrl={imagePresentation} carousel={<RecipeCarousel recipeCollection={recipeCollection ?? []}/>}>Recherches</Presentation>
      <main>
      <ContentWithoutAside>
        <section>
          <DynamicFilter matching={matchingButton} display={true}/>
          <article>
            <RecipeList recipeCollection={filteredRecipes} />
          </article>
        </section>
      </ContentWithoutAside>
      </main>
    </Pages>
  );
};

export default Research;
