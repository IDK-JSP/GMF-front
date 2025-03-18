import { FC, useEffect, useState } from "react";
import { ResultsList$ } from "../../observables/ResultsList$";
import { RecipeType } from "../../1_types/RecipeType";
import RecipeList from "../../components/commun/RecipeList";
import { IngredientType } from "../../1_types/IngredientType";
import Presentation from "../../components/layout/Presentation";
import RecipeCarousel from  "../../components/commun/RecipeCarousel";
import ContentWithoutAside from "../../components/layout/ContentWithoutAside";
import DynamicFilter from "../../components/commun/DynamicFilter";


const Research: FC<{}> = ({}) => {
  const [recipeCollection, setRecipeCollection] = useState<RecipeType[]>([]);
  const [isList, setIsList] = useState(true); // État local pour refléter l'observable
  const [checkedIngredients, setCheckedIngredients] = useState<
    IngredientType[]
  >([]);
  const [imagePresentation, setImagePresentation] = useState<string>("reseach.jpg");

  useEffect(() => {
    // S'abonner à l'observable pour écouter les changements
      window.scrollTo({top: 0, behavior: "smooth"});
      const subscription = ResultsList$.subscribe(setRecipeCollection);
    return () => subscription.unsubscribe(); // Nettoyage de l'abonnement
  }, []);

// récupération de la premiere recette pour afficher l'image en fond
  useEffect(() => {
    if (recipeCollection.length > 0) {
      setImagePresentation("recipe/recipe_" + recipeCollection[0].id_recipe + ".jpg");
    }
  }, [recipeCollection]);

// On masque l'affichage des résultats de la recherche
  

  return (
    <>
      <Presentation imgUrl={imagePresentation} carousel={<RecipeCarousel recipeCollection={recipeCollection ?? []}/>}>Recherches</Presentation>
      <main>
      <ContentWithoutAside>
        <section>
          <DynamicFilter/>
          <article>
            <RecipeList recipeCollection={recipeCollection} />
          </article>
        </section>
      </ContentWithoutAside>
      </main>
    </>
  );
};

export default Research;
