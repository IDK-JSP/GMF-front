import { FC, startTransition, useEffect, useState } from "react";
import AsideLeft from "../../components/layout/AsideLeft";
import ContentWithLeftAside from "../../components/layout/ContentWithLeftAside";
import Presentation from "../../components/layout/Presentation";
import { IngredientType } from "../../1_types/IngredientType";
import { RecipeType } from "../../1_types/RecipeType";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getRecipeFavorites } from "../../api/getRecipeFavorites";
import { getEmailFromToken } from "../../context/getEmailFromToken";

export const Favorite: FC<{}> = ({}) => {
const authContext = useContext(AuthContext);
const [isPending, setIsPending] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);  
const [recipes, setRecipes] = useState<RecipeType[] | null>(null);
const [ingredients, setIngredients] = useState<IngredientType[] | null>(null);

const hydrate = () => {
        startTransition(async () => {
          const contextEmail = authContext?.token ? getEmailFromToken(authContext.token) : "Non connecté";
            const results = await getRecipeFavorites({ email: contextEmail });
            startTransition(() => {
              setRecipes(results?.recipes ?? null);
              setIngredients(results?.ingredients ?? null);
            });
        });
    };

        console.log('recipe', recipes)
        console.log('ingredients', ingredients)

    useEffect(() => {
        hydrate();
        console.log("log :", authContext?.isLoggedIn, "token :", authContext?.token)
    }, []);


  return (
    <>
      <Presentation imgUrl={"/test.jpg"}>Favoris</Presentation>
      <main>
      <AsideLeft>Aside</AsideLeft>
      <ContentWithLeftAside>
        <section>
        Ajoutez vos recettes préférées à vos favoris en un clic sur le cœur et retrouvez-les facilement ici. De plus, marquez vos ingrédients favoris pour qu'ils apparaissent en tête de liste lors de vos recherches.
          <article>Liste de recettes</article>
        </section>
      </ContentWithLeftAside>
      </main>
    </>
  );
};
export default Favorite;