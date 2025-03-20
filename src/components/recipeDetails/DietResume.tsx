import { FC } from "react";
import { RecipeIngredientType } from "../../1_types/RecipeIngredientType";
import DietBadge from "../common/DietBadge";

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
  let badge = "non végétarien";

  if (!hasNonVegetarian) {
    recipeType = hasVegan ? "végan" : "végétarienne";
    badge = hasVegan ? "Végan" : "Végétarien";
  }

  return (
    <article className="flex-row">
      <DietBadge diet={badge} sizeInPixels={60} />
      Recette {recipeType}
    </article>
  );
};

export default IngredientResume;
