import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useState } from "react";

export default function DetailScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.options}></View>

      <Text style={styles.titleContainer}>
        <Text style={styles.title}>My</Text>
        <Text style={styles.title}>Cards</Text>
      </Text>

      
    </View>
  );
}

const styles = StyleSheet.create({
  options: {
    height: 60,
    backgroundColor: "black",
  },
  titleContainer: {
    paddingLeft: 20,
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
  title: {
    fontSize: 56,
    color: "white",
    fontFamily: "Numans",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
