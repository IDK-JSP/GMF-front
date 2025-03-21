import { FC, startTransition, useEffect, useState } from "react";
import Content from "../components/layout/Content";
import DynamicFilter from "../components/common/DynamicFilter";
import RecipeList from "../components/common/RecipeList";
import get from "../api/get";
import { RecipeType } from "../1_types/RecipeType";
import Pages from "../components/layout/Pages";
import HeroSection from "../components/layout/HeroSection";
import { useNavigate } from "react-router";
import { Typography } from "@mui/material";

const UserRecipes: FC<{}> = ({}) => {
  const [recipeCollection, setRecipeCollection] = useState<
    RecipeType[] | undefined
  >(undefined);

  const hydrate = () => {
    // @ts-ignore
    startTransition(async () => {
      const results = await get("/recipe/user");
      startTransition(() => {
        setRecipeCollection(results);
      });
    });
  };
  useEffect(() => {
    hydrate();
  }, []);

  const navigate = useNavigate();

  return (
    <Pages pageTitle="Mes recettes">
      <HeroSection>Mes recettes</HeroSection>
      <main>
        <Content>
          <section>
            <article>
              Retrouvez ici toutes les recettes que vous avez créées. Un espace
              dédié pour consulter, modifier ou simplement vous inspirer de vos
              propres créations culinaires.
            </article>
          </section>
          {recipeCollection == undefined || recipeCollection.length === 0 ? (
            <section>
              <article>
                <p>
                  Vous n'avez pas encore créé de recette. Pourquoi ne pas
                  commencer dès maintenant ?
                </p>
                <button
                  className="home-btn"
                  onClick={() => {
                    navigate("/CreateRecipe");
                  }}
                >
                  <Typography variant="h5">
                    Créez votre première recette
                  </Typography>
                </button>
              </article>
            </section>
          ) : (
            <section>
              <DynamicFilter display={true} />
              <article>
                {recipeCollection ? (
                  <RecipeList recipeCollection={recipeCollection} />
                ) : (
                  <></>
                )}
              </article>
            </section>
          )}
        </Content>
      </main>
    </Pages>
  );
};

export default UserRecipes;
