import { FC } from "react";
import withLoadingAndError from "../hoc/WithLoadingAndError";
import OpinionsSkeleton from "./OpinionsSkeleton";
import { RecipeOpinionsType } from "../../1_types/RecipeOpinionsType";
import StarRating from "../common/StarRating";
import ControlRating from "../common/ControlRating";
import "../../styles/opinions.css";
import OpinionRecipe from "./OpinionRecipe";
import OpinionMyself from "./OpinionMyself";

type Props = {
  recipeRate: number;
  recipeNbRate: number;
  opinionsList: Array<RecipeOpinionsType>;
  isLoading: boolean;
  error: string | null;
};

const OpinionsResume: FC<Props> = ({
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
          </>
      ),
    });
  };


export default OpinionsResume;
