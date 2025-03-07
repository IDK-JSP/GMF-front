import { api } from "./api";
import { RecipeDetailsType } from "../1_types/RecipeDetailsType";

interface GetRecipeProps {
  recipe_id: number;
}

export const getRecipeDetails = async ({
  recipe_id,
}: GetRecipeProps): Promise<RecipeDetailsType | null> => {
  if (!recipe_id || recipe_id === undefined) {
    console.error("Erreur : `recipe_id` est invalide !");
    return null;
  }

  try {
    // console.log("Appel API avec recipe_id :", recipe_id);
    const data = await api(`/recipe/details/${recipe_id}`, "GET");

    // console.log("Réponse brute API reçue :", data);

    if (!data) {
      console.error("Erreur : Aucune donnée reçue de l'API !");
      return null;
    }

    return data as RecipeDetailsType;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return null;
  }
};
