import React, {FC} from 'react';
import {IngredientInputProps} from "../../1_types/CreateRecipeType";

const IngredientInput: FC<IngredientInputProps> = ({index, inputValues, setInputValues, onChange, allIngredients}) => {
    return (
        <>
            <input
                className="input-field ingredient-search"
                list={`ingredients-list-${index}`}
                placeholder="Rechercher un ingrédient"
                value={inputValues[index] || ""}
                onChange={(e) => {
                    const value = e.target.value;
                    setInputValues((prev) => ({...prev, [index]: value}));

                    const selectedIngredient = allIngredients.find(ing => ing.name === value);
                    if (selectedIngredient) {
                        onChange(index, selectedIngredient.id_ingredient);
                    }
                }}
                required
            />
            <datalist id={`ingredients-list-${index}`}>
                {allIngredients
                    .filter(ingredient =>
                        ingredient.name.toLowerCase().includes((inputValues[index] || "").toLowerCase())
                    )
                    .slice(0, 10)
                    .map((ingredient) => (
                        <option key={ingredient.id_ingredient} value={ingredient.name}/>
                    ))}
            </datalist>
        </>
    );
};

export default IngredientInput;
