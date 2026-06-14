import type { Lesson } from './types';

export const lesson29: Lesson = {
  id: 'miai',
  title: 'Miai — Mutual Points',
  setup: {
    black: [{ x: 4, y: 4 }, { x: 6, y: 4 }, { x: 4, y: 6 }],
    white: [{ x: 5, y: 5 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Two doors, same key',
      text:
        '{{Miai}} — mutual points. Two intersections of equal value: play one and ' +
        'your opponent must answer; the other still waits for you. Either door ' +
        'opens the same room.'
    },
    {
      kind: 'highlight',
      points: [{ x: 5, y: 4 }, { x: 4, y: 5 }, { x: 6, y: 5 }, { x: 5, y: 6 }],
      style: 'glow',
      speaker: 'tsuki',
      text:
        'I sit in the center, but your triangle aims at two equivalent shoulders. ' +
        'Whichever you choose, the other still hums with the same threat.'
    },
    {
      kind: 'quiz',
      title: 'You try: play miai',
      prompt:
        'Black to play. Choose either {{miai}} point that presses White equally — ' +
        'both work.',
      accept: [{ x: 5, y: 4 }],
      hint: 'Play beside White on the right shoulder — the other equivalent point waits if needed.',
      explainCorrect:
        'A {{miai}} shoulder. White must answer, and the other equivalent point ' +
        'still remains — that is the beauty of mutual points.',
      explainWrong:
        'Play adjacent to White on the right shoulder — one of the two equivalent ' +
        '{{miai}} points.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 6 },
      speaker: 'tsuki',
      text:
        'I block one door, but you knew the other was waiting. {{Miai}} turns ' +
        'double threats into a calm choice.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Equivalent is powerful',
      text:
        'When you find {{miai}}, relax. You do not need the perfect stone — either ' +
        'works. Save your {{reading}} for fights where the points are not equal.'
    }
  ]
};