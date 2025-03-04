import { FC, useEffect, useState } from "react";
import AsideLeft from "../../components/layout/AsideLeft";
import ContentWithLeftAside from "../../components/layout/ContentWithLeftAside";
import { ResultsList$ } from "../../observables/ResultsList$";
import { RecipeType } from "../../1_types/RecipeType";
import RecipeList from "../../components/commun/RecipeList";
import { IngredientType } from "../../1_types/IngredientType";
import { getIngredients } from "../../api/getIngredients";
import Presentation from "../../components/layout/Presentation";

const Research: FC<{}> = ({}) => {
  const [recipeCollection, setRecipeCollection] = useState<RecipeType[]>([]);
  const [isList, setIsList] = useState(true); // État local pour refléter l'observable
  const [checkedIngredients, setCheckedIngredients] = useState<
    IngredientType[]
  >([]);

  useEffect(() => {
    // S'abonner à l'observable pour écouter les changements
    const subscription = ResultsList$.subscribe(setRecipeCollection);
    return () => subscription.unsubscribe(); // Nettoyage de l'abonnement
  }, []);

  return (
    <>
      <Presentation imgUrl={"/test.jpg"}>Recherches</Presentation>
      <AsideLeft>Aside avec les filtrages</AsideLeft>
      <ContentWithLeftAside>
        <section>
          section
          <article>
            <RecipeList recipeCollection={recipeCollection} />
          </article>
        </section>
      </ContentWithLeftAside>
    </>
  );
};

export default Research;
