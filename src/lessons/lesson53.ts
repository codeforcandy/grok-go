import type { Lesson } from './types';

export const lesson53: Lesson = {
  id: 'dame-last',
  title: 'Dame Last',
  setup: {
    black: [{ x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }],
    white: [{ x: 5, y: 4 }, { x: 5, y: 5 }, { x: 5, y: 6 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Neutral ground',
      text:
        '{{Dame}} are neutral points — they belong to neither side and score nothing. ' +
        'In real games you fill them last, after every profitable {{yose}} is finished.'
    },
    {
      kind: 'highlight',
      points: [{ x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'The column between the walls is neutral for now — pretty, but worthless on ' +
        'the ledger. Real points still wait on the shoulders.'
    },
    {
      kind: 'quiz',
      title: 'You try: not dame yet',
      prompt:
        'Black to play. Skip the neutral {{dame}} — expand your live {{territory}} on the left.',
      accept: [{ x: 2, y: 4 }],
      hint: 'Step outside your left wall into the open — that is real territory, not neutral.',
      explainCorrect:
        'Correct. You ignored {{dame}} and grew real {{territory}}. Neutral points can ' +
        'wait until the score is sewn shut.',
      explainWrong:
        'Do not play in the neutral column. Extend your left wall outward where points ' +
        'still count.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 5 },
      speaker: 'tsuki',
      text:
        'I fill a {{dame}} anyway — practice habit. In tournament silence, we leave ' +
        'these for the very end.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Zero is still a number',
      text:
        '{{Dame}} last is discipline. One pointless stone before a five-point {{yose}} ' +
        'is a small tragedy — the garden forgives, the score does not.'
    }
  ]
};