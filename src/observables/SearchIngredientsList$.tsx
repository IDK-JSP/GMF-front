import {BehaviorSubject} from "rxjs";
import { IngredientType } from "../1_types/IngredientType"; // Adjust the import path as necessary
import { toast } from "react-toastify";

// Crée un BehaviorSubject avec une valeur initiale (list view par défaut)
export const SearchIngredientsList$ = new BehaviorSubject<IngredientType[]>([]);

// Méthode pour changer la valeur
export const setSearchIngredientsList = (results: IngredientType[]): void => {
    toast.info("DEBUG : Nouvelle valeur reçue dans IngredientList$ :" + results);
    SearchIngredientsList$.next(results);
};