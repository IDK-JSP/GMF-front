import { api } from "./api";

const postSearch = async (
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

  } catch (error: any) {
    console.error("Erreur API:", error);

    if (error.response) {
      // L'API a répondu avec un statut d'erreur
      console.error("Statut de l'erreur:", error.response.status);
      console.error("Détails:", error.response.data);

      if (error.response.status === 404) {
        return { recipes: [], ingredients: [], error: "Aucun résultat trouvé" };
      }

      return { error: `Erreur serveur (${error.response.status}) : ${error.response.data}` };
    } else if (error.request) {
      // La requête a été envoyée mais aucune réponse reçue
      return { error: "Aucune réponse du serveur. Vérifiez votre connexion." };
    } else {
      // Erreur autre (ex: problème de configuration)
      return { error: "Erreur lors de la requête. Réessayez plus tard." };
    }
  }
};

export default postSearch;