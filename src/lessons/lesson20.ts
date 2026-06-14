import type { Lesson } from './types';

export const lesson20: Lesson = {
  id: 'l-group',
  title: 'The L-Group',
  setup: {
    white: [{ x: 7, y: 7 }, { x: 8, y: 7 }, { x: 7, y: 8 }],
    black: [
      { x: 6, y: 6 }, { x: 7, y: 6 }, { x: 8, y: 6 },
      { x: 6, y: 7 }, { x: 9, y: 7 },
      { x: 6, y: 8 }, { x: 6, y: 9 }, { x: 7, y: 9 },
      { x: 8, y: 9 }, { x: 9, y: 9 }, { x: 9, y: 8 }
    ]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'The corner\'s bent shape',
      text:
        'Three white stones form an {{L-group}} in the corner — a classic student ' +
        'nightmare. It looks like two {{eyes}} might grow, but the geometry is ' +
        'lying. One precise stone ends the dream.',
      focus: [{ x: 7, y: 7 }, { x: 8, y: 7 }, { x: 7, y: 8 }, { x: 8, y: 8 }]
    },
    {
      kind: 'highlight',
      points: [{ x: 8, y: 8 }],
      style: 'glow',
      speaker: 'tsuki',
      text:
        'The empty corner beside the bend — that is where life dies. I have seen ' +
        'this shape end a hundred hopeful corners.'
    },
    {
      kind: 'quiz',
      title: 'You try: kill the L-group',
      prompt:
        'Black to play. Kill the white {{L-group}} with one move.',
      accept: [{ x: 8, y: 8 }],
      hint: 'Play in the empty point that completes the fourth corner of the bend.',
      explainCorrect:
        'Captured. The {{L-group}} in the corner cannot become two {{eyes}} once ' +
        'that point is filled. Memorize the bend — it will return.',
      explainWrong:
        'Aim for the inner corner of the L — the one empty point that touches both ' +
        'arms of the bend.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Shapes that pretend',
      text:
        'Some dead shapes look alive until you have seen them once. The {{L-group}} ' +
        'is the first of many masks — puzzles teach you to see through them.'
    }
  ]
};