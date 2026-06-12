import type { Lesson } from './types';

export const lesson7: Lesson = {
  id: 'corners-first',
  title: 'Corners First',
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Where games begin',
      text:
        'Chapter 1 taught the rules. Chapter 2 teaches how to use them. Every ' +
        'opening follows the same ladder of value: {{corner}}s first, then ' +
        'sides, then center. Corners need the fewest stones to become territory.'
    },
    {
      kind: 'move',
      point: { x: 2, y: 2 },
      speaker: 'hoshi',
      title: 'The first corner',
      text:
        'I take a corner. Two edges of the board fence it for free — only two ' +
        'directions still need stones.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'tsuki',
      text: 'I answer in the far corner. Balance, as always.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 2 },
      speaker: 'hoshi',
      text: 'A second corner for me. Territory grows faster here than anywhere else.'
    },
    {
      kind: 'move',
      point: { x: 2, y: 6 },
      speaker: 'tsuki',
      text: 'And I claim the last corner. Four corners, four anchors.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Sides before center',
      text:
        'Corners are fenced. Now the sides — still backed by an edge. The center ' +
        'radiates {{influence}} in every direction, but it is the last place to ' +
        'become secure territory.',
      focus: [{ x: 4, y: 4 }]
    },
    {
      kind: 'move',
      point: { x: 4, y: 4 },
      speaker: 'hoshi',
      text:
        'I touch the center star point — not to fence it yet, but to reach toward ' +
        'every side at once.'
    },
    {
      kind: 'move',
      point: { x: 3, y: 6 },
      speaker: 'tsuki',
      text:
        'An {{extension}} down the side from my corner. Side territory grows by ' +
        'stretching from a corner stone along the edge.'
    },
    {
      kind: 'quiz',
      title: 'You try: extend from the corner',
      prompt:
        'Black still owns the upper-right corner at (6,2). Extend down that side ' +
        'to claim more territory — click the best point.',
      accept: [{ x: 6, y: 4 }],
      hint: 'Slide along the right edge, one step below the corner stone.',
      explainCorrect:
        'A clean {{extension}}. You are building a side from your corner, exactly ' +
        'as the opening ladder prescribes.',
      explainWrong:
        'Reach from the corner stone along the side — the edge of the board helps ' +
        'you fence, just as it did in the corner.',
      nearMisses: [
        {
          point: { x: 4, y: 2 },
          text:
            'That reaches into the center, not along the side. Extensions hug the ' +
            'edge beside the corner they grew from.'
        }
      ]
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'The opening ladder',
      text:
        'Corner, side, center — in that order. Next you will see how a corner ' +
        'becomes a fortress with just a few more stones.'
    }
  ]
};