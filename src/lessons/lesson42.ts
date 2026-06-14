import type { Lesson } from './types';

export const lesson42: Lesson = {
  id: 'joseki-choice',
  title: 'Choosing a Joseki',
  setup: {
    white: [{ x: 2, y: 2 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Territory or influence',
      text:
        'Every {{joseki}} is a trade. Do you want solid corner {{territory}} or wide ' +
        '{{influence}} toward the center? Choose based on the whole board — not habit.'
    },
    {
      kind: 'highlight',
      points: [{ x: 2, y: 4 }, { x: 5, y: 2 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'Low {{enclosure}} on the left fences points. Knight\'s approach on the right ' +
        'builds outside {{influence}}. Same corner, different dreams.'
    },
    {
      kind: 'quiz',
      title: 'You try: choose influence',
      prompt:
        'You want outside {{influence}} more than a tight corner fence. Approach along the bottom side.',
      accept: [{ x: 5, y: 2 }],
      hint: 'Knight\'s move right along the bottom — outward, not enclosing.',
      explainCorrect:
        'Approach for {{influence}}. You chose the wide {{joseki}} path — the corner ' +
        'stays fluid while your side grows.',
      explainWrong:
        'For influence, approach from outside along the bottom — not the enclosing ' +
        'move up the left side.'
    },
    {
      kind: 'move',
      point: { x: 2, y: 4 },
      speaker: 'tsuki',
      text:
        'I fence small while you reach wide. Neither choice is wrong — only early or ' +
        'late for the board we have.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Chapter 7 complete',
      text:
        'Corners speak in short {{joseki}} sentences: approach, invade, enclose, kick, ' +
        'pincer, choose. Carry the why into Chapter 8, where {{ko}} storms shake the ' +
        'quiet garden.'
    }
  ]
};