import axios, {AxiosError} from "axios";
import {isTokenExpired} from "../components/auth/isTokenExpired";

const hostUrl = "http://localhost:8080";

export const apiAuth = async (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: any
): Promise<any | null> => {
    let token = localStorage.getItem("token");

    // Vérifier si le token est expiré
    if (token && isTokenExpired(token)) {
        console.warn("Token expiré, déconnexion...");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        token = null;
    }

    const headers = {
        "Content-Type": "application/json",
        ...(token ? {Authorization: `Bearer ${token}`} : {}),
    };

    try {
        const response = await axios({
            url: hostUrl + url,
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
        } else if (axiosError.request) {
            console.error("🚫 Aucune réponse du serveur :", axiosError.request);
        } else {
            console.error("⚙️ Erreur de configuration :", axiosError.message);
        }
        throw axiosError;
    }
};
