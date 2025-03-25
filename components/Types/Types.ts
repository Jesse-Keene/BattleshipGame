export interface Ship {
  shipName: string;
  shipLength: number;
  occupiedBlocks: string[];
  isHorizontal?: boolean;
  currentPlayer?: string;
  attackedBlocks: string[];
  isShipSunk?: boolean;
}
