import { FC, useEffect, useState, useTransition } from "react";
import { RecipeType } from "../1_types/RecipeType";
import get from "../api/get";
import ContentWithoutAside from "../components/layout/ContentWithoutAside";
import Presentation from "../components/layout/Presentation";
import "../styles/home.css";
import RecipeCarousel from "../components/common/RecipeCarousel";
import RecipeCollection from "../components/common/RecipeCollection";
import { collections } from "../1_types/CollectionsNames";
import Pages from "../components/layout/Pages";
import HeroSection from "../components/layout/HeroSection";

const Home: FC<{}> = ({}) => {
  const [recipeCollection, setRecipeCollection] = useState<
    RecipeType[] | undefined
  >(undefined);
  const [isPending, startTransition] = useTransition();

  const hydrate = () => {
    startTransition(async () => {
      try {
        const results = await get("/collection/top");
        setRecipeCollection(results);
      } catch (error) {
        console.error("Erreur lors du chargement des recettes :", error);
      }
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    hydrate();
  }, []);

  return (
    <Pages pageTitle={"Accueil"}>
      {!isPending && recipeCollection && (
        <>
          <HeroSection
            carousel={<RecipeCarousel recipeCollection={recipeCollection} />}
            titleBanner={false}
          >
            Accueil
          </HeroSection>
          <main>
            <ContentWithoutAside>
              <section>
                {recipeCollection ? (
                  collections.map((collection) => (
                    <RecipeCollection
                      key={collection.path}
                      path={collection.path}
                      title={collection.title}
                    />
                  ))
                ) : (
                  <></>
                )}
              </section>
            </ContentWithoutAside>
          </main>
        </>
      )}
    </Pages>
  );
};

export default Home;
