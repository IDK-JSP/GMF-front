import {createContext, FC, useContext, useEffect, useState} from "react";
import {RecipeType} from "../1_types/RecipeType";
import get from "../api/get"

interface StockRecipeContextType {
    recipes: RecipeType[];
    fetchRecipes: () => Promise<void>;
}

const StockRecipeContext = createContext<StockRecipeContextType | undefined>(undefined);

export const StockRecipeProvider: FC<{ children: any }> = ({children}) => {
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    const [recipesDetails, setRecipesDetails] = useState<RecipeType[]>([]);

    const fetchRecipes = async () => {
        try {
            const response = await get("/collection/top");
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error("Erreur lors du chargement des recettes:", error);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <StockRecipeContext.Provider value={{recipes, fetchRecipes}}>
            {children}
        </StockRecipeContext.Provider>
    );
};