import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface AxisItemProps {
  label: string;
}

const AxisItem: React.FC<AxisItemProps> = ({ label }) => {
  return (
    <View style={styles.axisLabel}>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  axisLabel: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  labelText: {
    fontSize: 16,
    color: "#000",
  },
});

export default AxisItem;
