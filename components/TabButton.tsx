import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TabButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
  onPress: () => void;
  isDisabled?: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({ icon, label, isActive, onPress, isDisabled = false }) => (
  <TouchableOpacity
    style={[styles.tabButton, isActive && styles.tabButtonActive, isDisabled && styles.tabButtonDisabled]}
    onPress={onPress}
    disabled={isDisabled}
  >
    <Text style={styles.tabIcon}>{icon}</Text>
    <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  tabButtonActive: {
    backgroundColor: '#FF6F61',
  },
  tabButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  tabIcon: {
    fontSize: 24,
  },
  tabLabel: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
  tabLabelActive: {
    color: '#FFFFFF',
  },
});

export default TabButton;