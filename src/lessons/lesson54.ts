import type { Lesson } from './types';

export const lesson54: Lesson = {
  id: 'half-point',
  title: 'Half-Point Fights',
  setup: {
    black: [{ x: 4, y: 4 }, { x: 6, y: 4 }],
    white: [{ x: 5, y: 3 }, { x: 5, y: 5 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'When the game is thin',
      text:
        'Sometimes the board is nearly counted and one point decides everything — a ' +
        'half-point fight. Read who gains the single intersection; treat it like a ' +
        'jewel, not a {{dame}}.'
    },
    {
      kind: 'highlight',
      points: [{ x: 5, y: 4 }],
      style: 'glow',
      speaker: 'hoshi',
      text:
        'One empty point between our breaths. On a close score, this is the moon ' +
        'itself — not a pebble.'
    },
    {
      kind: 'quiz',
      title: 'You try: take the half-point',
      prompt:
        'Black to play. Seize the single contested point between both sides.',
      accept: [{ x: 5, y: 4 }],
      hint: 'The glowing point sandwiched between everyone — the half-point jewel.',
      explainCorrect:
        'You took the half-point. When the ledger is thin, one stone is a kingdom.',
      explainWrong:
        'Play at the single empty point between the black and white stones — the ' +
        'contested intersection.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 6 },
      speaker: 'tsuki',
      text:
        'I answer above, but the jewel is yours. Half-point wins are quiet earthquakes.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Chapter 9 complete',
      text:
        'You have walked {{yose}}: {{sente}} and {{gote}}, {{double sente}}, counting, ' +
        'largest moves, {{dame}} last, and half-point duels. Chapter 10 is one full ' +
        'night — a complete game from opening to scoring.'
    }
  ]
};