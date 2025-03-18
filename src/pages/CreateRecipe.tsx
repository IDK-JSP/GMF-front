import React, {FC, useContext, useEffect, useState} from 'react';
import Presentation from "../components/layout/Presentation";
import AsideLeft from "../components/layout/AsideLeft";
import ContentWithLeftAside from "../components/layout/ContentWithLeftAside";
import AuthContext from "../context/AuthContext";
import "../styles/createRecipe.css";
import post from "../api/post";
import get from "../api/get";
import DeleteIcon from '@mui/icons-material/Delete';
import {Typography} from "@mui/material";

interface Ingredient {
    id_ingredient: number;
    name: string;
}

interface Measurement {
    id_measurement: number;
    name: string;
    type: string;
}

interface RecipeIngredient {
    id_ingredient: number;
    quantity: number;
    id_measurement: number;
}

interface Stage {
    stage: number;
    content: string;
}

const CreateRecipe: FC<{}> = ({}) => {
    const authContext = useContext(AuthContext);
    const [title, setTitle] = useState<string>("");
    const [person, setPerson] = useState<number>(1);
    const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
    const [steps, setSteps] = useState<string[]>([""]);
    const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
    const [allMeasurements, setAllMeasurements] = useState<Measurement[]>([]);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await get("/ingredient/all");
                setAllIngredients(response);
            } catch (error) {
                console.error("Erreur lors de la récupération des ingrédients", error);
            }
        };
        const fetchMeasurements = async () => {
            try {
                const response = await get("/measurement/all");
                setAllMeasurements(response);
            } catch (error) {
                console.error("Erreur lors de la récupération des mesures", error);
            }
        };
        fetchIngredients();
        fetchMeasurements();
    }, []);

    const addIngredient = () => setIngredients([...ingredients, {id_ingredient: 0, quantity: 0, id_measurement: 0}]);
    const updateIngredient = (index: number, field: keyof RecipeIngredient, value: number) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = {...newIngredients[index], [field]: value};
        setIngredients(newIngredients);
    };

    const addStep = () => setSteps([...steps, ""]);
    const updateStep = (index: number, value: string) => {
        const newSteps = [...steps];
        newSteps[index] = value;
        setSteps(newSteps);
    };
    const removeStep = (index: number) => {
        const newSteps = steps.filter((_, i) => i !== index);
        setSteps(newSteps);
    };

    const submitRecipe = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await post(
                "/recipe/new",
                {
                    recipe: {title, person},
                    stages: steps.map((step, index): Stage => ({stage: index + 1, content: step})),
                    recipeIngredients: ingredients,
                },
                "Recette créée avec succès !"
            );
        } catch (error) {
            console.error("Erreur lors de la création de la recette", error);
        }
    };

    return (
        <>
            <Presentation>
                Créer une recette
            </Presentation>
            <main>
                <AsideLeft>
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
                </AsideLeft>
                <ContentWithLeftAside>
                    <section>
                        <article>
                            <form onSubmit={submitRecipe} className="recipe-form">
                                <input className="input-field recipe-title" type="text" placeholder="Titre"
                                       value={title}
                                       onChange={(e) => setTitle(e.target.value)} required/>
                                <input className="input-field recipe-person" type="number"
                                       placeholder="Nombre de personnes" value={person}
                                       onChange={(e) => setPerson(Number(e.target.value))} required/>
                                <h3 className="section-title">Étapes</h3>
                                {steps.map((step, index) => (
                                    <div key={index} className="step-container">
                                        <Typography sx={{fontSize : "48"}}>{index+1}</Typography>
                                        <textarea className="input-field step-input" value={step}
                                                  onChange={(e) => updateStep(index, e.target.value)}
                                                  placeholder={`Étape ${index + 1}`} required/>
                                        <button type="button" className="btn-delete" onClick={() => removeStep(index)}>
                                            <DeleteIcon/>
                                        </button>
                                    </div>
                                ))}
                                <button type="button" className="btn-add" onClick={addStep}>Ajouter une étape</button>
                                <button type="submit" className="btn-submit">Créer la Recette</button>
                            </form>
                        </article>
                    </section>
                </ContentWithLeftAside>
            </main>
        </>
    );
};

export default CreateRecipe;
