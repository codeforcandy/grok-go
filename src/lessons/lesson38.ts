import type { Lesson } from './types';

export const lesson38: Lesson = {
  id: 'three-three',
  title: 'The 3-3 Invasion',
  setup: {
    white: [{ x: 2, y: 2 }, { x: 4, y: 2 }, { x: 2, y: 4 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Live small, live now',
      text:
        'When a corner is loosely fenced, the 3-3 {{invasion}} slips inside and ' +
        'often lives small. You sacrifice the corner for a foothold — classic ' +
        '{{joseki}} when the wall is thin.'
    },
    {
      kind: 'highlight',
      points: [{ x: 3, y: 3 }],
      style: 'glow',
      speaker: 'hoshi',
      text:
        'The 3-3 point is the deepest cut — one step in from the corner on both lines. ' +
        'From there, invaders live modestly or run into the center.'
    },
    {
      kind: 'quiz',
      title: 'You try: invade at 3-3',
      prompt:
        'Black to play. Invade the corner at the 3-3 point inside White\'s framework.',
      accept: [{ x: 3, y: 3 }],
      hint: 'The glowing point — one line in from the corner along both axes.',
      explainCorrect:
        'Inside at 3-3. A small life or a running fight — either way, White\'s corner ' +
        'is no longer a gift.',
      explainWrong:
        'Play at the 3-3 point inside the corner — not on the outer wall stones.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 3 },
      speaker: 'tsuki',
      text:
        'I block from the side. The invasion lives small, but my corner profit shrank ' +
        '— that is the 3-3 bargain.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Small but settled',
      text:
        'A successful 3-3 {{invasion}} often yields a compact living group. You traded ' +
        'grand corner {{territory}} for certainty — a fair {{joseki}} when behind.'
    }
  ]
};