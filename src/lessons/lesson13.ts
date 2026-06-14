import type { Lesson } from './types';

export const lesson13: Lesson = {
  id: 'good-shape',
  title: 'Good Shape',
  setup: {
    black: [{ x: 3, y: 3 }, { x: 4, y: 4 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Stones that breathe together',
      text:
        'Chapter 2 taught where to play. Chapter 3 teaches how stones should look ' +
        'when they fight. {{good shape}} is efficient and hard to cut; {{bad shape}} ' +
        'wastes {{liberties}} and invites disaster.'
    },
    {
      kind: 'highlight',
      points: [{ x: 3, y: 3 }, { x: 4, y: 4 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'This diagonal jump looks connected, but filling the corner between them ' +
        'creates an {{empty triangle}} — three stones around one empty point. ' +
        'The middle stone becomes heavy and easy to attack.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Table and bamboo',
      text:
        'A {{table shape}} slides along the line: two stones side by side on the ' +
        'same row or column. A {{bamboo joint}} steps one point over — still ' +
        'connected, still light. Both are classic {{good shape}}.'
    },
    {
      kind: 'quiz',
      title: 'You try: connect with good shape',
      prompt:
        'Black owns (3,3) and (4,4). Connect them without making an ' +
        '{{empty triangle}} — click the best point.',
      accept: [{ x: 4, y: 3 }],
      hint: 'Slide along the top row from (3,3) toward (4,4).',
      explainCorrect:
        'A clean {{table shape}}. The stones share breathing room without the ' +
        'clumped weight of an {{empty triangle}}.',
      explainWrong:
        'Filling the inside corner of a diagonal makes an {{empty triangle}}. ' +
        'Extend along the edge instead — a {{table shape}} or {{bamboo joint}}.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'tsuki',
      text:
        'Shape is not decoration. Every clumsy clump is a future {{liberty}} ' +
        'problem waiting to bloom.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Shape before speed',
      text:
        'Before ladders and nets, before snapbacks and throw-ins, train your eye ' +
        'to prefer light, connected stones. {{good shape}} is the soil every ' +
        'tactic grows from.'
    }
  ]
};