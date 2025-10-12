// src/App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/HomeScreen'; // Protected screen
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import RegisterScreen from './screens/RegisterScreen';

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

// Screens for unauthenticated users
const AuthNavigator: React.FC = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

// Screens for authenticated users
const AppNavigator: React.FC = () => (
  <AppStack.Navigator>
    <AppStack.Screen name="Dashboard" component={DashboardScreen} />
  </AppStack.Navigator>
);

// Main component that switches between the navigation stacks
const RootNavigator: React.FC = () => {
  const { currentUser, loading } = useAuth(); // Get state from the context

  if (loading) {
    // Show a loading spinner while Firebase checks the user's initial auth state
    return (
      <View style={loadingStyles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!currentUser && <AuthNavigator/>} 
      {currentUser && <AppNavigator/>} 
    </NavigationContainer>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <RootNavigator />
  </AuthProvider>
);

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;