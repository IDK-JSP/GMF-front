import React, { use, useEffect, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ingredients from '../../dataFake/dataIngredient.json';
import category from '../../dataFake/dataCategory.json';
import { get } from 'http';
import { getIngredients } from '../../api/getIngredients';
import { IngredientType } from '../../1_types/IngredientType';




export const InputSearch: React.FC = () => {
    const [filterIsVisible, setFilterIsVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
    const [affined, setAffined] = useState('');
    const [ingredientList, setIngredientList] = useState<IngredientType[]>([]);

    useEffect(() => {
        console.log(search);
        console.log(checkedIngredients);
    }
    , [search, checkedIngredients]);
    
    useEffect(() => {
        console.log(affined);
    }
    , [affined]);
    
    

const handleSwitchVisibility = () => {
    setFilterIsVisible(!filterIsVisible);
}


const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
        setCheckedIngredients([...checkedIngredients, e.target.value]);
    } else {
        setCheckedIngredients(checkedIngredients.filter((ing) => ing !== e.target.value));
    }
}
    useEffect(() => {
        getIngredients().then((ingredientList) => {
            setIngredientList(ingredientList);
        }
        );
    }, []);


    return (
        <div className='search-bar'>
            {/* DEBUT DE LA DIV QUI CONTIENT LA BARRE DE RECHERCHE */}
            <div className='search-container'>
                

                {/* CHAMP DE RECHERCHE TEXT */}
                <input id='text-input'
                onChange={(e) => setSearch(e.target.value)}
                type="text" placeholder="Search..." />
                {/* DIV DES FILTRES EN TAG */}
                <div id='search-filters'>
                    {checkedIngredients
                    .slice(-3)
                    .map((ing) => {
                        return (
                            <span className='search-tag'><input type="checkbox" id={ing}
                            onChange={handleCheck}
                            value={ing}
                            checked
                            />
                            <label htmlFor={ing}>{ing.slice(0,10)}</label>
                            
                            </span>
                        );
                    }
                    )}
                    
                </div>
                {/* BOUTON D'AFFICHAGE DE LA SELECTION DES FILTRES */}
                
                <button id='filter-button'
                onClick={handleSwitchVisibility}
                className={
                    filterIsVisible ? 'button-active' : 'button-desactive'
                }
                >
                    
                    <FilterAltIcon/> <span>({checkedIngredients.length})</span>
            
                </button>

                {/* BOUTON VALIDER */}
                <button id='validate-button'><SearchIcon/></button>
            </div>
            {/* FIN DE LA DIV QUI CONTIENT LA BARRE DE RECHERCHE */}

            {/* DEBUT DE LA DIV DE LA SELECTION DES FILTRES */}
            <div className='filter-container'
            style={{
                opacity: filterIsVisible ? '1' : '0',
                top: filterIsVisible ? 0 : -500
            }}
            >
                <div><input id='filter-input'
                    onChange={(e) => setAffined(e.target.value)}
                    type="text" placeholder="Filtrer les ingrédients" />
                {checkedIngredients
                .map((ing) => {
                    return (
                        <span className='search-tag'><input type="checkbox" id={ing}
                        onChange={handleCheck}
                        value={ing}
                        checked
                        />
                        <label htmlFor={ing}>{ing}</label>
                        
                        </span>
                    );
                }
                )}
                    
                </div>
                <div className='filter-category'>
                {/* {category.map((cat) => {
                    return (
                        <div
                        style={{
                            display: ingredients.filter((ing) => ing.category.toLowerCase() === cat.toLowerCase())
                            .filter((ing) => ing.name.toLowerCase().includes(affined.toLowerCase())).length > 0 ? 'block' : 'none'
                        }}>
                            {ingredients.filter((ing) => ing.category.toLowerCase() === cat.toLowerCase())
                            .filter((ing) => ing.name.toLowerCase().includes(affined.toLowerCase())).length > 0 &&
                            <div>
                                <h3>{cat}</h3> */}
                                <div className='filter-list'>
                                {ingredientList
                                // .filter((ing) => ing.category.toLowerCase() === cat.toLowerCase())
                                .filter((ing) => ing.name.toLowerCase().includes(affined.toLowerCase()))
                                .map((ing) => {
                                    return (
                                        <div key={ing.name}>
                                            <input type="checkbox"
                                            id={ing.name}
                                            onChange={handleCheck}
                                            value={ing.name}
                                            checked={checkedIngredients.includes(ing.name)}
                                            />
                                            <label htmlFor={ing.name}>{ing.name}</label>
                                        </div>
                                    )
                                })}
                                
                                </div> 
{/*                             
                            </div>
                            }
                        </div>
                    );
                } 
                
                )}*/}</div>

            </div>
            {/* FIN DE LA DIV QUI CONTIENT LA SELECTION DES FILTRES */}
        </div>
    );
}
export default InputSearch;