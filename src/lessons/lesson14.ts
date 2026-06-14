import type { Lesson } from './types';

export const lesson14: Lesson = {
  id: 'ladder',
  title: 'The Ladder',
  setup: {
    white: [{ x: 4, y: 4 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Reading in straight lines',
      text:
        'A {{ladder}} is a forcing chase: each {{atari}} pushes the runner along ' +
        'a staircase until the board edge catches them — or a friendly stone ' +
        '{{ladder breaker}} steps in to rescue. You must read the whole stair ' +
        'before you start climbing.',
      focus: [{ x: 4, y: 4 }, { x: 5, y: 4 }]
    },
    {
      kind: 'move',
      point: { x: 5, y: 4 },
      speaker: 'hoshi',
      title: 'The first atari',
      text: 'I lean on the white stone. If it runs, I will follow in a fixed rhythm.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 5 },
      speaker: 'tsuki',
      text: 'Upward — the only direction that still breathes.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 5 },
      speaker: 'hoshi',
      text: 'Again. The {{ladder}} begins to take shape.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 6 },
      speaker: 'tsuki',
      text: 'Still running. But the wall of the board is closer now.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 6 },
      speaker: 'hoshi',
      text: 'Step by step. This is {{reading}} — seeing the stair before your hand moves.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 7 },
      speaker: 'tsuki',
      text: 'One more flight upward.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 7 },
      speaker: 'hoshi',
      text: 'The pattern repeats. Count the remaining rungs.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 8 },
      speaker: 'tsuki',
      text: 'Near the edge now. There is nowhere left to turn.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 8 },
      speaker: 'hoshi',
      text: 'The chase tightens. Continue the {{ladder}}.'
    },
    {
      kind: 'quiz',
      title: 'You try: continue the ladder',
      prompt:
        'White is still running up the left column. Play the next forcing ' +
        '{{atari}} that keeps the {{ladder}} going.',
      accept: [{ x: 3, y: 7 }],
      hint: 'Cut off the escape to the left, one row below White\'s head.',
      explainCorrect:
        'The stair continues. You read the chase to the edge — that is what makes ' +
        'a {{ladder}} trustworthy.',
      explainWrong:
        'Follow the rhythm: when White climbs, you block the new escape on the ' +
        'outside. Trace the stair one move further.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Always read the whole ladder',
      text:
        'Before you start a {{ladder}}, trace it to the end. One {{ladder breaker}} ' +
        '— a friendly stone on the stair — turns a “sure” capture into a disaster. ' +
        '{{reading}} is not optional.'
    }
  ]
};