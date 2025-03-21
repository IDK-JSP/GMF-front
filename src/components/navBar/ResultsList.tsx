import React from "react";
import {IngredientType} from "../../1_types/IngredientType";
import "../../styles/nav.css";
import {RecipeType} from "../../1_types/RecipeType";
import RecipeItem from "../common/RecipeItem";
import FilterTags from "./FilterTags";
import {useNavigate} from "react-router";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface FilterSelectionProps {
    resultIsVisible: boolean;
    recipeResults: RecipeType[];
    ingredientResults: IngredientType[];
    searchIngredientsList: IngredientType[];
    handleCheck: (arg0: IngredientType) => void;
    handleClearSearch: () => void;
    handleForceClose: () => void;
}

export const ResultsList: React.FC<FilterSelectionProps> = ({
  resultIsVisible,
  recipeResults,
  ingredientResults,
  searchIngredientsList,
  handleCheck,
  handleClearSearch,
  handleForceClose,
}) => {
  const navigate = useNavigate();


    const handleAddIngredient = (ing: IngredientType) => {
        handleCheck(ing);
        handleClearSearch();
    };
    const handleValidate = () => {
        navigate("/Research");
        handleForceClose();
    };

    return (
        <>
            <div
                className="results-container"
                style={{
                    display: resultIsVisible ? "block" : "none",
                    opacity: resultIsVisible ? "1" : "0",
                    top: resultIsVisible ? 0 : -500,
                }}
            >
                <FilterTags
                    checkedIngredients={searchIngredientsList}
                    handleCheck={handleCheck}
                />

                {ingredientResults?.length > 0 &&
                    ingredientResults
                        .filter(
                            (ingredient) =>
                                !searchIngredientsList.some(
                                    (ing) => ing.id_ingredient === ingredient.id_ingredient
                                )
                        )
                        .slice(0, 3)
                        .map((ingredient) => (
                            <div key={ingredient.name}>
                                <input
                                    type="checkbox"
                                    id={`ingredient-${ingredient.id_ingredient}`}
                                    onChange={() => handleAddIngredient(ingredient)}
                                    checked={searchIngredientsList.some(
                                        (checkedIng) =>
                                            checkedIng.id_ingredient === ingredient.id_ingredient
                                    )}
                                />
                                <label htmlFor={ingredient.name}>{ingredient.name}</label>
                            </div>
                        ))}

                <div>
                    {recipeResults.slice(0, 3).map((recipe) => {
                        const matchPercent =
                            searchIngredientsList.length > 0
                                ? (
                                    (recipe.matching_ingredients ?? 0) /
                                    searchIngredientsList.length
                                ).toFixed(2)
                                : "1";

                        return (
                            <React.Fragment key={recipe.id_recipe}>
                                <div
                                    style={{
                                        opacity: matchPercent,
                                        padding: "5px",
                                    }}
                                    onClick={handleForceClose}
                                >
                                    <RecipeItem recipe={recipe}/>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
                <span className="flex-row">
          {recipeResults.length == 0 && "aucun résultat"}
                    {recipeResults.length == 1 && "1 recette trouvée"}
                    {recipeResults.length > 1 &&
                        recipeResults.length + " recettes trouvées"}
                    <button id="results-button" onClick={() => handleValidate()}>
            {recipeResults.length == 0 && "Aller à la page de recherche"}
                        {recipeResults.length > 0 && "Tout afficher"} <ArrowForwardIcon/>
          </button>
        </span>
            </div>
        </>
    );
};

export default ResultsList;
