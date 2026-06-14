import type { Lesson } from './types';

export const lesson32: Lesson = {
  id: 'moyo',
  title: 'Building a Framework',
  setup: {
    black: [{ x: 2, y: 2 }, { x: 6, y: 2 }, { x: 2, y: 6 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'A territory in waiting',
      text:
        'A {{moyo}} is a large framework — potential {{territory}} outlined by ' +
        '{{influence}} and open space. It is not secure yet, but it points at the ' +
        'sky and says: this could be mine.'
    },
    {
      kind: 'highlight',
      points: [{ x: 4, y: 2 }, { x: 2, y: 4 }, { x: 4, y: 4 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'Three corner stones like three lanterns. The empty center between them is ' +
        'a growing {{moyo}} — fence it with light extensions and it becomes real.'
    },
    {
      kind: 'quiz',
      title: 'You try: extend the framework',
      prompt:
        'Black to play. Extend from a corner stone to enlarge your {{moyo}} toward the center.',
      accept: [{ x: 4, y: 2 }],
      hint: 'Slide along the top from your upper-side corner toward the middle.',
      explainCorrect:
        'A framework stone. Your {{moyo}} swells toward the center — potential ' +
        '{{territory}} one gentle wall at a time.',
      explainWrong:
        'Extend from one of your corner stones along the open side toward the ' +
        'center — build the {{moyo}}, do not tangle inside it.'
    },
    {
      kind: 'move',
      point: { x: 2, y: 4 },
      speaker: 'tsuki',
      text:
        'I reduce from the side, but your frame keeps breathing. A {{moyo}} is a ' +
        'promise — I must invade or watch it harden.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Potential is fragile',
      text:
        'A {{moyo}} must be defended or invaded before it becomes solid {{territory}}. ' +
        'Build wide, connect lightly, and let {{thickness}} guard the open faces.'
    }
  ]
};