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
import EmptyState from "../components/ListEmpty";

const FavoritesScreen: React.FC<{navigation: any}> = ({navigation}:{navigation: any}) => {
  const {top,bottom}=useSafeAreaInsets();
  const { loading, favorites ,toggleFavorite} = useRecipeContext();

  const handleRecipePress = (item: any) => {
    navigation.navigate('Detail', { recipe: item });
  };

  return (
    <View style={[styles.screenContainer,{paddingTop:top,paddingBottom:bottom}]}>
          <FlatList
          showsVerticalScrollIndicator={false}
          refreshing={loading}
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
            ListEmptyComponent={EmptyState}
            style={{ flex: 1 }}
          />
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
