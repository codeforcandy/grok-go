import type { Lesson } from './types';

export const lesson36: Lesson = {
  id: 'wall-value',
  title: 'The Value of a Wall',
  setup: {
    black: [
      { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }
    ]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'A wall faces the center',
      text:
        'A side wall gains value from what it faces. Stones along the edge look ' +
        'toward the center earn {{influence}}; stones crawling on the edge earn ' +
        'little. The wall\'s gift is the open direction.'
    },
    {
      kind: 'highlight',
      points: [{ x: 3, y: 2 }, { x: 3, y: 3 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'From the wall on the left, the center above glows. An {{extension}} there ' +
        'rides the wall\'s {{influence}} toward a future {{moyo}}.'
    },
    {
      kind: 'quiz',
      title: 'You try: extend from the wall',
      prompt:
        'Black to play. Extend from your wall toward the center to use its {{influence}}.',
      accept: [{ x: 3, y: 2 }],
      hint: 'From the middle of the wall, step upward into the open center.',
      explainCorrect:
        'You rode the wall\'s value outward. A wall is a launchpad — its power flows ' +
        'toward the center, not along the basement.',
      explainWrong:
        'Play above the wall toward the open center — where {{influence}} can still ' +
        'expand into {{territory}}.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'tsuki',
      text:
        'You built a ridge toward the stars while I took a quiet corner. Walls and ' +
        'corners trade different currencies.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Chapter 6 complete',
      text:
        'You have met {{thickness}}, {{moyo}}, {{reduction}} vs {{invasion}}, attacks ' +
        'with power, {{overconcentration}}, and the wall\'s outward gift. Chapter 7 ' +
        'tells corner stories — short {{joseki}} with reasons, not memorized spells.'
    }
  ]
};