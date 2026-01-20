import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import RecipeCard from "../components/RecipeCard";
import { useRecipeContext } from "../context/RecipeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FavoritesScreen: React.FC<{navigation: any}> = ({navigation}:{navigation: any}) => {
  const {top,bottom}=useSafeAreaInsets();
  const { loading, favorites ,toggleFavorite} = useRecipeContext();

  const handleRecipePress = (item: any) => {
    navigation.navigate('Detail', { recipe: item });
  };

  return (
    <View style={[styles.screenContainer,{paddingTop:top,paddingBottom:bottom}]}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#FF6F61"
          style={styles.loadingIndicator}
        />
      ) : (
        <>
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.idMeal}
            renderItem={({ item }) => (
              <RecipeCard
                item={item}
                toggleFavorite={toggleFavorite}
                onPress={handleRecipePress}
              />
            )}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  You haven't saved any favorites yet!
                </Text>
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
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingTop: 20,
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

export default FavoritesScreen;
