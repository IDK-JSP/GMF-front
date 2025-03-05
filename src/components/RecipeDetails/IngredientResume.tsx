import { FC } from "react";
import { RecipeIngredientType } from "../../1_types/RecipeIngredientType";
import withLoadingAndError from "../hoc/withLoadingAndError";
import IngredientSkeleton from "./IngredientSkeleton";

type Props = {
  ingredientsList: Array<RecipeIngredientType>;
  person: number;
  isLoading: boolean;
  error: string | null;
};

const IngredientResume: FC<Props> = ({
  person,
  ingredientsList,
  isLoading,
  error,
}) => {
  return withLoadingAndError({
    isLoading,
    error,
    data: ingredientsList,
    SkeletonComponent: IngredientSkeleton,
    children: (data) => (
      <>
        <p>
          {data.length} ingrédients pour {person} personne(s)
        </p>
        {data.map((ingredient, index) => (
          <div key={index}>
            <span>{ingredient.ingredient_name}</span>
            <span> {ingredient.quantity}</span>
            <span> {ingredient.measurement}</span>
            <span>
              <small> ({ingredient.diet})</small>
            </span>
          </div>
        ))}
      </>
    ),
  });
};

export default IngredientResume;
