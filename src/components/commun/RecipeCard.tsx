import {FC, useEffect, useState} from "react";
import FavoriteButton from "../button/FavoriteButton";
import {RecipeType} from "../../1_types/RecipeType";
import "../../styles/recipeDisplay.css";
import {Rating} from "@mui/material";
import {useNavigate} from "react-router-dom";
import DietBadge from "./DietBadge";
import withLoadingAndError from "../hoc/WithLoadingAndError";
import CardSkeleton from "../skeleton/CardSkeleton";
import ImageLoarder from "./ImageLoader";

export const RecipeCard: FC<{ recipe: RecipeType }> = ({recipe}) => {
    const [recipeData, setRecipeData] = useState<RecipeType>(recipe);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        setRecipeData(recipe);
        setIsLoading(false);
    }, [recipe]);

    const handleNavigate = (recipe: RecipeType) => {
        navigate(`/RecipeDetails/${recipe.id_recipe}`, {state: {recipe}});
    };

    return withLoadingAndError({
        isLoading,
        error,
        data: [recipeData],
        SkeletonComponent: CardSkeleton,
        children: (data) => (
        <div className="recipe-card" onClick={() => handleNavigate(recipe)}>

            <ImageLoarder imgUrl={`/recipe/recipe_${data[0].id_recipe}.jpg`} title={data[0].title} />

            <span className="favorite-btn">
                <FavoriteButton id={data[0].id_recipe} type="recipe" favorite={data[0].favorite ?? "false"} sizeInPixels={50}/>
            </span>

            <div className="recipe-card-content">

                <div className="first-row">

                <h3 className="recipe-card-title" title={data[0].title}>
                    {data[0].title}
                </h3>

                    {/* Badges V */}
                    <DietBadge diet={data[0].diet} sizeInPixels={20}/>
                </div>

                <div className="recipe-card-info">
                    <span className="recipe-time">60 min {/*{data[0].time} min*/}</span>
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
            </div>
        </div>)})
};

