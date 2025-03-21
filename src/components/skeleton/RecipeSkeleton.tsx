import Skeleton from "react-loading-skeleton";
import AsideLeft from "../layout/AsideLeft";
import IngredientSkeleton from "../skeleton/IngredientSkeleton";
import DietSkeleton from "../skeleton/DietSkeleton";
import AsideRight from "../layout/AsideRight";
import OpinionsSkeleton from "../skeleton/OpinionsSkeleton";
import StageSkeleton from "../skeleton/StageSkeleton";
import HeroSection from "../layout/HeroSection";
import Content from "../layout/Content";

const RecipeSkeleton = () => (
  <>
    <HeroSection>Une super recette ...</HeroSection>
    <main>
      <AsideLeft>
        <IngredientSkeleton />
        <DietSkeleton />
      </AsideLeft>
      <Content asideLeft asideRight>
        <Skeleton height={50} width="100%" />
        <section>
          <StageSkeleton />
        </section>
      </Content>
      <AsideRight>
        <OpinionsSkeleton />
      </AsideRight>
    </main>
  </>
);

export default RecipeSkeleton;
