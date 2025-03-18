import {BehaviorSubject} from "rxjs";
import { IngredientType } from "../1_types/IngredientType"; // Adjust the import path as necessary

// Crée un BehaviorSubject avec une valeur initiale (list view par défaut)
export const IngredientList$ = new BehaviorSubject<IngredientType[]>([]);

// Méthode pour changer la valeur
export const setIngredientList = (results: IngredientType[]): void => {
    IngredientList$.next(results);
};