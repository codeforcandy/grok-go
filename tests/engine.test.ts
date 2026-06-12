import { describe, expect, it } from 'vitest';
import { createBoard, groupAt, neighbors, play, toIndex, toPoint } from '../src/engine/board';
import { place } from './helpers';

describe('board basics', () => {
  it('creates an empty 9x9 board', () => {
    const b = createBoard();
    expect(b.size).toBe(9);
    expect(b.cells).toHaveLength(81);
    expect(b.cells.every((c) => c === null)).toBe(true);
    expect(b.captures).toEqual({ black: 0, white: 0 });
    expect(b.koPoint).toBeNull();
  });

  it('maps points to indices and back', () => {
    expect(toIndex(9, { x: 0, y: 0 })).toBe(0);
    expect(toIndex(9, { x: 8, y: 0 })).toBe(8);
    expect(toIndex(9, { x: 0, y: 1 })).toBe(9);
    expect(toPoint(9, 40)).toEqual({ x: 4, y: 4 });
  });

  it('finds 4 neighbors in the center, 2 in the corner, 3 on the edge', () => {
    expect(neighbors(9, toIndex(9, { x: 4, y: 4 }))).toHaveLength(4);
    expect(neighbors(9, toIndex(9, { x: 0, y: 0 }))).toHaveLength(2);
    expect(neighbors(9, toIndex(9, { x: 4, y: 0 }))).toHaveLength(3);
  });
});

describe('groups and liberties', () => {
  it('a lone center stone has 4 liberties', () => {
    const b = place(createBoard(), 'black', [{ x: 4, y: 4 }]);
    const g = groupAt(b, toIndex(9, { x: 4, y: 4 }));
    expect(g?.stones).toHaveLength(1);
    expect(g?.liberties).toHaveLength(4);
  });

  it('a corner stone has 2 liberties', () => {
    const b = place(createBoard(), 'white', [{ x: 0, y: 0 }]);
    const g = groupAt(b, 0);
    expect(g?.liberties).toHaveLength(2);
  });

  it('connected stones form one group and share liberties', () => {
    const b = place(createBoard(), 'black', [
      { x: 4, y: 4 },
      { x: 5, y: 4 }
    ]);
    const g = groupAt(b, toIndex(9, { x: 4, y: 4 }));
    expect(g?.stones).toHaveLength(2);
    expect(g?.liberties).toHaveLength(6);
  });

  it('enemy stones reduce liberties, diagonals do not connect', () => {
    let b = place(createBoard(), 'black', [{ x: 4, y: 4 }, { x: 5, y: 5 }]);
    b = place(b, 'white', [{ x: 4, y: 3 }]);
    const g = groupAt(b, toIndex(9, { x: 4, y: 4 }));
    expect(g?.stones).toHaveLength(1);
    expect(g?.liberties).toHaveLength(3);
  });

  it('returns null for an empty point', () => {
    expect(groupAt(createBoard(), 0)).toBeNull();
  });
});

describe('play', () => {
  it('places a stone on an empty point', () => {
    const r = play(createBoard(), 'black', { x: 4, y: 4 });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.board.cells[toIndex(9, { x: 4, y: 4 })]).toBe('black');
      expect(r.captured).toEqual([]);
    }
  });

  it('rejects occupied points and off-board points', () => {
    const b = place(createBoard(), 'black', [{ x: 4, y: 4 }]);
    expect(play(b, 'white', { x: 4, y: 4 })).toEqual({ ok: false, reason: 'occupied' });
    expect(play(b, 'white', { x: 9, y: 0 })).toEqual({ ok: false, reason: 'off-board' });
    expect(play(b, 'white', { x: -1, y: 0 })).toEqual({ ok: false, reason: 'off-board' });
  });

  it('does not mutate the input board', () => {
    const b = createBoard();
    play(b, 'black', { x: 0, y: 0 });
    expect(b.cells.every((c) => c === null)).toBe(true);
  });

  it('captures a single surrounded stone', () => {
    let b = place(createBoard(), 'white', [{ x: 4, y: 4 }]);
    b = place(b, 'black', [{ x: 3, y: 4 }, { x: 5, y: 4 }, { x: 4, y: 3 }]);
    const r = play(b, 'black', { x: 4, y: 5 });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.captured).toEqual([{ x: 4, y: 4 }]);
      expect(r.board.cells[toIndex(9, { x: 4, y: 4 })]).toBeNull();
      expect(r.board.captures.black).toBe(1);
    }
  });

  it('captures a whole group at once', () => {
    let b = place(createBoard(), 'white', [{ x: 4, y: 4 }, { x: 5, y: 4 }]);
    b = place(b, 'black', [
      { x: 3, y: 4 }, { x: 6, y: 4 },
      { x: 4, y: 3 }, { x: 5, y: 3 },
      { x: 4, y: 5 }
    ]);
    const r = play(b, 'black', { x: 5, y: 5 });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.captured).toHaveLength(2);
      expect(r.board.captures.black).toBe(2);
    }
  });

  it('captures in the corner with only 2 surrounding stones', () => {
    let b = place(createBoard(), 'white', [{ x: 0, y: 0 }]);
    b = place(b, 'black', [{ x: 1, y: 0 }]);
    const r = play(b, 'black', { x: 0, y: 1 });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.captured).toEqual([{ x: 0, y: 0 }]);
  });

  it('rejects suicide', () => {
    const b = place(createBoard(), 'white', [{ x: 1, y: 0 }, { x: 0, y: 1 }]);
    expect(play(b, 'black', { x: 0, y: 0 })).toEqual({ ok: false, reason: 'suicide' });
  });

  it('allows a self-atari move that captures (not suicide)', () => {
    let b = place(createBoard(), 'black', [{ x: 0, y: 0 }]);
    b = place(b, 'white', [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }]);
    const r = play(b, 'white', { x: 0, y: 1 });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.captured).toEqual([{ x: 0, y: 0 }]);
  });

  it('forbids immediate ko recapture, then allows it after another move', () => {
    let b = place(createBoard(), 'black', [{ x: 4, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }]);
    b = place(b, 'white', [{ x: 5, y: 3 }, { x: 6, y: 4 }, { x: 5, y: 5 }, { x: 4, y: 4 }]);

    const take = play(b, 'black', { x: 5, y: 4 });
    expect(take.ok).toBe(true);
    if (!take.ok) return;
    expect(take.captured).toEqual([{ x: 4, y: 4 }]);
    expect(take.board.koPoint).toBe(toIndex(9, { x: 4, y: 4 }));

    expect(play(take.board, 'white', { x: 4, y: 4 })).toEqual({ ok: false, reason: 'ko' });

    const elsewhere = play(take.board, 'white', { x: 0, y: 8 });
    expect(elsewhere.ok).toBe(true);
    if (elsewhere.ok) {
      expect(elsewhere.board.koPoint).toBeNull();
      expect(play(elsewhere.board, 'white', { x: 4, y: 4 }).ok).toBe(true);
    }
  });

  it('multi-stone capture does not set a ko point', () => {
    let b = place(createBoard(), 'white', [{ x: 4, y: 4 }, { x: 5, y: 4 }]);
    b = place(b, 'black', [
      { x: 3, y: 4 }, { x: 6, y: 4 },
      { x: 4, y: 3 }, { x: 5, y: 3 },
      { x: 4, y: 5 }
    ]);
    const r = play(b, 'black', { x: 5, y: 5 });
    expect(r.ok && r.board.koPoint === null).toBe(true);
  });
});