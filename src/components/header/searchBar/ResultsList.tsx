import React, { useEffect, useState } from 'react';
import {IngredientType} from '../../../1_types/IngredientType';
import "../../../styles/nav.css";
import {RecipeType} from '../../../1_types/RecipeType';
import RecipeItem from '../../commun/RecipeItem';
import FilterTags from './FilterTags';
import {useNavigate} from 'react-router';


interface FilterSelectionProps {
    resultIsVisible: boolean;
    recipeResults: RecipeType[];
    ingredientResults: IngredientType[];
    checkedIngredients: IngredientType[];
    handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleClearSearch: () => void;
    handleForceClose: () => void;
}


export const FilterSelection: React.FC<FilterSelectionProps> = ({
                                                                    resultIsVisible,
                                                                    recipeResults,
                                                                    ingredientResults,
                                                                    checkedIngredients,
                                                                    handleCheck,
                                                                    handleClearSearch,
                                                                    handleForceClose,
                                                                }) => {
    const navigate = useNavigate();

    const handleAddIngredient = (event: React.ChangeEvent<HTMLInputElement>) => {
        const ingredientName = event.target.value;
        handleCheck(event);
        handleClearSearch();
    };
    const handleValidate = () => {
        navigate('/Research');
        handleForceClose();
    };
    
    return (
        <div className='results-container'
             style={{
                 display: resultIsVisible ? 'block' : 'none',
                 opacity: resultIsVisible ? '1' : '0',
                 top: resultIsVisible ? 0 : -500
             }}>
            <FilterTags checkedIngredients={checkedIngredients} handleCheck={handleCheck}/>

                {ingredientResults?.length > 0 && ingredientResults
                .filter((ingredient) => !checkedIngredients.find((ing) => ing.id_ingredient === ingredient.id_ingredient))
                .slice(0, 3)
                .map((ingredient) => (
                    
                    <div key={ingredient.name}>
                            <input type='checkbox' id={ingredient.name} onChange={handleAddIngredient} value={ingredient.name} checked={checkedIngredients.some((checkedIng) => checkedIng.name === ingredient.name)} />
                            <label htmlFor={ingredient.name}>{ingredient.name}</label>
                        </div>
                ))}

            <div>
            {recipeResults.slice(0, 3).map((recipe) => {
    const matchPercent = ((recipe.matching_ingredients ?? 0) / checkedIngredients.length).toFixed(2);

    return (
        <React.Fragment key={recipe.id_recipe}>
            {/* <span>match ({recipe.matching_ingredients}) - {Number(matchPercent)}</span> */}
            <div id= {matchPercent === '1.00' ? 'matching' : 'not-matching'}>
            <RecipeItem recipe={recipe} />
            </div>
        </React.Fragment>
    );
})}
            </div>
            <span>
            
                {recipeResults.length == 0 && "aucun résultats"}
                {recipeResults.length == 1 && "1 recette trouvée"}
                {recipeResults.length > 1 && recipeResults.length + " recettes trouvées"}
                <button id='results-button' onClick={() => handleValidate()}>
                {recipeResults.length == 0 && "Aller à la page de recherche"}
                    {recipeResults.length > 0 && "tout afficher"}
                </button>
            </span>
        </div>
    );
};

export default FilterSelection;