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
    const [recipeList, setRecipelist] = useState<RecipeType[]>([]);
    const [recipeResults, setRecipeResults] = useState<RecipeType[]>([]);

    const [resultsList, setResultsList] = useState<RecipeType[]>([])

    useEffect(() => {
        // S'abonner à l'observable pour écouter les changements
        const subscription = ResultsList$.subscribe(setResultsList);

        return () => subscription.unsubscribe(); // Nettoyage de l'abonnement
    }, []);

    useEffect(() => {
        getIngredients().then(setIngredientList);
    }, []);

    // Récupération de la recherche et des ingrédients :
    useEffect(() => {
        console.log('search', search);
        console.log('checkedIngredients', checkedIngredients);
        // console.log('recipeResults', recipeResults);

        // Méthode de recherche a ajouter ICI
        getRecipe().then(setRecipelist);

        setRecipeResults(recipeList.filter((recipe) => {
            if (search.length > 0) {
                const result = recipe.title.toLowerCase().includes(search.toLowerCase());
                // mise à jour de l'observalbe : 
                setResultsList(recipeResults);
                return result;
            }
            return [];
            })
    )}, [search, checkedIngredients]);

    useEffect(() => {
        if ((recipeResults.length > 0) && (search.length > 0)) {
            setResultIsVisible(true);
        } else {
            setResultIsVisible(false);
        }
    }
    , [recipeResults]);

    const handleSwitchVisibility = () => setFilterIsVisible(!filterIsVisible);

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setCheckedIngredients((prev) => (checked ? [...prev, ingredientList.find(ing => ing.name === value)!] : prev.filter((ing) => ing.name !== value)));
    };

    return (
        <div className='search-bar'>
            <SearchBar search={search} setSearch={setSearch} toggleFilter={handleSwitchVisibility} checkedCount={checkedIngredients.length} />
            {/*  */}
            <FilterSelection filterIsVisible={filterIsVisible} affined={affined} setAffined={setAffined} ingredientList={ingredientList} handleCheck={handleCheck} checkedIngredients={checkedIngredients} />
            <ResultsList resultIsVisible={resultIsVisible} recipeResults={recipeResults} checkedIngredients={checkedIngredients} handleCheck={handleCheck} />
        </div>
    );
};

export default InputSearch;
