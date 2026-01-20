import React, { useEffect, useRef } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const SuccessToast = ({ visible, message, onHide }: { visible: boolean, message: string, onHide: () => void }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (visible) {
      // Animation In
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();

      // Auto-hide after 2 seconds
      const timer = setTimeout(() => {
        hide();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hide = () => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 20, duration: 300, useNativeDriver: true }),
    ]).start(() => onHide());
  };

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toastContainer, { opacity, transform: [{ translateY }] }]}>
      <View style={styles.toastContent}>
        <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
        <Text style={styles.toastText}>{message}</Text>
      </View>
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  // ... existing styles ...
  toastContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    alignItems: "center",
    zIndex: 1000,
  },
  toastContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A", // Dark theme for contrast
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    gap: 10,
    // Deep shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  toastText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});

export default SuccessToast;