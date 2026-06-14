import type { Lesson } from './types';

export const lesson15: Lesson = {
  id: 'net',
  title: 'The Net',
  setup: {
    white: [{ x: 4, y: 4 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'When the ladder breaks',
      text:
        'Sometimes a stone escapes a {{ladder}} by slipping sideways. A {{net}} is ' +
        'the answer: a loose ring — often a knight\'s move — that catches the ' +
        'runner without hugging every step. The runner still looks free until ' +
        'every escape is tested.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 4 },
      speaker: 'hoshi',
      title: 'Start the chase',
      text: 'The same {{atari}} as a ladder — but I am already watching for a sideways jump.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 5 },
      speaker: 'tsuki',
      text: 'Outward — trying to slip the tightening net.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 5 },
      speaker: 'hoshi',
      text: 'I follow, but I do not cling to the wall. A net needs room to close.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 6 },
      speaker: 'tsuki',
      text: 'Still running — but the exits are narrowing.'
    },
    {
      kind: 'quiz',
      title: 'You try: throw the net',
      prompt:
        'White is trying to run down the board. Play the knight\'s-move stone ' +
        'that begins the {{net}}.',
      accept: [{ x: 6, y: 5 }],
      hint: 'Jump one step right and one step up from the stone at (5,5).',
      explainCorrect:
        'The {{net}} is cast. From here every escape must be read — the runner ' +
        'cannot simply climb a {{ladder}} to freedom.',
      explainWrong:
        'A {{net}} skips ahead of the runner. Aim for the knight\'s-move point ' +
        'that blankets the sideways escapes.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Ladder or net?',
      text:
        'Use a {{ladder}} when the stair is clean to the edge. Switch to a {{net}} ' +
        'when the runner can bend away. Strong players choose the cage before they ' +
        'chase — that is {{reading}} in practice.'
    }
  ]
};