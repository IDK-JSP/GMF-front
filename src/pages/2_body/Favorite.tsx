import {FC, startTransition, useEffect, useState} from "react";
import ContentWithoutAside from "../../components/layout/ContentWithoutAside";
import Presentation from "../../components/layout/Presentation";
import {IngredientType} from "../../1_types/IngredientType";
import {RecipeType} from "../../1_types/RecipeType";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {getRecipeFavorites} from "../../api/getRecipeFavorites";
import {getEmailFromToken} from "../../context/getEmailFromToken";
import RecipeList from "../../components/commun/RecipeList";
import IngredientList from "../../components/commun/IngredientList";
import {getIngredients} from "../../api/getIngredients";
import {set} from "react-hook-form";

export const Favorite: FC<{}> = ({}) => {
    const authContext = useContext(AuthContext);
    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [recipes, setRecipes] = useState<RecipeType[] | null>(null);
    const [favoriteIngredients, setFavoriteIngredients] = useState<IngredientType[] | null>(null);
    const [imagePresentation, setImagePresentation] = useState<string>("research.jpg");
    const [allIngredients, setAllIngredients] = useState<IngredientType[] | null>(null);
// const [results, setResults] = useState<any>(null);

    const hydrate = () => {
        startTransition(async () => {
            const contextEmail = authContext?.token ? getEmailFromToken(authContext.token) : "Non connecté";
            const results = await getRecipeFavorites({email: contextEmail});
            const allIngredients = await getIngredients();
            startTransition(() => {
                setRecipes(results?.recipes ?? null);
                setFavoriteIngredients(results?.ingredients ?? null);
                // setResults(results ?? null);
                setAllIngredients(allIngredients ?? null);
            });
        });
    };
    //console.log('all ingredients', allIngredients)
    //console.log('recipe', recipes)
    //console.log('ingredients', ingredients)
    //console.log('email', authContext ? getEmailFromToken(authContext.token) : "No token")

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
        hydrate();
    }, []);

// récupération de la premiere recette pour afficher l'image en fond
    useEffect(() => {
        if (recipes !== null && recipes.length > 0) {
            setImagePresentation("recipe/recipe_" + recipes[0].id_recipe + ".jpg");
            //console.log('imagePresentation', imagePresentation)
        }
    }, [recipes]);

    return (
        <>
            <Presentation imgUrl={"/test.jpg"}>Favoris</Presentation>
            <main>
                <ContentWithoutAside>
                    <section>
                        <p>Ajoutez vos recettes préférées à vos favoris en un clic sur le cœur et retrouvez-les
                            facilement ici. De plus, marquez vos ingrédients favoris pour qu'ils apparaissent en tête de
                            liste lors de vos recherches.</p>

                        <article><RecipeList recipeCollection={recipes ?? []} /></article>
                        <article><IngredientList ingredientList={allIngredients ?? []}
                                                 favoriteIngredients={favoriteIngredients ?? []}
                                                 setFavoriteIngredients={setFavoriteIngredients}/></article>
                    </section>
                </ContentWithoutAside>
            </main>
        </>
    );
};
export default Favorite;