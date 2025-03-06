import { FC } from "react";
import { RecipeOpinionsType } from "../../1_types/RecipeOpinionsType";

const OpinionsResume: FC<{
  opinionsList: Array<RecipeOpinionsType>;
}> = ({ opinionsList }) => {
  return (
    <>
      {opinionsList && opinionsList.length > 0 ? (
        opinionsList.map((opinion, index) => (
          <div key={index} className="recipe-stage">
            <span>{opinion.rate}</span>
            <span>{opinion.comment}</span>
            <span>{opinion.email}</span>
          </div>
        ))
      ) : (
        <article>Aucune note trouvée.</article>
      )}
    </>
  );
};

export default OpinionsResume;
