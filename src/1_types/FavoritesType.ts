import { IngredientType } from "./IngredientType";
import { RecipeType } from "./RecipeType";

export interface FavoritesType {
  recipes: RecipeType[];
  ingredients: IngredientType[];
}
