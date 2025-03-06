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

export const InputSearch: React.FC = () => {
    const [filterIsVisible, setFilterIsVisible] = useState(false);
    const [resultIsVisible, setResultIsVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [checkedIngredients, setCheckedIngredients] = useState<IngredientType[]>([]);
    const [affined, setAffined] = useState('');
    const [ingredientList, setIngredientList] = useState<IngredientType[]>([]);
    const [recipeList, setRecipeList] = useState<RecipeType[]>([]);
    const [recipeResults, setRecipeResults] = useState<RecipeType[]>([]);


    // Récupération de la liste des ingrédients du site
    useEffect(() => {
        getIngredients().then(setIngredientList);
    }, []);

    // Récupération de la recherche et des ingrédients :
    useEffect(() => {
        console.log('search', search);
        console.log('checkedIngredients', checkedIngredients);

        // A MODIFIER !!!!!!!!!!!!!!!!!!!!!!!!
        // Méthode de recherche a ajouter ICI
        getRecipe().then(setRecipeList);
        
        // Mise à jour de l'observable en fonction de la recherche 
        ResultsList$.next(recipeList
            .filter((recipe) => recipe.title.toLowerCase().includes(search.toLowerCase())));
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

    return (
        <div className='search-bar'>
            <SearchBar search={search} setSearch={setSearch} toggleResultsVisibility={handleResultsVisibility} toggleFilter={handleSwitchVisibility} checkedCount={checkedIngredients.length} />
            <FilterSelection filterIsVisible={filterIsVisible} affined={affined} setAffined={setAffined} ingredientList={ingredientList} handleCheck={handleCheck} checkedIngredients={checkedIngredients} />
            <ResultsList resultIsVisible={resultIsVisible} toggleResultsVisibility={handleResultsVisibility} recipeResults={recipeResults} checkedIngredients={checkedIngredients} handleCheck={handleCheck} />
        </div>
    );
};

export default InputSearch;
