import { FC, useEffect, useState } from "react";
import ContentWithBothAside from "../../components/layout/ContentWithBothAside";
import AsideLeft from "../../components/layout/AsideLeft";
import AsideRight from "../../components/layout/AsideRight";
import Presentation from "../../components/layout/Presentation";
import { useLocation, useParams } from "react-router-dom";
import { RecipeDetailsType } from "../../1_types/RecipeDetailsType";
import { getRecipeDetails } from "../../api/getRecipeDetails";
import { getRecipeFromId } from "../../api/getRecipeFromId";
import "../../styles/recipe.css";
import { RecipeType } from "../../1_types/RecipeType";
import IngredientResume from "../../components/RecipeDetails/IngredientResume";
import StageResume from "../../components/RecipeDetails/StageResume";
import DietResume from "../../components/RecipeDetails/DietResume";
import "react-loading-skeleton/dist/skeleton.css";
import OpinionsDetails from "../../components/RecipeDetails/OpinionsDetails";
import RecipeSkeleton from "../../components/RecipeDetails/RecipeSkeleton";

const RecipeDetails: FC = () => {
  const location = useLocation();
  let { id } = useParams();

  // Transformer en observable
  const [recipe, setRecipe] = useState<RecipeType | null>(null);

  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsType | null>(
    null
  );
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Chargement en cours :", isPending);
  }, [isPending]);

  // Récupération de la recette
  useEffect(() => {
    const fetchRecipe = async () => {
      setIsPending(true);  // ✅ Assure que le chargement commence bien
      setError(null);
  
      try {
        if (location.state?.recipe) {
          setRecipe(location.state.recipe as RecipeType);
        } else if (id) {
          const fetchedRecipe = await getRecipeFromId({
            recipe_id: parseInt(id),
          });
          setRecipe(fetchedRecipe);
        } else {
          throw new Error("Aucun ID de recette disponible !");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      }
    };
  
    fetchRecipe();
  }, [id, location]);
  
  // 🔥 Assurer que `isPending` reste `true` jusqu'à ce que `recipeDetails` soit chargé
  useEffect(() => {
    if (recipe?.id_recipe) {
      setIsPending(true);  // ✅ Remet `isPending` à `true` en attendant les détails
      getRecipeDetails({ recipe_id: recipe.id_recipe }).then((details) => {
        setRecipeDetails(details);
        setIsPending(false);  // ✅ On désactive `isPending` uniquement après ce chargement
      });
    }
  }, [recipe]);

  // Récupération des détails de la recette si elle n’est pas déjà chargée
  useEffect(() => {
    if (recipe?.id_recipe && !recipeDetails) {
      getRecipeDetails({ recipe_id: recipe.id_recipe }).then(setRecipeDetails);
    }
  }, [recipe, recipeDetails]);

  
  return (
    <>
      {recipe ? (
        <>
          <Presentation imgUrl={`/recipe/recipe_${recipe.id_recipe}.jpg`}>
            {recipe.title}
          </Presentation>
          <main>
            <AsideLeft>
              <IngredientResume
                ingredientsList={recipeDetails?.ingredientDetailDtos || []}
                person={recipe.person ?? 1}
                isLoading={isPending}
                error={error}
              />
              <DietResume
                dietList={recipeDetails?.ingredientDetailDtos || []}
              />
            </AsideLeft>
            <ContentWithBothAside>
              <section>
                {recipe.content}
                <StageResume
                  stageList={recipeDetails?.stages || []}
                  isLoading={isPending}
                  error={error}
                />
              </section>
            </ContentWithBothAside>
            <AsideRight>
              <OpinionsDetails
                recipeRate={recipe?.rate ?? 0}
                recipeNbRate={recipe.nbRate ?? 0}
                recipeId={recipe.id_recipe}
                opinionList={recipeDetails?.opinions || []}
                isLoading={isPending}
                error={error}
              />
            </AsideRight>
          </main>
        </>
      ):
      <RecipeSkeleton />}
    </>
  );
};

export default RecipeDetails;
