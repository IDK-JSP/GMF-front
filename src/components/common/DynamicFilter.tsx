import React, { use, useContext, useEffect, useState } from "react";
import { RecipeType } from "../../1_types/RecipeType";
import { ResultsList$ } from "../../observables/ResultsList$";
import { DynamicFilterContext } from "../../context/DynamicFilterContext";
import DisplayCardOrItem from "../button/DisplayCardOrItem";

interface DynamicFilterProps {
  matching?: boolean | false;
  display?: boolean | false;
}

const DynamicFilter: React.FC<DynamicFilterProps> = ({
  matching = false,
  display = false,
}) => {
  const filterContext = useContext(DynamicFilterContext);
  const [isMatching, setIsMatching] = useState<boolean>(true);
  const [selected, setSelected] = useState(isMatching);

  const handleToggle = (value: any) => {
    setSelected(value);
    setIsMatching(value);
    if (filterContext) {
      filterContext.setIsMatching(value);
    }
  };

  // Abonnement à l'observable pour afficher les résultats
  const [recipeCollection, setRecipeCollection] = useState<RecipeType[]>([]);
  useEffect(() => {
    const subscription = ResultsList$.subscribe(setRecipeCollection);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="flex-row" style={{ justifyContent: "center" }}>
      {matching ? (
        <div className="dyna-filter-container">
          <span>
            Afficher les recettes qui n'ont pas tous les ingrédients que vous
            avez sélectionnés{" "}
          </span>
          <button
            onClick={() => handleToggle(true)}
            disabled={selected === true}
          >
            oui
          </button>
          <button
            onClick={() => handleToggle(false)}
            disabled={selected === false}
          >
            non
          </button>
        </div>
      ) : null}
      {display ? <DisplayCardOrItem /> : null}
    </div>
  );
};

export default DynamicFilter;
