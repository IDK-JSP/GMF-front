import React from 'react';
import StarRating from '../commun/StarRating';
interface OpinionRecipeProps {
    recipeRate: number;
    recipeNbRate: number;
}
const OpinionRecipe: React.FC<OpinionRecipeProps> = ({recipeRate, recipeNbRate}) => {

    return (
        <div className="opinion-recipe">
          <StarRating rate={recipeRate} size="large" />
          {recipeRate}/5 sur {recipeNbRate} avis
        </div>
    );
};

export default OpinionRecipe;