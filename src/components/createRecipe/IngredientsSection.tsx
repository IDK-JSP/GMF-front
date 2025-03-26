import React, {FC, useState} from 'react';
import {IngredientsSectionProps} from "../../1_types/CreateRecipeType";
import DeleteIcon from "@mui/icons-material/Delete";

const IngredientsSection: FC<IngredientsSectionProps> = ({
                                                             ingredients,
                                                             addIngredient,
                                                             updateIngredient,
                                                             removeIngredient,
                                                             allIngredients,
                                                             allMeasurements
                                                         }) => {

    const [inputValues, setInputValues] = useState("");

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
                        {allIngredients
                            .filter(ingredient =>
                                ingredient.name.toLowerCase().includes((inputValues[index] || "").toLowerCase())
                            )
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((ingredient) => (
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

                    {ingredients.length > 1 && (
                        <button type="button" className="btn-delete" onClick={() => removeIngredient(index)}>
                            <DeleteIcon/>
                        </button>
                    )}
                </div>
            ))}

            <button type="button" className="btn-add" onClick={addIngredient}>Ajouter un ingrédient</button>
        </div>
    );
};

export default IngredientsSection;
