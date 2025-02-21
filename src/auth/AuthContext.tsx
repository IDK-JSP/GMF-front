import {createContext} from "react";

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthContextProps {
    isLoggedIn: boolean;
    setIsLoggedIn: any;
}