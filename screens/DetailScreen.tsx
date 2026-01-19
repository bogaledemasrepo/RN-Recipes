import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRecipeContext } from "../context/RecipeContext";
import { parseIngredients } from "../utils/parseIngredient";

const { width } = Dimensions.get("window");

const DetailScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { recipes, favorites, toggleFavorite } = useRecipeContext();
  const { recipe } = route.params as { recipe: any };

  if (!recipe) return <Text style={styles.errorText}>Recipe not found.</Text>;

  const fullRecipe = recipes.find((r) => r.idMeal === recipe.idMeal) || recipe;
  const ingredients = parseIngredients(fullRecipe);
  const isFavorite = favorites.includes(fullRecipe.idMeal);

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      
      {/* Floating Header Buttons */}
      <View style={styles.headerOverlay}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => toggleFavorite(fullRecipe)} 
          style={styles.iconButton}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite ? "#FF6F61" : "#1A1A1A"} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Full-width Image */}
        <Image
          style={styles.heroImage}
          source={{ uri: fullRecipe.strMealThumb }}
          resizeMode="cover"
        />

        {/* Content Container */}
        <View style={styles.contentCard}>
          <View style={styles.indicator} />
          
          <Text style={styles.categoryTag}>{fullRecipe.strCategory || "Recipe"}</Text>
          <Text style={styles.recipeTitle}>{fullRecipe.strMeal}</Text>
          
          <View style={styles.divider} />

          {/* Ingredients Section */}
          <View style={styles.sectionHeader}>
            <Ionicons name="basket-outline" size={22} color="#FF6F61" />
            <Text style={styles.sectionTitle}>Ingredients</Text>
          </View>
          
          <View style={styles.ingredientsGrid}>
            {ingredients.map((ing) => (
              <View key={ing.id} style={styles.ingredientItem}>
                <View style={styles.bullet} />
                <Text style={styles.ingredientText}>
                  <Text style={styles.measureText}>{ing.measure}</Text> {ing.ingredient}
                </Text>
              </View>
            ))}
          </View>

          {/* Instructions Section */}
          <View style={styles.sectionHeader}>
            <Ionicons name="journal-outline" size={22} color="#FF6F61" />
            <Text style={styles.sectionTitle}>Instructions</Text>
          </View>
          <Text style={styles.instructionsText}>
            {fullRecipe.strInstructions.replace(/\r\n/g, '\n')}
          </Text>
          
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerOverlay: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },
  iconButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  heroImage: {
    width: width,
    height: width * 0.9,
  },
  contentCard: {
    marginTop: -30,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  indicator: {
    width: 40,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  categoryTag: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF6F61",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 16,
    lineHeight:28,
  },
  divider: {
    height: 1,
    backgroundColor: "#F2F2F2",
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  ingredientsGrid: {
    marginBottom: 24,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF6F61",
    marginRight: 12,
  },
  measureText: {
    fontWeight: "700",
    color: "#1A1A1A",
  },
  ingredientText: {
    fontSize: 12,
    color: "#4A4A4A",
  },
  instructionsText: {
    fontSize: 13,
    color: "#4A4A4A",
    lineHeight: 26,
    textAlign: "justify",
  },
  errorText: {
    textAlign: "center",
    marginTop: 100,
    fontSize: 18,
    color: "#666",
  },
});

export default DetailScreen;