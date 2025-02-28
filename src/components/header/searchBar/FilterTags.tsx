import React, { useEffect, useState } from 'react';
import "../../../styles/nav.css";
import { IngredientType } from '../../../1_types/IngredientType';

interface FilterTagsProps {
    checkedIngredients: IngredientType[];
    handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FilterTags: React.FC<FilterTagsProps> = ({ checkedIngredients, handleCheck }) => {
    return (
        <div id='search-filters'>
            {/* {checkedIngredients.slice(-3).map((ing) => (   Limiter le nombre de tag*/}
            {checkedIngredients.map((ing) => (
                <span key={ing.id_ingredient} className='search-tag'>
                    <input type='checkbox' id={ing.name} onChange={handleCheck} value={ing.name} checked />
                    <label htmlFor={ing.name}>{ing.name.slice(0, 10)}</label>
                </span>
            ))}
        </div>
    );
};

export default FilterTags;