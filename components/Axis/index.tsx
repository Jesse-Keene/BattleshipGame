import React from "react";
import { View, StyleSheet } from "react-native";
import AxisItem from "./AxisItem";

interface AxisProps {
  direction?: "row" | "column";
}

const Axis: React.FC<AxisProps> = ({
  direction = "row" as "row" | "column",
}) => {
  const getAxisLabels = (direction: "row" | "column"): string[] => {
    switch (direction) {
      case "row":
        return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
      case "column":
        return ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
      default:
        return [];
    }
  };

  return (
    <View style={[styles.axis, styles[direction]]}>
      {getAxisLabels(direction).map((label) => (
        <AxisItem key={`axis_label_${label}`} label={label} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  axis: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
});

export default Axis;
