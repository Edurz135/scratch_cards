import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Card } from "@/types"; // Import the Card interface
import { useRouter } from "expo-router";
import { getFormattedText, getRandomBorderStyle } from "@/utils";

interface CardProps extends Card {
  onFavoritePress(id: number): void;
}

export function CustomCard({
  id,
  title,
  description,
  emoji,
  favorite,
  color,
  onFavoritePress,
}: CardProps) {
  const Favorite = require("../assets/images/favorite.png");
  const FilledFavorite = require("../assets/images/filled-favorite.png");

  const router = useRouter();

  const handleFavorite = async () => {
    onFavoritePress(id);
  };

  const handleNavigation = () => {
    router.push(`/card/${id}`);
  };

  return (
    <TouchableOpacity
      onPress={handleNavigation}
      style={[
        styles.cardContainer,
        getRandomBorderStyle(),
        { backgroundColor: color },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity onPress={handleFavorite} style={styles.favorite}>
          <Image
            style={styles.favoriteImg}
            source={favorite ? FilledFavorite : Favorite}
          ></Image>
        </TouchableOpacity>
      </View>
      {description ? (
        <Text style={styles.description}>{getFormattedText(description, 20)}</Text>
      ) : null}

      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingRight: 44,
  },
  favoriteImg: {
    width: 18,
    height: 18,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    minHeight: 40,
  },
  favorite: {
    position: "absolute",
    right: 0,
    width: 44,
    height: 44,
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 45,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    fontFamily: "Numans",
    textAlign: "justify",
    color: "black",
  },
  title: {
    fontSize: 17,
    fontFamily: "Numans",
    color: "black",
  },
  cardContainer: {
    display: "flex",
    padding: 18,
    paddingRight: 14,
  },
});
