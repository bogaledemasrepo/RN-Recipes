import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,Share, Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe"; // Import this
import { useRecipeContext } from "../context/RecipeContext";
import { parseIngredients } from "../utils/parseIngredient";

const { width } = Dimensions.get("window");

const DetailScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const { recipes, favorites, toggleFavorite } = useRecipeContext();
  const { recipe } = route.params as { recipe: any };

  if (!recipe) return <Text style={styles.errorText}>Recipe not found.</Text>;

  const fullRecipe = recipes.find((r) => r.idMeal === recipe.idMeal) || recipe;
  const ingredients = parseIngredients(fullRecipe);
  const isFavorite = favorites.includes(fullRecipe.idMeal);
  const [playing, setPlaying] = useState(false);

  // Helper: Extracts "xcjSyakoWua" from "https://www.youtube.com/watch?v=xcjSyakoWua"
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

// ... inside the component
const onShare = async () => {
  try {
    const result = await Share.share({
      message: `Check out this amazing ${fullRecipe.strMeal} recipe! \n\nWatch it here: ${fullRecipe.strYoutube}`,
      url: fullRecipe.strYoutube, // iOS support for link preview
      title: `Recipe: ${fullRecipe.strMeal}`,
    });
  } catch (error: any) {
    Alert.alert("Error", "Could not share the recipe");
  }
};

  const videoId = getYouTubeId(fullRecipe.strYoutube);

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />

      {/* Floating Header Buttons */}
<View style={styles.headerOverlay}>
  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
    <Ionicons name="chevron-back" size={24} color="#1A1A1A" />
  </TouchableOpacity>

  <View style={styles.rightHeaderButtons}>
    <TouchableOpacity onPress={onShare} style={styles.iconButton}>
      <Ionicons name="share-outline" size={22} color="#1A1A1A" />
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

          <Text style={styles.categoryTag}>
            {fullRecipe.strCategory || "Recipe"}
          </Text>
          <Text style={styles.recipeTitle}>{fullRecipe.strMeal}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={18} color="#FF6F61" />
              <Text style={styles.statText}>
                {fullRecipe.strCookTime ?? "35 Minutes"}
              </Text>
            </View>

            <View style={styles.statItem}>
              <Ionicons name="people-outline" size={18} color="#FF6F61" />
              <Text style={styles.statText}>
                {fullRecipe.strServings ?? "4 Servants"}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

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
                  <Text style={styles.measureText}>{ing.measure}</Text>{" "}
                  {ing.ingredient}
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
            {fullRecipe.strInstructions.replace(/\r\n/g, "\n")}
          </Text>
          {/* YOUTUBE SECTION */}
          {videoId && (
            <View style={styles.videoSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="logo-youtube" size={22} color="#FF0000" />
                <Text style={styles.sectionTitle}>Video Tutorial</Text>
              </View>

              <View style={styles.videoWrapper}>
                <YoutubePlayer
                  height={((width - 48) * 9) / 16} // Maintains 16:9 aspect ratio
                  play={playing}
                  videoId={videoId}
                />
              </View>
            </View>
          )}
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
  heroImage: {
    width: width,
    height: width * 0.9,
  },
  contentCard: {
    marginTop: -30,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 16,
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
    lineHeight: 28,
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
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 4,
  },
  statItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF8F7", // Very light tint of your main color
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: "#FFEFED",
  },
  statText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#4A4A4A",
  },
   videoSection: {
    marginTop: 32,
  },
  videoWrapper: {
    borderRadius: 16,
    overflow: "hidden", // Clips the video corners to match the professional aesthetic
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  headerOverlay: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  rightHeaderButtons: {
    flexDirection: "row",
    gap: 12, // Space between share and heart buttons
  },
  iconButton: {
    backgroundColor: "rgba(255, 255, 255, 0.95)", // Slightly more opaque for better legibility
    width: 44, // Uniform size for all header buttons
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    // Premium soft shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});

export default DetailScreen;
