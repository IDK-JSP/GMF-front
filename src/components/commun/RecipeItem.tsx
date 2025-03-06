import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeType } from "../../1_types/RecipeType";
import FavoriteButton from "../button/FavoriteButton";
import "../../styles/recipeItem.css";
import StarRating from "./StarRating";

const RecipeItem: FC<{ recipe: RecipeType }> = ({ recipe }) => {
  const navigate = useNavigate();

  const handleNavigate = (recipe: RecipeType) => {
    navigate(`/RecipeDetails/${recipe.id_recipe}`, { state: { recipe } });
  };

  return (
    <div className="recipe-container" onClick={() => handleNavigate(recipe)}>
      {/* Image de fond */}
      <img
        src={`/recipe/recipe_${recipe.id_recipe}.jpg`}
        alt={recipe.title}
        className="recipe-image"
      />

      <div className="recipe-gradiant"></div>

      {/* Contenu principal */}
      <div className="recipe-content">
        {/* Bouton Favori */}
        <span className="favorite-btn">
          <FavoriteButton />
        </span>

        {/* Badge Végé */}
        {/*{recipe.diet === "vege" && (*/}
        <div className="recipe-badge"></div>

        <div className="recipe-infos">
          <h3 className="recipe-title">
            {recipe.title} <span className="recipe-time">60min</span>
          </h3>
          <StarRating rate={recipe.rate} />
          <p className="recipe-description">{recipe.content}</p>
        </div>

        {/* Barre verticale */}
        <div className="recipe-divider"></div>

        {/* Contraintes alimentaires */}
        <div className="recipe-constraints">
          <h4>Allergènes</h4>
          <p>
            vege
            <br />
            vege
            <br />
            noix
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
