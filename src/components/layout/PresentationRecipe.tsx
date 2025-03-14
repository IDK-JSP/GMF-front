import React from "react";
import { Children } from "../../1_types/PropsType";
import OpinionRecipe from "../RecipeDetails/OpinionRecipe";

interface PresentationProps extends Children {
  imgUrl: string;
  recipeRate: number;
  recipeNbRate: number;
}

const PresentationRecipe: React.FC<PresentationProps> = ({ children, imgUrl, recipeNbRate, recipeRate }) => {
  return (
    <div
      className="presentation"
      style={{
        backgroundImage: `url("${imgUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "300px",
        width: "100%",
      }}
    >
        <div>
          <div>{children}</div>
          <div
          style={{
            width: "300px",
          }
          }><OpinionRecipe recipeRate={recipeRate} recipeNbRate={recipeNbRate} /></div>
      </div>
    </div>
  );
};

export default PresentationRecipe;
