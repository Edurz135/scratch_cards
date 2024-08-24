import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Card } from "@/types"; // Import the Card interface
import { useRouter } from "expo-router";

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

  function getFormattedDescription(): string {
    if (!description) return "";

    if (description.length > 20) {
      return description.substring(0, 20) + "...";
    }
    return description;
  }

  const handleFavorite = async () => {
    onFavoritePress(id);
  };

  const handleNavigation = () => {
    router.push(`/card/${id}`);
  };

  useEffect(() => {
    generateRandomNumber();
  }, []);

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
        <Text style={styles.description}>{getFormattedDescription()}</Text>
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
