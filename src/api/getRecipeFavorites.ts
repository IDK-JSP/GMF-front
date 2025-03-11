import { api } from "./api";
import { FavoritesType } from "../1_types/FavoritesType";

interface GetRecipeFavoritesProps {
  email: string;
}

export const getRecipeFavorites = async ({
  email,
}: GetRecipeFavoritesProps): Promise<FavoritesType | null> => {
  if (!email || email === undefined) {
    console.error("Erreur : `user_mail` est invalide !");
    return null;
  }

  try {
    const data = await api(`favorite/search?email=${email}`, "GET");

    if (!data) {
      console.error("Erreur : Aucune donnée reçue de l'API !");
      return null;
    }

    return data as FavoritesType;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return null;
  }
};
