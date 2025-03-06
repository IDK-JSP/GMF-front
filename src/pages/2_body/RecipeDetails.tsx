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

const RecipeDetails: FC = () => {
  const location = useLocation();
  let { id } = useParams(); // Récupération de l'ID depuis l'URL

  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsType | null>(
    null
  );
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer le recette

  const getRecipe = async () => {
    setIsPending(true);
    setError(null);

    try {
      if (location.state?.recipe) {
        // La recette est passée en tant que state, on l'enregistre
        setRecipe(location.state.recipe as RecipeType);
      } else if (id) {
        // Sinon, on récupère la recette depuis l'API
        const fetchedRecipe = await getRecipeFromId({
          recipe_id: parseInt(id),
        });
        setRecipe(fetchedRecipe);
      } else {
        throw new Error("Aucun ID de recette disponible !");
      }
    } catch (err) {
      console.error("Erreur lors de la récupération de la recette :", err);
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setIsPending(false);
    }
  };

  // Récupération de la recette au chargement de la page
  useEffect(() => {
    getRecipe();
  }, [id, location]);

  // Récupération des détails de la recette
  useEffect(() => {
    if (recipe?.id_recipe) {
      getRecipeDetails({ recipe_id: recipe.id_recipe }).then((details) => {
        setRecipeDetails(details);
      });
    }
  }, [recipe]);

  if (isPending) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!recipe) return <p>Aucune recette trouvée.</p>;

  return (
    <>
      <Presentation imgUrl={`/recipe/recipe_${recipe.id_recipe}.jpg`}>
        {recipe.title}
      </Presentation>
      <AsideLeft>
        {/* Composant qui affiche les ingrédients de la recette */}
        <IngredientResume
          ingredientsList={recipeDetails?.ingredientDetails || []}
        />
      </AsideLeft>
      <ContentWithBothAside>
        <section>
          {recipe.content}
          {/* Composant qui affiche les étapes de la recette */}
          <StageResume stageList={recipeDetails?.stages || []} />
        </section>
      </ContentWithBothAside>
      <AsideRight>
        {/* Composant qui affiche les avis de la recette */}
        <OpinionsResume opinionsList={recipeDetails?.opinions || []} />
      </AsideRight>
    </>
  );
};

export default RecipeDetails;
