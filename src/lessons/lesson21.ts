import type { Lesson } from './types';

export const lesson21: Lesson = {
  id: 'run-to-live',
  title: 'Run to the Edge',
  setup: {
    white: [{ x: 4, y: 4 }, { x: 4, y: 5 }],
    black: [
      { x: 5, y: 4 },
      { x: 3, y: 5 }, { x: 5, y: 5 },
      { x: 4, y: 3 }, { x: 3, y: 3 }, { x: 5, y: 3 }
    ]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'When you cannot make two eyes inside',
      text:
        'White\'s pair is nearly smothered. Inside there is no room for two {{eyes}} — ' +
        'so the fight leaves the nest. {{running}} toward open ground is often the ' +
        'only song left.'
    },
    {
      kind: 'move',
      point: { x: 3, y: 4 },
      speaker: 'hoshi',
      title: 'Tightening the cage',
      text: 'I press from the side. Every new stone shrinks the story White can tell inside.'
    },
    {
      kind: 'quiz',
      title: 'You try: run to live',
      prompt:
        'White to play. Slip out toward the open lower edge — start a {{running}} ' +
        'fight toward the outside.',
      accept: [{ x: 4, y: 6 }],
      hint: 'Step downward from your stones into the widest open lane.',
      explainCorrect:
        'Good escape. You refused a cramped death and reached for the horizon. ' +
        '{{running}} trades local comfort for a chance to link up later.',
      explainWrong:
        'Do not fiddle inside the cage. Step outward — down toward the open edge ' +
        'where new {{liberties}} wait.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 6 },
      speaker: 'tsuki',
      text: 'I follow. Escapes are never free — only postponed with skill.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Live small, run far',
      text:
        'Not every group can die with dignity inside. Sometimes {{running}} is the ' +
        'first move of a new life on the other side of the board.'
    }
  ]
};