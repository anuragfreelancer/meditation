import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';
import { color } from '../constant';

// Define props type
interface CustomButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

// Functional component
const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

// Default styles
const styles = StyleSheet.create({
  button: {
    backgroundColor: color.buttonColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    // Shadow added here
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(9, 40, 34, 0.15)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
      },
      android: {
        // elevation: 2, // Android ke liye
      
      },
    }),
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  disabledButton: {
    backgroundColor: color.buttonColor,
  },
});

export default CustomButton;
