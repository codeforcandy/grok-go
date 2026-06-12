import type { Point } from '../engine/types';

export interface BoardGeometry {
  centerX: number;
  centerY: number;
  side: number;
  cell: number;
  gridLeft: number;
  gridTop: number;
  boardSize: number;
}

export function computeGeometry(width: number, height: number, boardSize = 9): BoardGeometry {
  const side = Math.min(width * 0.52, height * 0.82);
  const cell = side / (boardSize + 1);
  const centerX = width * 0.40;
  const centerY = height * 0.5;
  const gridSpan = cell * (boardSize - 1);
  return {
    centerX,
    centerY,
    side,
    cell,
    gridLeft: centerX - gridSpan / 2,
    gridTop: centerY - gridSpan / 2,
    boardSize
  };
}

export function pixelOf(g: BoardGeometry, p: Point): { px: number; py: number } {
  return { px: g.gridLeft + p.x * g.cell, py: g.gridTop + p.y * g.cell };
}

export function pointAt(g: BoardGeometry, px: number, py: number): Point | null {
  const x = Math.round((px - g.gridLeft) / g.cell);
  const y = Math.round((py - g.gridTop) / g.cell);
  if (x < 0 || x >= g.boardSize || y < 0 || y >= g.boardSize) return null;
  const ideal = pixelOf(g, { x, y });
  const dist = Math.hypot(px - ideal.px, py - ideal.py);
  return dist <= g.cell * 0.45 ? { x: x + 0, y: y + 0 } : null;
}