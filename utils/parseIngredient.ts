import { Recipe, Ingredient } from '../types';

export const parseIngredients = (recipe: Recipe): Ingredient[] => {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;
    const ingredient = recipe[ingredientKey] as string;
    const measure = recipe[measureKey] as string;
    if (ingredient && ingredient.trim() !== '' && ingredient.trim() !== 'null') {
      ingredients.push({
        id: i,
        ingredient: ingredient,
        measure: measure ? measure : '',
      });
    }
  }
  return ingredients;
};