import React, { FC, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import DetailScreen from "./screens/DetailScreen";
import * as SplashScreen from 'expo-splash-screen';
import { useRecipeContext } from "./context/RecipeContext";

export type RootStackParamList = {
  Index: undefined;
  Favorites: undefined;
  Detail: undefined;
};

export type HomeScreenProps = {
  navigation: any;
};

export type FavoritesScreenProps = {
  navigation: any;
};
SplashScreen.preventAutoHideAsync();
const AppNavigator: FC = () => {
  const {loading}=useRecipeContext();
  const Stack = createStackNavigator<RootStackParamList>();
  useEffect(() => {
    console.log(loading,"LOADING...",Date.now())
    if (!loading) {
      SplashScreen.hide();
    }
  }, [loading]);
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Index" component={HomeScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
