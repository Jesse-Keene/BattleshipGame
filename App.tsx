import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import BattleshipGame from "./components/BattleshipGame";

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <BattleshipGame />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
});
