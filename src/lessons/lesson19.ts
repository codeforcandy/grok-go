import type { Lesson } from './types';

export const lesson19: Lesson = {
  id: 'vital-point',
  title: 'The Vital Point',
  setup: {
    white: [{ x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 3, y: 5 }, { x: 5, y: 5 }],
    black: [
      { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 },
      { x: 2, y: 4 }, { x: 6, y: 4 },
      { x: 2, y: 5 }, { x: 6, y: 5 },
      { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6 }, { x: 6, y: 6 }
    ]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Puzzles in moonlight',
      text:
        'Chapter 4 opens under a colder moon: {{life and death}} puzzles. Before ' +
        'you chase or connect, ask one question — where is the {{vital point}}? ' +
        'One stone there splits {{eyes}} or seals death.'
    },
    {
      kind: 'highlight',
      points: [{ x: 4, y: 4 }, { x: 3, y: 5 }, { x: 5, y: 5 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'White\'s shape looks roomy, but the empty points are still connected — ' +
        'one big mouth, not two {{eyes}}. Find the stone that divides it forever.'
    },
    {
      kind: 'quiz',
      title: 'You try: the vital point',
      prompt:
        'Black to play. One move kills the white group — click the {{vital point}}.',
      accept: [{ x: 4, y: 5 }],
      hint: 'Split the inside space at its waist — between the upper row and lower corners.',
      explainCorrect:
        'Dead. You split the inside into fragments that cannot become two {{eyes}}. ' +
        'That is the {{vital point}} — the spine of the puzzle.',
      explainWrong:
        'Look inside the white shell. You want the move that divides their breathing ' +
        'room, not a stone on the outside wall.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Read before you reach',
      text:
        'In real games, {{life and death}} is rarely labeled. Train your eye here, ' +
        'in the quiet, so your hand already knows when the fight turns fatal.'
    }
  ]
};