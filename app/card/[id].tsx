import * as React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { Card } from "@/types";
import { CardController } from "@/services/cardController";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScratchCard } from "@/components/ScratchCard";
import { useImage } from "@shopify/react-native-skia";

export default function EditScreen() {
  const { id } = useLocalSearchParams(); // Get the id from the URL
  const [card, setCard] = React.useState<Card>();

  const router = useRouter();

  const Favorite = require("../../assets/images/favorite.png");
  const FilledFavorite = require("../../assets/images/filled-favorite.png");
  const image = useImage(require("../../assets/images/filled-favorite.png"));

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
    // router.replace(`/`);
    router.back();
    // router.push(`/`);
  };

  const handleEdit = () => {
    router.push(`/edit/${id}`);
  };

  const handleDelete = async () => {
    Alert.alert(
      "Deleting card",
      `Do you want to delete card "${card?.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            await CardController.deleteCardById(Number(id)).then(() => {
              router.push(`/`);
            });
          },
        },
      ]
    );
  };

  const onFavoritePress = async () => {
    const card = await CardController.findCardById(Number(id));
    if (card) {
      const updatedCard = { ...card, favorite: !card.favorite };
      await CardController.updateCardById(Number(id), updatedCard);
      getCard();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Code to update the screen data
      getCard();
    }, [])
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: card?.color }]}>
      <GestureHandlerRootView>
        <View style={[styles.options, { backgroundColor: card?.color }]}>
          <TouchableOpacity onPress={handleNavigation} style={styles.optionBtn}>
            <Entypo name="chevron-thin-left" size={22} color="black" />
          </TouchableOpacity>

          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity onPress={handleDelete} style={styles.optionBtn}>
              <SimpleLineIcons name="trash" size={20} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleEdit} style={styles.optionBtn}>
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onFavoritePress}
              style={styles.optionBtn}
            >
              <Image
                style={styles.optionImg}
                source={card?.favorite ? FilledFavorite : Favorite}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.titleContainer}>
          <Text style={styles.title}>{card?.title}</Text>
        </Text>

        <View style={styles.scratchContainer}>
          <View style={styles.scratchA}>
            <ScratchCard style={styles.scratchB} image={image}>
              <View style={styles.card}>
                {/* <Image
                  source={require("../../assets/images/favicon.png")}
                  style={styles.imageCard}
                /> */}
                <Image source={{ uri: card?.image }} style={styles.imageCard} />
                {/* <Text style={styles.titleText}>Cashback</Text>
                <Text style={styles.subTitleText}>$10</Text> */}
              </View>
            </ScratchCard>
          </View>
        </View>

        <View>
          <Text style={styles.description}>{card?.description}</Text>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    color: "black",
    marginBottom: 6,
  },
  subTitleText: {
    fontSize: 40,
    color: "black",
    fontWeight: "700",
  },
  card: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // padding: 10,
  },
  imageCard: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  optionBtn: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    marginHorizontal: 5,
    justifyContent: "center",
  },
  optionImg: {
    width: 18,
    height: 18,
  },
  scratch_card: {
    width: 400,
    height: 400,
    backgroundColor: "transparent",
  },
  scratchA: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 65,
    width: 215,
    height: 215,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scratchB: {
    backgroundColor: "white",
    borderRadius: 60,
    width: 200,
    height: 200,
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
    height: 50,
    marginVertical: 10,
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleContainer: {
    paddingLeft: 20,
    marginTop: 28,
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
  title: {
    fontSize: 50,
    color: "black",
    fontFamily: "Numans",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
