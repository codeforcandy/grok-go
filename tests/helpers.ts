import { toIndex } from '../src/engine/board';
import type { Board, Color, Point } from '../src/engine/types';

export function place(board: Board, color: Color, points: Point[]): Board {
  const cells = [...board.cells];
  for (const p of points) cells[toIndex(board.size, p)] = color;
  return { ...board, cells };
}