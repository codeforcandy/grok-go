import type { Lesson } from './types';

export const lesson59: Lesson = {
  id: 'yose-phase',
  title: 'Entering Yose',
  setup: {
    black: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }],
    white: [{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 8, y: 7 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'The fight quiets',
      text:
        'The big fights fade; fences remain. {{Yose}} begins — count, then fill the ' +
        'largest {{sente}} points. The night garden exhales.'
    },
    {
      kind: 'highlight',
      points: [{ x: 1, y: 1 }, { x: 7, y: 7 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'Corner gaps still score. In the game story, Black secures home before nibbling ' +
        'White\'s attic.'
    },
    {
      kind: 'quiz',
      title: 'You try: enter yose',
      prompt:
        'Black to play. Fill your corner — the largest calm {{yose}} on the board.',
      accept: [{ x: 1, y: 1 }],
      hint: 'Complete your lower-left fence — points you can count.',
      explainCorrect:
        'Yose begun. You chose the largest secure profit — the quiet walk starts with ' +
        'honest counting.',
      explainWrong:
        'Fill your own corner gap first — the biggest sure point in this endgame.'
    },
    {
      kind: 'move',
      point: { x: 7, y: 7 },
      speaker: 'tsuki',
      text:
        'I mirror in White\'s corner. The ledger listens to every calm stone.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Order the fills',
      text:
        '{{Sente}} first, {{dame}} last. The game is old now; arithmetic writes the ' +
        'final verses.'
    }
  ]
};