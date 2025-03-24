import { FC, useContext } from "react";
import Grid from "@mui/material/Grid2";
import RecipeItem from "./RecipeItem";
import { RecipeCard } from "./RecipeCard";
import { RecipeType } from "../../1_types/RecipeType";
import { DisplayContext } from "../../context/DisplayContext";
import "../../styles/recipeDisplay.css";

const RecipeList: FC<{ recipeCollection: RecipeType[], setRecipes?:any }> = ({
  recipeCollection,
  setRecipes,
}) => {
  const displayContext = useContext(DisplayContext);
  return (
    <>
      {displayContext?.isItem ? (
        <Grid container spacing={2} justifyContent="center">
          {recipeCollection.map((recipe) => (
            <Grid size={11} paddingBottom="10px">
              <RecipeItem key={recipe.id_recipe} recipe={recipe} setRecipes={setRecipes}/>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className="recipe-card-grid">
          {recipeCollection.map((recipe) => (
            <RecipeCard key={recipe.id_recipe} recipe={recipe} setRecipes={setRecipes} />
          ))}
        </div>
      )}
    </>
  );
};

export default RecipeList;
