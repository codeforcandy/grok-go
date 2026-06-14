import type { Lesson } from './types';

export const lesson30: Lesson = {
  id: 'whole-board-glance',
  title: 'The Whole Board',
  setup: {
    black: [{ x: 0, y: 0 }, { x: 8, y: 0 }],
    white: [{ x: 8, y: 8 }, { x: 0, y: 8 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Lift your eyes',
      text:
        'Local fights are loud; the whole board whispers. After urgent moves are ' +
        'handled, glance outward — where is the largest empty area? That is often ' +
        'where {{haengma}} flows next.'
    },
    {
      kind: 'highlight',
      points: [{ x: 4, y: 4 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'Three corners claimed, sides still breathing, and the center is wide open ' +
        '— the garden\'s great crossroads. The biggest empty region calls first.'
    },
    {
      kind: 'quiz',
      title: 'You try: whole-board glance',
      prompt:
        'No local fight is urgent. Play the largest central area on the board.',
      accept: [{ x: 4, y: 4 }],
      hint: 'The star at the heart of the board — where all paths meet.',
      explainCorrect:
        'The center claims the sky. You looked past local noise and heard where ' +
        'the board was widest — that is a whole-board glance.',
      explainWrong:
        'Corners and edges are partly claimed. Find the biggest open region — the ' +
        'center crossroads.'
    },
    {
      kind: 'move',
      point: { x: 2, y: 6 },
      speaker: 'tsuki',
      text:
        'I answer on the side, but you took the summit. Direction is a habit: urgent, ' +
        'then vast.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Chapter 5 complete',
      text:
        'You have felt {{haengma}} — urgent before big, {{weak groups}}, {{peep}}s, ' +
        '{{sacrifice}}s, {{miai}}, and the whole-board glance. Chapter 6 walks among ' +
        'walls that cast shadows: {{thickness}} and {{moyo}}. Keep your eyes moving.'
    }
  ]
};