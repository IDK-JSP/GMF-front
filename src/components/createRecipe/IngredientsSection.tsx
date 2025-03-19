import React, {FC} from 'react';
import {IngredientsSectionProps} from "../../1_types/CreateRecipeType";

const IngredientsSection: FC<IngredientsSectionProps> = ({
                                                             ingredients,
                                                             addIngredient,
                                                             updateIngredient,
                                                             allIngredients,
                                                             allMeasurements
                                                         }) => {

    return (
        <div>
            <h3 className="section-title">Ingrédients</h3>
            {ingredients.map((ing, index) => (
                <div key={index} className="ingredient-container">
                    <input
                        className="input-field ingredient-search"
                        list={`ingredients-list-${index}`}
                        placeholder="Rechercher un ingrédient"
                        onChange={(e) => {
                            const selectedIngredient = allIngredients.find(ing => ing.name === e.target.value);
                            if (selectedIngredient) {
                                updateIngredient(index, "id_ingredient", selectedIngredient.id_ingredient);
                            }
                        }}
                        required
                    />
                    <datalist id={`ingredients-list-${index}`}>
                        {allIngredients.map((ingredient) => (
                            <option key={ingredient.id_ingredient} value={ingredient.name}/>
                        ))}
                    </datalist>
                    <input
                        className="input-field ingredient-quantity"
                        type="number"
                        placeholder="Quantité"
                        value={ing.quantity}
                        onChange={(e) => updateIngredient(index, "quantity", Number(e.target.value))}
                        required
                    />
                    <select
                        className="input-field ingredient-measurement"
                        value={ing.id_measurement}
                        onChange={(e) => updateIngredient(index, "id_measurement", Number(e.target.value))}
                        required
                    >
                        <option value="">Choisir une mesure</option>
                        {allMeasurements.map(measurement => (
                            <option key={measurement.id_measurement} value={measurement.id_measurement}>
                                {measurement.name}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
            <button type="button" className="btn-add" onClick={addIngredient}>Ajouter un ingrédient</button>
        </div>
    );
};

export default IngredientsSection;
