import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeType } from "../../1_types/RecipeType";
import FavoriteButton from "../button/FavoriteButton";
import "../../styles/recipeDisplay.css";
import StarRating from "./StarRating";
import DietBadge from "../button/DietBadge";
import withLoadingAndError from "../hoc/WithLoadingAndError";
import ImageLoarder from "./ImageLoader";
import ItemSkeleton from "../skeleton/ItemSkeleton";

export const RecipeItem: FC<{ recipe: RecipeType, setRecipes?: any }> = ({ recipe, setRecipes }) => {
  const [recipeData, setRecipeData] = useState<RecipeType>(recipe);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setRecipeData(recipe);
    setIsLoading(false);
  }, [recipe]);

  const handleNavigate = (recipe: RecipeType) => {
    navigate(`/RecipeDetails/${recipe.id_recipe}`, { state: { recipe } });
  };

  return withLoadingAndError({
    isLoading,
    error,
    data: [recipeData],
    SkeletonComponent: ItemSkeleton,
    children: (dataItem) => (
      <div className="recipe-container" onClick={() => handleNavigate(dataItem[0])}>
        <ImageLoarder
          imgUrl={`/recipe/item/recipe_${dataItem[0].id_recipe}.png`}
          title={dataItem[0].title}
          classCss={"recipe-item-image"}
        />
        {/* Dégradé blanc */}
        <div className="recipe-gradiant"></div>
        <div
          className="flex-row"
          style={{ justifyContent: "space-between", width: "100%" }}
        >
          {/* Contenu principal */}
          <div className="recipe-item-content">
            <div className="first-row">
              {/* Titre */}
              <h3 className="recipe-item-title">{dataItem[0].title}</h3>
            </div>
            {/* Note */}
            <div className="recipe-item-info">
              <span className="recipe-time"> {dataItem[0].cooking_time}min</span>
              <StarRating rate={dataItem[0].rate} size={"50px"} />
            </div>
          </div>
          <div className="item-btn-container badge-item-card">
            {/* Badges V */}
            <div className="diet-badge">
              <DietBadge diet={dataItem[0].diet} sizeInPixels={60}/>
            </div>
            {/* Favorite Btn */}
            <div className="favorite-badge">
              <FavoriteButton
              id={dataItem[0].id_recipe}
              type="recipe"
              sizeInPixels={50}
              recipe={dataItem[0]}
              setRecipeData={setRecipeData}
              setRecipes={setRecipes}
            />
            </div>
          </div>
        </div>
      </div>
    ),
  });
};

export default RecipeItem;
