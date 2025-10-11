import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RecipeCard from '../components/RecipeCard';
import { Recipe, Favorite } from '../types';
import { MOCK_RECIPES } from '../utils/mockdata';

interface SearchScreenProps {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  userId: string | null;
  toggleFavorite: (recipe: Recipe | Favorite) => Promise<void>;
  isRecipeFavorite: (recipeId: string) => boolean;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ recipes, setRecipes, userId, toggleFavorite, isRecipeFavorite }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setRecipes([]);
      return;
    }
    setIsLoading(true);
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    await delay(1500);
    const results = MOCK_RECIPES.filter(r =>
      r.strMeal.toLowerCase().includes(query.toLowerCase()) ||
      (r.strIngredient1 && r.strIngredient1.toLowerCase().includes(query.toLowerCase())) ||
      (r.strIngredient2 && r.strIngredient2.toLowerCase().includes(query.toLowerCase()))
    );
    setRecipes(results);
    setIsLoading(false);
  }, [setRecipes]);

  const handleRecipePress = (item: Recipe | Favorite) => {
    navigation.navigate('Detail', { recipe: item });
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.heading}>Recipe Finder</Text>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.input}
          placeholder="e.g. Chicken, Pasta, Eggs"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCorrect={false}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={[styles.searchButton, (isLoading || !searchQuery.trim()) && styles.searchButtonDisabled]}
          onPress={() => handleSearch(searchQuery)}
          disabled={isLoading || !searchQuery.trim()}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.searchButtonText}>Search</Text>
          )}
        </TouchableOpacity>
      </View>
      <FlatList
        data={recipes}
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
            {isLoading ? null : (
              <Text style={styles.emptyText}>
                Start typing to find delicious recipes!
              </Text>
            )}
          </View>
        )}
        style={{ flex: 1 }}
      />
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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 8,
  },
  searchButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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

export default SearchScreen;