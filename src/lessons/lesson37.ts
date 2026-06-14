import type { Lesson } from './types';

export const lesson37: Lesson = {
  id: 'star-point-approach',
  title: 'Approaching the Star',
  setup: {
    white: [{ x: 2, y: 2 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Corner stories begin',
      text:
        'A stone on the {{star point}} invites approach. The first {{joseki}} moves ' +
        'are not memorized spells — they are questions: how much {{territory}}, how ' +
        'much {{influence}}?'
    },
    {
      kind: 'highlight',
      points: [{ x: 2, y: 2 }, { x: 5, y: 2 }, { x: 2, y: 5 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'White owns the lower-left star. Black typically approaches from the outside ' +
        'along a side — knight\'s move or one-space low.'
    },
    {
      kind: 'quiz',
      title: 'You try: approach the star',
      prompt:
        'Black to play. Approach White\'s {{star point}} stone from the right along the bottom side.',
      accept: [{ x: 5, y: 2 }],
      hint: 'Knight\'s move to the right along the third line from the corner.',
      explainCorrect:
        'A standard approach. You pressed the corner without diving in — the opening ' +
        '{{joseki}} conversation has begun.',
      explainWrong:
        'Approach from outside along the side — the point three steps right of the ' +
        'corner on the bottom line.'
    },
    {
      kind: 'move',
      point: { x: 2, y: 5 },
      speaker: 'tsuki',
      text:
        'I answer on the left side. Approaches are invitations — now we negotiate the ' +
        'corner\'s future together.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Ask why, not only what',
      text:
        'Each approach trades corner profit for outside {{influence}}. Learn the ' +
        'shape, then ask what you want from the game — tight {{territory}} or wide ' +
        'skies.'
    }
  ]
};