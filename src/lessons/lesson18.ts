import type { Lesson } from './types';

export const lesson18: Lesson = {
  id: 'double-atari',
  title: 'Double Atari',
  setup: {
    white: [{ x: 0, y: 4 }, { x: 2, y: 4 }],
    black: [{ x: 1, y: 3 }, { x: 1, y: 5 }, { x: 0, y: 3 }, { x: 0, y: 5 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'One move, two threats',
      text:
        'A {{double atari}} puts two enemy groups into {{atari}} at once. Your ' +
        'opponent can save only one. The other becomes {{prisoners}}. It is the ' +
        'simplest proof that {{reading}} creates profit: one glance, two cracks.'
    },
    {
      kind: 'highlight',
      points: [{ x: 0, y: 4 }, { x: 2, y: 4 }, { x: 1, y: 3 }, { x: 1, y: 5 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'Two white stones on the fourth line, pinched above and below. The center ' +
        'is empty — and suddenly both sides are one breath from capture.'
    },
    {
      kind: 'quiz',
      title: 'You try: double atari',
      prompt:
        'Play the move that puts both white stones into {{atari}} at the same time.',
      accept: [{ x: 1, y: 4 }],
      hint: 'Land between the two white stones on the left edge, touching both.',
      explainCorrect:
        'Double {{atari}}! White can rescue only one group. You turned one stone ' +
        'into a fork that wins material.',
      explainWrong:
        'Find the point that touches both white stones and leaves each with a ' +
        'single {{liberty}}.'
    },
    {
      kind: 'move',
      point: { x: 2, y: 3 },
      speaker: 'tsuki',
      text:
        'I stretch to breathe — but the stone on the edge is already gone. That ' +
        'is the cruel arithmetic of a {{double atari}}.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Chapter 3 complete',
      text:
        'You have met {{good shape}}, {{ladder}}s, {{net}}s, {{snapback}}s, ' +
        '{{throw-in}}s, and {{double atari}}. Chapter 4 waits in the moonlight — ' +
        '{{life and death}} puzzles where one {{vital point}} decides everything.'
    }
  ]
};