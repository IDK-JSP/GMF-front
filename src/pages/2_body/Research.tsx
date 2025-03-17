import { FC, useEffect, useState } from "react";
import AsideLeft from "../../components/layout/AsideLeft";
import ContentWithLeftAside from "../../components/layout/ContentWithLeftAside";
import { ResultsList$ } from "../../observables/ResultsList$";
import { RecipeType } from "../../1_types/RecipeType";
import RecipeList from "../../components/commun/RecipeList";
import { IngredientType } from "../../1_types/IngredientType";
import Presentation from "../../components/layout/Presentation";
import FilterSelection from "../../components/header/searchBar/FilterSelection";
import { IngredientList$ } from "../../observables/IngredientList$";
import RecipeCarousel from "../../components/RecipeCarousel";
import ContentWithoutAside from "../../components/layout/ContentWithoutAside";

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

  return (
    <>
      <Presentation imgUrl={imagePresentation} carousel={<RecipeCarousel recipeCollection={recipeCollection ?? []}/>}>Recherches</Presentation>
      <main>
      {/*<AsideLeft>
         map sur IngredientList$
        {IngredientList$.value.map((ingredient) => (
          <div key={ingredient.id_ingredient}>
            <input
              type="checkbox"
              id={ingredient.name}
              onChange={(e) => {
                if (e.target.checked) {
                  setCheckedIngredients([...checkedIngredients, ingredient]);
                } else {
                  setCheckedIngredients(
                    checkedIngredients.filter(
                      (checkedIng) => checkedIng.id_ingredient !== ingredient.id_ingredient
                    )
                  );
                }
              }}
              checked={checkedIngredients.some(
                (checkedIng) => checkedIng.id_ingredient === ingredient.id_ingredient
              )}
            />
            <label htmlFor={ingredient.name}>{ingredient.name}</label>
          </div>
        ))}

      </AsideLeft>*/}
      <ContentWithoutAside>
        <section>
          section
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
