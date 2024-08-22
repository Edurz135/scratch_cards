import * as React from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { CardController } from "@/services/cardController";
import { Card } from "@/types";
import { Entypo } from "@expo/vector-icons";

export default function CreateScreen() {
  const router = useRouter();
  function handleScratch(scratchPercentage: number) {
    console.log(scratchPercentage);
  }

  const handleNavigation = () => {
    router.push(`/`);
  };

  const Favorite = require("../assets/images/favorite.png");
  const FilledFavorite = require("../assets/images/filled-favorite.png");

  const addCard = async () => {
    console.log("CREATING CARD");
    const newCard: Omit<Card, "id"> = {
      title: "New Card",
      description: "This is a new card",
      favorite: false,
      color: "#ffcc00",
    };

    await CardController.createCard(newCard).then(() => {
      handleNavigation();
    });
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.options]}>
        <TouchableOpacity onPress={handleNavigation}>
          <Text style={styles.optionBtn}>
            <Entypo name="chevron-thin-left" size={22} color="white" />
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titleContainer}>
        <Text style={styles.title}>Create</Text>
      </Text>

      <View style={[styles.inputContainer, { marginTop: 32 }]}>
        <Text style={styles.inputName}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Your scratch card title."
          onChangeText={(value) => {}}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputName]}>Description</Text>
        <TextInput
          style={[styles.input, { minHeight: 100 }]}
          placeholder="Your scratch card description."
          onChangeText={(value) => {}}
          multiline
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputName}>Theme</Text>
        <Text>
          <View
            style={[
              styles.theme,
              styles.border1,
              { backgroundColor: "#F7D44C" },
            ]}
          ></View>
          <View
            style={[
              styles.theme,
              styles.border1,
              { backgroundColor: "#EB7A53" },
            ]}
          ></View>
          <View
            style={[
              styles.theme,
              styles.border1,
              { backgroundColor: "#98B7DB" },
            ]}
          ></View>
          <View
            style={[
              styles.theme,
              styles.border1,
              { backgroundColor: "#A8D672" },
            ]}
          ></View>
          <View
            style={[
              styles.theme,
              styles.border1,
              { backgroundColor: "#F6ECC9" },
            ]}
          ></View>
        </Text>
      </View>

      <View style={[styles.inputContainer]}>
        <Text style={styles.inputName}>Emoji</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Emojis."
          onChangeText={(value) => {}}
        />
      </View>

      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginBottom: 20,
        }}
      />

      <Text style={styles.inputName}>Prize</Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "black",
          marginTop: 20,
        }}
      >
        <TouchableOpacity>
          <Text
            style={{
              backgroundColor: "black",
              width: 130,
              height: 130,
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 20,
              borderWidth: 1,
              borderColor: "white",
              borderStyle: "solid",
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.createBtnContainer}>
        <TouchableOpacity onPress={addCard}>
          <View style={styles.createBtn}>
            <Text style={styles.createBtnText}>+</Text>
          </View>
        </TouchableOpacity>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  inputContainer: {
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    color: "rgba(255,255,255,0.8)",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: "Numans",
    width: 260,
    fontSize: 16,
  },
  inputName: {
    fontFamily: "Numans",
    color: "white",
    fontSize: 20,
  },
  createBtnText: {
    fontSize: 20,
    fontFamily: "Numans",
    color: "white",
    width: 60,
    height: 60,
    backgroundColor: "black",
    borderRadius: 999,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 1,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  createBtn: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "relative",
    width: 60,
    height: 60,
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginRight: 10,
  },
  createBtnContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    display: "flex",
  },
  optionBtn: {
    // minWidth: 50,
    width: 60,
    height: 60,
    backgroundColor: "black",
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
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
    color: "white",
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
    color: "white",
    fontFamily: "Numans",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
