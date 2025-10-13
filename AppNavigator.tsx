// src/App.tsx

import React, { FC } from 'react';
import { CompositeScreenProps, NavigationContainer } from '@react-navigation/native';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from './context/AuthContext'; // Assuming you have this working

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Import all your screen components
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import IndexScreen from './screens/IndexScreen';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import AccountScreen from './screens/AccountScreen';
import SearchScreen from './screens/SearchScreen';
import DetailScreen from './screens/DetailScreen';
import { ActivityIndicator, View } from 'react-native';
import { Favorite, Recipe } from './types';

// 1.1 Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Index: undefined;
};
export type IndexScreenProps = NativeStackScreenProps<AuthStackParamList, 'Index'>;
export type LoginScreenProbs = NativeStackScreenProps<AuthStackParamList, 'Login'>;
export type RegisterScreenProbs = NativeStackScreenProps<AuthStackParamList, 'Register'>;


// 1.2 Tab Navigator
export type TabNavigatorParamList = {
  Home: undefined;
  Favorites: undefined;
  Account: undefined;
};
// export type HomeScreenProbs = NativeStackScreenProps<TabNavigatorParamList, 'Home'>;
export type FavoritesScreenProbs = NativeStackScreenProps<TabNavigatorParamList, 'Favorites'>;
export type AccountScreenProbs = NativeStackScreenProps<TabNavigatorParamList, 'Account'>;


// 1.3 Root Stack (Wraps the Tab Navigator and additional full-screen modals/details)
export type RootStackNavigatorParamList = {
  Root: undefined; // The tab navigator is nested here
  Search: undefined;
  Detail: { recipe:Recipe | Favorite }; // Example: Detail screen takes a parameter
};
// Note: React Navigation v6 NativeStackScreenProps is preferred for new stacks, 
// but using the generic StackNavigationProp for compatibility with your createStackNavigator call
export type RooScreenProbs = NativeStackScreenProps<RootStackNavigatorParamList, 'Root'>;
export type SearchScreenProbs = NativeStackScreenProps<RootStackNavigatorParamList, 'Search'>;
export type DetailScreenProbs = NativeStackScreenProps<RootStackNavigatorParamList, 'Detail'>;

// Create typed instances of the navigators
const AuthStackInstance = createStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<TabNavigatorParamList>();
const RootStackInstance = createStackNavigator<RootStackNavigatorParamList>();


const AuthStack: FC = () => (
  <AuthStackInstance.Navigator screenOptions={{ headerShown: false }}>
    <AuthStackInstance.Screen name="Login" component={LoginScreen} />
    <AuthStackInstance.Screen name="Register" component={RegisterScreen} />
    <AuthStackInstance.Screen name="Index" component={IndexScreen} />
  </AuthStackInstance.Navigator>
);

/**
 * The main bottom tab bar screens
 */
const TabNavigator: FC = () => (
  <Tab.Navigator screenOptions={{headerShown:false}}>
    <Tab.Screen name="Home" component={HomeScreen} options={{
      tabBarIcon:({color,size})=><FontAwesome5 name="home" size={size} color={color} />}} />
    <Tab.Screen name="Favorites" component={FavoritesScreen} options={{
      tabBarIcon:({color,size})=><MaterialIcons name="favorite" size={size}  color={color}  />}} />
    <Tab.Screen name="Account" component={AccountScreen} options={{
      tabBarIcon:({color,size})=> <FontAwesome name="user" size={size}  color={color}  />}}/>
  </Tab.Navigator>
);

/**
 * Main application stack: wraps the tabs, and allows detail/search screens 
 * to be displayed over the tabs.
 */
const RootStackNavigator: FC = () => (
  <RootStackInstance.Navigator screenOptions={{ headerShown: false }}>
    {/* The Tab Navigator is embedded here */}
    <RootStackInstance.Screen name='Root' component={TabNavigator} /> 
    <RootStackInstance.Screen name='Search' component={SearchScreen} />
    <RootStackInstance.Screen name='Detail' component={DetailScreen} />
  </RootStackInstance.Navigator>
);

export type HomeScreenProbs = CompositeScreenProps<
  BottomTabScreenProps<TabNavigatorParamList, 'Home'>, // The screen is 'Home' in the Tab Navigator
  NativeStackScreenProps<RootStackNavigatorParamList>   // The parent navigator is the Root Stack
>;

const AppNavigator: FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // Render a loading screen while checking the initial auth state
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* CORRECTED LOGIC: */}
      {currentUser ? <RootStackNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;