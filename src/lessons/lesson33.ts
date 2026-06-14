import type { Lesson } from './types';

export const lesson33: Lesson = {
  id: 'invasion-vs-reduction',
  title: 'Invasion or Reduction?',
  setup: {
    white: [
      { x: 6, y: 3 }, { x: 7, y: 3 }, { x: 8, y: 3 },
      { x: 8, y: 4 }, { x: 8, y: 5 },
      { x: 7, y: 5 }, { x: 6, y: 5 }, { x: 6, y: 4 }
    ]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Loud or light',
      text:
        'Against a framework, you can {{invasion}} deep inside or {{reduction}} ' +
        'lightly from outside. Invasions are sharp; reductions are whispers. Choose ' +
        'by how strong the wall is and how far help sits.'
    },
    {
      kind: 'highlight',
      points: [{ x: 7, y: 4 }, { x: 5, y: 4 }],
      style: 'glow',
      speaker: 'tsuki',
      text:
        'My fence on the right is not iron yet. You could dive inside — or press ' +
        'from the shoulder without committing your whole story.'
    },
    {
      kind: 'quiz',
      title: 'You try: reduce lightly',
      prompt:
        'Black to play. Choose a light {{reduction}} from outside rather than a deep {{invasion}}.',
      accept: [{ x: 5, y: 4 }],
      hint: 'Lean on the framework from the outside — one step left of the wall.',
      explainCorrect:
        'A light {{reduction}}. You pressed without diving in — keeping options if ' +
        'White attacks.',
      explainWrong:
        'Play just outside the white framework — a shoulder lean, not a deep plunge ' +
        'into the heart.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 5 },
      speaker: 'hoshi',
      text:
        'I could jump farther, but the light touch already shrank what you counted. ' +
        'Not every theft needs a crowbar.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Depth has a price',
      text:
        'Deep {{invasion}}s live small or die loudly. {{Reduction}}s steal points and ' +
        'keep running room. Read the wall: thick means reduce; thin means invade.'
    }
  ]
};