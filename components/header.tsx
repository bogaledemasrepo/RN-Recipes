import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const ListHeader = ({onFavoritePress}:{onFavoritePress: () => void}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <View style={styles.iconBackground}>
          <MaterialCommunityIcons
            name="food-fork-drink"
            size={22}
            color="#FF6F61"
          />
        </View>
        <View>
          <Text style={styles.greeting}>Good Morning,</Text>
          <Text style={styles.title}>Recipes</Text>
        </View>
      </View>

      <TouchableOpacity onPress={onFavoritePress} style={styles.favoriteButton} activeOpacity={0.7}>
        <AntDesign name="heart" size={22} color="#666" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    // Optional: add a very subtle shadow or border
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBackground: {
    backgroundColor: "#FFF0EE",
    padding: 10,
    borderRadius: 12,
  },
  greeting: {
    fontSize: 12,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "600",
    marginBottom: -2,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1A1A1A",
    letterSpacing: -0.5,
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#F9F9F9",
  },
});

export default ListHeader;