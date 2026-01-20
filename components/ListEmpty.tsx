import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get("window");

interface EmptyStateProps {
  title?: string;
  description?: string;
  onAction?: () => void;
  actionLabel?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Recipes Found",
  description = "Try searching for something else or explore our curated categories.",
  onAction,
  actionLabel = "Refresh Feed",
}) => {
  return (
    <View style={styles.container}>
      {/* Visual Element */}
      <View style={styles.iconCircle}>
        <View style={styles.innerCircle}>
          <MaterialCommunityIcons name="silverware-clean" size={60} color="#FF6F61" />
        </View>
        {/* Decorative floating dots */}
        <View style={[styles.dot, { top: 10, right: 10, scaleX: 1.2 }]} />
        <View style={[styles.dot, { bottom: 20, left: -5 }]} />
      </View>

      {/* Text Content */}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {/* Call to Action */}
      {onAction && (
        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onAction}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
          <MaterialCommunityIcons name="arrow-right" size={18} color="#FFF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    marginTop: 80, // Adjust based on your header height
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#FFF0EE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  innerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFE4E1",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF6F61",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  dot: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FF6F61",
    opacity: 0.2,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    color: "#888",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#FF6F61",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 16,
    alignItems: "center",
    gap: 10,
    shadowColor: "#FF6F61",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default EmptyState;