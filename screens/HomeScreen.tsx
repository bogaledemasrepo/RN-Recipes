import React from "react";
import { View, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import RecipeCard from "../components/RecipeCard";
import { useRecipeContext } from "../context/RecipeContext";
import { Favorite, Recipe } from "../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ListHeader from "../components/header";
import EmptyState from "../components/ListEmpty";
import { Skeleton } from "../components/skeleton";

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { loading, recipes, getRecipes } = useRecipeContext();
  const handleRecipePress = (item: Recipe | Favorite) => {
    navigation.navigate("Detail", { recipe: item });
  };
  const handleFavoritePress = () => {
    navigation.navigate("Favorites");
  };
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.screenContainer,
        { paddingTop: top, paddingBottom: bottom },
      ]}
    >
      <ListHeader onFavoritePress={handleFavoritePress} />

      {loading ? (
        <View style={{ flex: 1, display: 'flex', flexDirection:"column", gap:8,marginTop:16, paddingHorizontal:8 }}>
          {[1, 2, 3, 4, 5, 6].map((_, index) => <Skeleton key={index} />)}
        </View>
      ) : (
        <FlashList
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={getRecipes}
          data={recipes}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <RecipeCard item={item} onPress={() => handleRecipePress(item)} />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={EmptyState}
          style={{ flex: 1 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  userIdDisplay: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
  },
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default HomeScreen;
