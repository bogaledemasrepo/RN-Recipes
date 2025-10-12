import React, { createContext, useContext } from 'react';
import { Recipe, Favorite } from '../types';

interface RecipeContextType {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  favorites: Favorite[];
  userId: string | null;
  isAuthReady: boolean;
  toggleFavorite: (recipe: Recipe | Favorite) => Promise<void>;
  isRecipeFavorite: (recipeId: string) => boolean;
}

export const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipeContext must be used within a RecipeContext.Provider');
  }
  return context;
};