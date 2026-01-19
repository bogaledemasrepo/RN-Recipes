import React from "react";
import AppNavigator from "./AppNavigator";
import RecipesProvider from "./context/RecipeContext";

const App = () => {
  return (
    <RecipesProvider>
      <AppNavigator />
    </RecipesProvider>
  );
};

export default App;
