import { describe, expect, it } from 'vitest';
import { createBoard, toIndex } from '../src/engine/board';
import { territory } from '../src/engine/territory';
import { place } from './helpers';

describe('territory', () => {
  it('empty board is all neutral', () => {
    const t = territory(createBoard());
    expect(t).toMatchObject({ black: 0, white: 0, neutral: 81 });
  });

  it('a full-height black wall on x=3 and white wall on x=5 split the board', () => {
    let b = createBoard();
    const blackWall = Array.from({ length: 9 }, (_, y) => ({ x: 3, y }));
    const whiteWall = Array.from({ length: 9 }, (_, y) => ({ x: 5, y }));
    b = place(b, 'black', blackWall);
    b = place(b, 'white', whiteWall);
    const t = territory(b);
    expect(t.black).toBe(27);
    expect(t.white).toBe(27);
    expect(t.neutral).toBe(9);
    expect(t.ownerOf.get(toIndex(9, { x: 0, y: 0 }))).toBe('black');
    expect(t.ownerOf.get(toIndex(9, { x: 4, y: 4 }))).toBe('neutral');
    expect(t.ownerOf.get(toIndex(9, { x: 8, y: 8 }))).toBe('white');
  });

  it('a region touching only one color belongs to that color', () => {
    let b = place(createBoard(), 'black', [{ x: 1, y: 0 }, { x: 0, y: 1 }]);
    b = place(b, 'white', [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 2 }]);
    const t = territory(b);
    expect(t.ownerOf.get(0)).toBe('black');
    expect(t.black).toBe(1);
  });
});