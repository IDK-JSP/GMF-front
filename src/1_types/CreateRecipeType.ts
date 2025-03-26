import {Dispatch, SetStateAction} from "react";

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

export interface IngredientsSectionProps {
    ingredients: Ingredient[];
    addIngredient: () => void;
    onRemove: (id: number) => void;
}

export interface StepsSectionProps {
    steps: string[];
    addStep: () => void;
    updateStep: (index: number, value: string) => void;
    removeStep: (index: number) => void;
}

export interface IngredientItemProps {
    index: number;
    value: string;
    inputValues: string[];
    setInputValues: Dispatch<SetStateAction<string[]>>;
    quantity: number;
    id_measurement: number;
    allIngredients: string[];
    allMeasurements: { id: number; name: string }[];
    onChange: (index: number, field: string, value: string | number) => void;
    removeItem: (index: number) => void;
}


export interface IngredientInputProps {
    index: number;
    value: string;
    inputValues: { [key: number]: string };
    setInputValues: Dispatch<SetStateAction<{ [key: number]: string }>>;
    onChange: (index: number, value: number) => void;
    allIngredients: Ingredient[];
}

export interface QuantityInputProps {
    index: number;
    quantity: number;
    onChange: (value: number) => void;
}

export interface MeasurementSelectProps {
    id_measurement: string;
    allMeasurements: Measurement[];
    onChange: (value: number) => void;
}