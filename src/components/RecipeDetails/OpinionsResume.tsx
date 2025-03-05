import { FC } from "react";
import withLoadingAndError from "../hoc/withLoadingAndError";
import OpinionsSkeleton from "./OpinionsSkeleton";
import { RecipeOpinionsType } from "../../1_types/RecipeOpinionsType";
import StarRating from "../commun/StarRating";

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
      <>
        <div>
          <StarRating rate={recipeRate} />
          {recipeRate}/5 sur {recipeNbRate} avis
        </div>
        {opinionsList && opinionsList.length > 0 ? (
          opinionsList.map((opinion, index) => (
            <div key={index}>
              <StarRating rate={opinion.rate} />
              <span>{opinion.comment}</span>
              <span>{opinion.email}</span>
            </div>
          ))
        ) : (
          <div>Aucune note trouvée.</div>
        )}
      </>
    ),
  });
};

export default OpinionsResume;
