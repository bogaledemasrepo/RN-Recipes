import React, { useEffect } from "react";
import AppNavigator from "./AppNavigator";
import RecipesProvider from "./context/RecipeContext";


const App = () => {
  // Keep the splash screen visible while we fetch resources


  return (
    <RecipesProvider>
      <AppNavigator />
    </RecipesProvider>
  );
};

export default App;
