import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";

import StartPage from "./startPage";
import Axis from "./Axis";
import Board from "./Board";
import Inventory from "./Inventory";
import TitleBar from "./TitleBar";
import Summary from "./Summary";

import { SHIPS, AXIS, CURRENT_PLAYER, MISS_HIT } from "../utils/DB";
import {
  hasEnoughBlocksToDeploy,
  getOccupiableBlocks,
  isPlaceTakenByOtherShip,
  getRandomOccupiableBlock,
  generateRandomRowAndColumnIndex,
  getShipNameByCoordinates,
  isArraysEqual,
} from "../helpers/helpers";

import { Ship } from "../components/Types/Types";

const BattleshipGame: React.FC = () => {
  // Common states
  const [openGame, setOpenGame] = useState<boolean>(false);
  const [selectedShipToPlace, setSelectedShipToPlace] = useState<Ship | null>(
    null
  );
  const [currentPlayer, setCurrentPlayer] = useState<string>(
    CURRENT_PLAYER.player
  );
  const [hasGameStarted, setHasGameStarted] = useState<boolean>(false);

  // Player states
  const [playerAvailableShips, setPlayerAvailableShips] =
    useState<Ship[]>(SHIPS);
  const [playersSelectedAxis, setPlayersSelectedAxis] = useState<string>(
    AXIS.horizontal
  );
  const [playerDeployedShips, setPlayerDeployedShips] = useState<Ship[]>([]);

  // Computer states
  const [computerAvailableShips, setComputerAvailableShips] =
    useState<Ship[]>(SHIPS);
  const [computerDeployedShips, setComputerDeployedShips] = useState<Ship[]>(
    []
  );

  useEffect(() => {
    if (hasGameStarted && currentPlayer === CURRENT_PLAYER.computer) {
      setTimeout(() => {
        attackOnPlayerBoardByComputer();
      }, 200);
    }
  }, [hasGameStarted, currentPlayer]);

  const resetGame = () => {
    setPlayerAvailableShips(SHIPS);
    setComputerAvailableShips(SHIPS);
    setSelectedShipToPlace(null);
    setCurrentPlayer(CURRENT_PLAYER.player);
    setHasGameStarted(false);
    setPlayersSelectedAxis(AXIS.horizontal);
    setPlayerDeployedShips([]);
    setComputerDeployedShips([]);
  };

  const handleSelectShipToPlace = (ship: Ship) => {
    setSelectedShipToPlace(ship);
  };

  const onSelectAxis = (axis: string) => {
    setPlayersSelectedAxis(axis);
    setSelectedShipToPlace(null);
  };

  const attackOnPlayerBoardByComputer = () => {
    const { rowIndex, columnIndex } = generateRandomRowAndColumnIndex();
    const { shipName } = isPlaceTakenByOtherShip(playerAvailableShips, [
      `${rowIndex}${columnIndex}`,
    ]);
    handleMissileAttackOnBoard(rowIndex, columnIndex, shipName);
  };

  const checkForWinner = (ships: Ship[], player: string) => {
    const { isAllSunk, winner } = getWinner(ships, player);
    if (isAllSunk) {
      Alert.alert(`Winner is ${winner}`, "", [
        { text: "OK", onPress: () => resetGame() },
      ]);
    }
  };

  const getWinner = (deployedShips: Ship[], boardOwner: string) => {
    let winner = "";
    let isAllSunk = false;

    if (deployedShips && deployedShips.length > 0) {
      let winnersShipsNumber = 0;
      deployedShips.forEach((ship) => {
        if (ship.isShipSunk) {
          winnersShipsNumber++;
        }
      });

      if (winnersShipsNumber === SHIPS.length) {
        isAllSunk = true;
        winner = boardOwner === CURRENT_PLAYER.player ? "Computer" : "Player";
      }
    }

    return { isAllSunk, winner };
  };

  const deployShipsForComputer = () => {
    let tempAvShip = [...computerAvailableShips];
    let tempDeployedArr: Ship[] = [];

    while (tempAvShip?.length > 0) {
      const isHorizontal = Math.random() < 0.5;
      let block = getRandomOccupiableBlock(tempAvShip[0], isHorizontal);

      if (isPlaceTakenByOtherShip(tempDeployedArr, block).isPlaceTaken) {
        block = getRandomOccupiableBlock(tempAvShip[0], isHorizontal);
      } else {
        const deployableShipObj: Ship = {
          shipName: tempAvShip[0].shipName,
          shipLength: tempAvShip[0].shipLength,
          occupiedBlocks: block,
          isHorizontal,
          currentPlayer,
          attackedBlocks: [],
          isShipSunk: false,
        };
        tempDeployedArr = [...tempDeployedArr, deployableShipObj];
        tempAvShip.shift();
      }
    }

    if (tempDeployedArr.length === SHIPS.length) {
      setComputerAvailableShips([]);
      setComputerDeployedShips(tempDeployedArr);
      startAttackNow();
    }
  };

  const startAttackNow = () => {
    Alert.alert(
      "Ready to Attack",
      "Put the force at weapons posture one, warning red, weapons tight, Admiral",
      [{ text: "Start Battle", onPress: () => {} }]
    );
  };

  const handleMissileAttackOnBoard = (
    rowIndex: number,
    columnIndex: number,
    clickedShip: string
  ) => {
    const coordinationXY = `${rowIndex}${columnIndex}`;
    let newDeployedArr: Ship[] = [];
    const targetBoardShips =
      currentPlayer === CURRENT_PLAYER.player
        ? computerDeployedShips
        : playerDeployedShips;
    let targetShipName = clickedShip;

    if (currentPlayer === CURRENT_PLAYER.computer) {
      targetShipName = getShipNameByCoordinates(
        playerDeployedShips,
        coordinationXY
      );
    }

    if (targetShipName !== "") {
      newDeployedArr = targetBoardShips.map((ship) => {
        if (ship?.shipName === targetShipName) {
          if (ship.attackedBlocks?.length > 0) {
            if (ship.attackedBlocks.includes(coordinationXY)) {
              return ship;
            }
            const newAttackedBlocks = [...ship.attackedBlocks, coordinationXY];
            const isShipSunk = isArraysEqual(
              newAttackedBlocks,
              ship.occupiedBlocks
            );

            return {
              ...ship,
              attackedBlocks: newAttackedBlocks,
              isShipSunk,
            };
          } else {
            return {
              ...ship,
              attackedBlocks: [coordinationXY],
              isShipSunk: false,
            };
          }
        }
        return ship;
      });
    } else {
      newDeployedArr = [
        ...targetBoardShips,
        {
          shipName: MISS_HIT,
          shipLength: 0,
          occupiedBlocks: [],
          attackedBlocks: [coordinationXY],
        },
      ];
    }

    if (currentPlayer === CURRENT_PLAYER.player) {
      setComputerDeployedShips(newDeployedArr);
    } else {
      setPlayerDeployedShips(newDeployedArr);
    }

    setCurrentPlayer(
      currentPlayer === CURRENT_PLAYER.player
        ? CURRENT_PLAYER.computer
        : CURRENT_PLAYER.player
    );
  };

  const onClickBoardSquare = ({
    rowIndex,
    columnIndex,
    clickedShip,
  }: {
    rowIndex: number;
    columnIndex: number;
    clickedShip: string;
  }) => {
    if (hasGameStarted) {
      if (currentPlayer === CURRENT_PLAYER.player) {
        handleMissileAttackOnBoard(rowIndex, columnIndex, clickedShip);
      }
      return;
    }

    if (!hasGameStarted && playerDeployedShips.length === SHIPS.length) {
      Alert.alert("Its time to fire the missiles captain");
    } else if (selectedShipToPlace) {
      const isHorizontal = playersSelectedAxis === AXIS.horizontal;
      if (
        hasEnoughBlocksToDeploy(
          isHorizontal,
          selectedShipToPlace.shipLength,
          rowIndex,
          columnIndex
        )
      ) {
        const occupiedBlocks = getOccupiableBlocks(
          isHorizontal,
          rowIndex,
          columnIndex,
          selectedShipToPlace.shipLength
        );

        if (
          isPlaceTakenByOtherShip(playerDeployedShips, occupiedBlocks)
            .isPlaceTaken
        ) {
          Alert.alert("Block already taken!!");
          return;
        }

        const deployableShipObj: Ship = {
          shipName: selectedShipToPlace.shipName,
          shipLength: selectedShipToPlace.shipLength,
          occupiedBlocks,
          isHorizontal,
          currentPlayer,
          attackedBlocks: [],
          isShipSunk: false,
        };

        setPlayerDeployedShips([...playerDeployedShips, deployableShipObj]);
        setPlayerAvailableShips(
          playerAvailableShips.filter(
            (ship) => ship.shipName !== selectedShipToPlace.shipName
          )
        );
        setSelectedShipToPlace(null);
      } else {
        Alert.alert("Can not place ship here!!");
      }
    } else {
      Alert.alert("Please select your ship first!!");
    }
  };

  const handleGameStart = () => {
    if (hasGameStarted) {
      Alert.alert(
        "Restart Game",
        "Are you sure you want to restart the game?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "OK", onPress: () => resetGame() },
        ]
      );
    } else {
      setHasGameStarted(true);
      deployShipsForComputer();
    }
  };

  if (!openGame) {
    return <StartPage onPress={() => setOpenGame(true)} />;
  }

  return (
    <View style={styles.container}>
      <TitleBar />
      <Summary
        hasGameStarted={hasGameStarted}
        playerAvailableShips={playerAvailableShips}
        playerDeployedShips={playerDeployedShips}
        computerDeployedShips={computerDeployedShips}
        handleGameStart={handleGameStart}
        currentPlayer={currentPlayer}
      />

      <View style={styles.content}>
        <View style={styles.boardContainer}>
          <Text style={styles.boardTitle}>Player Board</Text>
          <View style={styles.boardWrapper}>
            <Board
              hasGameStarted={hasGameStarted}
              selectedShipToPlace={selectedShipToPlace as Ship}
              onClickBoardSquare={onClickBoardSquare}
              deployedShips={playerDeployedShips}
              boardOwner={CURRENT_PLAYER.player}
            />
          </View>
        </View>

        <View style={styles.boardContainer}>
          {!hasGameStarted ? (
            <Inventory
              title="Inventory"
              playerAvailableShips={playerAvailableShips}
              handleSelectShipToPlace={handleSelectShipToPlace}
              selectedShipToPlace={selectedShipToPlace}
              playersSelectedAxis={playersSelectedAxis}
              onSelectAxis={onSelectAxis}
            />
          ) : (
            <View style={styles.boardWrapper}>
              <Text style={styles.boardTitle}>Computer Board</Text>
              <View style={styles.boardContainer}>
                <Board
                  hasGameStarted={hasGameStarted}
                  selectedShipToPlace={selectedShipToPlace}
                  onClickBoardSquare={onClickBoardSquare}
                  deployedShips={computerDeployedShips}
                  boardOwner={CURRENT_PLAYER.computer}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  content: {
    flex: 1,
    flexDirection: "column", // for mobile view
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
  },
  boardContainer: {
    width: "100%", // Take full width
    marginVertical: 20, // Add vertical margin
  },
  boardWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    alignItems: "center", // Center board content
  },
  boardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default BattleshipGame;
