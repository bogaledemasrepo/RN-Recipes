import { Recipe } from "../types";

export const MOCK_RECIPES: Recipe[] = [
  {
    idMeal: '52855',
    strMeal: 'Classic French Omelette',
    strCategory: 'Breakfast',
    strArea: 'French',
    strInstructions: 'Whisk eggs vigorously. Melt butter in a pan over medium-low heat. Pour eggs in. As the eggs set, push the cooked egg from the edges toward the center. Tilt the pan to allow uncooked egg to flow underneath. Remove when mostly set but still slightly wet. Fold into an oval shape.',
    strMealThumb: 'https://placehold.co/150x150/007aff/FFFFFF?text=Omelette',
    strIngredient1: 'Eggs', strMeasure1: '3', strIngredient2: 'Butter', strMeasure2: '1 tbsp', strIngredient3: 'Salt', strMeasure3: 'Pinch', strIngredient4: 'Pepper', strMeasure4: 'Pinch',
  },
  {
    idMeal: '52955',
    strMeal: 'Beef and Broccoli Stir Fry',
    strCategory: 'Beef',
    strArea: 'Chinese',
    strInstructions: 'Slice beef thinly. Marinate beef with soy sauce and cornstarch. Stir-fry broccoli until tender-crisp. Remove. Stir-fry beef until browned. Add sauce (soy, oyster, ginger) and broccoli back. Serve over rice.',
    strMealThumb: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=Stir+Fry',
    strIngredient1: 'Beef sirloin', strMeasure1: '1 lb', strIngredient2: 'Broccoli florets', strMeasure2: '2 cups',
    strIngredient3: 'Soy Sauce', strMeasure3: '1/4 cup', strIngredient4: 'Cornstarch', strMeasure4: '1 tbsp',
  },
  {
    idMeal: '53000',
    strMeal: 'Chocolate Lava Cake',
    strCategory: 'Dessert',
    strArea: 'French',
    strInstructions: 'Melt chocolate and butter. Whisk in eggs and sugar. Fold in flour. Bake in a high-heat oven for 12-14 minutes until the edges are firm but the center is soft. Serve immediately with ice cream.',
    strMealThumb: 'https://placehold.co/150x150/F44336/FFFFFF?text=Lava+Cake',
    strIngredient1: 'Dark Chocolate', strMeasure1: '4 oz', strIngredient2: 'Butter', strMeasure2: '1/2 cup',
    strIngredient3: 'Eggs', strMeasure3: '2', strIngredient4: 'Sugar', strMeasure4: '1/4 cup',
  },
];