import type { Lesson } from './types';

export const lesson25: Lesson = {
  id: 'urgent-vs-big',
  title: 'Urgent Before Big',
  setup: {
    black: [
      { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 2, y: 1 }, { x: 3, y: 1 },
      { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 3, y: 4 }, { x: 2, y: 4 }, { x: 1, y: 4 }
    ],
    white: [{ x: 2, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 3 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Haengma — stone flow',
      text:
        '{{Haengma}} is the flow of stones across the board. Two ideas compete: ' +
        'the {{urgent move}} that fixes weakness, and the big point that builds ' +
        'future {{territory}}. Almost always — urgent before big.'
    },
    {
      kind: 'highlight',
      points: [{ x: 2, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 3 }],
      style: 'glow',
      speaker: 'hoshi',
      text:
        'My three stones look small, but they are cutting yours apart. If you grab ' +
        'a distant corner first, this fight ends badly for you.'
    },
    {
      kind: 'quiz',
      title: 'You try: urgent before big',
      prompt:
        'Black to play. Defend your {{weak group}} before taking a big point elsewhere.',
      accept: [{ x: 3, y: 3 }],
      hint: 'Connect your three stones into one breathing unit — not the far corner.',
      explainCorrect:
        'You fixed the weakness first. That is {{haengma}}: urgent before big. ' +
        'The open corner can wait; dead groups cannot.',
      explainWrong:
        'A big point elsewhere is tempting, but your three stones need help now. ' +
        'Play the connecting {{urgent move}}.'
    },
    {
      kind: 'move',
      point: { x: 7, y: 7 },
      speaker: 'tsuki',
      text:
        'Now you may roam. I wanted that corner, but you patched your wound first — ' +
        'good discipline.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Weakness has a clock',
      text:
        'Ask before every move: is any {{group}} in danger? If yes, that is urgent. ' +
        'If no, play the largest area. The night garden rewards players who hear ' +
        'the alarm before chasing fireflies.'
    }
  ]
};