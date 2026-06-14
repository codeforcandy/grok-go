import type { Lesson } from './types';

export const lesson34: Lesson = {
  id: 'use-thickness',
  title: 'Attack with Thickness',
  setup: {
    black: [
      { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }
    ],
    white: [{ x: 4, y: 6 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Push toward the void',
      text:
        'Use {{thickness}} to attack toward the widest open area. Drive weak stones ' +
        'away from your wall and into the open — where they have no friends and you ' +
        'have all the momentum.'
    },
    {
      kind: 'highlight',
      points: [{ x: 4, y: 6 }, { x: 4, y: 2 }],
      style: 'glow',
      speaker: 'hoshi',
      text:
        'My lone stone floats above your wall. You could crawl on the wall for points ' +
        '— or you could chase me into the sky where your {{thickness}} roars.'
    },
    {
      kind: 'quiz',
      title: 'You try: attack with thickness',
      prompt:
        'Black to play. Use your wall to press White toward the open center above.',
      accept: [{ x: 4, y: 5 }],
      hint: 'Step between your wall and the floating white stone — push upward.',
      explainCorrect:
        'You attacked with {{thickness}}, pushing White toward open ground. Walls ' +
        'are springs — use them to launch fights, not hoard corners.',
      explainWrong:
        'Play between your wall and the weak white stone, pressing toward the open ' +
        'center — not sideways into your own strength.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 7 },
      speaker: 'tsuki',
      text:
        'I run, but every step carries your shadow. That is the weight of a proper ' +
        'attack — the wall does not follow, yet it is always behind you.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Thickness attacks, not invades',
      text:
        'The reward for {{thickness}} is the chase. Push enemies into narrow spaces; ' +
        'let your influence do the squeezing. Small invasions beside the wall waste ' +
        'the gift.'
    }
  ]
};