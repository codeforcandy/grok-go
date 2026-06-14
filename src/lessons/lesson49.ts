import type { Lesson } from './types';

export const lesson49: Lesson = {
  id: 'sente-gote',
  title: 'Sente and Gote',
  setup: {
    black: [{ x: 3, y: 4 }, { x: 5, y: 4 }],
    white: [{ x: 4, y: 3 }, { x: 4, y: 5 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'The quiet last walk begins',
      text:
        '{{Yose}} — the endgame — is counting and order. {{Sente}} means you play and ' +
        'the opponent answers locally; you keep the turn. {{Gote}} means you play last ' +
        'here and they choose elsewhere.'
    },
    {
      kind: 'highlight',
      points: [{ x: 4, y: 4 }],
      style: 'glow',
      speaker: 'hoshi',
      text:
        'The center point touches everyone. If I cut here, you must answer — that is ' +
        '{{sente}} music.'
    },
    {
      kind: 'quiz',
      title: 'You try: play sente',
      prompt:
        'Black to play. Cut in the center — a {{sente}} move White should answer.',
      accept: [{ x: 4, y: 4 }],
      hint: 'Land between the stones where both sides meet — demand a reply.',
      explainCorrect:
        'A {{sente}} cut. White must answer nearby, and you keep the initiative for ' +
        'the next endgame chord.',
      explainWrong:
        'Play at the glowing center where your stones meet White\'s — a move that ' +
        'cannot be ignored.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 2 },
      speaker: 'tsuki',
      text:
        'I answer as expected. {{Sente}} moves are gifts that keep on giving — you ' +
        'played first and still choose the next song.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'First local, then elsewhere',
      text:
        'In {{yose}}, hoard {{sente}}. {{Gote}} moves can wait until nothing urgent ' +
        'remains. The player who finishes in sente often writes the last line of the game.'
    }
  ]
};