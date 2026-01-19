import { KeyboardTypeOptions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native";

interface InputProps {
  value: string;
  placeholder: string;
  keyboardType: KeyboardTypeOptions | undefined;
  onChangeText: (e: string) => {};
  label: string;
  onFocus?: () => {};
}

const CustomInput = ({
  value,
  onChangeText,
  label,
  placeholder,
  keyboardType,
  onFocus,
}: InputProps) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
