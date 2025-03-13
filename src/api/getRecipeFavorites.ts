import { api } from "./api";
import { FavoritesType } from "../1_types/FavoritesType";

interface GetRecipeFavoritesProps {
  email: string;
}

export const getRecipeFavorites = async ({
  email,
}: GetRecipeFavoritesProps): Promise<FavoritesType | null> => {
  if (!email) {
    console.error("Erreur : `email` est invalide !");
    return null;
  }

  try {
    const data = await api(`/favorite/search?email=${encodeURIComponent(email)}`, "GET");

    if (!data || (Array.isArray(data) && data.length === 0) || Object.keys(data).length === 0) {
      console.warn("Aucune recette favorite trouvée pour cet utilisateur.");
      return null;
    }

    return data as FavoritesType;
  } catch (error) {
    console.error("Erreur lors de la récupération des favoris :", error);
    return null;
  }
};
