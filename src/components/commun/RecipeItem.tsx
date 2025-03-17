import React, {FC} from "react";
import {useNavigate} from "react-router-dom";
import {RecipeType} from "../../1_types/RecipeType";
import FavoriteButton from "../button/FavoriteButton";
import "../../styles/recipeDisplay.css";
import StarRating from "./StarRating";

const RecipeItem: FC<{ recipe: RecipeType }> = ({recipe}) => {
    const navigate = useNavigate();

    const handleNavigate = (recipe: RecipeType) => {
        navigate(`/RecipeDetails/${recipe.id_recipe}`, {state: {recipe}});
    };

    return (
        <div className="recipe-container" onClick={() => handleNavigate(recipe)}>

            <img
                src={`/recipe/recipe_${recipe.id_recipe}.jpg`}
                alt={recipe.title}
                className="recipe-item-image"
            />

            {/* Dégradé blanc */}
            <div className="recipe-gradiant"></div>

            {/* Contenu principal */}
            <div className="recipe-item-content">

                <span className="favorite-btn">
                <FavoriteButton id={recipe.id_recipe} type="recipe" favorite={recipe.favorite ?? "false"}/>
                </span>

                <div className="first-row">

                    {/* Badges V */}
                    {recipe.diet === "Non végétarien" &&
                        <div className="vegetarian-badge"/>}

                    {recipe.diet === "Végan" &&
                        <div className="vegan-badge"/>}

                    {/* Titre */}
                    <h3 className="recipe-item-title">
                        {recipe.title}
                    </h3>
                </div>

                {/* Note */}
                <div className="recipe-item-info">
                    <span className="recipe-time"> 60min</span>
                    <StarRating rate={recipe.rate} size={"50px"}/>
                </div>
            </div>
        </div>
    );
};

export default RecipeItem;
