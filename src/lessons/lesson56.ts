import type { Lesson } from './types';

export const lesson56: Lesson = {
  id: 'first-fight',
  title: 'The First Fight',
  setup: {
    black: [{ x: 2, y: 2 }, { x: 6, y: 2 }, { x: 6, y: 6 }],
    white: [{ x: 2, y: 6 }, { x: 5, y: 4 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Contact sparks fire',
      text:
        'The first fight usually begins when a stone touches the opponent. Tactics ' +
        'return — {{atari}}, cut, capture. Read before you honor the contact.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 4 },
      speaker: 'hoshi',
      text: 'I step toward the center. White\'s lone stone on the shoulder must answer the pressure.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 5 },
      speaker: 'tsuki',
      text: 'I nudge back. The first fight is never loud yet — only warm.'
    },
    {
      kind: 'quiz',
      title: 'You try: cut and fight',
      prompt:
        'Black to play. Press the floating white stone — start the first real tactics of the night.',
      accept: [{ x: 5, y: 3 }],
      hint: 'Step below the white stone and steal its breathing room.',
      explainCorrect:
        'Contact! The first fight is an attack, and the whole board tightens around ' +
        'one weak stone.',
      explainWrong:
        'Play beside the floating white stone — close enough to threaten capture.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 6 },
      speaker: 'tsuki',
      text:
        'I run. Fights are stories; the first chapter is never the last.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Tactics in context',
      text:
        'A tactic without direction is noise. You cut because the stone was weak and ' +
        'the timing ripe — not because you like noise.'
    }
  ]
};