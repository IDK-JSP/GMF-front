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
import OpinionsResume from "../../components/RecipeDetails/OpinionsResume";
import DietResume from "../../components/RecipeDetails/DietResume";
import "react-loading-skeleton/dist/skeleton.css";

const RecipeDetails: FC = () => {
  const location = useLocation();
  let { id } = useParams();

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
      setIsPending(true);
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
      } finally {
        setIsPending(false);
      }
    };
    fetchRecipe();
  }, [id, location]);

  // Récupération des détails de la recette si elle n’est pas déjà chargée
  useEffect(() => {
    if (recipe?.id_recipe && !recipeDetails) {
      getRecipeDetails({ recipe_id: recipe.id_recipe }).then(setRecipeDetails);
    }
  }, [recipe, recipeDetails]);

  // Composant de gestion des états de chargement / erreur
  const RenderState = () => {
    if (isPending) return <p>Chargement...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!recipe) return <p>Aucune recette trouvée.</p>;
    return null;
  };

  return (
    <>
      <RenderState />
      {recipe && (
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
              <OpinionsResume
                opinionsList={recipeDetails?.opinions || []}
                recipeRate={recipe.rate ?? 0}
                recipeNbRate={recipe.nbRate ?? 0}
                isLoading={isPending}
                error={error}
              />
            </AsideRight>
          </main>
        </>
      )}
    </>
  );
};

export default RecipeDetails;
