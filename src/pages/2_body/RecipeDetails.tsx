import { FC } from "react";
import ContentWithBothAside from "../../components/layout/ContentWithBothAside";
import AsideLeft from "../../components/layout/AsideLeft";
import AsideRight from "../../components/layout/AsideRight";
import Presentation from "../../components/layout/Presentation";
import { useLocation } from "react-router-dom";

const RecipeDetails: FC<{}> = ({}) => {
  const location = useLocation();
  const recipe = location.state?.recipe;

  if (!recipe) {
    // Modifier la page d'erreur
    return <p>Aucune recette trouvée.</p>;
  }

  return (
    <>
      <Presentation>{recipe.title}</Presentation>
      <AsideLeft>Aside</AsideLeft>
      <ContentWithBothAside>
        <section>
          {recipe.description}
          <article>article</article>
        </section>
      </ContentWithBothAside>
      <AsideRight>Aside</AsideRight>
    </>
  );
};

export default RecipeDetails;
