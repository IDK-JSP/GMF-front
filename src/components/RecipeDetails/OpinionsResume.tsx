import { FC } from "react";
import withLoadingAndError from "../hoc/withLoadingAndError";
import OpinionsSkeleton from "./OpinionsSkeleton";
import { RecipeOpinionsType } from "../../1_types/RecipeOpinionsType";
import StarRating from "../commun/StarRating";
import ControlRating from "../commun/ControlRating";
import "../../styles/opinions.css";

type Props = {
  recipeRate: number;
  recipeNbRate: number;
  opinionsList: Array<RecipeOpinionsType>;
  isLoading: boolean;
  error: string | null;
};

const OpinionsResume: FC<Props> = ({
  recipeRate,
  recipeNbRate,
  opinionsList,
  isLoading,
  error,
}) => {
  return withLoadingAndError({
    isLoading,
    error,
    data: opinionsList,
    SkeletonComponent: OpinionsSkeleton,
    children: (data) => (
      <div className="opinion-box">
        <div className="opinion-recipe">
          <StarRating rate={recipeRate} size="large" />
          {recipeRate}/5 sur {recipeNbRate} avis
        </div>
        <div className="opinion-myself">
          <div className="flex-row">
            <span>Ma note</span>
            <ControlRating />
          </div>
          <textarea
            placeholder="Votre commentaire..."
            className="opinion-comment"
          ></textarea>
          <button className="opinion-submit">Envoyer</button>
        </div>

        {opinionsList && opinionsList.length > 0 ? (
          opinionsList.map((opinion, index) => (
            <div key={index} className="opinion-item">
              <div className="flex-row">
                <StarRating rate={opinion.rate} size="medium" />
              </div>
              <span>"{opinion.comment}"</span>
              <span>{opinion.email}</span>
            </div>
          ))
        ) : (
          <div>Aucune note trouvée.</div>
        )}
      </div>
    ),
  });
};

export default OpinionsResume;
