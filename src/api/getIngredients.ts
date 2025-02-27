import { startTransition } from "react";
import { Api } from "./Api";
import { IngredientType } from '../1_types/IngredientType';

export const getIngredients = async (): Promise<IngredientType[]> => {
    try {
    //   // Gestion des filtres de recherche
    //   const category = filtersProp.category ?? "all";
    //   const productName = filtersProp.productName ?? "";

      try {
        let response;
        response = await Api("/ingredient/all");
        return response as IngredientType[];
        
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        return [];
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      return [];
    }
  };
  
