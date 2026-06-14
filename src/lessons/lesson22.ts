import type { Lesson } from './types';

export const lesson22: Lesson = {
  id: 'bent-four',
  title: 'Bent Four in the Corner',
  setup: {
    white: [{ x: 7, y: 7 }, { x: 8, y: 7 }, { x: 7, y: 8 }, { x: 8, y: 8 }],
    black: [
      { x: 6, y: 6 }, { x: 7, y: 6 }, { x: 8, y: 6 },
      { x: 6, y: 7 }, { x: 9, y: 7 },
      { x: 6, y: 8 }, { x: 9, y: 8 },
      { x: 6, y: 9 }, { x: 7, y: 9 }, { x: 8, y: 9 }, { x: 9, y: 9 }
    ]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'A famous ghost',
      text:
        'Four white stones bend in the corner — the {{bent four}}. Beginners pray ' +
        'inside them; teachers sigh. Surrounded like this, the group is already dead. ' +
        'No invasion of the heart can conjure two {{eyes}}.'
    },
    {
      kind: 'highlight',
      points: [{ x: 7, y: 7 }, { x: 8, y: 7 }, { x: 7, y: 8 }, { x: 8, y: 8 }],
      style: 'glow',
      speaker: 'hoshi',
      text:
        'Pretty, symmetrical, finished. I would not waste a move filling them unless ' +
        'I needed sente elsewhere first.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Do not play inside dead shapes',
      text:
        'Filling a dead {{bent four}} only helps your opponent fix shape. In teaching ' +
        'games we mark it dead and move on — a gift of points you must not return.'
    },
    {
      kind: 'quiz',
      title: 'You try: tenuki from the dead',
      prompt:
        'The white corner is dead. Do not play inside. Take a big point elsewhere ' +
        'on the board.',
      accept: [{ x: 0, y: 0 }],
      hint: 'The far upper-left corner — untouched, wide open.',
      explainCorrect:
        'Correct. You left the corpse alone and claimed fresh ground. Dead shapes ' +
        'can wait; the open board cannot.',
      explainWrong:
        'Any play inside the {{bent four}} only throws points away. Find an empty ' +
        'corner far from this tomb.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Know when to stop reading',
      text:
        'Strong players recognize dead shapes early and spend their breath on moves ' +
        'that still breathe. That discipline is also {{life and death}} skill.'
    }
  ]
};