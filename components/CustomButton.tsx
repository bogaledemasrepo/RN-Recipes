import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
interface ButtonProps {
  label: string;
  textColor?: string;
  bgColor?: string;
  disabled?: boolean;
  onPress: () => void;
}
const CustomButton = ({
  onPress,
  label,
  textColor,
  bgColor,
  disabled,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.btn,
        {
          backgroundColor: disabled
            ? "#4444444f"
            : bgColor
              ? bgColor
              : "#2e9af3ff",
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor ? textColor : "#fff" }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  text: {
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
