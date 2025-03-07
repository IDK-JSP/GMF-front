import { api } from "./api";

const postOpinion = async (
  search: string,  // Recherche sur le nom de la recette
  ingredients: any,  // Liste des ingrédients
): Promise<any> => {
  try {
    const response = await api(
      `/search?title=${search}`, // URL de l'API
      "POST",
      ingredients,
    );
    console.log("titre: ", search);
    console.log("ingrédients: ", ingredients);
    console.log("Réponse : ", response);
    return response;
  } catch (error) {
    console.log("titre: ", search);
    console.log("ingrédients: ", ingredients);
    console.log("Réponse : ", error);
    throw error;
  }
};

export default postOpinion;
