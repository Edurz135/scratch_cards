import * as React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";

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

  function handleScratch(scratchPercentage: number) {
    console.log(scratchPercentage);
  }

  const Favorite = require("../../assets/images/favorite.png");
  const FilledFavorite = require("../../assets/images/filled-favorite.png");

  return (
    <View style={[styles.container, { backgroundColor: data.color }]}>
      <View style={[styles.options, { backgroundColor: data.color }]}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.optionBtn}>
            <Image
              style={styles.optionImg}
              source={data.favorite ? FilledFavorite : Favorite}
            ></Image>
          </Text>
        </TouchableOpacity>

        <Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.optionBtn}>
              <Image
                style={styles.optionImg}
                source={data.favorite ? FilledFavorite : Favorite}
              ></Image>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.optionBtn}>
              <Image
                style={styles.optionImg}
                source={data.favorite ? FilledFavorite : Favorite}
              ></Image>
            </Text>
          </TouchableOpacity>
        </Text>
      </View>

      <Text style={styles.titleContainer}>
        <Text style={styles.title}>{data.title}</Text>
      </Text>

      <Text style={styles.scratchContainer}>
        <View style={styles.scratch}>
          {/* <ScratchCard
            source={require("../assets/images/filled-favorite.png")}
            brushWidth={50}
            onScratch={handleScratch}
            style={styles.scratch_card}
          /> */}
        </View>
      </Text>

      <Text style={styles.description}>
        <Text>{data.description}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  optionBtn: {
    // minWidth: 50,
    width: 60,
    height: 60,
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    marginHorizontal: 5,
    justifyContent: "center",
  },
  optionImg: {
    width: 20,
    height: 20,
  },
  scratch_card: {
    width: 400,
    height: 400,
    backgroundColor: "transparent",
  },
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
    marginVertical: 10,
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleContainer: {
    paddingLeft: 20,
    marginTop: 35,
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
