import { startTransition } from "react";
import { Api } from "./api";
import { RecipeType } from "../1_types/RecipeType";

export const getRecipe = async (): Promise<RecipeType[]> => {
    try {
    //   // Gestion des filtres de recherche
    //   const category = filtersProp.category ?? "all";
    //   const productName = filtersProp.productName ?? "";

      try {
        let response;
        response = await Api("/recipe/all");
        return response as RecipeType[];
        
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        return [];
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      return [];
    }
  };
  
