import { FC, useEffect, useState } from "react";
import AsideLeft from "../../components/layout/AsideLeft";
import ContentWithLeftAside from "../../components/layout/ContentWithLeftAside";
import { ResultsList$ } from "../../observables/ResultsList$";
import { RecipeType } from "../../1_types/RecipeType";
import RecipeList from "../../components/commun/RecipeList";
import { IngredientType } from "../../1_types/IngredientType";
import Presentation from "../../components/layout/Presentation";

const Research: FC<{}> = ({}) => {
  const [recipeCollection, setRecipeCollection] = useState<RecipeType[]>([]);
  const [isList, setIsList] = useState(true); // État local pour refléter l'observable
  const [checkedIngredients, setCheckedIngredients] = useState<
    IngredientType[]
  >([]);
  const [imagePresentation, setImagePresentation] = useState<string>("reseach.jpg");

  useEffect(() => {
    // S'abonner à l'observable pour écouter les changements
    const subscription = ResultsList$.subscribe(setRecipeCollection);
    return () => subscription.unsubscribe(); // Nettoyage de l'abonnement
  }, []);

// récupération de la premiere recette pour afficher l'image en fond
  useEffect(() => {
    if (recipeCollection.length > 0) {
      setImagePresentation("recipe/recipe_" + recipeCollection[0].id_recipe + ".jpg");
    }
  }, [recipeCollection]);

  return (
    <>
      <Presentation imgUrl={imagePresentation}>Recherches</Presentation>
      <main>
      <AsideLeft>Aside avec les filtrages</AsideLeft>
      <ContentWithLeftAside>
        <section>
          section
          <article>
            <RecipeList recipeCollection={recipeCollection} />
          </article>
        </section>
      </ContentWithLeftAside>
      </main>
    </>
  );
};

export default Research;
