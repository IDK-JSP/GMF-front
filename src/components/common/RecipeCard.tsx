import { FC, useEffect, useState } from "react";
import FavoriteButton from "../button/FavoriteButton";
import { RecipeType } from "../../1_types/RecipeType";
import "../../styles/recipeDisplay.css";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DietBadge from "../button/DietBadge";
import withLoadingAndError from "../hoc/WithLoadingAndError";
import CardSkeleton from "../skeleton/CardSkeleton";
import ImageLoarder from "./ImageLoader";

export const RecipeCard: FC<{ recipe: RecipeType, setRecipes?:any }> = ({ recipe,setRecipes }) => {
  const [recipeData, setRecipeData] = useState<RecipeType>(recipe);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setRecipeData(recipe);
    setIsLoading(false);
  }, [recipe]);

  const handleNavigate = (recipe: RecipeType) => {
    navigate(`/RecipeDetails/${recipe.id_recipe}`, { state: { recipeData } });
  };

  return withLoadingAndError({
    isLoading,
    error,
    data: [recipeData],
    SkeletonComponent: CardSkeleton,
    children: (dataCard) => (
      <div className="recipe-card" onClick={() => handleNavigate(dataCard[0])}>
        <ImageLoarder
          imgUrl={`/recipe/card/recipe_${dataCard[0].id_recipe}.png`}
          title={dataCard[0].title}
          classCss={"recipe-card-image"}
        />

        {/* Bouton Favoris */}
        <div className="favorite-badge">
          <FavoriteButton
            id={dataCard[0].id_recipe}
            type="recipe"
            sizeInPixels={50}
            recipe={dataCard[0]}
            setRecipeData={setRecipeData}
            setRecipes={setRecipes}
          />
        </div>

        {/* Badges V */}
        <div className="diet-badge">
          <DietBadge diet={dataCard[0].diet} sizeInPixels={50} />
        </div>

        <div className="recipe-card-content">
          <div className="first-row">
            <h3 className="recipe-card-title" title={dataCard[0].title}>
              {dataCard[0].title}
            </h3>
          </div>

          <div className="recipe-card-info">
            <span className="recipe-time">{dataCard[0].cooking_time} min</span>
            <Rating
              sx={{
                "& .MuiRating-iconFilled": { color: "orange" },
                "& .MuiRating-iconEmpty": { color: "orange" },
              }}
              name="recipe-rating"
              defaultValue={dataCard[0].rate}
              precision={0.01}
              readOnly
            />
          </div>
        </div>
      </div>
    ),
  });
};
