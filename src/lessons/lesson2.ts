import type { Lesson } from './types';

export const lesson2: Lesson = {
  id: 'liberties-and-capture',
  title: 'Liberties & Capture',
  setup: {
    black: [
      { x: 3, y: 4 }, { x: 4, y: 3 },
      { x: 0, y: 6 }, { x: 0, y: 7 }, { x: 2, y: 6 }, { x: 2, y: 7 }, { x: 1, y: 5 }
    ],
    white: [{ x: 4, y: 4 }, { x: 1, y: 6 }, { x: 1, y: 7 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'The breath of a stone',
      text:
        'Every stone breathes through the empty points directly beside it — its ' +
        '{{liberties}}. Fill them all, and the stone is captured and removed. ' +
        'The white stone in the middle is already short of breath.',
      focus: [{ x: 4, y: 4 }]
    },
    {
      kind: 'highlight',
      points: [{ x: 5, y: 4 }, { x: 4, y: 5 }],
      style: 'glow',
      speaker: 'narrator',
      text: 'Two {{liberties}} remain — the two glowing points.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 4 },
      speaker: 'hoshi',
      title: 'Closing in',
      text:
        'I take another breath away. One {{liberty}} left — that white stone is in {{atari}}.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      text:
        '{{atari}} is the warning bell of Go: one move from capture. White must ' +
        'decide — rescue the stone, or spend the move somewhere more valuable.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 2 },
      speaker: 'tsuki',
      title: 'Letting go',
      text:
        'Running would only add stones to a lost cause. I let it go and build in ' +
        'an open corner instead. Knowing what to abandon is also strength.'
    },
    {
      kind: 'quiz',
      title: 'You try: take the stone',
      prompt: 'The white stone has one {{liberty}} left. Click the point that captures it.',
      accept: [{ x: 4, y: 5 }],
      hint: 'Find the last empty point touching the white stone along a line.',
      explainCorrect:
        'Captured! The stone’s last breath is gone, and it leaves the board as a {{prisoner}}.',
      explainWrong: 'Look for the one empty point still touching the white stone along a line.',
      nearMisses: [
        {
          point: { x: 5, y: 5 },
          text:
            'So close — but diagonals don’t touch in Go. Stones connect and ' +
            'breathe only along the lines.'
        }
      ]
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'One point, kept',
      text:
        'The captured stone becomes a {{prisoner}} — worth a point at the end of ' +
        'the game. Now look to the lower left: stones standing together.',
      focus: [{ x: 1, y: 6 }, { x: 1, y: 7 }]
    },
    {
      kind: 'highlight',
      points: [{ x: 1, y: 8 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'Connected stones form a {{group}} and share their breath. This white ' +
        'pair breathes through a single point — the whole {{group}} is in {{atari}}.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'tsuki',
      text:
        'Those two are beyond saving as well. I keep claiming open ground — ' +
        'watch how many points I gather while Hoshi hunts.'
    },
    {
      kind: 'quiz',
      title: 'You try: capture the pair',
      prompt: 'One move captures both white stones. Where?',
      accept: [{ x: 1, y: 8 }],
      hint: 'The group’s single shared liberty — the point that glowed a moment ago.',
      explainCorrect:
        'Two {{prisoners}} with one stone. A {{group}} lives and dies together.',
      explainWrong:
        'The pair breathes through exactly one point. Fill that, and both stones fall.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'What you now know',
      text:
        'Stones breathe through {{liberties}}. Fill the last one and you capture. ' +
        'Groups share breath and fall together. But Tsuki’s patience hints at a ' +
        'deeper truth: captures are sweet, territory is sweeter.'
    }
  ]
};