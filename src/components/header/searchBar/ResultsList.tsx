import React, { useEffect, useState } from 'react';
import { IngredientType } from '../../../1_types/IngredientType';
import "../../../styles/nav.css";
import { RecipeType } from '../../../1_types/RecipeType';
import RecipeItem from '../../commun/RecipeItem';
import FilterTags from './FilterTags';
import {useNavigate } from 'react-router';


interface FilterSelectionProps {
    resultIsVisible: boolean;
    recipeResults: RecipeType[];
    checkedIngredients: IngredientType[];
    handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
    toggleResultsVisibility: (value:boolean) => void;
}


export const FilterSelection: React.FC<FilterSelectionProps> = ({ resultIsVisible, recipeResults, checkedIngredients, handleCheck,toggleResultsVisibility}) => {
    const navigate = useNavigate();
    return (
        <div className='results-container'
        // onMouseOut={() => setTimeout(() => toggleResultsVisibility() , 1000)}
        onMouseLeave={() => setTimeout(() => toggleResultsVisibility(false) , 1000)}
        style={{
            display: resultIsVisible ? 'block' : 'none',
            opacity: resultIsVisible ? '1' : '0',
            top: resultIsVisible ? 0 : -500 }}>
                <FilterTags checkedIngredients={checkedIngredients} handleCheck={handleCheck} />
            <div>
                {recipeResults.slice(0,3).map((recipe) => (
                    <RecipeItem key={recipe.id} recipe={recipe}/>
                ))}
                </div>
            <span>
            
                {recipeResults.length == 0 &&  "aucun résultats"}
                {recipeResults.length == 1 &&  "1 recette trouvée"}
                {recipeResults.length > 1 &&  recipeResults.length + " recettes trouvées"}
                <button id='results-button' onClick={() => navigate('/Research')}>
                {recipeResults.length == 0 &&  "Aller à la page de recherche"}
                {recipeResults.length > 0 &&  "tout afficher"}
                </button>
            </span>
        </div>
    );
};

export default FilterSelection;