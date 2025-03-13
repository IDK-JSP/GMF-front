import {FC, useContext, useEffect, useState} from 'react';
import "../../styles/recipeDisplay.css";
import { IngredientType } from '../../1_types/IngredientType';
import { toast } from 'react-toastify';

interface Props {
    ingredientList: IngredientType[];
    favoriteIngredients: IngredientType[];
    setFavoriteIngredients: (favoriteIngredients: IngredientType[]) => void;
}

// déplacer la logique de la gestion des ingrédients favoris ici

export const IngredientList: React.FC<Props> = ({ ingredientList, favoriteIngredients, setFavoriteIngredients}) => {

//const [favoriteIngredientsState, setFavoriteIngredientsState] = useState<IngredientType[]>(favoriteIngredients);

const handleAddFavorite = (ingredient: IngredientType) => {
    setFavoriteIngredients([...favoriteIngredients, ingredient]);
    toast("Favoris ajouté");
    console.log("add favoriteIngredients", favoriteIngredients);
};
const handleRemoveFavorite = (ingredient: IngredientType) => {
    setFavoriteIngredients(favoriteIngredients.filter((fav) => fav.name !== ingredient.name));
    toast("Favoris retiré");
    console.log("remove favoriteIngredients", favoriteIngredients);
};


    return (
        <>
        {        ingredientList.length ?
        <>
            <div className="flex-row" style={{flexWrap: "wrap", gap : "1rem"}}>
                <div onClick={() => handleAddFavorite(ingredientList[10])}>+</div>
                {ingredientList
                    .filter((ing) => favoriteIngredients.some(fav => ing.name.toLowerCase().includes(fav.name.toLowerCase())))
                    .map((ing) => (
                        <div key={ing.name} className="flex-column" style={{cursor:"pointer",padding: "0.5rem", backgroundColor: "lightblue", borderRadius: "1rem"}}
                        onClick={() => handleRemoveFavorite(ing)}>
                            <span>image</span>
                            <span>{ing.name}</span>
                        </div>
                    ))}
            </div>
            <hr/>
            <div className="flex-row" style={{flexWrap: "wrap", gap : "1rem", padding: "2rem"}}>
                {ingredientList
                    .filter((ing) => !favoriteIngredients.some(fav => fav.name.toLowerCase().includes(ing.name.toLowerCase())))
                    .map((ing) => (
                        <div key={ing.name} className="flex-column"
                        onClick={() => handleAddFavorite(ing)}>
                            <span>image</span>
                            <span>{ing.name}</span>
                        </div>
                    ))}
            </div>
            </>
            :
            <div>Chargement...</div>
}
            </>
    );
};

export default IngredientList;