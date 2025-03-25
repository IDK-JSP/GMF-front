import { FC, startTransition, useEffect, useState } from "react";
import Content from "../components/layout/Content";
import { IngredientType } from "../1_types/IngredientType";
import { RecipeType } from "../1_types/RecipeType";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getEmailFromToken } from "../components/auth/getEmailFromToken";
import RecipeList from "../components/common/RecipeList";
import IngredientList from "../components/common/IngredientList";
import get from "../api/get";
import Pages from "../components/layout/Pages";
import HeroSection from "../components/layout/HeroSection";
import DynamicFilter from "../components/common/DynamicFilter";

export const Favorite: FC<{}> = ({}) => {
  const authContext = useContext(AuthContext);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<RecipeType[] | null>(null);
  const [favoriteIngredients, setFavoriteIngredients] = useState<
    IngredientType[] | null
  >(null);
  const [imagePresentation, setImagePresentation] =
    useState<string>("research.jpg");
  const [allIngredients, setAllIngredients] = useState<IngredientType[] | null>(
    null
  );

  const hydrate = () => {
    startTransition(async () => {
      const contextEmail = authContext?.token
        ? getEmailFromToken(authContext.token)
        : "Non connecté";
      const results = await get("/favorite/search?email=" + contextEmail);
      const allIngredients = await get("/ingredient/all");
      startTransition(() => {
        setRecipes(results?.recipes ?? null);
        setFavoriteIngredients(results?.ingredients ?? null);
        setAllIngredients(allIngredients ?? null);
      });
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    hydrate();
  }, []);

  // récupération de la premiere recette pour afficher l'image en fond
  useEffect(() => {
    if (recipes !== null && recipes.length > 0) {
      setImagePresentation("recipe/recipe_" + recipes[0].id_recipe + ".jpg");
    }
  }, [recipes]);

  return (
    <Pages pageTitle="Mes Favoris">
      <HeroSection>Favoris</HeroSection>
      <main>
        <Content>
          <section>
          <DynamicFilter display={true} />
            <article>
              Ajoutez vos recettes préférées à vos favoris en un clic sur le
              cœur et retrouvez-les facilement ici. De plus, marquez vos
              ingrédients favoris pour qu'ils apparaissent en tête de liste lors
              de vos recherches.
            </article>

            <article>
              {recipes && recipes.length > 0 ? (
                <RecipeList recipeCollection={recipes} setRecipes={setRecipes} />
              ) : (
                <span>Vous n'avez pas encore de recette en favoris.</span>
              )}
            </article>
            <article>
              <IngredientList
                ingredientList={allIngredients ?? []}
                favoriteIngredients={favoriteIngredients ?? []}
                setFavoriteIngredients={setFavoriteIngredients}
              />
            </article>
          </section>
        </Content>
      </main>
    </Pages>
  );
};
export default Favorite;
