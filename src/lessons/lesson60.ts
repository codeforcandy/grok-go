import type { Lesson } from './types';

export const lesson60: Lesson = {
  id: 'scoring-night',
  title: 'Scoring the Night',
  setup: {
    black: [
      { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 },
      { x: 2, y: 2 }, { x: 6, y: 2 }, { x: 6, y: 6 }, { x: 4, y: 4 }
    ],
    white: [
      { x: 8, y: 8 }, { x: 7, y: 8 }, { x: 8, y: 7 }, { x: 7, y: 7 },
      { x: 2, y: 6 }
    ]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'The ledger closes',
      text:
        'Scoring counts stones on the board, surrounded empty points as {{territory}}, ' +
        'and {{prisoners}}. White adds {{komi}} for moving second. One night, one ' +
        'story, one number.'
    },
    {
      kind: 'highlight',
      points: [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 8, y: 8 }, { x: 7, y: 7 }],
      style: 'territory-black',
      speaker: 'narrator',
      text:
        'Fenced corners glow for each side. The middle still had paths, but corners ' +
        'became counted breath.'
    },
    {
      kind: 'quiz',
      title: 'You try: last meaningful fill',
      prompt:
        'Black to play the final profitable corner fill before scoring — secure your fence.',
      accept: [{ x: 0, y: 2 }],
      hint: 'Extend your lower-left wall along the edge — one more counted point.',
      explainCorrect:
        'Last fill. Now the board can rest: {{territory}}, {{prisoners}}, {{komi}} — ' +
        'the night is counted.',
      explainWrong:
        'Play on the edge beside your lower-left corner — a small but real point before ' +
        'the score.'
    },
    {
      kind: 'note',
      speaker: 'hoshi',
      title: 'Win or learn',
      text:
        'I do not remember only victories. I remember whether you saw urgency, whether ' +
        'you heard {{thickness}}, whether you counted the {{ko}} and the {{yose}}. ' +
        'That is the game I keep.'
    },
    {
      kind: 'note',
      speaker: 'tsuki',
      title: 'Dawn',
      text:
        'The garden lightens. You played one whole night on 9×9 — corners to scoring. ' +
        'Walk again tomorrow; the board is the same, and you are not.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Chapter 10 complete — the course rests',
      text:
        'Ten chapters: rules, winning, tactics, {{life and death}}, direction, influence, ' +
        '{{joseki}}, {{ko}}, {{yose}}, and one full game. The night garden is yours now. ' +
        'Keep reading. Keep playing. The stones will wait.'
    }
  ]
};