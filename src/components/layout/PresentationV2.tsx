import React from "react";
import { Children } from "../../1_types/PropsType";
import OpinionRecipe from "../recipeDetails/OpinionRecipe";
import { RecipeType } from "../../1_types/RecipeType";

interface PresentationProps extends Children {
  imgUrl: string;
  recipeRate?: number;
  recipeNbRate?: number;
  carousel?: boolean;
  carouselCollection?: RecipeType[];
  pageTitle?: string;
}

const PresentationRecipe: React.FC<PresentationProps> = ({
  children,
  imgUrl,
  recipeNbRate,
  recipeRate,
}) => {
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
        <div className="presentation-titre">{children}</div>
        <div className="presentation-aside">
          <OpinionRecipe recipeRate={recipeRate} recipeNbRate={recipeNbRate} />
        </div>
      </div>
    </div>
  );
};

export default PresentationRecipe;
