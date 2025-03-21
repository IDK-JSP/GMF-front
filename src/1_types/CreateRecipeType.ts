export interface Ingredient {
    id_ingredient: number;
    name: string;
}

export interface Measurement {
    id_measurement: number;
    name: string;
    type: string;
}

export interface RecipeIngredient {
    id_ingredient: number;
    quantity: number;
    id_measurement: number;
}

export interface Stage {
    stage: number;
    content: string;
}

export interface IngredientsSectionProps {
    ingredients: RecipeIngredient[];
    addIngredient: () => void;
    updateIngredient: (index: number, field: keyof RecipeIngredient, value: number) => void;
    removeIngredient: (index: number) => void
    allIngredients: Ingredient[];
    allMeasurements: Measurement[];
}

export interface StepsSectionProps {
    steps: string[];
    addStep: () => void;
    updateStep: (index: number, value: string) => void;
    removeStep: (index: number) => void;
}