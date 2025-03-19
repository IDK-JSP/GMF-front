import { FC, useEffect, useState } from "react";
import { RecipeIngredientType } from "../../1_types/RecipeIngredientType";
import withLoadingAndError from "../hoc/WithLoadingAndError";
import IngredientSkeleton from "../skeleton/IngredientSkeleton";

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

  const [personUpdate, setPersonUpdate] = useState(person);

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
      <article>
        <div className="flex-row">
          <label htmlFor="person"><h3>Recette pour </h3></label>
          <input type="number" id="person" name="person" min={1} max={100} defaultValue={person} onChange={handleChangePerson}/>
        </div>
        {data.map((ingredient, index) => (
          <div key={index} className="flex-row ingredient-row">
            <img src={`/ingredient/${ingredient.ingredient_name}.png`} alt={ingredient.ingredient_name} width={30} height={30}/>
            <span style={{ flex: 1 }}>{ingredient.ingredient_name}</span>
            <span style={{ marginLeft: '10px' }}>{Math.round((ingredient.quantity * personUpdate / person) * 10) / 10}</span>
            <span style={{ marginLeft: '10px' }}>{ingredient.measurement}</span>
          </div>
        ))}
        </article>
      </>
    ),
  });
};

export default IngredientResume;
