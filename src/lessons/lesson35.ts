import type { Lesson } from './types';

export const lesson35: Lesson = {
  id: 'overconcentration',
  title: 'Do Not Overconcentrate',
  setup: {
    black: [
      { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 },
      { x: 3, y: 4 }, { x: 4, y: 4 }
    ]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Too many stones, one room',
      text:
        '{{Overconcentration}} is playing too many stones in one small area. You ' +
        'make {{bad shape}}, lose {{influence}}, and invite invasion. Spread out ' +
        'like lanterns along the paths — not piled in one corner.'
    },
    {
      kind: 'highlight',
      points: [{ x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 4 }],
      style: 'glow',
      speaker: 'tsuki',
      text:
        'Five black stones hum in one tight cluster. The rest of the board sings ' +
        'without you — that is the tax on greed.'
    },
    {
      kind: 'quiz',
      title: 'You try: spread out',
      prompt:
        'Do not add another stone to the crowded area. Play on the open board instead.',
      accept: [{ x: 6, y: 6 }],
      hint: 'A far empty point where your stones are not already piled together.',
      explainCorrect:
        'You avoided {{overconcentration}} and claimed fresh ground. Efficiency is ' +
        'breadth, not clumping.',
      explainWrong:
        'Do not play beside the crowded cluster. Find open space elsewhere on the ' +
        'board — let your stones breathe apart.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 4 },
      speaker: 'hoshi',
      text:
        'I would have filled the gap, but you looked wider. One more stone there ' +
        'would have been a heavy foot on a small lily pad.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Every stone has a job',
      text:
        'If a new stone does not expand {{territory}}, attack, connect, or build ' +
        '{{influence}}, it is probably too close to friends. {{Overconcentration}} ' +
        'is the night garden folding in on itself.'
    }
  ]
};