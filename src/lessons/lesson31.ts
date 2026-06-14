import type { Lesson } from './types';

export const lesson31: Lesson = {
  id: 'what-is-thickness',
  title: 'What Is Thickness?',
  setup: {
    black: [
      { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }
    ]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Stones that cast shadows',
      text:
        '{{Thickness}} is solid, outward-facing power — stones that face open ground ' +
        'and radiate {{influence}}. It is not yet {{territory}}. Do not poke it for ' +
        'small gains; use it to threaten the open sky.'
    },
    {
      kind: 'highlight',
      points: [{ x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }],
      style: 'glow',
      speaker: 'hoshi',
      text:
        'My wall faces the center like a row of lanterns. You cannot bite it without ' +
        'cutting yourself — but you can walk away and grow something larger.'
    },
    {
      kind: 'quiz',
      title: 'You try: use thickness wisely',
      prompt:
        'Your wall is thick. Do not invade beside it for tiny profit — play where ' +
        'the board is still open.',
      accept: [{ x: 4, y: 2 }],
      hint: 'Extend from the wall toward the open center above — not into its face.',
      explainCorrect:
        'You used {{thickness}} as support and played outward. Thick stones are a ' +
        'platform, not a wallet to pick.',
      explainWrong:
        'Do not crawl on your own wall. Play toward open ground where {{influence}} ' +
        'can become {{territory}}.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'tsuki',
      text:
        'You built from strength while I nibbled elsewhere. That is how {{thickness}} ' +
        'should feel — a shadow that lets you reach farther.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Influence is a loan',
      text:
        '{{Thickness}} lends power to your next moves. Cash it for attacks and ' +
        'frameworks, not for five points beside the wall. The night garden rewards ' +
        'patience with larger harvests.'
    }
  ]
};