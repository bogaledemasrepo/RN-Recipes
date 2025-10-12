// src/App.tsx

import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from './context/AuthContext'; // Assuming you have this working

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

// --------------------------------------------------------------------------
// 1. TYPE DEFINITIONS
// --------------------------------------------------------------------------

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
export type HomeScreenProbs = NativeStackScreenProps<TabNavigatorParamList, 'Home'>;
export type FavoritesScreenProbs = NativeStackScreenProps<TabNavigatorParamList, 'Favorites'>;
export type AccountScreenProbs = NativeStackScreenProps<TabNavigatorParamList, 'Account'>;


// 1.3 Root Stack (Wraps the Tab Navigator and additional full-screen modals/details)
export type RootStackNavigatorParamList = {
  Root: undefined; // The tab navigator is nested here
  Search: undefined;
  Detail: { recipeId: string }; // Example: Detail screen takes a parameter
};
// Note: React Navigation v6 NativeStackScreenProps is preferred for new stacks, 
// but using the generic StackNavigationProp for compatibility with your createStackNavigator call
export type RooScreenProbs = NativeStackScreenProps<RootStackNavigatorParamList, 'Root'>;
export type SearchScreenProbs = NativeStackScreenProps<RootStackNavigatorParamList, 'Search'>;
export type DetailScreenProbs = NativeStackScreenProps<RootStackNavigatorParamList, 'Detail'>;


// --------------------------------------------------------------------------
// 2. TYPED NAVIGATOR INSTANCES
// --------------------------------------------------------------------------

// Create typed instances of the navigators
const AuthStackInstance = createStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<TabNavigatorParamList>();
const RootStackInstance = createStackNavigator<RootStackNavigatorParamList>();


// --------------------------------------------------------------------------
// 3. NAVIGATOR COMPONENTS
// --------------------------------------------------------------------------

/**
 * Stack for Login, Register, and Index screens (No header)
 */
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
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Favorites" component={FavoritesScreen} />
    <Tab.Screen name="Account" component={AccountScreen} />
  </Tab.Navigator>
);

/**
 * Main application stack: wraps the tabs, and allows detail/search screens 
 * to be displayed over the tabs.
 */
const RootStackNavigator: FC = () => (
  <RootStackInstance.Navigator>
    {/* The Tab Navigator is embedded here */}
    <RootStackInstance.Screen name='Root' component={TabNavigator} options={{ headerShown: false }} /> 
    <RootStackInstance.Screen name='Search' component={SearchScreen} />
    <RootStackInstance.Screen name='Detail' component={DetailScreen} />
  </RootStackInstance.Navigator>
);


// --------------------------------------------------------------------------
// 4. MAIN APP ENTRY POINT
// --------------------------------------------------------------------------

/**
 * Conditional rendering based on the authentication state.
 * * Logic:
 * - currentUser is truthy (logged in): Show the main app (RootStackNavigator).
 * - currentUser is falsy (logged out): Show the authentication flow (AuthStack).
 */
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

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import SearchScreen from './screens/SearchScreen';
// import FavoritesScreen from './screens/FavoritesScreen';
// import DetailScreen from './screens/DetailScreen';
// import LoginScreen from './screens/LoginScreen';
// import RegisterScreen from './screens/RegisterScreen';
// import IndexScreen from './screens/IndexScreen';
// import { useAuth } from './context/AuthContext';
// import HomeScreen from './screens/HomeScreen';
// import AccountScreen from './screens/AccountScreen';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';


// export type AuthStackParamList={
//   Login:undefined,
//   Register:undefined,
//   Index:undefined
// }
// export type TabNavigatorParamList={
//   Home:undefined,
//   Favorites:undefined,
//   Account:undefined
// }
// export type RootStackNavigatorParamList={
//   Root:undefined,
//   Search:undefined,
//   Detail:undefined
// }

// export type IndexScreenProps = NativeStackScreenProps<AuthStackParamList, 'Index'>;
// export type LoginScreenProbs= NativeStackScreenProps<AuthStackParamList, 'Login'>;
// export type RegisterScreenProbs= NativeStackScreenProps<AuthStackParamList, 'Register'>;

// export type HomeScreenProbs= NativeStackScreenProps<TabNavigatorParamList, 'Home'>;
// export type FavoritesScreenProbs= NativeStackScreenProps<TabNavigatorParamList, 'Favorites'>;
// export type AccountScreenProbs= NativeStackScreenProps<TabNavigatorParamList, 'Account'>;

// export type RooScreenProbs= NativeStackScreenProps<RootStackNavigatorParamList, 'Root'>;
// export type SearchScreenProbs= NativeStackScreenProps<RootStackNavigatorParamList, 'Search'>;
// export type DetailScreenProbs= NativeStackScreenProps<RootStackNavigatorParamList, 'Detail'>;

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// const AuthStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Login" component={LoginScreen} />
//     <Stack.Screen name="Register" component={RegisterScreen} />
//     <Stack.Screen name="Index" component={IndexScreen} />
//   </Stack.Navigator>
// );

// const TabNavigator= ()=>(
//   <Tab.Navigator>
//     <Tab.Screen name="Home" component={HomeScreen} />
//     <Tab.Screen name="Favorites" component={FavoritesScreen} />
//     <Tab.Screen name="Account" component={AccountScreen} />
//   </Tab.Navigator>)
// const RootStackNavigator=()=>(
// <Stack.Navigator>
//   <Stack.Screen name='Root' component={TabNavigator} />
//   <Stack.Screen name='Search' component={SearchScreen} />
//   <Stack.Screen name='Detail' component={DetailScreen} />
// </Stack.Navigator>)
// const AppNavigator: React.FC = () => {
//   const {currentUser}=useAuth();
//   return (
//     <NavigationContainer>
//       {currentUser&&<AuthStack />}
//       {!currentUser&&<RootStackNavigator />}
//     </NavigationContainer>
//   );
// };


// export default AppNavigator;