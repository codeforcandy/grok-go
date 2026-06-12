import type { Board, Cell, Color, PlayResult, Point } from './types';

export const opponent = (c: Color): Color => (c === 'black' ? 'white' : 'black');

export function createBoard(size = 9): Board {
  return {
    size,
    cells: Array(size * size).fill(null),
    koPoint: null,
    captures: { black: 0, white: 0 }
  };
}

export const toIndex = (size: number, p: Point): number => p.y * size + p.x;

export const toPoint = (size: number, i: number): Point => ({
  x: i % size,
  y: Math.floor(i / size)
});

export const inBounds = (size: number, p: Point): boolean =>
  p.x >= 0 && p.x < size && p.y >= 0 && p.y < size;

export function neighbors(size: number, i: number): number[] {
  const { x, y } = toPoint(size, i);
  const result: number[] = [];
  if (x > 0) result.push(i - 1);
  if (x < size - 1) result.push(i + 1);
  if (y > 0) result.push(i - size);
  if (y < size - 1) result.push(i + size);
  return result;
}

export interface Group {
  color: Color;
  stones: number[];
  liberties: number[];
}

export function groupAt(board: Board, i: number): Group | null {
  const color = board.cells[i];
  if (color === null) return null;
  const stones: number[] = [];
  const liberties = new Set<number>();
  const seen = new Set<number>([i]);
  const queue = [i];
  while (queue.length > 0) {
    const current = queue.pop()!;
    stones.push(current);
    for (const n of neighbors(board.size, current)) {
      const cell = board.cells[n];
      if (cell === null) {
        liberties.add(n);
      } else if (cell === color && !seen.has(n)) {
        seen.add(n);
        queue.push(n);
      }
    }
  }
  return { color, stones, liberties: [...liberties] };
}

export function play(board: Board, color: Color, p: Point): PlayResult {
  if (!inBounds(board.size, p)) return { ok: false, reason: 'off-board' };
  const i = toIndex(board.size, p);
  if (board.cells[i] !== null) return { ok: false, reason: 'occupied' };
  if (board.koPoint === i) return { ok: false, reason: 'ko' };

  const cells: Cell[] = [...board.cells];
  cells[i] = color;
  const next: Board = { ...board, cells, koPoint: null, captures: { ...board.captures } };

  const captured: number[] = [];
  for (const n of neighbors(board.size, i)) {
    if (next.cells[n] !== opponent(color)) continue;
    const group = groupAt(next, n)!;
    if (group.liberties.length === 0) {
      for (const s of group.stones) {
        next.cells[s] = null;
        captured.push(s);
      }
    }
  }
  next.captures[color] += captured.length;

  const own = groupAt(next, i)!;
  if (captured.length === 0 && own.liberties.length === 0) {
    return { ok: false, reason: 'suicide' };
  }

  if (
    captured.length === 1 &&
    own.stones.length === 1 &&
    own.liberties.length === 1 &&
    own.liberties[0] === captured[0]
  ) {
    next.koPoint = captured[0];
  }

  return { ok: true, board: next, captured: captured.map((c) => toPoint(board.size, c)) };
}