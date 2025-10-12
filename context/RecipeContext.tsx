import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Recipe, Favorite } from '../types';
import { useAuth } from './AuthContext';

interface RecipeContextType {
  recipes: Recipe[];
  favorites: Favorite[];
  userId: string | null;
  setIsFavorite: (recipeId: string,value:boolean) => void;
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

const RecipesProvider=({children}:{children:ReactNode})=>{
  const {currentUser}=useAuth();
  const [recipes,setRecipes]=useState<Recipe[]>([]);
  const [favorites,setFavorites]=useState<Favorite[]>([])
  const isRecipeFavorite=(recipeId: string)=>{
    // return new Promise((res,rej)=>{
    //   setTimeout(()=>{
    //     res(true);
    //   },100)
    // })
    return true
  }
  useEffect(()=>{
    setRecipes([]);

  },[])
  const setIsFavorite=(recipeId: string,value:boolean)=>{
    
  }
  return <RecipeContext.Provider value={{recipes,favorites,setIsFavorite,isRecipeFavorite,userId:currentUser?.uid||null}}>
      {children}
  </RecipeContext.Provider>
}

export default RecipesProvider