import type { Lesson } from './types';

export const lesson11: Lesson = {
  id: 'capturing-races',
  title: 'Capturing Races',
  setup: {
    black: [{ x: 4, y: 4 }],
    white: [{ x: 5, y: 4 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Who runs out of breath first?',
      text:
        'Two weak groups touch — a {{capturing race}}. Neither has two {{eyes}}. ' +
        'Count {{liberties}}: whoever runs out first is captured. The player who ' +
        'moves first often wins, but only if their count is not smaller.',
      focus: [{ x: 4, y: 4 }, { x: 5, y: 4 }]
    },
    {
      kind: 'move',
      point: { x: 5, y: 5 },
      speaker: 'hoshi',
      title: 'Tightening the net',
      text:
        'I lean on White from the side. Each attacking stone can remove a ' +
        '{{liberty}} without filling my own last one.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'tsuki',
      text:
        'I answer far away — but the race on the left still hangs in the balance. ' +
        'Local fights do not wait for distant moves.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 3 },
      speaker: 'hoshi',
      title: 'One breath left',
      text:
        'Now White\'s stone has a single {{liberty}}. The race is decided — if ' +
        'Black moves before White can grow.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 5 },
      speaker: 'tsuki',
      text: 'I stretch for air, but the count is already against me.'
    },
    {
      kind: 'quiz',
      title: 'You try: win the race',
      prompt:
        'White has one {{liberty}} left. Finish the {{capturing race}} — click the ' +
        'capturing move.',
      accept: [{ x: 6, y: 4 }],
      hint: 'The last empty point beside White\'s stone on the right edge.',
      explainCorrect:
        'Captured. You counted first, moved last, and won the {{capturing race}}. ' +
        'In Go, arithmetic often beats courage.',
      explainWrong:
        'Find White\'s final {{liberty}} and fill it. The group with fewer breaths ' +
        'falls.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Count before you commit',
      text:
        'Before entering a fight, count shared and external {{liberties}}. A ' +
        '{{capturing race}} you lose becomes a gift of {{prisoners}}.'
    }
  ]
};