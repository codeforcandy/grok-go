import type { Lesson } from './types';

export const lesson48: Lesson = {
  id: 'ko-fight-finish',
  title: 'Ending the Fight',
  setup: {
    black: [{ x: 4, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }],
    white: [{ x: 5, y: 3 }, { x: 6, y: 4 }, { x: 5, y: 5 }, { x: 4, y: 4 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Remove the echo',
      text:
        'The cleanest way to end a {{ko}} fight is to remove the possibility — connect ' +
        'underneath, add a stone that kills the recapture, or make the local result ' +
        'unconditional. End the storm; do not rent it forever.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 4 },
      speaker: 'hoshi',
      text: 'The {{ko}} burns. But some endings are quieter than recapture wars.'
    },
    {
      kind: 'move',
      point: { x: 0, y: 8 },
      speaker: 'tsuki',
      text: 'I play a {{ko threat}} — you answer, I return. The echo continues.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'hoshi',
      text: 'I answer your threat, as the rules demand.'
    },
    {
      kind: 'quiz',
      title: 'You try: recapture and settle',
      prompt:
        'White to play. The ko point is open again — recapture to continue the fight.',
      accept: [{ x: 4, y: 4 }],
      hint: 'The hot point in the center of the storm — where the capture began.',
      explainCorrect:
        'Recaptured. Ko fights loop until someone ends them with connection or a ' +
        'bigger swing elsewhere. You took the echo for now.',
      explainWrong:
        'Return to the {{ko}} point at the center of the local fight — recapture ' +
        'the stone.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Chapter 8 complete',
      text:
        'You have weathered {{ko}} threats, threat size, ignoring small fights, ' +
        'multi-step echoes, and living by ko. Chapter 9 is the quiet last walk — ' +
        '{{yose}} and counting. The storm passes; the ledger opens.'
    }
  ]
};