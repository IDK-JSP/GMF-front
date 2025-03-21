import {useState, useEffect, FormEvent} from "react";
import post from "../../api/post";
import get from "../../api/get";
import {Ingredient, Measurement, RecipeIngredient} from "../../1_types/CreateRecipeType";

export const useRecipeForm = () => {
    const [title, setTitle] = useState("");
    const [person, setPerson] = useState(1);
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
    const [steps, setSteps] = useState<string[]>([""]);
    const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
    const [allMeasurements, setAllMeasurements] = useState<Measurement[]>([]);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await get("/ingredient/all");
                if (response) setAllIngredients(response);
            } catch (error) {
                console.error("Erreur lors de la récupération des ingrédients", error);
            }
        };

        const fetchMeasurements = async () => {
            try {
                const response = await get("/measurement/all");
                if (response) setAllMeasurements(response);
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
    const removeIngredient = (index: number) => {
        setIngredients((prev) => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev);
    };


    const addStep = () => setSteps([...steps, ""]);
    const updateStep = (index: number, value: string) => {
        const newSteps = [...steps];
        newSteps[index] = value;
        setSteps(newSteps);
    };
    const removeStep = (index: number) => {
        setSteps(steps.filter((_, i) => i !== index));
    };


    const submitRecipe = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await post(
                "/recipe/new",
                {
                    recipe: {title, person},
                    stages: steps.map((step, index) => ({stage: index + 1, content: step})),
                    recipeIngredients: ingredients,
                },
                "Recette créée avec succès !"
            );
        } catch (error) {
            console.error("Erreur lors de la création de la recette", error);
        }
    };

    return {
        title, setTitle,
        person, setPerson,
        description, setDescription,
        ingredients, addIngredient, updateIngredient, removeIngredient,
        steps, addStep, updateStep, removeStep,
        allIngredients, allMeasurements,
        submitRecipe
    };
};
