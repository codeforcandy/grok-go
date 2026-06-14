import type { Lesson } from './types';

export const lesson50: Lesson = {
  id: 'double-sente',
  title: 'Double Sente',
  setup: {
    black: [{ x: 4, y: 4 }, { x: 4, y: 6 }],
    white: [{ x: 5, y: 4 }, { x: 5, y: 6 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Both reach for the same door',
      text:
        '{{Double sente}} — both players want to play the same point first. Whoever ' +
        'gets it gains on the swing; whoever waits loses the same amount. These are ' +
        'the loudest whispers in {{yose}}.'
    },
    {
      kind: 'highlight',
      points: [{ x: 4, y: 5 }, { x: 5, y: 5 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'The gap between the walls — each side aches to fill it. On a real board, ' +
        'count which shoulder is truly {{double sente}}; here, play the black shoulder first.'
    },
    {
      kind: 'quiz',
      title: 'You try: take double sente',
      prompt:
        'Black to play. Grab the shared boundary point before White — classic {{double sente}} urgency.',
      accept: [{ x: 4, y: 5 }],
      hint: 'The empty point on your wall between your two stones — the gap you both want.',
      explainCorrect:
        'You took {{double sente}}. Both sides wanted that stone; you arrived first ' +
        'and the ledger tilted.',
      explainWrong:
        'Play on the empty point between your two black stones along the shared wall ' +
        '— the boundary both sides crave.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 5 },
      speaker: 'tsuki',
      text:
        'I answer on the other shoulder. {{Double sente}} fights are races — hesitation ' +
        'is a point lost twice.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Play these early',
      text:
        'Finish {{double sente}} before tiny {{gote}} fills. They are rare on 9×9, ' +
        'but when you see one, sprint.'
    }
  ]
};