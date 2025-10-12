import React from 'react'
import AppNavigator from './AppNavigator'
import { AuthProvider } from './context/AuthContext'
import RecipesProvider from './context/RecipeContext'

const App = () => {
  return (
    <AuthProvider>
      <RecipesProvider>
        <AppNavigator/>
      </RecipesProvider>
    </AuthProvider>
  )
}

export default App