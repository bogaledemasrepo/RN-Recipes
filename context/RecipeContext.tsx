import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Recipe, Favorite } from "../types";

interface RecipeContextType {
  recipes: Recipe[];
  toggleFavorite: (value: Favorite) => void;
  loading: boolean;
  favorites: Favorite[];
}

export const RecipeContext = createContext<RecipeContextType | undefined>(
  undefined,
);

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error(
      "useRecipeContext must be used within a RecipeContext.Provider",
    );
  }
  return context;
};

const RecipesProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    try {
      async function getRecipes() {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?f=b",
        );
        const data = (await response.json()) as { meals: Recipe[] };
        setLoading(false);
        setRecipes(data.meals);
      }
      getRecipes();
    } catch (error) {
      setLoading(false);
    }

    setLoading(false);
  }, []);
  const toggleFavorite = (value: Favorite) => {};
  return (
    <RecipeContext.Provider
      value={{
        recipes,
        favorites,
        toggleFavorite,
        loading,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipesProvider;
