import {createContext} from "react";

export const DisplayContext = createContext<DisplayContextProps | undefined>(undefined);

interface DisplayContextProps {
    isItem: boolean;
    setIsItem: any;
}