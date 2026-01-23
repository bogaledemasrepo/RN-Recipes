import React, { useEffect } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { Recipe } from "../types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRecipeContext } from "../context/RecipeContext";

interface RecipeCardProps {
  item: Recipe;
  toggleFavorite?: (recipe: Recipe) => void;
  onPress: (item: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  item,
  toggleFavorite,
  onPress,
}) => {
  const {favorites}=useRecipeContext();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const checkIfFavorite = (item: Recipe) => { 
    setIsFavorite(favorites.some((fav) => fav.idMeal === item.idMeal));
  }
  useEffect(() => {
    checkIfFavorite(item)
  }, []);
  const handleSetFavorite = ()=>{
    if(!toggleFavorite) return;
    setIsFavorite((prev)=>!prev)
    toggleFavorite(item)
  }
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <Image
        style={styles.cardImage}
        source={{
          uri:
            item.strMealThumb ||
            "https://placehold.co/60x60/CCCCCC/333333?text=N/A",
        }}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.strMeal}
        </Text>
        <Text style={styles.cardSubtitle}>{item.strCategory}</Text>
        <Text style={styles.userIdText}>{item.timestamp}</Text>
      </View>
      {toggleFavorite && <TouchableOpacity onPress={handleSetFavorite}>
        <MaterialCommunityIcons name={isFavorite ? "heart-minus-outline" : "heart-plus-outline"} size={20} color={isFavorite ? "#FF6F61" : "#8f8f8f40"} />
      </TouchableOpacity>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    padding: 8,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
  },
  cardImage: {
    width: 60,
    height: "100%",
    borderRadius: 4,
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#888",
    marginTop: 4,
  },
  userIdText: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  favoriteButton: {
    padding: 8,
    justifyContent: "center",
  },
  favoriteIcon: {
    fontSize: 20,
  },
});

export default RecipeCard;
