import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AXIS } from "../../utils/DB";
import { Ship } from "../Types/Types";

interface InventoryProps {
  title: string;
  playerAvailableShips: Ship[];
  handleSelectShipToPlace: (ship: Ship) => void;
  selectedShipToPlace: Ship | null;
  playersSelectedAxis: string;
  onSelectAxis: (axis: string) => void;
}
const Inventory: React.FC<InventoryProps> = ({
  title,
  playerAvailableShips,
  handleSelectShipToPlace,
  selectedShipToPlace,
  playersSelectedAxis,
  onSelectAxis,
}) => {
  return (
    <View style={styles.inventory}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        <View style={styles.axis}>
          <TouchableOpacity
            style={[
              styles.axisButton,
              playersSelectedAxis === AXIS.horizontal && styles.selected,
            ]}
            onPress={() => onSelectAxis(AXIS.horizontal)}
          >
            <Text>Horizontal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.axisButton,
              playersSelectedAxis === AXIS.vertical && styles.selected,
            ]}
            onPress={() => onSelectAxis(AXIS.vertical)}
          >
            <Text>Vertical</Text>
          </TouchableOpacity>
        </View>

        {playerAvailableShips.map((ship) => {
          return (
            <TouchableOpacity
              key={ship.shipName}
              style={[
                styles.item,
                selectedShipToPlace &&
                  selectedShipToPlace.shipName === ship.shipName &&
                  styles.selected,
              ]}
              onPress={() => handleSelectShipToPlace(ship)}
            >
              <Text style={styles.itemName}>{ship.shipName}</Text>
              <View style={styles.smallBoxContainer}>
                {Array(ship.shipLength)
                  .fill(0)
                  .map((_, i) => (
                    <View key={i} style={styles.smallBox}></View>
                  ))}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inventory: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    marginTop: 10,
  },
  axis: {
    flexDirection: "row",
    marginBottom: 10,
  },
  axisButton: {
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  selected: {
    backgroundColor: "#ddd",
  },
  item: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  itemName: {
    fontSize: 16,
  },
  smallBoxContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  smallBox: {
    width: 20,
    height: 20,
    backgroundColor: "#000",
    marginRight: 5,
  },
});

export default Inventory;
