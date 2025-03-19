import React, { useEffect, useState, useRef } from "react";
import get from "../../api/get";
import { IngredientType } from "../../1_types/IngredientType";
import { RecipeType } from "../../1_types/RecipeType";
import SearchBar from "./SearchBar";
import "../../styles/nav.css";
import { ResultsList$ } from "../../observables/ResultsList$";
import { SearchIngredientsList$ } from "../../observables/SearchIngredientsList$"; 
import post from "../../api/post";
import { FilterSelection } from "./FilterSelection";
import ResultsList from "./ResultsList";


// TODO : Utiliser l'observable pour mettre à jour la liste des ingrédients
// TODO : Alléger le composant en séparant les méthodes et fonctions. 

export const InputSearch: React.FC = () => {
  // Gestion de la visibilité des composants
    // Composant des filtres
  const [filterIsVisible, setFilterIsVisible] = useState(false);
    // Composant des résultats
  const [resultIsVisible, setResultIsVisible] = useState(false);


  // Gestion de la recherche
    // Recherche sur le nom des recettes
  const [searchOnName, setSearchOnName] = useState("");
    // Recherche sur les ingrédients
  const [searchIngredientsList, setSearchIngredientsList] = useState<
    IngredientType[]
  >([]);

  // Gestion de la liste de base des ingrédients
  const [ingredientList, setIngredientList] = useState<IngredientType[]>([]);

  // Gestion des résultats
  const [recipeCollection, setRecipeCollection] = useState<RecipeType[]>([]);
  const [ingredientResults, setIngredientResults] = useState<IngredientType[]>(
    []
  );

    // S'abonner aux observables pour récupérer ailleurs dans le site les valeurs
    useEffect(() => {
      // Abonnement aux résultats de la recherche
      const subscription = ResultsList$.subscribe(setRecipeCollection);
      return () => subscription.unsubscribe();
    }, []);
    useEffect(() => {
      // Abonnement aux ingrédients du filtre de la recherche
      const subscription = SearchIngredientsList$.subscribe(setSearchIngredientsList);
      return () => subscription.unsubscribe();
    }, []);

  // Récupération de la liste des ingrédients du site
  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const cachedData = localStorage.getItem("ingredients");
        // On ajoute un timestamp pour vérifier la fraicheur des ingrédients
        const cachedTimestamp = localStorage.getItem("ingredients_timestamp");
  
        // Vérifie si les données existent et sont récentes (ex: 1 jour)
        if (cachedData && cachedTimestamp) {
          const isFresh = Date.now() - Number(cachedTimestamp) < 24 * 60 * 60 * 1000;
          if (isFresh) {
            setIngredientList(JSON.parse(cachedData));
            return;
          }
        }
  
        // Si pas de cache ou cache expiré, récupérer depuis l'API
        const ingredients = await get("/ingredient/all");
        setIngredientList(ingredients);
        localStorage.setItem("ingredients", JSON.stringify(ingredients));
        localStorage.setItem("ingredients_timestamp", Date.now().toString());
  
      } catch (error) {
        console.error("Erreur lors de la récupération des ingrédients :", error);
      }
    };
  
    loadIngredients();
  }, []);




  // Récupération de la recherche et des ingrédients :
  const prevSearchIngredientsList = useRef(searchIngredientsList);

useEffect(() => {
  const fetchResults = () => {
    const ingredientIds = searchIngredientsList.map((ing) => ing.id_ingredient);

    post(`/search?title=${searchOnName}`, ingredientIds).then((recipeResult) => {
      if (recipeResult?.recipes) {
        ResultsList$.next(recipeResult.recipes);

        // Vérification de la modification de la liste des ingrédients
        if (JSON.stringify(prevSearchIngredientsList.current) !== JSON.stringify(searchIngredientsList)) {
          SearchIngredientsList$.next(searchIngredientsList);
          prevSearchIngredientsList.current = searchIngredientsList;
        }
      }
      setIngredientResults(recipeResult?.ingredients);
    }).catch((error) => {
      console.error("Erreur lors de la recherche :", error);
    });
  };

  fetchResults();
}, [searchOnName, searchIngredientsList]);
  

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
      setResultIsVisible(false);
  };

  // TODO : refacto pour éviter les fuites de mémoire sur la gestion des événements
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheck = (ingredient: IngredientType) => {
    setSearchIngredientsList((prev) => {
      const isAlreadyChecked = prev.some((ing) => ing.id_ingredient === ingredient.id_ingredient);
  
      const updatedList = isAlreadyChecked
        ? prev.filter((ing) => ing.id_ingredient !== ingredient.id_ingredient)
        : [...prev, ingredient];
      return prev.length !== updatedList.length ? updatedList : prev; // Évite un re-render inutile
    });
  };



  //handle pour vider la barre de recherche :
  const handleClearSearch = () => {
    setSearchOnName("");
  };

  return (
    <div className="search-bar" ref={containerRef}>
      <SearchBar
        search={searchOnName}
        setSearch={setSearchOnName}
        toggleFilter={handleSwitchVisibility}
        checkedCount={searchIngredientsList.length}
        handleForceClose={handleForceClose}
        handleClickInside={handleClickInside}
      />
      <FilterSelection
        filterIsVisible={filterIsVisible}
        ingredientList={ingredientList}
        handleCheck={handleCheck}
        searchIngredientsList={searchIngredientsList}
        setSearchIngredientsList={setSearchIngredientsList}
        handleClickInside={handleClickInside}
      />
      <ResultsList
        resultIsVisible={resultIsVisible}
        recipeResults={recipeCollection}
        ingredientResults={ingredientResults}
        searchIngredientsList={searchIngredientsList}
        handleCheck={handleCheck}
        handleClearSearch={handleClearSearch}
        handleForceClose={handleForceClose}
      />
    </div>
  );
};

export default InputSearch;


