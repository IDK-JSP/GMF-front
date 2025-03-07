import { FC, useEffect, useState } from "react";
import { RecipeIngredientType } from "../../1_types/RecipeIngredientType";
import withLoadingAndError from "../hoc/WithLoadingAndError";
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

  const [personUpdate, setPersonUpdate] = useState(1);

  const handleChangePerson = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPersonUpdate(Number(event.target.value));
  }
  
  return withLoadingAndError({
    isLoading,
    error,
    data: ingredientsList,
    SkeletonComponent: IngredientSkeleton,
    children: (data) => (
      <>
        <p>
          

          <label htmlFor="tentacles">{data.length} ingrédients pour {person} personne(s) : </label>
          <input type="number" id="tentacles" name="tentacles" min={1} max={100} defaultValue={person} onChange={handleChangePerson}/>
        </p>
        {data.map((ingredient, index) => (
          <div key={index}>
            <span>{ingredient.ingredient_name}</span>
            
            <span> {Math.round((ingredient.quantity * personUpdate / person) * 10) / 10}</span>
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
