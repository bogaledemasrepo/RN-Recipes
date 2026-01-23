import React from "react";
import { View, Text, StyleSheet } from "react-native";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const FavListHeader = ({navigation}:{navigation:any}) => {
    const handleBackPress = () => {
        navigation.goBack();
    };
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <View style={styles.iconBackground} onTouchEnd={handleBackPress}>
          <MaterialCommunityIcons
            name="arrow-left-circle-outline"
            size={22}
            color="#FF6F61"
          />
        </View>
        <View>
          <Text style={styles.greeting}>Good Morning,</Text>
          <Text style={styles.title}>Favorite Recipes</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
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
    paddingHorizontal:16
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

export default FavListHeader;