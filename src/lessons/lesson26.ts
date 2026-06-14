import type { Lesson } from './types';

export const lesson26: Lesson = {
  id: 'weak-groups',
  title: 'Weak Stones',
  setup: {
    black: [{ x: 4, y: 4 }, { x: 6, y: 4 }],
    white: [{ x: 5, y: 4 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Stones with no home',
      text:
        'A {{weak group}} has few {{eyes}}, few {{liberties}}, or a cutting point ' +
        'between its parts. Two lonely stones with a enemy stone between them are ' +
        'already weak — the board can smell it.'
    },
    {
      kind: 'highlight',
      points: [{ x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }],
      style: 'glow',
      speaker: 'tsuki',
      text:
        'One white stone sits on your lifeline. I am the scissors in the middle of ' +
        'your whispered conversation.'
    },
    {
      kind: 'quiz',
      title: 'You try: attack the cut',
      prompt:
        'Black to play. Punish the cutting stone that separates your {{weak group}}.',
      accept: [{ x: 5, y: 3 }],
      hint: 'Step below the white stone — squeeze its breathing room.',
      explainCorrect:
        'You attacked the cut. {{Weak groups}} must be defended or the cutting ' +
        'stone punished before the wound spreads.',
      explainWrong:
        'Find the empty point beside the white cutting stone that steals its ' +
        '{{liberties}}.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 5 },
      speaker: 'tsuki',
      text:
        'I counter-press, but you named the weakness first. That is how strong ' +
        'players treat fragile stones — immediately.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'See weakness early',
      text:
        'Your opponent\'s {{weak groups}} are invitations. Your own are emergencies. ' +
        'Train your eye to spot floating stones, cutting points, and thin shapes ' +
        'before they become {{life and death}} puzzles.'
    }
  ]
};