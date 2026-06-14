import type { Lesson } from './types';

export const lesson57: Lesson = {
  id: 'middle-turning',
  title: 'The Turning Point',
  setup: {
    black: [
      { x: 2, y: 2 }, { x: 6, y: 2 }, { x: 6, y: 6 },
      { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 2, y: 1 }, { x: 3, y: 1 },
      { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 3, y: 4 }, { x: 2, y: 4 }, { x: 1, y: 4 }
    ],
    white: [{ x: 2, y: 6 }, { x: 5, y: 4 }, { x: 5, y: 5 }, { x: 5, y: 6 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'The game tilts',
      text:
        'Midgame is where direction decides the night. {{Urgent move}}s fix weakness; ' +
        '{{thickness}} pushes fights; the whole-board glance chooses the next river.'
    },
    {
      kind: 'highlight',
      points: [{ x: 2, y: 2 }, { x: 3, y: 3 }],
      style: 'glow',
      speaker: 'tsuki',
      text:
        'Your corner trio still has a cut. If you tourniquet late, my shoulder stones ' +
        'become a fist.'
    },
    {
      kind: 'quiz',
      title: 'You try: urgent before big',
      prompt:
        'Black to play. Defend your corner {{weak group}} before chasing White on the top side.',
      accept: [{ x: 3, y: 3 }],
      hint: 'Connect your three corner stones — urgent repair before adventure.',
      explainCorrect:
        'You patched the wound. The turning point favored discipline: {{urgent move}} ' +
        'before a big chase.',
      explainWrong:
        'Your corner needs connection now. Play the linking stone inside your fence ' +
        'before you roam.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 6 },
      speaker: 'hoshi',
      text:
        'Now I stretch along the top. With your house in order, the middle game opens ' +
        'like a gate.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Direction is memory',
      text:
        'Games are won when someone forgets urgency. You remembered — the night tilts ' +
        'toward players who repair before they decorate.'
    }
  ]
};