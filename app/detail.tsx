import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useState } from "react";

export default function DetailScreen() {
  const data = {
    id: 1,
    title: "Plan for a day",
    description:
      "A mysterious secret is here, from an unforgettable adventure to a crude and terrible experience.",
    emoji: "",
    favorite: false,
    color: "#EB7A53",
  };

  return (
    <View style={[styles.container, {backgroundColor: data.color}]}>
      <View style={[styles.options, {backgroundColor: data.color}]}></View>

      <Text style={styles.titleContainer}>
        <Text style={styles.title}>{data.title}</Text>
      </Text>

      <Text style={styles.scratchContainer}>
        <View style={styles.scratch}></View>
      </Text>

      <Text style={styles.description}>
        <Text>{data.description}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scratch: {
    backgroundColor: "black",
    borderRadius: 60,
    width: 230,
    height: 230,
  },
  scratchContainer: {
    display: "flex",
    justifyContent: "center",
    paddingVertical: 60,
  },
  description: {
    display: "flex",
    textAlign: "center",
    fontSize: 22,
    paddingHorizontal: 10,
    fontFamily: "Numans",
  },
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
    color: "black",
    fontFamily: "Numans",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
