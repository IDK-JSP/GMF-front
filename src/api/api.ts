import axios, {AxiosError} from "axios";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

const hostUrl = "http://localhost:8080";

// ✅ Fonction API qui prend le token en paramètre
export const api = async (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: any
): Promise<any | null> => {
    const urlFinal = hostUrl + url;

    const token = localStorage.getItem("token");
    // Ajout du token dans les headers
    const headers = {
        "Content-Type": "application/json",
        ...(token ? {Authorization: `Bearer ${token}`} : {}),
    };

    try {
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
            const status = axiosError.response.status;
            const message = axiosError.response.data || "Une erreur est survenue";

            // ✅ Gestion des erreurs avec `switch`
            switch (status) {
                case 400:
                    toast.error(`⛔ Erreur 400 : ${message}`);
                    break;
                case 401:
                    toast.warn(`🔒 Erreur 401 : Non autorisé`);
                    break;
                case 403:
                    toast.error(`🚫 Erreur 403 : Accès refusé`);
                    break;
                case 404:
                    toast.info(`🔍 Erreur 404 : Ressource non trouvée`);
                    break;
                case 500:
                    toast.error(`💥 Erreur 500 : Erreur serveur`);
                    break;
                default:
                    toast.error(`❌ Erreur ${status} : ${message}`);
            }

            console.error("📌 Code statut :", status);
        } else if (axiosError.request) {
            toast.error("🚫 Aucune réponse du serveur");
            console.error("🚫 Aucune réponse du serveur :", axiosError.request);
        } else {
            toast.error("⚙️ Erreur de configuration");
            console.error("⚙️ Erreur de configuration :", axiosError.message);
        }
    }
};
