import React, {FC, useEffect, useState} from 'react';
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

    const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});

    // Vérifier qu'il y a au moins un ingrédient
    if (ingredients.length === 0) {
        addIngredient();
    }

    useEffect(() => {
        console.log(ingredients)
    }, [ingredients]);

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
                        value={inputValues[index] || ""}
                        onChange={(e) => {
                            const value = e.target.value;
                            console.log("Index modifié :", index); // 🔍 Affiche l'index de l'input modifié

                            setInputValues((prev) => ({...prev, [index]: value}));

                            const selectedIngredient = allIngredients.find(ing => ing.name === value);
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
                            .slice(0, 10)
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
                        <button type="button" className="btn-delete" onClick={() => {
                            console.log("Index supprimé :", index); // 🔍 Affiche l'index de l'élément supprimé
                            removeIngredient(index)}}>
                            <DeleteIcon/>
                        </button>
                    )}
                </div>
            ))}

            <button type="button" className="btn-add" onClick={() => {
                addIngredient();
                console.log("Nouvel index après ajout :", ingredients.length); // 🔍 Affiche le nouvel index
            }}>Ajouter un ingrédient</button>
        </div>
    );
};

export default IngredientsSection;
