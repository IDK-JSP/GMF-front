import React from "react";
import { Children } from "../../1_types/PropsType";
import OpinionRecipe from "../recipeDetails/OpinionRecipe";

interface PresentationProps extends Children {
  imgUrl?: string;
  recipeRate?: number;
  recipeNbRate?: number;
  carousel?: any;
  titleBanner?: boolean;
}

const HeroSection: React.FC<PresentationProps> = ({
  children,
  imgUrl = "research.jpg",
  recipeNbRate,
  recipeRate,
  carousel,
  titleBanner = true,
}) => {
  return (
    <>
      <div
        className={
          carousel ? "presentation presentation-carousel" : "presentation "
        }
        style={{
            backgroundImage: carousel ? "none" : `url("${imgUrl}")`,
            backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          width: "100%",
        }}
      >
        {/* Carrousel en arrière-plan */}
        {carousel && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 51,
            }}
          >
            {carousel}
          </div>
        )}

        {/* Barre horizontale de titre */}
        {titleBanner && (
          <div className="presentation-banner">
            <div className="presentation-titre">{children}</div>
            {recipeRate !== undefined && recipeNbRate !== undefined && (
              <div className="presentation-rate">
                <OpinionRecipe
                  recipeRate={recipeRate}
                  recipeNbRate={recipeNbRate}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HeroSection;
