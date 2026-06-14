import type { Lesson } from './types';

export const lesson47: Lesson = {
  id: 'ko-and-life',
  title: 'Ko in Life & Death',
  setup: {
    black: [{ x: 4, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }],
    white: [{ x: 5, y: 3 }, { x: 6, y: 4 }, { x: 5, y: 5 }, { x: 4, y: 4 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Live by echo',
      text:
        'Sometimes a group lives only through {{ko}} — snap, threaten, recapture, ' +
        'repeat. In {{life and death}}, a ko is not a trick; it is a temporary eye ' +
        'built on the rule itself.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 4 },
      speaker: 'hoshi',
      text:
        'I capture, and your corner breathes only if you win the auction. Live by ' +
        '{{ko}} is a cliff edge with a rope.'
    },
    {
      kind: 'quiz',
      title: 'You try: fight to live',
      prompt:
        'White to play. You cannot recapture yet — play a {{ko threat}} that keeps your ' +
        'group\'s life chances alive.',
      accept: [{ x: 0, y: 8 }],
      hint: 'Far and loud — buy time before you return to the hot point.',
      explainCorrect:
        'Threat played. Living by {{ko}} means winning the threat exchange — you kept ' +
        'the rope taut.',
      explainWrong:
        'Do not touch the {{ko}} point yet. Play elsewhere with enough weight to force ' +
        'a reply.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'hoshi',
      text: 'I answer — because I must. Your life still hangs on the return.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Ko life is conditional',
      text:
        'Groups that live by {{ko}} are alive only while they win the fight. Count ' +
        'your threats before you call it life. The garden is gentle; the score is not.'
    }
  ]
};