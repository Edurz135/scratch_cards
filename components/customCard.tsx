import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { Card } from "@/types"; // Import the Card interface
import { CardController } from "@/services/cardController";

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

  const [rnd, setRnd] = useState<number>();

  const generateRandomNumber = () => {
    const max = 4;
    const min = 1;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setRnd(randomNumber);
  };

  const getRandomBorderStyle = () => {
    switch (rnd) {
      case 1:
        return styles.border1;
      case 2:
        return styles.border2;
      case 3:
        return styles.border3;
      case 4:
        return styles.border4;
      default:
        return styles.allborder;
    }
  };

  const handleFavorite = async () => {
    onFavoritePress(id)
  };

  useEffect(() => {
    generateRandomNumber();
  }, []);

  return (
    <TouchableOpacity onPress={() => {}}>
      <View
        style={[
          styles.cardContainer,
          getRandomBorderStyle(),
          { backgroundColor: color },
        ]}
      >
        <View style={[styles.header, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={handleFavorite}>
            <Text style={styles.favorite}>
              <Image
                style={styles.favoriteImg}
                source={favorite ? FilledFavorite : Favorite}
              ></Image>
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          {description
            ? description.split(" ").length > 7
              ? description.split(" ").slice(0, 7).join(" ") + "..."
              : description
            : ""}
        </Text>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  favoriteImg: {
    width: 20,
    height: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    alignItems: "center",
  },
  favorite: {
    minWidth: 50,
    width: 50,
    height: 50,
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
    fontSize: 16,
    fontFamily: "Numans",
    textAlign: "justify",
  },
  title: {
    fontSize: 22,
    lineHeight: 20,
    fontFamily: "Numans",
  },
  cardContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  border1: {
    borderTopStartRadius: 0,
    borderTopEndRadius: 60,
    borderBottomStartRadius: 60,
    borderBottomEndRadius: 60,
  },
  border2: {
    borderTopStartRadius: 60,
    borderTopEndRadius: 0,
    borderBottomStartRadius: 60,
    borderBottomEndRadius: 60,
  },
  border3: {
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 60,
  },
  border4: {
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    borderBottomStartRadius: 60,
    borderBottomEndRadius: 0,
  },
  allborder: {
    borderRadius: 60,
  },
});
