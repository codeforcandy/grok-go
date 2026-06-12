import { describe, expect, it } from 'vitest';
import { play, toIndex } from '../src/engine/board';
import { territory } from '../src/engine/territory';
import { glossary } from '../src/lessons/glossary';
import { lessons } from '../src/lessons/index';
import { lesson6 } from '../src/lessons/lesson6';
import { stateAfter } from '../src/lessons/replay';
import type { Lesson } from '../src/lessons/types';

const turnSteps = (lesson: Lesson) =>
  lesson.steps.map((s, i) => ({ step: s, i })).filter(({ step }) => step.kind === 'move' || step.kind === 'quiz');

describe.each(lessons.map((l) => [l.id, l] as const))('lesson %s', (_id, lesson) => {
  it('setup stones do not overlap', () => {
    const all = [...(lesson.setup?.black ?? []), ...(lesson.setup?.white ?? [])];
    const indices = all.map((p) => toIndex(9, p));
    expect(new Set(indices).size).toBe(indices.length);
  });

  it('every scripted move and canonical quiz answer is legal', () => {
    expect(() => stateAfter(lesson, lesson.steps.length - 1)).not.toThrow();
  });

  it('every quiz accept point is legal at its position', () => {
    for (const { step, i } of turnSteps(lesson)) {
      if (step.kind !== 'quiz') continue;
      const before = stateAfter(lesson, i - 1);
      for (const p of step.accept) {
        expect(play(before.board, before.toPlay, p).ok, `accept (${p.x},${p.y}) in step ${i}`).toBe(true);
      }
    }
  });

  it('a quiz followed by more turns has exactly one accept point', () => {
    const turns = turnSteps(lesson);
    turns.forEach(({ step }, position) => {
      if (step.kind === 'quiz' && position < turns.length - 1) {
        expect(step.accept).toHaveLength(1);
      }
    });
  });

  it('all {{terms}} exist in the glossary', () => {
    for (const step of lesson.steps) {
      const texts = [
        'text' in step ? step.text : '',
        step.kind === 'quiz' ? [step.prompt, step.hint, step.explainCorrect, step.explainWrong].join(' ') : ''
      ].join(' ');
      for (const match of texts.matchAll(/\{\{([^}]+)\}\}/g)) {
        expect(glossary[match[1]], `missing glossary term: ${match[1]}`).toBeDefined();
      }
    }
  });
});

describe('lesson 6 final position', () => {
  it('scores Black 25 + 1 prisoner vs White 27', () => {
    const final = stateAfter(lesson6, lesson6.steps.length - 1);
    const t = territory(final.board);
    expect(t.black).toBe(25);
    expect(t.white).toBe(27);
    expect(final.board.captures.black).toBe(1);
    expect(final.board.captures.white).toBe(0);
  });
});