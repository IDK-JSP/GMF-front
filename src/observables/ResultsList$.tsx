import {BehaviorSubject} from "rxjs";
import { RecipeType } from "../1_types/RecipeType"; // Adjust the import path as necessary

// Crée un BehaviorSubject avec une valeur initiale (list view par défaut)
export const ResultsList$ = new BehaviorSubject<RecipeType[]>([]);

// Méthode pour changer la valeur
export const setResultsList = (results: RecipeType[]): void => {
    ResultsList$.next(results);
};