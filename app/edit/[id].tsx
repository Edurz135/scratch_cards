import React, { useState } from "react";
import {
  Text,
  View,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CardController } from "@/services/cardController";
import { Card } from "@/types";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import EmojiKeyboard from "rn-emoji-keyboard";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
export default function CreateScreen() {
  const { id } = useLocalSearchParams(); // Get the id from the URL
  const [card, setCard] = React.useState<Card>();

  const router = useRouter();

  // State to hold the input values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [isEmojiKeyboardOpen, setIsEmojiKeyboardOpen] = useState(false); // State to control Emoji Keyboard

  const colors = ["#F7D44C", "#EB7A53", "#98B7DB", "#A8D672", "#F6ECC9"];

  const handleNavigation = () => {
    // router.replace(`/card/${id}`);
    router.back();
    // router.push(`/card/${id}`);
  };

  const handlePhoto = async () => {
    // Ask for permission to access media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Save the selected image URI
    }
  };

  const updateCard = async () => {
    // Validation checks
    if (title.trim() === "") {
      Alert.alert("Validation Error", "The title cannot be empty.");
      return;
    }

    if (description.trim() === "") {
      Alert.alert("Validation Error", "The description cannot be empty.");
      return;
    }

    if (selectedImage === null) {
      Alert.alert("Validation Error", "The image cannot be empty.");
      return;
    }

    const updatedCard: Omit<Card, "id"> = {
      title: title.trim(),
      description: description.trim(),
      favorite: card?.favorite || false,
      color: colors[selectedColor],
      image: selectedImage,
      emoji: selectedEmoji || undefined,
    };

    await CardController.updateCardById(Number(id), updatedCard).then(() => {
      handleNavigation();
    });
  };

  const handleEmojiPick = (emojiObject: { emoji: string }) => {
    setSelectedEmoji(emojiObject.emoji); // Allow only one emoji
  };

  const getCard = async () => {
    await CardController.findCardById(Number(id)).then((temp) => {
      if (temp) {
        console.log("FINDED")
        setCard(temp);
        setTitle(temp?.title || "");
        setDescription(temp?.description || "");
        setSelectedEmoji(temp?.emoji || "");
        setSelectedColor(colors.indexOf(temp?.color || "#F7D44C") || 0);
        setSelectedImage(temp?.image || "");
      }
    });
  };

  React.useEffect(() => {
    getCard();
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.options]}>
        <TouchableOpacity onPress={handleNavigation}>
          <View style={styles.optionBtn}>
            <Entypo name="chevron-thin-left" size={22} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <Text
        style={[
          styles.titleContainer,
          !isEmojiKeyboardOpen ? { marginTop: 20 } : {},
        ]}
      >
        <Text style={styles.title}>Edit</Text>
      </Text>

      <View
        style={[
          styles.inputContainer,
          !isEmojiKeyboardOpen ? { marginTop: 32 } : {},
        ]}
      >
        <Text style={styles.inputName}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Your scratch card title."
          onChangeText={(value) => setTitle(value.slice(0, 20))} // Limiting to 20 characters
          value={title}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputName]}>Description</Text>
        <TextInput
          style={[styles.input, { minHeight: 100 }]}
          placeholder="Your scratch card description."
          onChangeText={(value) => setDescription(value.slice(0, 40))} // Limiting to 40 characters
          value={description}
          multiline
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputName}>Theme</Text>
        <View style={styles.themeContainer}>
          {colors.map((color, idx) => {
            const isSelected = selectedColor === idx;
            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.theme,
                  { backgroundColor: color },
                  isSelected && styles.selectedTheme,
                  styles.border1,
                ]}
                onPress={() => setSelectedColor(idx)}
              />
            );
          })}
        </View>
      </View>

      <View style={[styles.inputContainer]}>
        <Text style={styles.inputName}>
          Emoji{" "}
          <Text style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>
            *Optional
          </Text>
        </Text>
        <TouchableOpacity onPress={() => setIsEmojiKeyboardOpen(true)}>
          <TextInput
            style={[styles.input, { width: 30 }]}
            placeholder="Pick up to 3 Emojis"
            editable={false}
            value={selectedEmoji || ""}
          />
        </TouchableOpacity>
      </View>

      <EmojiKeyboard
        allowMultipleSelections={false} // Allow only single selection
        onEmojiSelected={handleEmojiPick}
        open={isEmojiKeyboardOpen}
        onClose={() => setIsEmojiKeyboardOpen(false)}
        theme={{
          backdrop: "#16161888",
          knob: "#fff",
          container: "#282829",
          header: "#fff",
          skinTonesContainer: "#252427",
          category: {
            icon: "#fff",
            iconActive: "black",
            container: "#252427",
            containerActive: "#fff",
          },
          search: {
            placeholder: "#fff",
            text: "#fff",
          },
        }}
        emojiSize={32} // Set emoji size
        enableSearchBar
        enableRecentlyUsed
        customButtons={[
          <TouchableOpacity
            key="deleteButton"
            onPress={() => {
              setSelectedEmoji(null);
              setIsEmojiKeyboardOpen(false);
            }}
            style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
          >
            <Entypo name="cross" size={26} color="white" />
          </TouchableOpacity>,
        ]}
      />

      <View
        style={{
          borderBottomColor: "white",
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
        <TouchableOpacity onPress={handlePhoto} style={styles.imagePicker}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.image} />
          ) : (
            <Text style={styles.imagePickerText}>+</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.createBtnContainer}>
        <TouchableOpacity onPress={updateCard}>
          <View style={styles.createBtn}>
            <View style={styles.createBtnText}>
              <FontAwesome name="save" size={20} color="white" />
              {/* <Text style={{ color: "white" }}>+</Text> */}
            </View>
          </View>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imagePickerContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  imagePicker: {
    backgroundColor: "black",
    width: 130,
    height: 130,
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
  },
  imagePickerText: {
    color: "white",
    fontSize: 20,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 999,
  },
  themeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
  },
  selectedTheme: {
    borderWidth: 2,
    borderColor: "white",
  },
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
    marginBottom: 15,
  },
  input: {
    color: "rgba(255,255,255,0.8)",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 6,
    fontFamily: "Numans",
    width: 230,
    fontSize: 14,
  },
  inputName: {
    fontFamily: "Numans",
    color: "white",
    fontSize: 16,
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
