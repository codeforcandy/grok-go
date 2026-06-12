import type { Lesson } from './types';

export const lesson9: Lesson = {
  id: 'invasion',
  title: 'Invasion',
  setup: {
    white: [
      { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 0 }
    ]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Inside the fortress',
      text:
        'White has fenced the upper-right corner — an {{enclosure}}. But the ' +
        'interior is not yet Black\'s graveyard. A well-timed {{invasion}} can ' +
        'steal or spoil what White thought was safe.',
      focus: [{ x: 0, y: 2 }, { x: 2, y: 0 }]
    },
    {
      kind: 'highlight',
      points: [{ x: 1, y: 1 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'The 3-3 point inside the corner — the deepest cut. Invade here when the ' +
        'opponent\'s wall is thin and help is far away.'
    },
    {
      kind: 'quiz',
      title: 'You try: invade',
      prompt:
        'Black to play. Slip inside White\'s corner with the classic {{invasion}} ' +
        'at the 3-3 point.',
      accept: [{ x: 1, y: 1 }],
      hint: 'The glowing point — one step in from the corner along both lines.',
      explainCorrect:
        'Inside! The invader lives small or runs into the center, but White\'s ' +
        'neat {{enclosure}} is broken. Invasions trade certainty for disruption.',
      explainWrong:
        'Play at the marked 3-3 point inside the corner — not on the wall itself.',
      nearMisses: [
        {
          point: { x: 0, y: 1 },
          text:
            'That strikes the wall from outside. An {{invasion}} slips behind the ' +
            'fence, into the corner interior.'
        }
      ]
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'tsuki',
      title: 'The price of answering',
      text:
        'I must respond or lose the corner. While I do, Hoshi builds elsewhere — ' +
        'every invasion buys time for the attacker.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Reduce, don\'t always invade',
      text:
        'A lighter touch — a {{reduction}} — presses against territory from the ' +
        'outside without diving in. Invasions are loud; reductions are whispers. ' +
        'Both shrink what the opponent counted as theirs.'
    }
  ]
};