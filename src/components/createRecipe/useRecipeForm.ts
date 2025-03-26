import {useState} from "react";

interface Ingredient {
    id: number;
    name: string;
    quantity: string;
    unit: string;
}

interface Step {
    id: number;
    description: string;
}

export default function useRecipeForm() {
    const [title, setTitle] = useState("");
    const [servings, setServings] = useState(1);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [steps, setSteps] = useState<Step[]>([]);

    const addIngredient = (name: string, quantity: string, unit: string) => {
        setIngredients((prev) => [
            ...prev,
            {id: Date.now(), name, quantity, unit},
        ]);
    };

    const removeIngredient = (id: number) => {
        setIngredients((prev) => prev.filter((ingredient) => ingredient.id !== id));
    };

    const addStep = (description: string) => {
        setSteps((prev) => [...prev, {id: Date.now(), description}]);
    };

    const removeStep = (id: number) => {
        setSteps((prev) => prev.filter((step) => step.id !== id));
    };

    return {
        title,
        setTitle,
        servings,
        setServings,
        ingredients,
        addIngredient,
        removeIngredient,
        steps,
        addStep,
        removeStep,
    };
}
