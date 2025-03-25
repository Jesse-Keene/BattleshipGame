import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { CURRENT_PLAYER, MISS_HIT } from "../../../utils/DB";

interface BoardSquareProps {
  onPress: () => void;
  isOcupiedCheck: {
    isOccupied: boolean;
    shipName: string;
    isShipSunk: boolean;
    isAttacked: boolean;
  };
  boardOwner: string;
  squareId: string;
}

const BoardSquare: React.FC<BoardSquareProps> = ({
  onPress,
  isOcupiedCheck,
  boardOwner,
  squareId,
}) => {
  const { isOccupied, shipName, isShipSunk, isAttacked } = isOcupiedCheck;
  const missBlock = shipName === MISS_HIT;

  const getSquareStyle = () => {
    if (missBlock) {
      return styles.miss;
    } else if (isShipSunk) {
      return styles.shipSunk;
    } else if (!isShipSunk && isAttacked) {
      return styles.hit;
    } else if (shipName !== MISS_HIT && isOccupied) {
      return boardOwner === CURRENT_PLAYER.computer ? {} : styles[shipName];
    }
    return {};
  };

  return (
    <TouchableOpacity
      testID={squareId}
      onPress={() => {
        if (isShipSunk || isAttacked || missBlock) {
          return;
        }
        onPress();
      }}
      disabled={isShipSunk || isAttacked || missBlock}
      style={[styles.square, getSquareStyle()]}
    />
  );
};

const styles: { [key: string]: any } = StyleSheet.create({
  square: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  miss: {
    backgroundColor: "#ccc",
  },
  shipSunk: {
    backgroundColor: "#ff0000",
  },
  hit: {
    backgroundColor: "#ffff00",
  },
  carrier: {
    backgroundColor: "#666666",
  },
  battleship: {
    backgroundColor: "#888888",
  },
  cruiser: {
    backgroundColor: "#aaaaaa",
  },
  submarine: {
    backgroundColor: "#cccccc",
  },
});

export default BoardSquare;
