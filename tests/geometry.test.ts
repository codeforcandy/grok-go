import { describe, expect, it } from 'vitest';
import { computeGeometry, pixelOf, pointAt } from '../src/render/geometry';

describe('geometry', () => {
  const g = computeGeometry(1280, 800);

  it('round-trips every intersection through pixels', () => {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        const { px, py } = pixelOf(g, { x, y });
        expect(pointAt(g, px, py)).toEqual({ x, y });
        expect(pointAt(g, px + g.cell * 0.3, py - g.cell * 0.3)).toEqual({ x, y });
      }
    }
  });

  it('returns null for clicks far from any intersection or off the board', () => {
    expect(pointAt(g, 5, 5)).toBeNull();
    const { px, py } = pixelOf(g, { x: 0, y: 0 });
    expect(pointAt(g, px - g.cell, py - g.cell)).toBeNull();
  });

  it('keeps the board inside the viewport and left of center', () => {
    expect(g.side).toBeLessThanOrEqual(800);
    expect(g.centerX).toBeLessThan(1280 / 2 + 1);
  });
});