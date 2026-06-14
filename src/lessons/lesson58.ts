import type { Lesson } from './types';

export const lesson58: Lesson = {
  id: 'ko-moment',
  title: 'A Ko Appears',
  setup: {
    black: [{ x: 4, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }],
    white: [{ x: 5, y: 3 }, { x: 6, y: 4 }, { x: 5, y: 5 }, { x: 4, y: 4 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Thunder in the middle',
      text:
        'Even in one teaching game, a {{ko}} can arrive like weather. Remember the ' +
        'auction: threat, answer, recapture — or walk away if the swing is too small.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 4 },
      speaker: 'hoshi',
      text: 'The capture lands, and the hot point glows. Our quiet night crackles.'
    },
    {
      kind: 'quiz',
      title: 'You try: ko threat in the game',
      prompt:
        'White to play. You cannot recapture yet — play a {{ko threat}} elsewhere.',
      accept: [{ x: 0, y: 8 }],
      hint: 'Far corner thunder — loud enough to buy the return.',
      explainCorrect:
        'Threat played inside the story of the game. The {{ko}} breathes between storms.',
      explainWrong:
        'Do not touch the hot point. Play a distant {{ko threat}} that forces an answer.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'hoshi',
      text: 'I answer — the game within the game.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Storms pass',
      text:
        'Ko moments test calm. Whether you fight or ignore, count the value — the ' +
        'rest of the board still moves.'
    }
  ]
};