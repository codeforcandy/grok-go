import type { Lesson } from './types';

export const lesson52: Lesson = {
  id: 'largest-move',
  title: 'Largest Move First',
  setup: {
    black: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }],
    white: [{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 8, y: 7 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Big points sing louder',
      text:
        'In {{yose}}, play the largest move that is still {{sente}} or clearly profitable. ' +
        'A corner fill can be worth several points; a distant {{dame}} whispers zero.'
    },
    {
      kind: 'highlight',
      points: [{ x: 1, y: 1 }, { x: 7, y: 7 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'Two corner gaps glow — yours and theirs. Securing your own corner is the ' +
        'largest calm profit on the board right now.'
    },
    {
      kind: 'quiz',
      title: 'You try: largest move',
      prompt:
        'Black to play. Choose the largest profitable {{yose}} — your corner, not the far fight.',
      accept: [{ x: 1, y: 1 }],
      hint: 'Complete your own lower-left fence before nibbling elsewhere.',
      explainCorrect:
        'Largest move first. You counted the corner correctly — several points beat ' +
        'a distant whisper.',
      explainWrong:
        'Fill your own corner gap — the biggest secure profit visible on the board.'
    },
    {
      kind: 'move',
      point: { x: 7, y: 7 },
      speaker: 'tsuki',
      text:
        'I take my corner next. {{Yose}} is polite when both players count — until ' +
        'the half-point fights begin.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Order is profit',
      text:
        'List the big points, play {{sente}} among them, then descend to smaller ' +
        '{{gote}}. The night garden ends in arithmetic sung in order.'
    }
  ]
};