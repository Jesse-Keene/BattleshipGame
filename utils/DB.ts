interface Ship {
  shipName: string;
  shipLength: number;
  occupiedBlocks: string[];
  isHorizontal?: boolean;
  currentPlayer?: string;
  attackedBlocks: string[];
  isShipSunk?: boolean;
}

export const SHIPS: Ship[] = [
  {
    shipName: "carrier",
    shipLength: 5,
    occupiedBlocks: [],
    attackedBlocks: [],
    isHorizontal: true,
    isShipSunk: false,
  },
  {
    shipName: "battleship",
    shipLength: 4,
    occupiedBlocks: [],
    attackedBlocks: [],
    isHorizontal: true,
    isShipSunk: false,
  },
  {
    shipName: "cruiser",
    shipLength: 3,
    occupiedBlocks: [],
    attackedBlocks: [],
    isHorizontal: true,
    isShipSunk: false,
  },
  {
    shipName: "destroyer",
    shipLength: 2,
    occupiedBlocks: [],
    attackedBlocks: [],
    isHorizontal: true,
    isShipSunk: false,
  },
];

export const MISS_HIT = "MISS_HIT";

export const BOARD_ARR = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
];

export const AXIS = {
  horizontal: "horizontal",
  vertical: "vertical",
} as const;

export const CURRENT_PLAYER = {
  player: "You",
  computer: "Computer",
} as const;
