import React from 'react';
import "../../styles/nav.css";
import { IngredientType } from '../../1_types/IngredientType';

interface FilterTagsProps {
    checkedIngredients: IngredientType[];
    handleCheck: (ingredient: IngredientType) => void;
}

export const FilterTags: React.FC<FilterTagsProps> = ({ checkedIngredients, handleCheck }) => {
    return (
        <div id="search-filters">
            {checkedIngredients.map((ing) => (
                <span key={ing.id_ingredient} className="search-tag">
                    <input 
                        type="checkbox" 
                        id={`ingredient-${ing.id_ingredient}`} 
                        onChange={() => handleCheck(ing)}
                        defaultChecked
                    />
                    <label htmlFor={`ingredient-${ing.id_ingredient}`}>
                    <img src={`/ingredient/${ing.name}.png`} alt={ing.name} width={15} height={15}/>
                        {ing.name}
                    </label>
                </span>
            ))}
        </div>
    );
};

export default FilterTags;
