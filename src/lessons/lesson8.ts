import type { Lesson } from './types';

export const lesson8: Lesson = {
  id: 'enclosing-the-corner',
  title: 'Enclosing the Corner',
  setup: {
    black: [{ x: 2, y: 2 }],
    white: [{ x: 4, y: 2 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'From stone to fortress',
      text:
        'Hoshi owns a corner stone. Tsuki approached from the side — a standard ' +
        'greeting. Now Black can turn the corner into an {{enclosure}}: a small ' +
        'fort that fences a chunk of territory.',
      focus: [{ x: 2, y: 2 }, { x: 4, y: 2 }]
    },
    {
      kind: 'move',
      point: { x: 2, y: 1 },
      speaker: 'hoshi',
      title: 'Pressing to the edge',
      text:
        'I hug the top edge. Each stone along the border costs my opponent more ' +
        'stones to invade later.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'tsuki',
      text:
        'While you build, I take a distant corner. One enclosure is not the whole ' +
        'game — I answer big with big.'
    },
    {
      kind: 'move',
      point: { x: 1, y: 2 },
      speaker: 'hoshi',
      title: 'Closing the gate',
      text:
        'One more stone along the left edge. The corner is nearly sealed — only ' +
        'one point remains to finish the {{enclosure}}.'
    },
    {
      kind: 'highlight',
      points: [{ x: 1, y: 1 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'This glowing point completes the shape. After it is played, the corner ' +
        'interior becomes Black\'s territory in all but name.'
    },
    {
      kind: 'quiz',
      title: 'You try: finish the enclosure',
      prompt: 'Complete Black\'s corner {{enclosure}}. Click the vital point.',
      accept: [{ x: 1, y: 1 }],
      hint: 'The glowing point — it touches both edge stones along the lines.',
      explainCorrect:
        'Enclosed. Three stones and a corner edge have fenced a tidy territory. ' +
        'That is the smallest {{enclosure}} on a 9×9 board.',
      explainWrong:
        'Aim for the one empty point that connects both of Black\'s edge stones ' +
        'along the grid lines.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Fortresses invite invasions',
      text:
        'Every {{enclosure}} dares the opponent to slip inside. Next: what happens ' +
        'when someone accepts that dare.'
    }
  ]
};