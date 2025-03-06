import { FC } from "react";
import { RecipeStageType } from "../../1_types/RecipeStageType";

const IngredientResume: FC<{
  stageList: Array<RecipeStageType>;
}> = ({ stageList }) => {
  return (
    <>
      {stageList && stageList.length > 0 ? (
        stageList.map((stage, index) => (
          <article key={index} className="recipe-stage">
            <span>{stage.stage}</span>
            <span>{stage.content}</span>
          </article>
        ))
      ) : (
        <article>Aucune étape trouvée.</article>
      )}
    </>
  );
};

export default IngredientResume;
