import { FC, useEffect, useState } from "react";
import { RecipeIngredientType } from "../../1_types/RecipeIngredientType";
import withLoadingAndError from "../hoc/WithLoadingAndError";
import IngredientSkeleton from "../skeleton/IngredientSkeleton";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

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
  };

  return withLoadingAndError({
    isLoading,
    error,
    data: ingredientsList,
    SkeletonComponent: IngredientSkeleton,
    children: (data) => (
      <>
        <article>
          <h3
            className="flex-row"
            style={{ justifyContent: "center", gap: "0.3rem" }}
          >
            Recette prévue pour {person} <PeopleAltIcon />
          </h3>
        </article>
        <article>
          <div className="flex-row">
            <label htmlFor="person">Adapter les quantités pour </label>
            <input
              className="input-person"
              type="number"
              id="person"
              name="person"
              min={1}
              max={20}
              defaultValue={person}
              onChange={handleChangePerson}
            />
          </div>
          <hr />
          {data.map((ingredient, index) => (
            <div key={index} className="flex-row ingredient-row">
              <img
                src={`/ingredient/${ingredient.ingredient_name}.png`}
                alt={ingredient.ingredient_name}
                width={30}
                height={30}
              />
              <span>{ingredient.ingredient_name}</span>
              <div className="flex-row">
                <span style={{ marginLeft: "10px" }}>
                  {Math.round(
                    ((ingredient.quantity * personUpdate) / person) * 10
                  ) / 10}
                </span>
                <span style={{ marginLeft: "10px" }}>
                  {ingredient.measurement}
                </span>
              </div>
            </div>
          ))}
        </article>
      </>
    ),
  });
};

export default IngredientResume;
