import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Card } from "@/types";
import { CustomCard } from "@/components/customCard";
import { CardController } from "@/services/cardController";

export default function HomeScreen() {
  const [cards, setCards] = useState<Card[]>([]);

  const loadCards = async () => {
    const allCards = await CardController.listCards();
    console.log(await CardController.listCards());
    setCards(allCards);
  };

  const addCard = async () => {
    console.log("CREATING CARD");
    const newCard: Omit<Card, "id"> = {
      title: "New Card",
      description: "This is a new card",
      favorite: false,
      color: "#ffcc00",
    };

    await CardController.createCard(newCard);
    await loadCards();
  };
  
  const onFavoritePress = async (id : number) => {
    const card = await CardController.findCardById(id);
    if (card) {
      const updatedCard = { ...card, favorite: !card.favorite };
      await CardController.updateCardById(id, updatedCard);
      await loadCards();
    }
  };

  useEffect(() => {
    CardController.resetCardController();
    loadCards();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.options}></View>

        <Text style={styles.titleContainer}>
          <Text style={styles.title}>My</Text>
          <Text style={styles.title}>Cards</Text>
        </Text>

        <View style={styles.optionsContainer}>
          <Text>
            <Text style={styles.option}>
              <Text style={styles.optionTitle}>All</Text>
              <Text style={styles.optionQuantity}>10</Text>
            </Text>
          </Text>
          <Text>
            <Text style={styles.option}>
              <Text style={styles.optionTitle}>Favorites</Text>
              <Text style={styles.optionQuantity}>3</Text>
            </Text>
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.cardRow}>
            {cards
              .filter((_, index) => index % 2 === 0)
              .map((item) => (
                <CustomCard key={item.id} {...item} onFavoritePress={onFavoritePress} />
              ))}
          </View>
          <View style={styles.cardRow}>
            {cards
              .filter((_, index) => index % 2 === 1)
              .map((item) => (
                <CustomCard key={item.id} {...item} onFavoritePress={onFavoritePress} />
              ))}
          </View>
        </View>
      </ScrollView>

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
    left: "-50%",
    width: 70,
    height: 70,
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  createBtnContainer: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    display: "flex",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    marginTop: 60,
    backgroundColor: "black",
    gap: 10,
  },
  cardRow: {
    display: "flex",
    flex: 1,
    backgroundColor: "black",
    gap: 10,
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "black",
    paddingTop: 40,
    gap: 10,
  },
  option: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  optionTitle: {
    color: "white",
    fontSize: 24,
    marginHorizontal: 10,
    fontFamily: "Numans",
  },
  optionQuantity: {
    width: 24,
    height: 24,
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#262626",
    borderRadius: 999,
    color: "white",
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
    color: "white",
    fontFamily: "Numans",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
