import {createContext} from "react";

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthContextProps {
    isLoggedIn: boolean;
    setIsLoggedIn: any;
    role: string;
    setRole: any;
    token: string;
    setToken: any;
    setAuthContext?: (authContext: Partial<AuthContextProps>) => void;
}