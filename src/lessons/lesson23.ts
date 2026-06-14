import type { Lesson } from './types';

export const lesson23: Lesson = {
  id: 'kill-without-capture',
  title: 'Kill from the Outside',
  setup: {
    white: [{ x: 4, y: 4 }],
    black: [{ x: 5, y: 4 }, { x: 4, y: 5 }, { x: 5, y: 5 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Shrink before you swallow',
      text:
        'Not every kill is a single swallow. Often you lean from the outside, ' +
        'stealing {{liberties}} until {{atari}} becomes capture. The death happens ' +
        'in chapters, not one breath.'
    },
    {
      kind: 'move',
      point: { x: 3, y: 4 },
      speaker: 'hoshi',
      title: 'Lean left',
      text: 'I touch the shoulder. White\'s lone stone feels the walls closing.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 4 },
      speaker: 'tsuki',
      text: 'I answer on the far side — but your net still tightens from the left.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 6 },
      speaker: 'hoshi',
      text: 'Below as well. Three directions already speak of capture.'
    },
    {
      kind: 'move',
      point: { x: 2, y: 4 },
      speaker: 'tsuki',
      text: 'I stretch for air — one {{liberty}} remains on the edge.'
    },
    {
      kind: 'quiz',
      title: 'You try: the final liberty',
      prompt:
        'White has one {{liberty}} left. Finish the capture from the outside.',
      accept: [{ x: 4, y: 3 }],
      hint: 'White\'s last breath is above — fill the final {{liberty}} beside the shoulder.',
      explainCorrect:
        'Captured. You killed by shrinking the outside first — the classic rhythm ' +
        'of {{life and death}}.',
      explainWrong:
        'Count White\'s last breath and fill it. The outside stones did the work; ' +
        'now you only need the final {{atari}}.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Outside first',
      text:
        'Before you dream of clever {{snapback}}s, learn this humbler song: press ' +
        'from the outside until the group can no longer breathe.'
    }
  ]
};