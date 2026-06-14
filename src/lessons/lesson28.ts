import type { Lesson } from './types';

export const lesson28: Lesson = {
  id: 'sacrifice',
  title: 'Order of Sacrifice',
  setup: {
    black: [{ x: 2, y: 4 }, { x: 3, y: 4 }, { x: 2, y: 5 }],
    white: [
      { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 1, y: 5 }, { x: 1, y: 6 },
      { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 5 }, { x: 4, y: 4 },
      { x: 4, y: 3 }, { x: 3, y: 3 }
    ]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Give a stone, save a group',
      text:
        'A {{sacrifice}} throws away a small stone so a larger {{group}} survives ' +
        'or escapes. The order matters: give up the expendable piece first, then ' +
        'walk out with what still breathes.'
    },
    {
      kind: 'highlight',
      points: [{ x: 3, y: 5 }, { x: 2, y: 4 }],
      style: 'glow',
      speaker: 'hoshi',
      text:
        'I have you in a net. Your corner trio looks doomed — unless you are willing ' +
        'to pay a stone for the door.'
    },
    {
      kind: 'quiz',
      title: 'You try: sacrifice to live',
      prompt:
        'Black to play. Offer a {{sacrifice}} that lets your group slip toward open ground.',
      accept: [{ x: 3, y: 5 }],
      hint: 'Push into the tight space below — buy an escape with one stone.',
      explainCorrect:
        'A clean {{sacrifice}}. You traded one stone for a running fight instead ' +
        'of a quiet death.',
      explainWrong:
        'Do not cling to every stone. Find the throw that opens a path — a {{sacrifice}} ' +
        'is permission to lose small and live large.'
    },
    {
      kind: 'move',
      point: { x: 2, y: 3 },
      speaker: 'tsuki',
      text:
        'I bite the offered stone, but your main group spills out. That is the ' +
        'arithmetic of sacrifice — small loss, large breath.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Lose the branch, keep the tree',
      text:
        'Before you rescue every stone, ask which ones matter. {{Sacrifice}} is not ' +
        'defeat — it is choosing what survives. The night garden grows by pruning.'
    }
  ]
};