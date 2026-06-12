import { neighbors } from './board';
import type { Board, Color } from './types';

export interface Territory {
  black: number;
  white: number;
  neutral: number;
  ownerOf: Map<number, Color | 'neutral'>;
}

export function territory(board: Board): Territory {
  const result: Territory = { black: 0, white: 0, neutral: 0, ownerOf: new Map() };
  const seen = new Set<number>();

  for (let i = 0; i < board.cells.length; i++) {
    if (board.cells[i] !== null || seen.has(i)) continue;

    const region: number[] = [];
    const borders = new Set<Color>();
    const queue = [i];
    seen.add(i);
    while (queue.length > 0) {
      const current = queue.pop()!;
      region.push(current);
      for (const n of neighbors(board.size, current)) {
        const cell = board.cells[n];
        if (cell === null) {
          if (!seen.has(n)) {
            seen.add(n);
            queue.push(n);
          }
        } else {
          borders.add(cell);
        }
      }
    }

    const owner: Color | 'neutral' = borders.size === 1 ? [...borders][0] : 'neutral';
    for (const r of region) result.ownerOf.set(r, owner);
    if (owner === 'neutral') result.neutral += region.length;
    else result[owner] += region.length;
  }

  return result;
}