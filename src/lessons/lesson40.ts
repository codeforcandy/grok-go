import type { Lesson } from './types';

export const lesson40: Lesson = {
  id: 'kick-and-extend',
  title: 'Kick and Extend',
  setup: {
    white: [{ x: 2, y: 2 }],
    black: [{ x: 5, y: 2 }]
  },
  firstToPlay: 'white',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Respond along the side',
      text:
        'When approached, one classic {{joseki}} answer is to kick the approach stone ' +
        'and extend along the side. You trade a little corner profit for outside ' +
        'position — kick, then stretch.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 2 },
      speaker: 'tsuki',
      title: 'The kick',
      text:
        'I nudge your approach stone. Not a capture — a gentle push that asks you to ' +
        'choose a direction.'
    },
    {
      kind: 'quiz',
      title: 'You try: extend after the kick',
      prompt:
        'Black to play. Extend along the bottom side after White\'s kick — standard {{joseki}} flow.',
      accept: [{ x: 6, y: 2 }],
      hint: 'Slide one more step right along the bottom line from your approach stone.',
      explainCorrect:
        'Extend along the side. You accepted the kick and claimed outside position — ' +
        'textbook flow.',
      explainWrong:
        'Continue along the bottom line from your approach stone — extend, do not ' +
        'jump into the corner.'
    },
    {
      kind: 'move',
      point: { x: 2, y: 4 },
      speaker: 'tsuki',
      text:
        'I fence the corner you gave up. Kicks are questions; extensions are answers ' +
        'written along the edge.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Flow, not memorization',
      text:
        'Remember the idea: approach, kick, extend. The exact points vary, but the ' +
        '{{joseki}} spirit is the same — trade corner for side, side for {{influence}}.'
    }
  ]
};