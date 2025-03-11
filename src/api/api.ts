import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

const hostUrl = "http://localhost:8080";

// ✅ Fonction API qui prend le token en paramètre
export const api = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any
): Promise<any | null> => {
  const urlFinal = hostUrl + url;

  const token = localStorage.getItem("token");
  console.log("token" + token);


  // Ajout du token dans les headers
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    console.log("token" + token);
    const response = await axios({
      url: urlFinal,
      method,
      data: body,
      headers,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      console.error("❌ Erreur serveur :", axiosError.response.data);
      console.error("📌 Code statut :", axiosError.response.status);
    } else if (axiosError.request) {
      console.error("🚫 Aucune réponse du serveur :", axiosError.request);
    } else {
      console.error("⚙️ Erreur de configuration :", axiosError.message);
    }

    throw axiosError; // ✅ On lance l'erreur au lieu de retourner `null`
  }
};
