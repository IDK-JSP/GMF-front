import React, { useEffect, useState } from 'react';
import { IngredientType } from '../../1_types/IngredientType';
import "../../styles/nav.css";

interface FilterSelectionProps {

    filterIsVisible: boolean;

    affined: string;

    setAffined: (value: string) => void;

    ingredientList: IngredientType[];

    handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;

    checkedIngredients: IngredientType[];

    handleClickInside?: () => void;

}

export const FilterSelection: React.FC<FilterSelectionProps> = ({ filterIsVisible, affined, setAffined, ingredientList, handleCheck, checkedIngredients,handleClickInside }) => {
    return (
        <div className='filter-container' style={{ opacity: filterIsVisible ? '1' : '0', top: filterIsVisible ? 0 : -500 }}
        onClick={handleClickInside}>
            <input id='filter-input' onChange={(e) => setAffined(e.target.value)} type='text' placeholder='Filtrer les ingrédients' />
            <div className='filter-list'>
                {ingredientList
                    .filter((ing) => ing.name.toLowerCase().includes(affined.toLowerCase()))
                    .map((ing) => (
                        <div key={ing.name}>
                            <input type='checkbox' id={ing.name} onChange={handleCheck} value={ing.name} checked={checkedIngredients.some((checkedIng) => checkedIng.name === ing.name)} />
                            <label htmlFor={ing.name}>{ing.name}</label>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default FilterSelection;