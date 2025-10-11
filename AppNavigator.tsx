import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from './screens/DetailScreen';
import FavoritesScreen from './screens/FavoriteScreen';
import SearchScreen from './screens/SearchScreen';
import { Recipe, Favorite } from './types';
import TabButton from './components/TabButton';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

interface AppNavigatorProps {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  favorites: Favorite[];
  userId: string | null;
  isAuthReady: boolean;
  toggleFavorite: (recipe: Recipe | Favorite) => Promise<void>;
  isRecipeFavorite: (recipeId: string) => boolean;
}

const SearchStack = ({ recipes, setRecipes, userId, toggleFavorite, isRecipeFavorite }: AppNavigatorProps) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SearchHome">
      {(props) => <SearchScreen {...props} recipes={recipes} setRecipes={setRecipes} userId={userId} toggleFavorite={toggleFavorite} isRecipeFavorite={isRecipeFavorite} />}
    </Stack.Screen>
    <Stack.Screen name="Detail">
      {(props) => <DetailScreen {...props} recipes={recipes} userId={userId} toggleFavorite={toggleFavorite} isRecipeFavorite={isRecipeFavorite} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const FavoritesStack = ({ favorites, userId, isAuthReady, toggleFavorite, isRecipeFavorite }: AppNavigatorProps) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FavoritesHome">
      {(props) => <FavoritesScreen {...props} favorites={favorites} userId={userId} isAuthReady={isAuthReady} toggleFavorite={toggleFavorite} isRecipeFavorite={isRecipeFavorite} />}
    </Stack.Screen>
    <Stack.Screen name="Detail">
      {(props) => <DetailScreen {...props} recipes={[]} userId={userId} toggleFavorite={toggleFavorite} isRecipeFavorite={isRecipeFavorite} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const AppNavigator: React.FC<AppNavigatorProps> = (props) => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarButton: (tabProps) => (
          <TabButton
            icon={route.name === 'Search' ? '🔍' : '❤️'}
            label={route.name}
            isActive={tabProps.accessibilityState?.selected}
            onPress={tabProps.onPress}
            isDisabled={route.name === 'Favorites' && !props.isAuthReady}
          />
        ),
        headerShown: false,
      })}
    >
      <Tab.Screen name="Search">
        {() => <SearchStack {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Favorites">
        {() => <FavoritesStack {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigator;