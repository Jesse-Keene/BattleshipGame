import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";

interface StartPageProps {
  onPress: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onPress }) => {
  return (
    <ImageBackground
      source={require("../../assets/images/th.jpg")}
      style={styles.background}
    >
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Join Game</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  background: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
});

export default StartPage;
