import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Recipe } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SuccessToast from "../components/toast";

interface RecipeContextType {
  recipes: Recipe[];
  toggleFavorite: (value: Recipe) => void;
  loading: boolean;
  favorites: Recipe[];
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
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

  async function getRecipes() {
    setLoading(true);
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?f=b",
      );
      const data = (await response.json()) as { meals: Recipe[] };
      setLoading(false);
      setRecipes(data.meals);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  const getFavorites = async () => {
    AsyncStorage.getItem("favorites").then((data) => {
      if (data) {
        setFavorites(JSON.parse(data));
      }
    });
  };
  const toggleFavorite = (value: Recipe) => {
    let updatedFavorites: Recipe[] = [];
    if (favorites.find((item) => item.idMeal === value.idMeal)) {
      updatedFavorites = favorites.filter(
        (item) => item.idMeal !== value.idMeal,
      );
      setToastMessage("Added to Favorites");
      setShowToast(true);
    } else {
      updatedFavorites = [...favorites, value];
      setToastMessage("Removed from Favorites");
      setShowToast(true);
    }
    setFavorites(updatedFavorites);
    AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  useEffect(() => {
    getRecipes();
    getFavorites();
  }, []);

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
      <SuccessToast
        visible={showToast}
        message={toastMessage}
        onHide={() => setShowToast(false)}
      />
    </RecipeContext.Provider>
  );
};

export default RecipesProvider;
