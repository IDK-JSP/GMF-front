import React from "react";
import { Children } from "../../1_types/PropsType";
import OpinionRecipe from "../recipeDetails/OpinionRecipe";

// Composant qui est utilisé dans toutes les pages pour afficher un header dynamique
// une image de fond, un titre et une note de recette peuvent être passé en props
// le composant peut aussi afficher un carousel en arrière-plan
// la bannière de titre peut être désactivée si besoin
// les props sont optionnelles

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
