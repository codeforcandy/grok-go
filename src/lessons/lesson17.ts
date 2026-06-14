import type { Lesson } from './types';

export const lesson17: Lesson = {
  id: 'throw-in',
  title: 'Throw-in',
  setup: {
    white: [
      { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 },
      { x: 5, y: 4 },
      { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 }
    ],
    black: [
      { x: 2, y: 3 }, { x: 6, y: 3 },
      { x: 2, y: 4 }, { x: 6, y: 4 },
      { x: 2, y: 5 }, { x: 6, y: 5 },
      { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 },
      { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6 }
    ]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Sacrifice inside the eye',
      text:
        'White\'s ring looks alive — two empty points inside look like breathing ' +
        'room. A {{throw-in}} sacrifices a stone inside that space. When White ' +
        'captures the sacrifice, an eye disappears. What looked like life was only ' +
        'a wide room waiting to shrink.',
      focus: [{ x: 3, y: 4 }, { x: 4, y: 4 }]
    },
    {
      kind: 'highlight',
      points: [{ x: 3, y: 4 }, { x: 4, y: 4 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'Two points inside the ring. A {{throw-in}} does not need to live — it ' +
        'only needs to change the eye into a single point White must fill.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 4 },
      speaker: 'hoshi',
      title: 'The sacrifice',
      text:
        'I drop a stone inside. It cannot live alone — that is the point. I am ' +
        'buying a smaller eye with one stone.'
    },
    {
      kind: 'quiz',
      title: 'You try: capture the sacrifice',
      prompt:
        'White must answer the {{throw-in}}. Capture the black stone inside the ' +
        'ring — but notice what happens to the eyes.',
      accept: [{ x: 3, y: 4 }],
      hint: 'Fill the liberty beside the sacrifice on the left.',
      explainCorrect:
        'You captured the {{throw-in}}, but the inside shrank to one eye. That is ' +
        'the bargain Black wanted.',
      explainWrong:
        'Capture the sacrificed stone by filling its last {{liberty}} — the point ' +
        'beside it inside the ring.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 4 },
      speaker: 'hoshi',
      title: 'The kill',
      text:
        'Now the ring has a single eye. One more stone and the whole group becomes ' +
        '{{prisoners}}.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Eyes can shrink',
      text:
        'Life is not only “two {{eyes}} on the diagram.” A large eye can be ' +
        'carved down by a {{throw-in}}. Read the inside space before you call a ' +
        'group alive.'
    }
  ]
};