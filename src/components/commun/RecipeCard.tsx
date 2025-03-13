import {FC} from "react";
import FavoriteButton from "../button/FavoriteButton";
import {RecipeType} from "../../1_types/RecipeType";
import "../../styles/recipeDisplay.css";
import {Rating} from "@mui/material";
import {useNavigate} from "react-router-dom";

const RecipeCard: FC<{ recipe: RecipeType }> = ({recipe}) => {
    const navigate = useNavigate();

    const handleNavigate = (recipe: RecipeType) => {
        navigate(`/RecipeDetails/${recipe.id_recipe}`, {state: {recipe}});
    };

    return (
        <div className="recipe-card" onClick={() => handleNavigate(recipe)}>

            <img
                src={`/recipe/recipe_${recipe.id_recipe}.jpg` || "https://placehold.co/500x500?text=No\nImage"}
                alt={recipe.title}
                className="recipe-card-image"
            />

            <span className="favorite-btn">
                <FavoriteButton id={recipe.id_recipe} type="recipe"/>
            </span>

            {/* Badges V */}
            {recipe.diet === "Végétarien" &&
                <div className="vegetarian-badge"/>}

            {recipe.diet === "Végan" &&
                <div className="vegan-badge"/>}

            <div className="recipe-card-content">

                <h3 className="recipe-title" title={recipe.title}>
                    {recipe.title}
                </h3>

                <div className="recipe-card-info">
                    <span className="recipe-time">60 min {/*{recipe.time} min*/}</span>
                    <Rating
                        sx={{
                            "& .MuiRating-iconFilled": {color: "orange"},
                            "& .MuiRating-iconEmpty": {color: "orange"},
                        }}
                        name="recipe-rating"
                        defaultValue={recipe.rate}
                        precision={0.01}
                        readOnly
                    />
                </div>

                <p className="recipe-description" title={recipe.content}>
                    {recipe.content}
                </p>
            </div>
        </div>
    );
};

export default RecipeCard;
