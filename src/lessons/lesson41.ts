import type { Lesson } from './types';

export const lesson41: Lesson = {
  id: 'pincer-spirit',
  title: 'The Pincer Idea',
  setup: {
    white: [{ x: 2, y: 2 }],
    black: [{ x: 6, y: 2 }]
  },
  firstToPlay: 'white',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Pressure from farther away',
      text:
        'A pincer approaches from farther along the side, squeezing the corner stone ' +
        'against your wall. The {{joseki}} spirit: attack lightly, force a running ' +
        'fight, and let {{thickness}} do the work.'
    },
    {
      kind: 'highlight',
      points: [{ x: 2, y: 2 }, { x: 6, y: 2 }],
      style: 'glow',
      speaker: 'hoshi',
      text:
        'I did not touch the corner — I landed farther right. Now your star stone ' +
        'must run or defend while I keep the wide side.'
    },
    {
      kind: 'quiz',
      title: 'You try: answer the pincer',
      prompt:
        'White to play. Jump toward the center to escape the pincer pressure.',
      accept: [{ x: 2, y: 4 }],
      hint: 'Leap up from your corner star along the left side — toward open center.',
      explainCorrect:
        'You jumped toward safety. Against a pincer, running toward the center is ' +
        'often the first {{joseki}} breath.',
      explainWrong:
        'Do not huddle on the star. Jump along the side toward the open center — ' +
        'away from the pincer stone.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 3 },
      speaker: 'hoshi',
      text:
        'I chase with a light knight\'s move. Pincers are not about instant capture ' +
        '— they are about keeping you small while my side stays wide.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Spirit over rote',
      text:
        'You need not memorize every pincer line. Remember the spirit: pressure from ' +
        'afar, runner toward center, attacker riding {{influence}}. That is enough ' +
        'for many 9×9 corners.'
    }
  ]
};