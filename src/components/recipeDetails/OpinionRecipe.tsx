import React from "react";
import StarRating from "../common/StarRating";
import { Rating } from "@mui/material";
interface OpinionRecipeProps {
  recipeRate: number;
  recipeNbRate: number;
}
const OpinionRecipe: React.FC<OpinionRecipeProps> = ({
  recipeRate = 0,
  recipeNbRate,
}) => {
  return (
    <div>
      <Rating
              sx={{
                "& .MuiRating-iconFilled": { color: "orange" },
                "& .MuiRating-iconEmpty": { color: "orange" },
              }}
              name="recipe-rating"
              defaultValue={recipeRate}
              precision={0.01}
              readOnly
              size="large"
            />
      {recipeRate}/5 sur {recipeNbRate} avis
    </div>
  );
};

export default OpinionRecipe;
