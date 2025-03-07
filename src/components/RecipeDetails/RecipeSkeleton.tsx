import Skeleton from "react-loading-skeleton";
import Presentation from "../layout/Presentation";
import AsideLeft from "../layout/AsideLeft";
import IngredientResume from "./IngredientResume";
import IngredientSkeleton from "./IngredientSkeleton";
import DietSkeleton from "./DietSkeleton";
import ContentWithBothAside from "../layout/ContentWithBothAside";
import AsideRight from "../layout/AsideRight";
import OpinionsSkeleton from "./OpinionsSkeleton";
import StageSkeleton from "./StageSkeleton";

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
