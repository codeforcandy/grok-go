import type { Lesson } from './types';

export const lesson51: Lesson = {
  id: 'count-the-points',
  title: 'Count the Points',
  setup: {
    black: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 2 }],
    white: [{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 8, y: 7 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'The ledger opens',
      text:
        'On 9×9 we teach area counting: stones on the board plus surrounded empty ' +
        'points plus {{prisoners}}. White also receives {{komi}} for moving second. ' +
        'Before the last {{yose}}, know who leads.'
    },
    {
      kind: 'highlight',
      points: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
      style: 'territory-black',
      speaker: 'narrator',
      text:
        'Black\'s lower-left corner is nearly fenced — one more stone and the empty ' +
        'inside becomes counted {{territory}}.'
    },
    {
      kind: 'quiz',
      title: 'You try: secure counted territory',
      prompt:
        'Black to play. Fill the corner gap that turns empty space into secure {{territory}}.',
      accept: [{ x: 1, y: 1 }],
      hint: 'The last empty point inside your lower-left fence.',
      explainCorrect:
        'Corner secured. You turned potential into counted points — that is how ' +
        '{{yose}} moves add to the final ledger.',
      explainWrong:
        'Play inside your own fenced corner — the empty point that becomes your ' +
        '{{territory}}.'
    },
    {
      kind: 'move',
      point: { x: 7, y: 7 },
      speaker: 'tsuki',
      text:
        'I mirror in the far corner. Counting is a conversation between fences — ' +
        'each fill answers a question.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Count before you fill',
      text:
        'Strong {{yose}} players estimate the score mid-game. Know your fences, your ' +
        '{{prisoners}}, and {{komi}} before you rush the last point.'
    }
  ]
};