export interface Ingredient {
  id: number;
  ingredient: string;
  measure: string;
}

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string | null;
  [key: string]: any;
}

export interface Favorite {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string | null;
  fireStoreId: string;
  timestamp: string;
}