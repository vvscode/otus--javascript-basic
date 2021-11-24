import { Cell } from "./types/Cell";

export interface IGameField {
  getState(): Cell[][];
  toggleCellState(x: number, y: number);
  nextGeneration();
  setSize(width: number, height: number);
}
