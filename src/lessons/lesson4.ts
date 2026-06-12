import type { Lesson } from './types';

export const lesson4: Lesson = {
  id: 'life-and-death',
  title: 'Life & Death',
  setup: {
    black: [
      { x: 0, y: 8 }, { x: 2, y: 8 }, { x: 4, y: 8 },
      { x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 },
      { x: 5, y: 0 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 8, y: 1 }
    ],
    white: [
      { x: 5, y: 8 }, { x: 5, y: 7 },
      { x: 0, y: 6 }, { x: 1, y: 6 }, { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 },
      { x: 4, y: 0 }, { x: 4, y: 1 },
      { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 7, y: 2 }, { x: 8, y: 2 }
    ]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'The question of life',
      text:
        'Tonight’s board holds two black groups, both sealed in by white. ' +
        'Sealed groups cannot run — they must answer the oldest question in ' +
        'Go: can you live where you stand?',
      focus: [{ x: 2, y: 7 }, { x: 7, y: 1 }]
    },
    {
      kind: 'highlight',
      points: [{ x: 1, y: 8 }, { x: 3, y: 8 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'The lower group is already immortal. These two glowing points are ' +
        '{{eyes}} — empty points completely surrounded by the group.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Why two eyes cannot die',
      text:
        'To capture, Tsuki must fill EVERY {{liberty}} — both eyes included. ' +
        'But placing a stone inside either eye would itself have no breath: ' +
        'the rules forbid it as suicide. Two {{eyes}}, two forbidden points, ' +
        'forever. The group cannot be captured by any sequence of moves.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'One space is not enough',
      text:
        'Now the upper right. This black group has a row of three empty ' +
        'points — room for eyes, but no {{eyes}} yet. One single point decides ' +
        'whether it lives forever or dies. Tsuki sees it too.',
      focus: [{ x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 }]
    },
    {
      kind: 'quiz',
      title: 'You try: the vital point',
      prompt:
        'Black to play. One move turns this group’s space into two {{eyes}} ' +
        'and eternal life. Click the vital point.',
      accept: [{ x: 7, y: 0 }],
      hint: 'Split the three-space row into two separate single points.',
      explainCorrect:
        'Alive! The space is split into two true {{eyes}}. No matter what ' +
        'White does, this group can never be captured. In Go we say: the vital ' +
        'point of three-in-a-row is its center.',
      explainWrong:
        'That leaves the remaining space in one piece — one big eye is still ' +
        'only one eye, and White can destroy it from inside.',
      nearMisses: [
        {
          point: { x: 6, y: 0 },
          text:
            'Close — but now (7,0) and (8,0) form ONE shared space, a single ' +
            'eye. White plays inside it and the group dies. Split the row at its center.'
        },
        {
          point: { x: 8, y: 0 },
          text:
            'Close — but now (6,0) and (7,0) form ONE shared space, a single ' +
            'eye. White plays inside it and the group dies. Split the row at its center.'
        }
      ]
    },
    {
      kind: 'move',
      point: { x: 4, y: 4 },
      speaker: 'tsuki',
      text:
        'Alive, then — there is nothing left for me there. I take my ' +
        'compensation in the open center instead.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Life is two eyes',
      text:
        'Death is everything else, eventually. When you attack, steal the ' +
        'space where {{eyes}} would grow. When you defend, split your space in ' +
        'two while you still can.'
    }
  ]
};