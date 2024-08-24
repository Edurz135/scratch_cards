import * as React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Card } from "@/types";
import { CardController } from "@/services/cardController";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

export default function DetailScreen() {
  const { id } = useLocalSearchParams(); // Get the id from the URL
  const [card, setCard] = React.useState<Card>();

  const router = useRouter();

  const Favorite = require("../../assets/images/favorite.png");
  const FilledFavorite = require("../../assets/images/filled-favorite.png");

  function handleScratch(scratchPercentage: number) {
    console.log(scratchPercentage);
  }

  const getCard = async () => {
    const temp = await CardController.findCardById(Number(id));
    if (temp != null) {
      setCard(temp);
    }
  };

  const handleNavigation = () => {
    router.push(`/`);
  };

  const handleDelete = async () => {
    console.log("deleting")
    await CardController.deleteCardById(Number(id)).then(() => {
      router.push(`/`);
    });
  };

  const onFavoritePress = async () => {
    const card = await CardController.findCardById(Number(id));
    if (card) {
      const updatedCard = { ...card, favorite: !card.favorite };
      await CardController.updateCardById(Number(id), updatedCard);
      getCard();
    }
  };

  React.useEffect(() => {
    getCard();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: card?.color }]}>
      <View style={[styles.options, { backgroundColor: card?.color }]}>
        <TouchableOpacity onPress={handleNavigation}>
          <View style={styles.optionBtn}>
            <Entypo name="chevron-thin-left" size={22} color="black" />
          </View>
        </TouchableOpacity>

        <Text>
          <TouchableOpacity onPress={handleDelete}>
            <View style={styles.optionBtn}>
              <SimpleLineIcons name="trash" size={20} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <View style={styles.optionBtn}>
              <AntDesign name="edit" size={24} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={onFavoritePress}>
            <View style={styles.optionBtn}>
              <Image
                style={styles.optionImg}
                source={card?.favorite ? FilledFavorite : Favorite}
              ></Image>
            </View>
          </TouchableOpacity>
        </Text>
      </View>

      <Text style={styles.titleContainer}>
        <Text style={styles.title}>{card?.title}</Text>
      </Text>

      <View style={styles.scratchContainer}>
        <View style={styles.scratch}>
          {/* <ScratchCard
            source={require("../assets/images/filled-favorite.png")}
            brushWidth={50}
            onScratch={handleScratch}
            style={styles.scratch_card}
          /> */}
        </View>
      </View>

      <View>
        <Text style={styles.description}>{card?.description}</Text>
      </View>
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
    alignItems: "center",
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
