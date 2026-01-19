import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RecipeCard from '../components/RecipeCard';
import { useRecipeContext } from '../context/RecipeContext';
import { Recipe, Favorite } from '../types';

const SearchScreen: React.FC = () => {
  const { recipes, userId, toggleFavorite } = useRecipeContext();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      return;
    }
    setIsLoading(true);
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    await delay(1500);
    setIsLoading(false);
  }, []);

  const handleRecipePress = (item: any) => {
    // navigation.navigate('Detail', { recipe: item });
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
            isRecipeFavorite={() => false}
            onPress={handleRecipePress} toggleFavorite={function (recipe: Recipe | Favorite): void {
              throw new Error('Function not implemented.');
            } }          />
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