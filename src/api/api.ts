import axios, { AxiosError } from "axios";

const hostUrl = "http://localhost:8080";

// Fonction API générique
export const api = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any
): Promise<any | null> => {
  const urlFinal = hostUrl + url;

  try {
    const response = await axios({
      url: urlFinal,
      method,
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      console.error("Erreur serveur :", axiosError.response.data);
      console.error("Code statut :", axiosError.response.status);
    } else if (axiosError.request) {
      console.error("Aucune réponse du serveur :", axiosError.request);
    } else {
      console.error("Erreur de configuration :", axiosError.message);
    }

    return null; // On retourne `null` en cas d'erreur
  }
};
