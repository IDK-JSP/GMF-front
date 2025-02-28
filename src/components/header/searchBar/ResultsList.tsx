import React, { useEffect, useState } from 'react';
import { IngredientType } from '../../../1_types/IngredientType';
import "../../../styles/nav.css";
import { RecipeType } from '../../../1_types/RecipeType';
import RecipeItem from '../../commun/RecipeItem';
import FilterTags from './FilterTags';

interface FilterSelectionProps {
    resultIsVisible: boolean;
    recipeResults: RecipeType[];
    checkedIngredients: IngredientType[];
    handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FilterSelection: React.FC<FilterSelectionProps> = ({ resultIsVisible, recipeResults, checkedIngredients, handleCheck}) => {
    return (
        <div className='results-container' style={{
            display: resultIsVisible ? 'block' : 'none',
            opacity: resultIsVisible ? '1' : '0',
            top: resultIsVisible ? 0 : -500 }}>
            <FilterTags checkedIngredients={checkedIngredients} handleCheck={handleCheck} />
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