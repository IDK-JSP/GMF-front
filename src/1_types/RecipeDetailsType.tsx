import { RecipeIngredientType } from "./RecipeIngredientType";
import { RecipeOpinionsType } from "./RecipeOpinionsType";
import { RecipeStageType } from "./RecipeStageType";

export interface RecipeDetailsType {
  id_recipe: number;
  ingredientDetails: RecipeIngredientType[];
  stages: RecipeStageType[];
  opinions: RecipeOpinionsType[];
}
