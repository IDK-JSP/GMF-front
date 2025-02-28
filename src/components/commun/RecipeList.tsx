import {FC, useContext} from 'react';
import Grid from "@mui/material/Grid2";
import RecipeItem from "./RecipeItem";
import RecipeCard from "./RecipeCard";
import DisplayCardOrItem from "../button/DisplayCardOrItem";
import {RecipeType} from "../../1_types/RecipeType";
import {Box} from "@mui/material";
import {DisplayContext} from "../../context/DisplayContext";

const RecipeList: FC<{ recipeCollection: RecipeType[] }> = ({recipeCollection}) => {

    const displayContext = useContext(DisplayContext)

    return (
        <>
            <DisplayCardOrItem/>
            {recipeCollection.map((recipe) => (
                displayContext?.isItem ?
                    <Grid container spacing={2} justifyContent="center">
                        <Grid size={11}>
                            <RecipeItem key={recipe.id_recipe} recipe={recipe}/>
                        </Grid>
                    </Grid>
                    :
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",

                    }}>
                        <RecipeCard key={recipe.id_recipe} recipe={recipe}/>
                    </Box>
            ))}
        </>
    );
};

export default RecipeList;
