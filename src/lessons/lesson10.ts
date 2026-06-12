import type { Lesson } from './types';

export const lesson10: Lesson = {
  id: 'false-eyes',
  title: 'False Eyes & Dead Shapes',
  setup: {
    white: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
    black: [{ x: 2, y: 0 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 1 }, { x: 3, y: 0 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Not every "eye" breathes',
      text:
        'A {{false eye}} looks like breathing room but is not a true {{eye}}. The ' +
        'stones around it connect through a diagonal, so filling it does not give ' +
        'the group a second life. Some shapes are simply dead.',
      focus: [{ x: 0, y: 0 }, { x: 1, y: 0 }]
    },
    {
      kind: 'highlight',
      points: [{ x: 0, y: 0 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'White\'s bent shape in the corner looks lively, but it is a classic dead ' +
        'form. Black can remove it with one precise stone.'
    },
    {
      kind: 'quiz',
      title: 'You try: remove the dead shape',
      prompt:
        'Black to play. Capture White\'s corner group by playing at its last ' +
        'shared {{liberty}}.',
      accept: [{ x: 0, y: 0 }],
      hint: 'The glowing corner point — the only empty point touching the white stones.',
      explainCorrect:
        'Gone. The bent shape had no real {{eyes}} — only a {{false eye}} and a ' +
        'dream. Dead groups do not need long fights.',
      explainWrong:
        'Find the one empty point that touches the white stones along the lines ' +
        'and removes them all.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'True eyes vs false eyes',
      text:
        'A true {{eye}} is surrounded on all four sides by the same group. A ' +
        '{{false eye}} has a diagonal leak — the group connects around the corner. ' +
        'Two true {{eyes}} live. False ones deceive.'
    }
  ]
};