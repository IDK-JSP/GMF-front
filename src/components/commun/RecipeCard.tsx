import {FC} from 'react';
import {useNavigate} from "react-router";
import FavoriteButton from "../button/FavoriteButton";
import {RecipeType} from "../../1_types/RecipeType";
import "../../styles/recipeCard.css";
import {Rating} from "@mui/material";

const RecipeCard: FC<{ recipe: RecipeType }> = ({recipe}) => {
    const navigate = useNavigate();

    return (
        <div
            className="recipe-card"
            onClick={() => navigate("../RecipeDetails/" + recipe.id_recipe)}
        >
            <div className="recipe-card-container">
                <img
                    src={recipe.image || "https://placehold.co/500x500?text=No\nImage"}
                    alt={recipe.title}
                />

                <span className="favorite-button">
                    <FavoriteButton/>
                </span>

                {/*recipe.diet === "vege" && */}
                    <div className="veg-indicator"/>

                <div className="recipe-card-content">
                    <h3 className="recipe-title" title={recipe.title}>
                        {recipe.title}
                    </h3>

                    <div className="recipe-info">
                        <span>60 min {/*{recipe.time} min*/}</span>
                        <Rating sx={{
                            "& .MuiRating-iconFilled": {color: "orange"},
                            "& .MuiRating-iconEmpty": {color: "orange"}
                        }}
                                name="recipe-rating" defaultValue={recipe.rate} precision={0.01} readOnly/>
                    </div>

                    <p className="recipe-description" title={recipe.content}>
                        {recipe.content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
