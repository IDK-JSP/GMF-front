import { FC, startTransition, useEffect, useState } from "react";
import Content from "../components/layout/Content";
import DynamicFilter from "../components/common/DynamicFilter";
import RecipeList from "../components/common/RecipeList";
import get from "../api/get";
import { RecipeType } from "../1_types/RecipeType";
import Pages from "../components/layout/Pages";
import HeroSection from "../components/layout/HeroSection";

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

  return (
    <Pages pageTitle="Mes recettes">
      <HeroSection>Mes recettes</HeroSection>
      <Content>
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
      </Content>
    </Pages>
  );
};

export default UserRecipes;
