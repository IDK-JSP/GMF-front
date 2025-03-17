import React, { useEffect, useState } from 'react';
import { IngredientType } from '../../1_types/IngredientType';
import "../../styles/nav.css";

interface FilterSelectionProps {
    filterIsVisible: boolean;
    ingredientList: IngredientType[];
    handleCheck: (ingredient: IngredientType) => void;
    searchIngredientsList: IngredientType[];
    setSearchIngredientsList: (ingredients: IngredientType[]) => void;
    handleClickInside?: () => void;
}


export const FilterSelectionV2: React.FC<FilterSelectionProps> = ({ filterIsVisible, ingredientList, handleCheck, searchIngredientsList, setSearchIngredientsList, handleClickInside }) => {

    const [filterOnIngredientValue, setFilterOnIngredientValue] = useState<string>("");

    const handlerResetIngredients = () => {
        setSearchIngredientsList([]);
    };

    return (
        <div className='filter-container' style={{ opacity: filterIsVisible ? '1' : '0', top: filterIsVisible ? 0 : -500 }}
        onClick={handleClickInside}>
            <input id='filter-input' onChange={(e) => setFilterOnIngredientValue(e.target.value)} type='text' placeholder='Filtrer les ingrédients' />
            <button id='' onClick={handlerResetIngredients} title='Reset filters'>
            Reset
            </button>
            <div className='filter-list'>
            {ingredientList
            .filter((ing) => ing.name.toLowerCase().includes(filterOnIngredientValue))
            .map((ing) => (
                <div key={ing.name}>
        <input 
            type="checkbox" 
            id={`ingredient-${ing.id_ingredient}`} 
            onChange={() => handleCheck(ing)}
            checked={searchIngredientsList.some((checkedIng) => checkedIng.id_ingredient === ing.id_ingredient)} 
            />
      <label htmlFor={ing.name}>{ing.name}</label>
    </div>
  ))}
            </div>
        </div>
    );
};