import { Cell } from "./types/Cell";

export interface IGameView {
  updateGameField(field: Cell[][]);
  updateGameState(state: {
    width?: number;
    height?: number;
    isRunning?: boolean;
  });
  onCellClick(cb: (x: number, y: number) => void);
  onGameStateChange(cb: (newState: boolean) => void);
  onFieldSizeChange(cb: (width: number, height: number) => void);
}
