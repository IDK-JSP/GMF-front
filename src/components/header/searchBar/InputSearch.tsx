import React, { useDebugValue, useEffect, useState } from 'react';
import { getIngredients } from '../../../api/getIngredients';
import { IngredientType } from '../../../1_types/IngredientType';
import { RecipeType } from '../../../1_types/RecipeType';
import SearchBar from './SearchBar';
import FilterSelection from './FilterSelection';
import "../../../styles/nav.css";
import { getRecipe } from '../../../api/getRecipe';
import ResultsList from './ResultsList';
import { ResultsList$ } from '../../../observables/ResultsList$';
import postSearch from '../../../api/postSearch';
import { SearchReturnType } from '../../../1_types/SearchReturnType';
import { log } from 'console';

export const InputSearch: React.FC = () => {
    const [filterIsVisible, setFilterIsVisible] = useState(false);
    const [resultIsVisible, setResultIsVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [checkedIngredients, setCheckedIngredients] = useState<IngredientType[]>([]);
    const [affined, setAffined] = useState('');
    const [ingredientList, setIngredientList] = useState<IngredientType[]>([]);
    const [recipeList, setRecipelist] = useState<RecipeType[]>([]);
    const [recipeCollection, setRecipeCollection] = useState<RecipeType[]>([]);
    const [ingredientResults, setIngredientResults] = useState<IngredientType[]>([]);
    
      useEffect(() => {
        // S'abonner à l'observable pour écouter les changements
        const subscription = ResultsList$.subscribe(setRecipeCollection);
        console.log("mise ajour collection");
        return () => subscription.unsubscribe(); // Nettoyage de l'abonnement
      }, []);


    // Récupération de la liste des ingrédients du site
    useEffect(() => {
        getIngredients().then(setIngredientList);
    }, []);

    // Récupération de la recherche et des ingrédients :
    useEffect(() => {
        console.log('search', search);
        const ingredientsId = checkedIngredients.map((ing) => ing.id_ingredient);
        console.log('checkedIngredients', ingredientsId);

        postSearch(search, ingredientsId).then((recipeResult) => {
         // Mise à jour de l'observable en fonction de la recherche 
         if (recipeResult?.recipes) {
            ResultsList$.next(recipeResult.recipes);
            console.log("mise à jour observable : ", recipeResult.recipes);
        }
        setIngredientResults(recipeResult?.ingredients);
    });
        
       
    }, [search, checkedIngredients]);

    useEffect(() => {
        if ((checkedIngredients.length > 0) || (search.length > 0)) {
            setResultIsVisible(true);
        } else {
            setResultIsVisible(false);
        }
    }
    , [checkedIngredients, search]);

    const handleSwitchVisibility = () => setFilterIsVisible(!filterIsVisible);
    const handleResultsVisibility = (value:boolean) => setResultIsVisible(value);

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setCheckedIngredients((prev) => (checked ? [...prev, ingredientList.find(ing => ing.name === value)!] : prev.filter((ing) => ing.name !== value)));
    };

    //handle pour vider la barre de recherche :
    const handleClearSearch = () => {
        setSearch("");
        console.log("clear search");
        }

    return (
        <div className='search-bar'>
            <SearchBar search={search} setSearch={setSearch} toggleResultsVisibility={handleResultsVisibility} toggleFilter={handleSwitchVisibility} checkedCount={checkedIngredients.length} />
            <FilterSelection filterIsVisible={filterIsVisible} affined={affined} setAffined={setAffined} ingredientList={ingredientList} handleCheck={handleCheck} checkedIngredients={checkedIngredients}/>
            <ResultsList resultIsVisible={resultIsVisible} toggleResultsVisibility={handleResultsVisibility} recipeResults={recipeCollection} ingredientResults={ingredientResults} checkedIngredients={checkedIngredients} handleCheck={handleCheck}  handleClearSearch={handleClearSearch}/>
        </div>
    );
};

export default InputSearch;
