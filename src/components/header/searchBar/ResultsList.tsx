import React, { useEffect, useState } from 'react';
import { IngredientType } from '../../../1_types/IngredientType';
import "../../../styles/nav.css";
import { RecipeType } from '../../../1_types/RecipeType';
import RecipeItem from '../../commun/RecipeItem';

interface FilterSelectionProps {
    resultIsVisible: boolean;
    recipeResults: RecipeType[];
}

export const FilterSelection: React.FC<FilterSelectionProps> = ({ resultIsVisible, recipeResults}) => {
    return (
        <div className='results-container' style={{ opacity: resultIsVisible ? '1' : '0', top: resultIsVisible ? 0 : -500 }}>
            
            Résultats
            <div>
                {recipeResults.slice(0,3).map((recipe) => (
                    <RecipeItem key={recipe.id} recipe={recipe}/>
                ))}
                </div>
        </div>
    );
};

export default FilterSelection;