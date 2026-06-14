import type { Lesson } from './types';

export const lesson45: Lesson = {
  id: 'ignore-ko',
  title: 'Ignore Ko?',
  setup: {
    black: [{ x: 4, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }],
    white: [{ x: 5, y: 3 }, { x: 6, y: 4 }, { x: 5, y: 5 }, { x: 4, y: 4 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Sometimes walk away',
      text:
        'Not every {{ko}} deserves a war. If the swing is only a point or two, you ' +
        'may {{tenuki}} and take something larger. Ignoring ko is courage when the ' +
        'board still has rivers of points.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 4 },
      speaker: 'hoshi',
      text: 'A small {{ko}} flickers — one stone, one breath. The rest of the garden is vast.'
    },
    {
      kind: 'quiz',
      title: 'You try: ignore the small ko',
      prompt:
        'White to play. The local {{ko}} is tiny. Ignore it and take a big point on the far side.',
      accept: [{ x: 0, y: 0 }],
      hint: 'The opposite corner — untouched, wide, worth more than the ko noise.',
      explainCorrect:
        'You ignored the small {{ko}} and claimed fresh ground. Sometimes the whole ' +
        'board shouts louder than a single hot point.',
      explainWrong:
        'Do not chase a tiny {{ko}}. Find the largest empty region far from the fight.'
    },
    {
      kind: 'move',
      point: { x: 1, y: 1 },
      speaker: 'tsuki',
      text:
        'You left my ko burning while you planted a flag elsewhere. I cannot be angry ' +
        '— that is correct arithmetic.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Ko is a price tag',
      text:
        'Before you dive into a {{ko}} fight, read its value. If a corner elsewhere ' +
        'is bigger, walk. The night garden rewards players who count before they storm.'
    }
  ]
};