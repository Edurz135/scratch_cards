import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

interface CustomChipProps {
  title: string;
  quantity: number;
  selectedOption: string;
  onPress(name: string): void;
}

export function CustomChip({ title, quantity, selectedOption, onPress }: CustomChipProps) {
  return (
    <TouchableOpacity onPress={() => onPress(title)}>
      <View
        style={[
          styles.option,
          selectedOption === title && styles.selectedOption,
        ]}
      >
        <View style={styles.optionTitle}>
          <Text style={styles.optionText}>{title}</Text>
        </View>
        <View style={styles.optionQuantity}>
          <Text style={styles.optionQuantityText}>{quantity}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    optionText: {
        fontSize: 20,
        fontFamily: "Numans",
        color: "white",
      },
      optionQuantityText: {
        fontSize: 12,
        color: "white",
      },
      selectedOption: {
        opacity: 1,
      },
      option: {
        display: "flex",
        flexDirection: "row",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "white",
        opacity: 0.5,
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 10,
      },
      optionTitle: {
        color: "white",
        fontSize: 20,
        marginHorizontal: 10,
        fontFamily: "Numans",
        display: "flex",
        justifyContent: "center",
      },
      optionQuantity: {
        width: 35,
        height: 35,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "#262626",
        borderRadius: 999,
        color: "white",
        fontFamily: "Numans",
      },
});
