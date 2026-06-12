export type Color = 'black' | 'white';
export type Cell = Color | null;

export interface Point {
  x: number;
  y: number;
}

export interface Board {
  size: number;
  cells: Cell[];
  koPoint: number | null;
  captures: Record<Color, number>;
}

export type IllegalReason = 'off-board' | 'occupied' | 'suicide' | 'ko';

export type PlayResult =
  | { ok: true; board: Board; captured: Point[] }
  | { ok: false; reason: IllegalReason };