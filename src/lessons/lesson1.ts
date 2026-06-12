import type { Lesson } from './types';

export const lesson1: Lesson = {
  id: 'the-board',
  title: 'The Board',
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Welcome to the night garden',
      text:
        'This is Go — the oldest board game still played on Earth. Two players, ' +
        'Hoshi (Black) and Tsuki (White), take turns placing stones on the ' +
        'intersections of the lines, not the squares. Once placed, a stone never moves.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Landmarks',
      text:
        'The dots you see are {{star point}}s. They claim nothing by themselves — ' +
        'they are landmarks that help players find their bearings on an empty board.',
      focus: [
        { x: 2, y: 2 }, { x: 6, y: 2 }, { x: 4, y: 4 }, { x: 2, y: 6 }, { x: 6, y: 6 }
      ]
    },
    {
      kind: 'move',
      point: { x: 2, y: 2 },
      speaker: 'hoshi',
      title: 'First stone',
      text:
        'I begin near a corner. Corners are the easiest places to surround ' +
        'territory — the edges of the board do half the fencing for free.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'tsuki',
      text: 'Then I will take the opposite corner. Balance answers ambition.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 2 },
      speaker: 'hoshi',
      text: 'A second corner for me. Two corners beat one.'
    },
    {
      kind: 'move',
      point: { x: 2, y: 6 },
      speaker: 'tsuki',
      text: 'And I take the last one. Notice how we alternate — one stone each, forever.'
    },
    {
      kind: 'quiz',
      title: 'Your first stone',
      prompt:
        'All four corners are claimed, but one great point remains: the center ' +
        'star point. Play Black’s next stone there — click the board.',
      accept: [{ x: 4, y: 4 }],
      hint: 'The center of the board — the middle star point dot.',
      explainCorrect:
        'Beautiful. The center radiates influence in every direction. You have ' +
        'played your first stone of Go.',
      explainWrong:
        'A fine-looking point, but aim for the marked dot at the very center of the board.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'That is the whole mechanism',
      text:
        'Place a stone, pass the turn. Everything else in Go — capture, life, ' +
        'death, {{territory}} — grows from this single gesture. Next: how stones breathe.'
    }
  ]
};