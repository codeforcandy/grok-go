import type { Lesson } from './types';

export const lesson12: Lesson = {
  id: 'seki',
  title: 'Seki — Mutual Life',
  setup: {
    black: [{ x: 3, y: 3 }, { x: 4, y: 3 }, { x: 3, y: 4 }],
    white: [{ x: 5, y: 4 }, { x: 4, y: 5 }, { x: 5, y: 5 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'When neither can strike',
      text:
        'Two groups stare at each other across a shared empty region. Each has one ' +
        '{{eye}}. If either fills the gap, they lose — suicide or self-capture. ' +
        'This standoff is called {{seki}}: mutual life.',
      focus: [{ x: 4, y: 4 }, { x: 5, y: 3 }, { x: 3, y: 5 }]
    },
    {
      kind: 'highlight',
      points: [{ x: 4, y: 4 }, { x: 5, y: 3 }, { x: 3, y: 5 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'These shared points are neutral in the fight. In {{seki}}, they belong to ' +
        'neither side at the end — like {{dame}}, they score nothing.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Pass and move on',
      text:
        'When a local fight is {{seki}}, playing inside only hurts. Strong players ' +
        'pass, play elsewhere, and return to bigger fights. The board still has ' +
        'corners and sides waiting.'
    },
    {
      kind: 'quiz',
      title: 'You try: tenuki in seki',
      prompt:
        'The fight here is {{seki}} — do not fill the shared points. Play ' +
        'elsewhere on the board.',
      accept: [{ x: 8, y: 8 }],
      hint: 'A far corner, untouched by the local standoff.',
      explainCorrect:
        'Correct. You left the {{seki}} alone and claimed new ground. That is ' +
        'tenuki — playing where the value is still yours to take.',
      explainWrong:
        'Do not play inside the {{seki}}. Find an empty point far from the ' +
        'standoff — the game continues elsewhere.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Chapter 2 complete',
      text:
        'You now know how openings grow from corners, how invasions and enclosures ' +
        'fight for land, and how races and {{seki}} end local battles. The night ' +
        'garden is wide — keep playing.'
    }
  ]
};