import { FC, useContext, useEffect, useState } from "react";
import AsideLeft from "../components/layout/AsideLeft";
import AsideRight from "../components/layout/AsideRight";
import { useLocation, useParams } from "react-router-dom";
import { RecipeDetailsType } from "../1_types/RecipeDetailsType";
import get from "../api/get";
import "../styles/recipe.css";
import { RecipeType } from "../1_types/RecipeType";
import IngredientResume from "../components/recipeDetails/IngredientResume";
import StageResume from "../components/recipeDetails/StageResume";
import DietResume from "../components/recipeDetails/DietResume";
import "react-loading-skeleton/dist/skeleton.css";
import OpinionsDetails from "../components/recipeDetails/OpinionsDetails";
import RecipeSkeleton from "../components/skeleton/RecipeSkeleton";
import FavoriteButton from "../components/button/FavoriteButton";
import Pages from "../components/layout/Pages";
import HeroSection from "../components/layout/HeroSection";
import AuthContext from "../context/AuthContext";
import Content from "../components/layout/Content";
import { Typography } from "@mui/material";

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

  // Récupération de la recette
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchRecipe = async () => {
      setIsPending(true);
      setError(null);

      try {
        if (location.state?.recipe) {
          setRecipe(location.state.recipe as RecipeType);
        } else if (id) {
          const fetchedRecipe = await get("/recipe/" + parseInt(id));
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

  // Assurer que `isPending` reste `true` jusqu'à ce que `recipeDetails` soit chargé
  useEffect(() => {
    if (recipe?.id_recipe) {
      setIsPending(true);
      get("/recipe/details/" + recipe.id_recipe).then((details) => {
        setRecipeDetails(details);
        setIsPending(false);
      });
    }
  }, [recipe]);

  // Récupération des détails de la recette si elle n’est pas déjà chargée
  useEffect(() => {
    if (recipe?.id_recipe && !recipeDetails) {
      get("/recipe/details/" + recipe.id_recipe).then(setRecipeDetails);
    }
  }, [recipe, recipeDetails]);

  // Récuperation du mail depuis le token du localStorage
  const authContext = useContext(AuthContext);

  return (
    <Pages pageTitle={recipe?.title}>
      {recipe ? (
        <>
          <HeroSection
            imgUrl={`/recipe/recipe_${recipe.id_recipe}.jpg`}
            recipeRate={recipe.rate ?? 0}
            recipeNbRate={recipe.nbRate ?? 0}
          >
            <div
              className="flex-row"
              style={{ gap: "1rem", alignItems: "center" }}
            >
              {recipe.title}
              {authContext?.isLoggedIn && (
                <FavoriteButton
                  id={recipe.id_recipe}
                  type="recipe"
                  favorite={recipe.favorite ?? "false"}
                  sizeInPixels={50}
                />
              )}
            </div>
          </HeroSection>
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
            <Content asideRight asideLeft>
              <section>
                <span className="recipe-content">
                  <Typography fontWeight="fontWeightBold" variant="h5">
                    La recette
                  </Typography>
                  <p style={{ margin: 0 }}>{recipe.content}</p>
                  <p>
                    par <b>{recipe.email.split("@")[0]}</b>
                  </p>
                </span>
                <span className="recipe-content">
                  <Typography fontWeight="fontWeightBold" variant="h5">
                    Les étapes
                  </Typography>
                  <StageResume
                    stageList={recipeDetails?.stages || []}
                    isLoading={isPending}
                    error={error}
                  />
                </span>
              </section>
            </Content>
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
      ) : (
        <RecipeSkeleton />
      )}
    </Pages>
  );
};

export default RecipeDetails;
