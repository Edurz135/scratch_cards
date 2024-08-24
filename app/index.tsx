import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { Card } from "@/types";
import { CustomCard } from "@/components/customCard";
import { CardController } from "@/services/cardController";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedOption, setSelectedOption] = useState<"all" | "favorites">(
    "all"
  );

  const router = useRouter();

  const filteredCards =
    selectedOption === "favorites"
      ? cards.filter((card) => card.favorite)
      : cards;

  const loadCards = async () => {
    const allCards = await CardController.listCards();
    setCards(allCards);
  };

  const onFavoritePress = async (id: number) => {
    const card = await CardController.findCardById(id);
    if (card) {
      const updatedCard = { ...card, favorite: !card.favorite };
      await CardController.updateCardById(id, updatedCard);
      await loadCards();
    }
  };

  const handleNavigation = () => {
    router.push(`/create`);
  };

  useEffect(() => {
    // CardController.resetCardController();
    loadCards();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.options}></View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>My</Text>
          <Text style={styles.title}>Cards</Text>
        </View>

        <View style={styles.optionsContainer}>
          {/* <View>
            <View style={styles.option}>
              <View style={styles.optionTitle}>
                <Text
                  style={{ fontSize: 20, fontFamily: "Numans", color: "white" }}
                >
                  All
                </Text>
              </View>
              <View style={styles.optionQuantity}>
                <Text style={{ fontSize: 12, color: "white" }}>10</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.option}>
              <View style={styles.optionTitle}>
                <Text
                  style={{ fontSize: 20, fontFamily: "Numans", color: "white" }}
                >
                  Favorites
                </Text>
              </View>
              <View style={styles.optionQuantity}>
                <Text style={{ fontSize: 12, color: "white" }}>3</Text>
              </View>
            </View>
          </View> */}
          <TouchableOpacity onPress={() => setSelectedOption("all")}>
            <View
              style={[
                styles.option,
                selectedOption === "all" && styles.selectedOption,
              ]}
            >
              <View style={styles.optionTitle}>
                <Text style={styles.optionText}>All</Text>
              </View>
              <View style={styles.optionQuantity}>
                <Text style={styles.optionQuantityText}>{cards.length}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSelectedOption("favorites")}>
            <View
              style={[
                styles.option,
                selectedOption === "favorites" && styles.selectedOption,
              ]}
            >
              <View style={styles.optionTitle}>
                <Text style={styles.optionText}>Favorites</Text>
              </View>
              <View style={styles.optionQuantity}>
                <Text style={styles.optionQuantityText}>
                  {cards.filter((card) => card.favorite).length}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.cardRow}>
            {filteredCards
              .filter((_, index) => index % 2 === 0)
              .map((item) => (
                <CustomCard
                  key={item.id}
                  {...item}
                  onFavoritePress={onFavoritePress}
                />
              ))}
          </View>
          <View style={styles.cardRow}>
            {filteredCards
              .filter((_, index) => index % 2 === 1)
              .map((item) => (
                <CustomCard
                  key={item.id}
                  {...item}
                  onFavoritePress={onFavoritePress}
                />
              ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.createBtnContainer}>
        <TouchableOpacity onPress={handleNavigation} style={styles.createBtn}>
          <View style={styles.createBtnText}>
            <Text style={{ color: "white" }}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    left: "-37%",
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
  options: {
    height: 60,
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
