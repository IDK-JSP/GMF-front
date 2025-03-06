import {FC, useContext} from 'react';
import Grid from "@mui/material/Grid2";
import RecipeItem from "./RecipeItem";
import RecipeCard from "./RecipeCard";
import DisplayCardOrItem from "../button/DisplayCardOrItem";
import {RecipeType} from "../../1_types/RecipeType";
import {DisplayContext} from "../../context/DisplayContext";
import "../../styles/recipeCard.css";

const RecipeList: FC<{ recipeCollection: RecipeType[] }> = ({recipeCollection}) => {

    const displayContext = useContext(DisplayContext)

    return (
        <>
            <DisplayCardOrItem/>
            {displayContext?.isItem ? (
                <Grid container spacing={2} justifyContent="center">
                    {recipeCollection.map((recipe) => (
                        <Grid size={11} key={recipe.id_recipe} paddingBottom={5}>
                            <RecipeItem recipe={recipe}/>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <div className="recipe-grid">
                    {recipeCollection.map((recipe) => (
                        <RecipeCard key={recipe.id_recipe} recipe={recipe}/>
                    ))}
                </div>
            )}

        </>
    );
};

export default RecipeList;
