import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BoardSquare from "./BoardSquare";
import { Ship } from "../Types/Types";
import { BOARD_ARR, CURRENT_PLAYER, MISS_HIT } from "../../utils/DB";

interface BoardProps {
  onClickBoardSquare: (params: {
    rowIndex: number;
    columnIndex: number;
    clickedShip: string;
  }) => void;
  deployedShips: Ship[];
  boardOwner: string;
  hasGameStarted: boolean;
  selectedShipToPlace: Ship | null;
}
interface OccupiedCheck {
  isOccupied: boolean;
  shipName: string;
  isShipSunk: boolean;
  isAttacked: boolean;
}

const Board: React.FC<BoardProps> = ({
  onClickBoardSquare,
  deployedShips,
  boardOwner,
  hasGameStarted,
}) => {
  const isOcupiedCheck = (
    rowIndex: number,
    columnIndex: number
  ): OccupiedCheck => {
    let flag = false;
    let shipName = "";
    let isAttacked = false;
    let isShipSunk = false;
    const currentRowColumnIndex = `${rowIndex}${columnIndex}`;

    deployedShips?.forEach((ship) => {
      if (!ship?.shipName) {
        return;
      }
      if (
        ship?.shipName === MISS_HIT &&
        currentRowColumnIndex === ship.attackedBlocks.join()
      ) {
        shipName = MISS_HIT;
      } else if (
        ship?.shipName !== MISS_HIT &&
        ship.occupiedBlocks?.includes(currentRowColumnIndex)
      ) {
        flag = true;
        shipName = ship.shipName;
        isShipSunk = ship.isShipSunk || false;
        isAttacked = ship.attackedBlocks.includes(currentRowColumnIndex);
      }
    });

    return {
      isOccupied: flag,
      shipName,
      isShipSunk,
      isAttacked,
    };
  };

  return (
    <View style={styles.boardContainer}>
      <View style={styles.legendRow}>
        <View style={styles.legendCorner} />
        {BOARD_ARR[0].map((_, index) => (
          <Text key={`col_${index}`} style={styles.legendText}>
            {index + 1}
          </Text>
        ))}
      </View>
      {BOARD_ARR.map((row, rowIndex) => (
        <View key={`row_${rowIndex}`} style={styles.row}>
          <Text style={styles.legendText}>
            {String.fromCharCode(65 + rowIndex)}
          </Text>
          {row.map((_, columnIndex) => (
            <BoardSquare
              key={`cell_${rowIndex}_${columnIndex}`}
              squareId={`cell_${rowIndex}_${columnIndex}`}
              onPress={() =>
                onClickBoardSquare({
                  rowIndex,
                  columnIndex,
                  clickedShip:
                    isOcupiedCheck(rowIndex, columnIndex).shipName || "",
                })
              }
              boardOwner={boardOwner}
              isOcupiedCheck={isOcupiedCheck(rowIndex, columnIndex)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
    flexDirection: "column",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    width: 300, // Adjust width for mobile view
    height: 300, // Adjust height for mobile view
  },
  legendRow: {
    flexDirection: "row",
  },
  legendCorner: {
    width: 30,
    height: 30,
  },
  legendText: {
    width: 30,
    height: 30,
    textAlign: "center",
    lineHeight: 30,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
  },
  disabledBoard: {
    opacity: 0.5,
  },
});

export default Board;
