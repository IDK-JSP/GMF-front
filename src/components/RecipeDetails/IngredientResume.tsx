import { FC } from "react";
import { RecipeIngredientType } from "../../1_types/RecipeIngredientType";

const IngredientResume: FC<{
  ingredientsList: Array<RecipeIngredientType>;
}> = ({ ingredientsList }) => {
  return (
    <>
      {ingredientsList && ingredientsList.length > 0 ? (
        ingredientsList.map((ingredient, index) => (
          <div key={index}>
            <span>{ingredient.ingredient_name}</span>
            <span>{ingredient.quantity}</span>
            <span>{ingredient.measurement}</span>
          </div>
        ))
      ) : (
        <p>Aucun ingredient trouvé.</p>
      )}
    </>
  );
};

export default IngredientResume;
