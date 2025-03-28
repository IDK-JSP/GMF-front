import {FC} from "react";
import {RecipeIngredientType} from "../../1_types/RecipeIngredientType";
import DietBadge from "../button/DietBadge";

const IngredientResume: FC<{ dietList: Array<RecipeIngredientType> }> = ({
                                                                             dietList,
                                                                         }) => {
    if (dietList.length === 0) {
        return <p>Aucun ingrédient</p>;
    }

  // Vérifier la présence de chaque type d'aliment
  const hasNonVegetarian = dietList.some(({ diet }) =>
    diet?.includes("Non renseigné")
  );
  const hasVegetarian = dietList.some(({ diet }) =>
    diet?.includes("Végétarien")
  );
  const hasVegan = dietList.every(({ diet }) =>
    diet?.includes("Végan")
);

    let recipeType = "non végétarienne"; // Par défaut
    let badge = "non végétarien";

  if (!hasNonVegetarian) {
    recipeType = hasVegan ? "Végan" : "Végétarienne";
    badge = hasVegan ? "Végan" : "Végétarien";
  }

    return (
        <article className="flex-row container-responsive">
            <div className={"diet-badge-two"}>
                <DietBadge diet={badge} sizeInPixels={60}/>
            </div>
            Recette {recipeType}
        </article>
    );
};

export default IngredientResume;
