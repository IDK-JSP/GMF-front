import Skeleton from "react-loading-skeleton";
import Presentation from "../layout/Presentation";
import AsideLeft from "../layout/AsideLeft";
import IngredientSkeleton from "../skeleton/IngredientSkeleton";
import DietSkeleton from "../skeleton/DietSkeleton";
import ContentWithBothAside from "../layout/ContentWithBothAside";
import AsideRight from "../layout/AsideRight";
import OpinionsSkeleton from "../skeleton/OpinionsSkeleton";
import StageSkeleton from "../skeleton/StageSkeleton";

const RecipeSkeleton = () => (
  <>
       <Presentation imgUrl={`/recipe/recipe_1.jpg`}>
         Chargement
       </Presentation>
       <main>
         <AsideLeft>
           <IngredientSkeleton />
           <DietSkeleton />
         </AsideLeft>
         <ContentWithBothAside>
         <Skeleton height={50} width="100%" />
           <section>
             <StageSkeleton />
           </section>
         </ContentWithBothAside>
         <AsideRight>
           <OpinionsSkeleton />
         </AsideRight>
       </main>
     </>
);

export default RecipeSkeleton;
