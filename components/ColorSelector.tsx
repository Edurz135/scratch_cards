import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

interface ColorSelectorProps {
  colors: string[];
  selectedColor: number;
  onColorPress(id: number): void;
}

export function ColorSelector({
  colors,
  selectedColor,
  onColorPress,
}: ColorSelectorProps) {
  return (
    <View style={styles.themeContainer}>
      {colors.map((color, idx) => {
        const isSelected = selectedColor === idx;
        return (
          <TouchableOpacity
            key={idx}
            style={[
              styles.theme,
              { backgroundColor: color },
              isSelected && styles.selectedTheme,
              styles.border1,
            ]}
            onPress={() => onColorPress(idx)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  themeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
  },
  selectedTheme: {
    borderWidth: 2,
    borderColor: "white",
  },
  border1: {
    borderTopStartRadius: 0,
    borderTopEndRadius: 60,
    borderBottomStartRadius: 60,
    borderBottomEndRadius: 60,
  },
  theme: {
    width: 35,
    height: 31,
    marginLeft: 5,
    backgroundColor: "red",
  },
});
