import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useRecipeContext } from '../context/RecipeContext';
import { parseIngredients } from '../utils/mockdata';
import { SafeAreaView } from 'react-native-safe-area-context';

const DetailScreen: React.FC = () => {
  const { recipes, userId, setIsFavorite, isRecipeFavorite } = useRecipeContext();
  const route = useRoute();
  const { recipe } = route.params as { recipe: any };
  if (!recipe) return <Text style={styles.errorText}>Recipe not found.</Text>;

  const fullRecipe = recipes.find(r => r.idMeal === recipe.idMeal) || recipe;
  const ingredients = parseIngredients(fullRecipe);

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView style={styles.screenContainer} contentContainerStyle={styles.detailScrollContent}>
      <Text style={styles.detailTitle}>{fullRecipe.strMeal}</Text>
      <Text style={styles.detailCategory}>{fullRecipe.strCategory} | {fullRecipe.strArea || 'N/A'}</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.detailImage}
          source={{ uri: fullRecipe.strMealThumb || 'https://placehold.co/300x200/CCCCCC/333333?text=No+Image' }}
          resizeMode="cover"
        />
      </View>
      <TouchableOpacity
        style={[styles.detailFavoriteButton, isRecipeFavorite(fullRecipe.idMeal) && styles.detailFavoriteButtonRed]}
        onPress={() => setIsFavorite(fullRecipe,true)}
        disabled={!userId}
      >
        <Text style={styles.detailFavoriteText}>
          {isRecipeFavorite(fullRecipe.idMeal) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Ingredients:</Text>
      {ingredients.map((ing) => (
        <Text key={ing.id} style={styles.listItem}>
          {`\u2022 ${ing.measure} ${ing.ingredient}`}
        </Text>
      ))}
      <Text style={styles.sectionTitle}>Instructions:</Text>
      <Text style={styles.instructionsText}>{fullRecipe.strInstructions}</Text>
      <View style={{ height: 50 }} />
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  detailScrollContent: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  detailCategory: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  detailImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  detailFavoriteButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  detailFavoriteButtonRed: {
    backgroundColor: '#D32F2F',
  },
  detailFavoriteText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  instructionsText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DetailScreen;