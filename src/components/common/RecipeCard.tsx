import { FC, useEffect, useState } from "react";
import FavoriteButton from "../button/FavoriteButton";
import { RecipeType } from "../../1_types/RecipeType";
import "../../styles/recipeDisplay.css";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DietBadge from "./DietBadge";
import withLoadingAndError from "../hoc/WithLoadingAndError";
import CardSkeleton from "../skeleton/CardSkeleton";
import ImageLoarder from "./ImageLoader";

export const RecipeCard: FC<{ recipe: RecipeType }> = ({ recipe }) => {
  const [recipeData, setRecipeData] = useState<RecipeType>(recipe);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("maj recipe :", recipe);
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
    children: (data) => (
      <div className="recipe-card" onClick={() => handleNavigate(recipe)}>
        <ImageLoarder
          imgUrl={`/recipe/card/recipe_${data[0].id_recipe}.png`}
          title={data[0].title}
          classCss={"recipe-card-image"}
        />

        {/* Bouton Favoris */}
        <div className="favorite-badge">
        {data[0].favorite}
          <FavoriteButton
            id={data[0].id_recipe}
            type="recipe"
            sizeInPixels={50}
            recipe={data[0]}
            setRecipeData={setRecipeData}
          />
        </div>

        {/* Badges V */}
        <div className="diet-badge">
          <DietBadge diet={data[0].diet} sizeInPixels={50} />
        </div>

        <div className="recipe-card-content">
          <div className="first-row">
            <h3 className="recipe-card-title" title={data[0].title}>
              {data[0].title}
            </h3>
          </div>

          <div className="recipe-card-info">
            <span className="recipe-time">60 min {/*{data[0].time} min*/}</span>
            <Rating
              sx={{
                "& .MuiRating-iconFilled": { color: "orange" },
                "& .MuiRating-iconEmpty": { color: "orange" },
              }}
              name="recipe-rating"
              defaultValue={recipe.rate}
              precision={0.01}
              readOnly
            />
          </div>
        </div>
      </div>
    ),
  });
};
