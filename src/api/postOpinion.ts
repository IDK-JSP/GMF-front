import { apiAuth } from "./apiAuth";

const postOpinion = async (
  recipeId: number,  // ID de la recette
  rating: number,    // Note donnée
  comment: string | null, // Commentaire facultatif
  token: string | null // Token d'authentification
): Promise<any> => {
  try {
    const response = await apiAuth(
      `/opinion/new`, // URL de l'API
      "POST",
      {
        id_recipe: recipeId, // Correspond à la clé étrangère vers `recipe`
        rate: rating,  // Note (1 à 5)
        comment: comment || null,  // Envoie `null` si vide
      }
    );

    console.log("✅ Opinion envoyée avec succès :", response);
    return response;
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'opinion :", error);
    throw error;
  }
};

export default postOpinion;
