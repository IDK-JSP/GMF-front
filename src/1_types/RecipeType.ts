export interface RecipeType {
  id_recipe: number;
  email: string;
  title: string;
  content: string;
  image: string;
  person?: number;
  state?: string;
  rate?: number;
  nbRate?: number;
  create?: string;
  update?: string;
  matching_ingredients?: number;
  diet: string;
  favorite?: string;
}
