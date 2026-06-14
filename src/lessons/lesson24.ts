import type { Lesson } from './types';

export const lesson24: Lesson = {
  id: 'puzzle-rhythm',
  title: 'Puzzle Rhythm',
  setup: {
    white: [{ x: 4, y: 4 }],
    black: [{ x: 5, y: 4 }, { x: 4, y: 5 }, { x: 5, y: 5 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Pause, then play',
      text:
        'Six puzzles behind you — patterns begin to rhyme. Before your hand moves, ' +
        'ask: kill, live, or run? Where is the {{vital point}}? Is there an {{atari}} ' +
        'waiting? This is {{puzzle rhythm}}.'
    },
    {
      kind: 'move',
      point: { x: 3, y: 4 },
      speaker: 'hoshi',
      text: 'I lean from the left. The single stone shrinks.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 4 },
      speaker: 'tsuki',
      text: 'I answer wide — but local breath still matters.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 6 },
      speaker: 'hoshi',
      text: 'From below as well. The net is a habit now.'
    },
    {
      kind: 'quiz',
      title: 'You try: read the capture',
      prompt:
        'White is down to one {{liberty}}. Read the finish — click the capturing move.',
      accept: [{ x: 4, y: 3 }],
      hint: 'The last empty point above White\'s stone.',
      explainCorrect:
        'Captured on rhythm. You pressed outside, counted, then finished — exactly ' +
        'the song Chapter 4 taught.',
      explainWrong:
        'Count White\'s remaining {{liberties}}. One empty point remains; fill it.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Chapter 4 complete',
      text:
        'Moonlight puzzles fade into muscle memory. Next the board will ask bigger ' +
        'questions — where is urgent, where is vast? Chapter 5 walks the whole ' +
        'garden. Rest your eyes; keep reading in your dreams.'
    }
  ]
};