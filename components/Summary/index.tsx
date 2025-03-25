import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import SummaryGameStats from "./SummaryStats";

interface SummaryProps {
  hasGameStarted: boolean;
  playerAvailableShips: any[];
  handleGameStart: () => void;
  currentPlayer: string;
  playerDeployedShips: any[];
  computerDeployedShips: any[];
}

const Summary: React.FC<SummaryProps> = ({
  hasGameStarted,
  playerAvailableShips,
  handleGameStart,
  currentPlayer,
  playerDeployedShips,
  computerDeployedShips,
}) => {
  return (
    <View style={styles.summary}>
      <View style={styles.infoContainer}>
        <Text style={styles.currentPlayer}>
          Current Player: {currentPlayer}
        </Text>
      </View>

      <View style={styles.instructionContainer}>
        {!hasGameStarted ? (
          <Text style={styles.instructions}>
            You need to deploy all your ships on your board and start the game.
            Then Computer will deploy his ship also.{"\n\n"}
            Then You can attack computer block and once your attack is done
            computer will attack in any of your block.
          </Text>
        ) : (
          <SummaryGameStats
            playerDeployedShips={playerDeployedShips}
            computerDeployedShips={computerDeployedShips}
          />
        )}

        <View style={styles.statsContainer}>
          <View style={styles.statRow}>
            <View style={[styles.indicator, styles.miss]} />
            <Text style={styles.statText}>Attack missed the ship</Text>
          </View>
          <View style={styles.statRow}>
            <View style={[styles.indicator, styles.hit]} />
            <Text style={styles.statText}>Attack was a hit</Text>
          </View>
          <View style={styles.statRow}>
            <View style={[styles.indicator, styles.shipSunk]} />
            <Text style={styles.statText}>Ship Sunk</Text>
          </View>
        </View>
      </View>

      {playerAvailableShips.length === 0 && (
        <TouchableOpacity style={styles.button} onPress={handleGameStart}>
          <Text style={styles.buttonText}>
            {hasGameStarted ? "Restart Game" : "Start Game"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  summary: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 10,
  },
  infoContainer: {
    marginBottom: 15,
  },
  currentPlayer: {
    fontSize: 18,
    fontWeight: "bold",
  },
  instructionContainer: {
    marginBottom: 15,
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  statsContainer: {
    marginTop: 15,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  indicator: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 4,
  },
  miss: {
    backgroundColor: "#ccc",
  },
  hit: {
    backgroundColor: "#ffff00",
  },
  shipSunk: {
    backgroundColor: "#ff0000",
  },
  statText: {
    fontSize: 14,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Summary;
