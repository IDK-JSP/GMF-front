import {createContext} from "react";

interface FilterContextProps {
    isMatching: boolean;
    setIsMatching: any;
}

export const DynamicFilterContext = createContext<FilterContextProps | undefined>(undefined);

