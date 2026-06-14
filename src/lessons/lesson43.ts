import type { Lesson } from './types';

export const lesson43: Lesson = {
  id: 'ko-threats',
  title: 'Ko Threats',
  setup: {
    black: [{ x: 4, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }],
    white: [{ x: 5, y: 3 }, { x: 6, y: 4 }, { x: 5, y: 5 }, { x: 4, y: 4 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Storms in the garden',
      text:
        'A {{ko}} is a repeating capture — the rule forbids immediate recapture. You ' +
        'must play a {{ko threat}} elsewhere first, force an answer, then return. ' +
        'The garden holds its breath between storms.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 4 },
      speaker: 'hoshi',
      title: 'The ko appears',
      text:
        'I capture, and the board flickers. That empty point is hot — neither of us ' +
        'may touch it yet. The {{ko}} is born.'
    },
    {
      kind: 'quiz',
      title: 'You try: play a ko threat',
      prompt:
        'White to play. You cannot recapture the {{ko}} yet — play a {{ko threat}} ' +
        'elsewhere that demands attention.',
      accept: [{ x: 0, y: 8 }],
      hint: 'A far corner stone — loud enough that Black must answer before you return.',
      explainCorrect:
        'A {{ko threat}}. You played elsewhere, keeping the right to recapture the ' +
        '{{ko}} after Black answers. That is how ko fights breathe.',
      explainWrong:
        'You cannot recapture the {{ko}} immediately. Play somewhere else threatening ' +
        'enough that your opponent must reply.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'hoshi',
      text:
        'I answer your threat — I must. While I patch that roof, you still owe the ' +
        '{{ko}} its echo.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Threats are currency',
      text:
        'Ko fights are auctions. You spend {{ko threat}}s to buy the right to recapture. ' +
        'Save big threats for big kos — small noise buys small replies.'
    }
  ]
};