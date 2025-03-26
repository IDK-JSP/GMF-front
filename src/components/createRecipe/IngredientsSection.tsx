import React, {FC} from 'react';
import {IngredientsSectionProps} from "../../1_types/CreateRecipeType";
import IngredientItem from "./IngredientItem";


const IngredientsSection: FC<IngredientsSectionProps> = ({
                                                             ingredients,
                                                             addIngredient,
                                                             onRemove
                                                         }) => {

    // Vérifier qu'il y a au moins un ingrédient
    if (ingredients.length === 0) {
        addIngredient();
    }

    return (
        <div className="ingredients-section">
            <h3 className="section-title">Ingrédients nécessaires</h3>

            <div className="ingredients-header">
                <span>Ingrédient</span>
                <span>Quantité</span>
                <span>Unité</span>
            </div>

            {ingredients.map((ingredient) => (
                <IngredientItem
                    key={ingredient.id_ingredient}
                    ingredient={ingredient}
                    onRemove={onRemove}
                />
            ))}

            <button type="button" className="btn-add" onClick={addIngredient}>Ajouter un ingrédient</button>
        </div>
    );
};

export default IngredientsSection;
