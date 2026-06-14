import type { Lesson } from './types';

export const lesson39: Lesson = {
  id: 'one-space-low',
  title: 'One-Space Low Enclosure',
  setup: {
    black: [{ x: 2, y: 2 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Fence the corner',
      text:
        'From a {{star point}} stone, a one-space low {{enclosure}} on the third line ' +
        'fences solid {{territory}}. It is a humble {{joseki}} shape — small, efficient, ' +
        'and hard to invade cheaply.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 2 },
      speaker: 'hoshi',
      text:
        'I approach my own corner from the side first — a reminder that enclosures ' +
        'grow from existing stones.'
    },
    {
      kind: 'quiz',
      title: 'You try: complete the enclosure',
      prompt:
        'Black to play. Add the one-space low stone that completes the corner {{enclosure}}.',
      accept: [{ x: 2, y: 4 }],
      hint: 'From your corner star, step up one line on the left side.',
      explainCorrect:
        'A tidy {{enclosure}}. The corner is fenced — modest {{territory}} secured ' +
        'with two calm stones.',
      explainWrong:
        'Complete the low fence from your corner stone along the left side — one ' +
        'space away on the third line.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'tsuki',
      text:
        'You took the corner; I take the center. Enclosures are honest — they say ' +
        'exactly how much you expect to keep.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Solid and small',
      text:
        'Low enclosures trade ambition for certainty. Pair them with center {{extension}}s ' +
        'so your {{influence}} still reaches beyond the fence.'
    }
  ]
};