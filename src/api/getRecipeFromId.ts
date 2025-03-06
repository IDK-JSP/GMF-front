import { Api } from "./Api";
import { RecipeType } from "../1_types/RecipeType";

interface GetRecipeProps {
  recipe_id: number;
}

export const getRecipeFromId = async ({
  recipe_id,
}: GetRecipeProps): Promise<RecipeType | null> => {
  if (!recipe_id || recipe_id === undefined) {
    console.error("Erreur : `recipe_id` est invalide !");
    return null;
  }

  try {
    // console.log("Appel API avec recipe_id :", recipe_id);
    const data = await Api(`/recipe/${recipe_id}`, "GET");

    // console.log("Réponse brute API reçue :", data);

    if (!data) {
      console.error("Erreur : Aucune donnée reçue de l'API !");
      return null;
    }

    return data as RecipeType;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return null;
  }
};
