import type { Lesson } from './types';

export const lesson44: Lesson = {
  id: 'threat-size',
  title: 'How Big Is a Threat?',
  setup: {
    black: [{ x: 4, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }],
    white: [{ x: 5, y: 3 }, { x: 6, y: 4 }, { x: 5, y: 5 }, { x: 4, y: 4 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Volume of noise',
      text:
        'A {{ko threat}} must hurt. A tiny probe can be ignored; a cut that kills a ' +
        '{{group}} demands reply. Match the threat to the value of the {{ko}} you are ' +
        'fighting.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 4 },
      speaker: 'hoshi',
      text: 'The {{ko}} sparks. Now every move elsewhere is weighed on a scale.'
    },
    {
      kind: 'highlight',
      points: [{ x: 0, y: 8 }, { x: 8, y: 0 }],
      style: 'glow',
      speaker: 'tsuki',
      text:
        'A whisper in the far corner might not move me. A shoulder hit on my weak ' +
        'stones — that I must answer. Size your threats like lanterns, not fireflies.'
    },
    {
      kind: 'quiz',
      title: 'You try: a threat with weight',
      prompt:
        'White to play. Choose a large {{ko threat}} in the far corner — not a timid ' +
        'nudge beside the {{ko}}.',
      accept: [{ x: 8, y: 0 }],
      hint: 'The upper-right corner, untouched — a move Black cannot comfortably ignore.',
      explainCorrect:
        'A threat with weight. Corners in the storm still matter — you bid high for ' +
        'the {{ko}}.',
      explainWrong:
        'Do not tap beside the {{ko}}. Play somewhere large enough that Black must ' +
        'answer before you return.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Threat math',
      text:
        'Ask: if they ignore this, how much do they lose? If the answer is "not much," ' +
        'find a bigger {{ko threat}}. Ko fights are won by the player with louder spare ' +
        'threats in the pockets.'
    }
  ]
};