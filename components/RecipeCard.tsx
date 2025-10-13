import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { Recipe, Favorite } from '../types';
import { MaterialIcons } from '@expo/vector-icons';

interface RecipeCardProps {
  item: Recipe | Favorite;
  userId: string | null;
  toggleFavorite: (recipe: Recipe | Favorite) =>void;
  isRecipeFavorite: (recipeId: string) => boolean;
  onPress: (item: Recipe | Favorite) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ item, userId, toggleFavorite, isRecipeFavorite, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
    <Image
      style={styles.cardImage}
      source={{ uri: item.strMealThumb || 'https://placehold.co/60x60/CCCCCC/333333?text=N/A' }}
      resizeMode="cover"
    />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle} numberOfLines={1}>{item.strMeal}</Text>
      <Text style={styles.cardSubtitle}>{item.strCategory}</Text>
      <Text style={styles.userIdText}>
        User: {userId ? userId.substring(0, 8) + '...' : 'Loading'}
      </Text>
    </View>
    <TouchableOpacity
      onPress={() => toggleFavorite(item)}
      disabled={!userId}
    >
      <MaterialIcons name="favorite" size={24}  color={"#33333340"}  />
    </TouchableOpacity>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  userIdText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  favoriteButton: {
    padding: 8,
    justifyContent: 'center',

  },
  favoriteIcon: {
    fontSize: 20,
  },
});

export default RecipeCard;