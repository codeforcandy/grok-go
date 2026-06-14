import type { Lesson } from './types';

export const lesson46: Lesson = {
  id: 'multi-step-ko',
  title: 'Multi-Step Ko',
  setup: {
    white: [{ x: 4, y: 4 }, { x: 5, y: 4 }],
    black: [
      { x: 3, y: 4 }, { x: 6, y: 4 },
      { x: 4, y: 3 }, { x: 5, y: 3 },
      { x: 4, y: 5 }
    ]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'A longer staircase',
      text:
        'Some kos need several exchanges before the recapture chain settles — a ' +
        'multi-step {{ko}}. Each capture peels one layer; patience and threats stack ' +
        'like stairs in moonlight.'
    },
    {
      kind: 'highlight',
      points: [{ x: 4, y: 4 }, { x: 5, y: 4 }, { x: 5, y: 5 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'Two white stones cling inside a black net. One capture will not finish the ' +
        'story — the fight may echo through several ko-shaped breaths.'
    },
    {
      kind: 'quiz',
      title: 'You try: begin the sequence',
      prompt:
        'Black to play. Start the capture sequence — take the first step of this multi-step fight.',
      accept: [{ x: 5, y: 5 }],
      hint: 'Press the lower white stone from below — the first peel of the staircase.',
      explainCorrect:
        'First step taken. Multi-step kos reward calm counting — each exchange buys ' +
        'time for your next {{ko threat}}.',
      explainWrong:
        'Attack the white pair from the outside below — begin the layered capture, ' +
        'not a random distant point.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'tsuki',
      text:
        'I answer far away while the local ladder of captures hums. Long kos are duets ' +
        '— not solos.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Count the steps',
      text:
        'When you sense a multi-step {{ko}}, stockpile threats early. The player with ' +
        'more spare noise when the staircase ends usually owns the last echo.'
    }
  ]
};