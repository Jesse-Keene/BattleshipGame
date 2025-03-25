import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TitleBar = () => {
  return (
    <View style={styles.titleBar}>
      <Text style={styles.title}>Battle Ship</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleBar: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

TitleBar.displayName = "TitleBar";

export default TitleBar;
