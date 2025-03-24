import React, {createContext, FC, useEffect, useState} from "react";
import {isTokenExpired} from "../components/auth/isTokenExpired";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";

interface AuthContextProps {
    isLoggedIn: boolean;
    role: string;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    role: "",
    token: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider: FC<{ children: any }> = ({children}) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [role, setRole] = useState<string>(localStorage.getItem("role") || "");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!token && !isTokenExpired(token));
    const navigate = useNavigate();

    // Vérifier si le token est expiré
    useEffect(() => {
        const checkTokenValidity = () => {
            if (token && isTokenExpired(token)) {
                toast.warn("Session expirée, vous avez été déconnecté")
                logout();
            }
        };

        if (token) {
            // Vérifier au début
            checkTokenValidity();
            // Vérifier toutes les 600 secondes
            const interval = setInterval(checkTokenValidity, 600000);
            return () => clearInterval(interval); // Nettoyage du timer
        }
    }, [token]);


    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        //localStorage.setItem("role", userRole);
        setToken(newToken);
        //setRole(userRole);
        setIsLoggedIn(true);
        const redirectUrl = localStorage.getItem("redirectAfterLogin") || "/Home";  // Envoie vers l'URL stockée ou vers Home
        localStorage.removeItem("redirectAfterLogin"); // Supprime l'URL stockée après utilisation
        navigate(redirectUrl);
    };

    const logout = () => {
        console.log("Déconnexion en cours...");
        console.log("Avant suppression, URL stockée :", localStorage.getItem("previousURL"));

        const currentPath = window.location.pathname;
        localStorage.setItem("redirectAfterLogin", currentPath); // Stockage de l'URL actuelle
        console.log("Valeur stockée dans localStorage :", localStorage.getItem("redirectAfterLogin"));
        localStorage.removeItem("token");

        localStorage.removeItem("previousURL"); // Vérifie si tu le supprimes quelque part

        //localStorage.removeItem("role");
        setToken(null);
        //setRole("");
        setIsLoggedIn(false);
        navigate("/login")
        console.log("Après suppression, URL stockée :", localStorage.getItem("previousURL"));

    };

    return (
        <AuthContext.Provider value={{isLoggedIn, role, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
