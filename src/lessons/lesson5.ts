import type { Lesson } from './types';

export const lesson5: Lesson = {
  id: 'ko',
  title: 'Ko',
  setup: {
    black: [{ x: 4, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }],
    white: [{ x: 5, y: 3 }, { x: 6, y: 4 }, { x: 5, y: 5 }, { x: 4, y: 4 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'The eternal fight',
      text:
        'Study this shape — two interlocking mouths. The white stone in the ' +
        'middle is in {{atari}}. Hoshi can capture it. But watch what the ' +
        'capture creates.',
      focus: [{ x: 4, y: 4 }, { x: 5, y: 4 }]
    },
    {
      kind: 'move',
      point: { x: 5, y: 4 },
      speaker: 'hoshi',
      title: 'The capture',
      text: 'Taken! One {{prisoner}} for me.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      text:
        'But look closely: Hoshi’s new stone now sits in {{atari}} itself — in ' +
        'the very mouth it just emptied. If Tsuki recaptures, the board ' +
        'returns EXACTLY to where it was. Capture, recapture, forever. This ' +
        'shape is called {{ko}} — “eternity.”',
      focus: [{ x: 5, y: 4 }, { x: 4, y: 4 }]
    },
    {
      kind: 'move',
      point: { x: 2, y: 2 },
      speaker: 'tsuki',
      title: 'The rule stays my hand',
      text:
        'The {{ko}} rule: no immediate recapture — I must play somewhere else ' +
        'first. So I build elsewhere and wait. Next turn, if the ko still ' +
        'stands open, I may take it back.'
    },
    {
      kind: 'quiz',
      title: 'You try: end the ko',
      prompt:
        'Tsuki played elsewhere, so Black is free. One move ends this ko ' +
        'forever — click it.',
      accept: [{ x: 4, y: 4 }],
      hint: 'Fill the empty mouth so there is nothing left to recapture.',
      explainCorrect:
        'The ko is finished. Your stones connect into one solid {{group}}, and ' +
        'there is nothing left for White to recapture. Filling the ko is how ' +
        'most kos die.',
      explainWrong:
        'The danger is the empty point where White’s stone used to be — fill ' +
        'it and the fight is over.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'tsuki',
      text:
        'Settled. In real games we trade threats over a ko like an auction — ' +
        'each “elsewhere” move must be worth answering, or the opponent simply ' +
        'ends the ko as you just did.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Why the rule exists',
      text:
        'Without the {{ko}} rule, two stubborn players could capture the same ' +
        'stone until the stars burned out. With it, every repetition costs a ' +
        'move elsewhere — and the whole board becomes the tiebreaker.'
    }
  ]
};