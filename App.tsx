import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import AppNavigator from './AppNavigator';
import { firebaseConfig, initialAuthToken, appId } from './utils/firebaseConfig';
import { Recipe, Favorite } from './types';

const App = () => {
  const [db, setDb] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    try {
      if (!firebaseConfig || !firebaseConfig.apiKey) {
        console.warn("Firebase configuration is missing. Favorites feature will be disabled.");
        setIsAuthReady(true);
        return;
      }
      const firebaseApp = initializeApp(firebaseConfig);
      const authInstance = getAuth(firebaseApp);
      const dbInstance = getFirestore(firebaseApp);
      setDb(dbInstance);

      onAuthStateChanged(authInstance, (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          setUserId(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
        }
        setIsAuthReady(true);
      });

      const initialAuth = async () => {
        if (initialAuthToken) {
          await signInWithCustomToken(authInstance, initialAuthToken);
        } else {
          await signInAnonymously(authInstance);
        }
      };
      initialAuth();
    } catch (e) {
      console.error("Firebase Initialization Error:", e);
      setIsAuthReady(true);
    }
  }, []);

  useEffect(() => {
    if (!db || !userId || !isAuthReady) return;
    const favoritesCollectionPath = `artifacts/${appId}/users/${userId}/favorites`;
    const q = collection(db, favoritesCollectionPath);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newFavorites: Favorite[] = snapshot.docs.map(doc => ({
        ...(doc.data() as Omit<Favorite, 'firestoreId'>),
        firestoreId: doc.id,
      }));
      setFavorites(newFavorites);
    }, (error) => {
      console.error("Error listening to favorites:", error);
    });
    return () => unsubscribe();
  }, [db, userId, isAuthReady]);

  const isRecipeFavorite = (recipeId: string): boolean => {
    return favorites.some(fav => fav.idMeal === recipeId);
  };

  const toggleFavorite = async (recipe: Recipe | Favorite) => {
    if (!db || !userId) {
      setMessage("Authentication required for favorites.");
      return;
    }
    const favoritesCollectionPath = `artifacts/${appId}/users/${userId}/favorites`;
    const favDocRef = doc(db, favoritesCollectionPath, recipe.idMeal);
    if (isRecipeFavorite(recipe.idMeal)) {
      try {
        await deleteDoc(favDocRef);
        setMessage(`${recipe.strMeal} removed from favorites!`);
      } catch (e) {
        console.error("Error removing document: ", e);
      }
    } else {
      const favoriteData: Omit<Favorite, 'firestoreId'> = {
        idMeal: recipe.idMeal,
        strMeal: recipe.strMeal,
        strCategory: recipe.strCategory,
        strMealThumb: recipe.strMealThumb,
        timestamp: new Date().toISOString(),
      };
      try {
        await setDoc(favDocRef, favoriteData);
        setMessage(`${recipe.strMeal} added to favorites!`);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppNavigator
        recipes={recipes}
        setRecipes={setRecipes}
        favorites={favorites}
        userId={userId}
        isAuthReady={isAuthReady}
        toggleFavorite={toggleFavorite}
        isRecipeFavorite={isRecipeFavorite}
      />
      {message ? (
        <View style={styles.messageBox}>
          <Text style={styles.messageBoxText}>{message}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messageBox: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FF6F61',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  messageBoxText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default App;