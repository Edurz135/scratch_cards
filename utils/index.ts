import { StyleSheet } from "react-native";

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomBorderStyle = () : any => {
  switch (generateRandomNumber(1, 4)) {
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

const styles = StyleSheet.create({
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

export const getFormattedText = (text: string, limit: number): string => {
  if (text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
};

export const selectableColors = [
  "#F7D44C",
  "#EB7A53",
  "#98B7DB",
  "#A8D672",
  "#F6ECC9",
];
