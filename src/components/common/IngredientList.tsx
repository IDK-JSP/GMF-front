import "../../styles/recipeDisplay.css";
import {IngredientType} from '../../1_types/IngredientType';
import post from '../../api/post';
import del from '../../api/del';
import { toast } from "react-toastify";

interface Props {
    ingredientList: IngredientType[];
    favoriteIngredients: IngredientType[];
    setFavoriteIngredients: (favoriteIngredients: IngredientType[]) => void;
}

// déplacer la logique de la gestion des ingrédients favoris ici

export const IngredientList: React.FC<Props> = ({ingredientList, favoriteIngredients, setFavoriteIngredients}) => {

    const handleAddFavorite = (ingredient: IngredientType) => {
        const data = {
            favoriteable_type: "ingredient",
            favoriteable_id: ingredient.id_ingredient,
        };
        post("/favorite/new", data, "Favori ajouté").then((response) => {
            if (
                (typeof response === "object")
              ) {
                setFavoriteIngredients([...favoriteIngredients, ingredient]);
            } else {}
        }
        );
    };
    const handleRemoveFavorite = (ingredient: IngredientType) => {
        del("/favorite/delete/ingredient/" + ingredient.id_ingredient, "Favori supprimé avec succès.").then((response) => {
            if (
                (response === "Favori supprimé avec succès.")
              ) { 
                // TODO : vérifier si le filtre est bien appliqué
                setFavoriteIngredients(favoriteIngredients.filter((fav) => fav.name !== ingredient.name));
            } else {}
        });


    };

    return (
        <>
            {ingredientList.length ?
                <>
                    <div className="ingredient-list">
                        {ingredientList
                            .filter((ing) => favoriteIngredients.some(fav => ing.name.toLowerCase().includes(fav.name.toLowerCase())))
                            .map((ing) => (
                                <div key={ing.name} className="flex-column" style={{
                                    cursor: "pointer",
                                    padding: "0.5rem",
                                    backgroundColor: "lightblue",
                                    borderRadius: "1rem"
                                }}
                                     onClick={() => handleRemoveFavorite(ing)}>
                                    <img src={`ingredient/${ing.name}.png`} alt={ing.name} width={50} height={50}/>

                                    <span>{ing.name}</span>
                                </div>
                            ))}
                    </div>
                    <hr/>
                    <div className="ingredient-list">
                        {ingredientList
                            .filter((ing) => !favoriteIngredients.some(fav => fav.name.toLowerCase().includes(ing.name.toLowerCase())))
                            .map((ing) => (
                                <div key={ing.name} className="flex-column"
                                     onClick={() => handleAddFavorite(ing)}>
                                    <img src={`ingredient/${ing.name}.png`} alt={ing.name} width={50} height={50}/>
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