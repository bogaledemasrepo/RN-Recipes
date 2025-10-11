import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RecipeCard from '../components/RecipeCard';
import { Favorite } from '../types';

interface FavoritesScreenProps {
  favorites: Favorite[];
  isAuthReady: boolean;
  userId: string | null;
  toggleFavorite: (recipe: Favorite) => Promise<void>;
  isRecipeFavorite: (recipeId: string) => boolean;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ favorites, isAuthReady, userId, toggleFavorite, isRecipeFavorite }) => {
  const navigation = useNavigation();

  const handleRecipePress = (item: Favorite) => {
    navigation.navigate('Detail', { recipe: item });
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.heading}>Your Favorite Recipes</Text>
      {!isAuthReady ? (
        <ActivityIndicator size="large" color="#FF6F61" style={styles.loadingIndicator} />
      ) : (
        <>
          {userId && <Text style={styles.userIdDisplay}>User ID: {userId}</Text>}
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.idMeal}
            renderItem={({ item }) => (
              <RecipeCard
                item={item}
                userId={userId}
                toggleFavorite={toggleFavorite}
                isRecipeFavorite={isRecipeFavorite}
                onPress={handleRecipePress}
              />
            )}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>You haven't saved any favorites yet!</Text>
              </View>
            )}
            style={{ flex: 1 }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  userIdDisplay: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default FavoritesScreen;