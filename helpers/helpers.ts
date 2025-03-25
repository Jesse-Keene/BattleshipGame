import { BOARD_ARR, MISS_HIT } from "../utils/DB";

interface Ship {
  shipName: string;
  shipLength: number;
  occupiedBlocks: string[];
  attackedBlocks: string[];
  isShipSunk?: boolean;
}

interface Coordinates {
  rowIndex: number;
  columnIndex: number;
}

interface PlaceTakenResult {
  isPlaceTaken: boolean;
  shipName: string;
}

export const hasEnoughBlocksToDeploy = (
  isHorizontal: boolean,
  shipLength: number,
  rowIndex: number,
  columnIndex: number
): boolean => {
  return isHorizontal
    ? shipLength + rowIndex <= 10
    : shipLength + columnIndex <= 10;
};

const getOccupiableDataBasedOnAxis = (
  isHorizontal: boolean,
  rowIndex: number,
  columnIndex: number,
  arrIndex: number
): string => {
  return isHorizontal
    ? `${rowIndex + arrIndex}${columnIndex}`
    : `${rowIndex}${columnIndex + arrIndex}`;
};

export const getOccupiableBlocks = (
  isHorizontal: boolean,
  rowIndex: number,
  columnIndex: number,
  shipLength: number
): string[] => {
  const occupiableBlocks: string[] = [];

  Array(shipLength)
    .fill(0)
    .forEach((_, arrIndex) => {
      occupiableBlocks.push(
        getOccupiableDataBasedOnAxis(
          isHorizontal,
          rowIndex,
          columnIndex,
          arrIndex
        )
      );
    });

  return occupiableBlocks;
};

export const isPlaceTakenByOtherShip = (
  deployedShips: Ship[],
  occupiedBlocks: string[]
): PlaceTakenResult => {
  let isPlaceTaken = false;
  let shipName = "";

  if (deployedShips && deployedShips.length > 0) {
    deployedShips.forEach((ship) => {
      ship.occupiedBlocks.forEach((block) => {
        if (occupiedBlocks.includes(block)) {
          shipName = ship.shipName;
          isPlaceTaken = true;
          return;
        }
      });
    });
  }

  return { isPlaceTaken, shipName };
};

export const generateRandomRowAndColumnIndex = (): Coordinates => {
  const columnIndex = Math.floor(Math.random() * BOARD_ARR.length);
  const rowIndex = Math.floor(Math.random() * BOARD_ARR[columnIndex].length);

  return {
    rowIndex,
    columnIndex,
  };
};

export const getRandomOccupiableBlock = (
  computerShip: Ship,
  isHorizontal: boolean
): string[] => {
  const { rowIndex, columnIndex } = generateRandomRowAndColumnIndex();

  if (
    hasEnoughBlocksToDeploy(
      isHorizontal,
      computerShip.shipLength,
      rowIndex,
      columnIndex
    )
  ) {
    return getOccupiableBlocks(
      isHorizontal,
      rowIndex,
      columnIndex,
      computerShip.shipLength
    );
  } else {
    return getRandomOccupiableBlock(computerShip, isHorizontal);
  }
};

export const checkIfAttackBlockHasTheSameShipAndIndex = (
  shipName: string,
  selectedIndex: number,
  deployedShipArr: Ship[]
): boolean => {
  let result = false;

  if (
    deployedShipArr &&
    deployedShipArr.length > 0 &&
    deployedShipArr.length > 0 &&
    deployedShipArr.some((ship) => ship.occupiedBlocks.length > 0)
  ) {
    deployedShipArr.forEach((ship) => {
      ship.occupiedBlocks.forEach((block) => {
        if (ship.shipName === shipName && ship.attackedBlocks.includes(block)) {
          result = true;
        }
      });
    });
  }
  return result;
};

export const getShipNameByCoordinates = (
  deployedShips: Ship[],
  coordinates: string
): string => {
  let shipName = "";
  deployedShips.forEach((ship) => {
    if (ship?.shipName !== MISS_HIT) {
      ship.occupiedBlocks.forEach((block) => {
        if (block === coordinates) {
          shipName = ship.shipName;
        }
      });
    }
  });
  return shipName;
};

export const isArraysEqual = (arr1: string[], arr2: string[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  return arr1.sort().toString() === arr2.sort().toString();
};
