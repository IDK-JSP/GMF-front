import React from "react";
import { Children } from "../../1_types/PropsType";
import OpinionRecipe from "../recipeDetails/OpinionRecipe";

interface PresentationProps extends Children {
  imgUrl?: string;
  recipeRate?: number;
  recipeNbRate?: number;
  carousel?: any;
  pageTitle?: string;
  titleBanner?: boolean;
}

const HeroSection: React.FC<PresentationProps> = ({
  children,
  imgUrl = "research.jpg",
  recipeNbRate,
  recipeRate,
  carousel,
  pageTitle = "GMF",
  titleBanner = true,
}) => {
  return (
    <>
      {pageTitle ? <title>GMF - {pageTitle}</title> : <title>GMF</title>}

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
        {/* Carrousel en arrière-plan */}
        {carousel && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
            }}
          >
            {carousel}
          </div>
        )}

        {/* Barre horizontale de titre */}
        {titleBanner && (
          <div>
            <div className="presentation-titre">{children}</div>

            {recipeRate && recipeNbRate && (
              <div className="presentation-aside">
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
