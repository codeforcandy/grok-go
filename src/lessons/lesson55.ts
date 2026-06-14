import type { Lesson } from './types';

export const lesson55: Lesson = {
  id: 'opening-reminder',
  title: 'Opening Moves',
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'One full night',
      text:
        'Chapter 10 is a single 9×9 game in six breaths: opening, fight, turning point, ' +
        '{{ko}}, {{yose}}, scoring. Remember the old song — {{corners}} first, then ' +
        'sides, then center.'
    },
    {
      kind: 'highlight',
      points: [{ x: 2, y: 2 }, { x: 6, y: 2 }, { x: 2, y: 6 }, { x: 6, y: 6 }],
      style: 'glow',
      speaker: 'hoshi',
      text:
        'Four {{star point}}s wait like lanterns. I always begin where the board ' +
        'gives free fences — the corners.'
    },
    {
      kind: 'quiz',
      title: 'You try: claim a corner',
      prompt:
        'Black to play. Open on a corner {{star point}} — the first move of the night.',
      accept: [{ x: 2, y: 2 }],
      hint: 'Lower-left star — where two edges meet and territory grows fast.',
      explainCorrect:
        'Corner first. The opening breath is calm and ancient: secure the angles before ' +
        'the sides sing.',
      explainWrong:
        'Start on a corner {{star point}}, not the bare center. Corners are the cheapest ' +
        'territory.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'tsuki',
      text:
        'I answer in the far corner. Two lanterns lit — the garden knows we are ' +
        'serious tonight.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 2 },
      speaker: 'hoshi',
      text:
        'A third corner, still on the third line. Corners, sides — patience before ' +
        'the center storm.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'The board warms',
      text:
        'Openings are invitations. You have claimed corners; soon the sides will ask ' +
        'harder questions. Keep the whole board in view as the night deepens.'
    }
  ]
};