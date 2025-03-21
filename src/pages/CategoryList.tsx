import { FC, startTransition, useEffect, useState } from "react";
import get from "../api/get";
import { RecipeType } from "../1_types/RecipeType";
import { useLocation } from "react-router-dom";
import RecipeList from "../components/common/RecipeList";
import DynamicFilter from "../components/common/DynamicFilter";
import { collections } from "../1_types/CollectionsNames";
import Pages from "../components/layout/Pages";
import HeroSection from "../components/layout/HeroSection";
import Content from "../components/layout/Content";

const CategoryList: FC<{}> = ({}) => {
  const [recipeCollection, setRecipeCollection] = useState<
    RecipeType[] | undefined
  >(undefined);
  const location = useLocation();
  const title = collections.find(
    (collection) =>
      collection.path.split("/").pop() === location.pathname.split("/").pop()
  )?.title;
  const pathEnd = location.pathname.split("/").pop(); // Récupère la dernière partie de l'URL
  const hydrate = () => {
    // @ts-ignore
    startTransition(async () => {
      const results = await get("/collection/" + pathEnd);
      startTransition(() => {
        setRecipeCollection(results);
      });
    });
  };
  useEffect(() => {
    hydrate();
  }, []);
  return (
    <Pages pageTitle={title}>
      <HeroSection>{title}</HeroSection>
      <main>
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
      </main>
    </Pages>
  );
};

export default CategoryList;
