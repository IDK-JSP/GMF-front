import React, {createContext, FC, useEffect, useState} from "react";
import {isTokenExpired} from "../components/auth/isTokenExpired";

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

    // Vérifier si le token est expiré
    useEffect(() => {
        if (token && isTokenExpired(token)) {
            console.warn("⏳ Token expiré, suppression et déconnexion...");
            logout();
        }
    }, [token]);

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        //localStorage.setItem("role", userRole);
        setToken(newToken);
        //setRole(userRole);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        //localStorage.removeItem("role");
        setToken(null);
        //setRole("");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, role, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
