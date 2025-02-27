import React, { useDebugValue, useEffect, useState } from 'react';
import { getIngredients } from '../../../api/getIngredients';
import { IngredientType } from '../../../1_types/IngredientType';
import { RecipeType } from '../../../1_types/RecipeType';
import SearchBar from './SearchBar';
import FilterSelection from './FilterSelection';
import "../../../styles/nav.css";
import { getRecipe } from '../../../api/getRecipe';
import ResultsList from './ResultsList';

export const InputSearch: React.FC = () => {
    const [filterIsVisible, setFilterIsVisible] = useState(false);
    const [resultIsVisible, setResultIsVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [checkedIngredients, setCheckedIngredients] = useState<IngredientType[]>([]);
    const [affined, setAffined] = useState('');
    const [ingredientList, setIngredientList] = useState<IngredientType[]>([]);
    const [recipeList, setRecipelist] = useState<RecipeType[]>([]);
    const [recipeResults, setRecipeResults] = useState<RecipeType[]>([]);

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
                return recipe.title.toLowerCase().includes(search.toLowerCase());
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
            {/* <FilterTags checkedIngredients={checkedIngredients} handleCheck={handleCheck} /> */}
            <FilterSelection filterIsVisible={filterIsVisible} affined={affined} setAffined={setAffined} ingredientList={ingredientList} handleCheck={handleCheck} checkedIngredients={checkedIngredients} />
            <ResultsList resultIsVisible={resultIsVisible} recipeResults={recipeResults} />
        </div>
    );
};

export default InputSearch;
