import React, { useEffect, useState, useRef } from "react";
import get from "../../api/get";
import { IngredientType } from "../../1_types/IngredientType";
import { RecipeType } from "../../1_types/RecipeType";
import SearchBar from "./SearchBar";
import FilterSelection from "./FilterSelection";
import "../../styles/nav.css";
import ResultsList from "./ResultsList";
import { ResultsList$ } from "../../observables/ResultsList$";
import { IngredientList$ } from "../../observables/IngredientList$";
import post from "../../api/post";

// TODO : Utiliser l'observable pour mettre à jour la liste des ingrédients


export const InputSearch: React.FC = () => {
  // Gestion de la visibilité des composants
  const [filterIsVisible, setFilterIsVisible] = useState(false);
  const [resultIsVisible, setResultIsVisible] = useState(false);

  const [search, setSearch] = useState("");
  const [checkedIngredients, setCheckedIngredients] = useState<
    IngredientType[]
  >([]);
  const [affined, setAffined] = useState("");
  const [ingredientList, setIngredientList] = useState<IngredientType[]>([]);

  const [recipeCollection, setRecipeCollection] = useState<RecipeType[]>([]);
  const [ingredientResults, setIngredientResults] = useState<IngredientType[]>(
    []
  );

  useEffect(() => {
    // S'abonner à l'observable pour écouter les changements
    const subscription = ResultsList$.subscribe(setRecipeCollection);
    const subscription2 = IngredientList$.subscribe(setIngredientList);
    return () => {
      subscription.unsubscribe();
      subscription2.unsubscribe();
    };
  }, []);

  // Récupération de la liste des ingrédients du site
  useEffect(() => {
    get("/ingredient/all").then(setIngredientList);
  }, []);

  // Récupération de la recherche et des ingrédients :
  useEffect(() => {
    const ingredientsId = checkedIngredients.map((ing) => ing.id_ingredient);

    post(`/search?title=${search}`, ingredientsId).then((recipeResult) => {
      // Mise à jour de l'observable en fonction de la recherche
      if (recipeResult?.recipes) {
        ResultsList$.next(recipeResult.recipes);
      }
      setIngredientResults(recipeResult?.ingredients);
    });
  }, [search, checkedIngredients]);

  const handleSwitchVisibility = () => setFilterIsVisible(!filterIsVisible);


  // Gestion de l'affichage des résultats
  const containerRef = useRef<HTMLDivElement>(null);
  const handleClickInside = () => {
    setResultIsVisible(true);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setResultIsVisible(false);
    }
  };
  const handleForceClose = () => {
    setTimeout(() => {
      setResultIsVisible(false);
    }, 100);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setCheckedIngredients((prev) =>
      checked
        ? [...prev, ingredientList.find((ing) => ing.name === value)!]
        : prev.filter((ing) => ing.name !== value)
    );
    // Mise à jour de l'observable en fonction des ingrédients cochés
    IngredientList$.next(checkedIngredients); // Mise à jour de l'observable avec la liste mise à jour
  };

  //handle pour vider la barre de recherche :
  const handleClearSearch = () => {
    setSearch("");
    console.log("DEBUG : clear search");
  };

  return (
    <div className="search-bar" ref={containerRef}>
      <SearchBar
        search={search}
        setSearch={setSearch}
        toggleFilter={handleSwitchVisibility}
        checkedCount={checkedIngredients.length}
        handleForceClose={handleForceClose}
        handleClickInside={handleClickInside}
      />
      <FilterSelection
        filterIsVisible={filterIsVisible}
        affined={affined}
        setAffined={setAffined}
        ingredientList={ingredientList}
        handleCheck={handleCheck}
        checkedIngredients={checkedIngredients}
        handleClickInside={handleClickInside}
      />
      <ResultsList
        resultIsVisible={resultIsVisible}
        recipeResults={recipeCollection}
        ingredientResults={ingredientResults}
        checkedIngredients={checkedIngredients}
        handleCheck={handleCheck}
        handleClearSearch={handleClearSearch}
        handleForceClose={handleForceClose}
      />
    </div>
  );
};

export default InputSearch;


