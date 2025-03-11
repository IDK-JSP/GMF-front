import { api } from "./api";

const postFavorite = async (
  favoriteable_type: string, // recipe ou ingredient
  favoriteable_id: number, 
): Promise<any> => {
  const data = {
    favoriteable_type,
    favoriteable_id,
  };
  try {
    const response = await api(
      `/favorite/new`,
      "POST",
      data,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export default postFavorite;
