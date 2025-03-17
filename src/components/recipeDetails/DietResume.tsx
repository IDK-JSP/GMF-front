import { FC } from "react";
import { RecipeIngredientType } from "../../1_types/RecipeIngredientType";

const IngredientResume: FC<{ dietList: Array<RecipeIngredientType> }> = ({
  dietList,
}) => {
  if (dietList.length === 0) {
    return <p>Aucun ingrédient</p>;
  }

  // Vérifier la présence de chaque type d'aliment
  const hasNonVegetarian = dietList.some(({ diet }) =>
    diet?.includes("non végétarien")
  );
  const hasVegetarian = dietList.some(({ diet }) =>
    diet?.includes("végétarien")
  );
  const hasVegan = dietList.every(({ diet }) => diet?.includes("végan"));

  let recipeType = "non végétarienne"; // Par défaut

  if (!hasNonVegetarian) {
    recipeType = hasVegan ? "végan" : "végétarienne";
  }

  return (
    <p>
      {dietList.length} ingrédients - Recette {recipeType}
    </p>
  );
};

export default IngredientResume;
