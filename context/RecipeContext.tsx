import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Recipe, Favorite } from '../types';
import { useAuth } from './AuthContext';
import { MOCK_RECIPES } from '../utils/mockdata';
import { Text } from 'react-native';

interface RecipeContextType {
  recipes: Recipe[];
  userId: string | null;
  toggleFavorite: (value: Favorite) => void;
  loading:boolean;
  favorites:Favorite[];
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
  const [loading,setLoading]=useState<boolean>(false);
  useEffect(()=>{
    setLoading(true)
    try {
      async function getRecipes() {
      const response =await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a");
      const data = await response.json() as {meals:Recipe[]}
        setLoading(false)
      setRecipes(data.meals)
      
    }
    getRecipes();
    } catch (error) {
      setLoading(false)
    }
   
setLoading(false)
  },[])
  const toggleFavorite=(value: Favorite)=>{
    
  }
  return <RecipeContext.Provider value={{recipes,favorites,toggleFavorite,loading,userId:currentUser?.uid||null}}>
      {children}
  </RecipeContext.Provider>
}

export default RecipesProvider