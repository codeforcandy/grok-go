import { describe, expect, it } from 'vitest';
import { toIndex } from '../src/engine/board';
import { stateAfter } from '../src/lessons/replay';
import type { Lesson } from '../src/lessons/types';

const lesson: Lesson = {
  id: 'test',
  title: 'Test',
  setup: { black: [{ x: 3, y: 4 }, { x: 5, y: 4 }], white: [{ x: 4, y: 4 }] },
  firstToPlay: 'black',
  steps: [
    { kind: 'note', speaker: 'narrator', text: 'intro' },
    { kind: 'move', point: { x: 4, y: 3 }, speaker: 'hoshi', text: 'closing in' },
    { kind: 'move', point: { x: 0, y: 0 }, speaker: 'tsuki', text: 'elsewhere' },
    {
      kind: 'quiz',
      prompt: 'capture',
      accept: [{ x: 4, y: 5 }],
      hint: 'last liberty',
      explainCorrect: 'yes',
      explainWrong: 'no'
    },
    { kind: 'note', speaker: 'narrator', text: 'done' }
  ]
};

describe('stateAfter', () => {
  it('index -1 returns the setup position with no moves', () => {
    const s = stateAfter(lesson, -1);
    expect(s.board.cells[toIndex(9, { x: 4, y: 4 })]).toBe('white');
    expect(s.toPlay).toBe('black');
    expect(s.lastMove).toBeNull();
  });

  it('notes do not consume turns', () => {
    const s = stateAfter(lesson, 0);
    expect(s.toPlay).toBe('black');
  });

  it('moves alternate colors starting from firstToPlay', () => {
    const after1 = stateAfter(lesson, 1);
    expect(after1.board.cells[toIndex(9, { x: 4, y: 3 })]).toBe('black');
    expect(after1.toPlay).toBe('white');
    const after2 = stateAfter(lesson, 2);
    expect(after2.board.cells[toIndex(9, { x: 0, y: 0 })]).toBe('white');
    expect(after2.toPlay).toBe('black');
  });

  it('a quiz consumes a turn and places its canonical (first) accept point', () => {
    const s = stateAfter(lesson, 3);
    expect(s.board.cells[toIndex(9, { x: 4, y: 5 })]).toBe('black');
    expect(s.board.cells[toIndex(9, { x: 4, y: 4 })]).toBeNull();
    expect(s.lastCaptured).toEqual([{ x: 4, y: 4 }]);
    expect(s.toPlay).toBe('white');
  });

  it('throws on an illegal scripted move', () => {
    const bad: Lesson = {
      ...lesson,
      steps: [{ kind: 'move', point: { x: 4, y: 4 }, speaker: 'hoshi', text: 'occupied!' }]
    };
    expect(() => stateAfter(bad, 0)).toThrow(/illegal/i);
  });
});