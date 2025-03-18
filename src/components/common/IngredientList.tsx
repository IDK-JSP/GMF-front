import "../../styles/recipeDisplay.css";
import {IngredientType} from '../../1_types/IngredientType';
import post from '../../api/post';
import del from '../../api/del';

interface Props {
    ingredientList: IngredientType[];
    favoriteIngredients: IngredientType[];
    setFavoriteIngredients: (favoriteIngredients: IngredientType[]) => void;
}

// déplacer la logique de la gestion des ingrédients favoris ici

export const IngredientList: React.FC<Props> = ({ingredientList, favoriteIngredients, setFavoriteIngredients}) => {

//const [favoriteIngredientsState, setFavoriteIngredientsState] = useState<IngredientType[]>(favoriteIngredients);

    const handleAddFavorite = (ingredient: IngredientType) => {
        setFavoriteIngredients([...favoriteIngredients, ingredient]);
        const data = {
            favoriteable_type: "ingredient",
            favoriteable_id: ingredient.id_ingredient,
        };
        post("/favorite/new", data, "Favoris ajouté");
    };
    const handleRemoveFavorite = (ingredient: IngredientType) => {
        setFavoriteIngredients(favoriteIngredients.filter((fav) => fav.name !== ingredient.name));
        del("/favorite/delete/recipe/" + ingredient.id_ingredient, "Favoris supprimé avec succés");

    };

    return (
        <>
            {ingredientList.length ?
                <>
                    <div className="flex-row" style={{flexWrap: "wrap", gap: "1rem"}}>
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
                                    <span>image</span>
                                    <span>{ing.name}</span>
                                </div>
                            ))}
                    </div>
                    <hr/>
                    <div className="flex-row" style={{flexWrap: "wrap", gap: "1rem", padding: "2rem"}}>
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