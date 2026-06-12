import type { Lesson } from './types';

export const lesson3: Lesson = {
  id: 'connection-and-cutting',
  title: 'Connection & Cutting',
  setup: {
    black: [{ x: 3, y: 3 }, { x: 4, y: 4 }],
    white: [{ x: 5, y: 5 }, { x: 6, y: 6 }]
  },
  firstToPlay: 'white',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Together or apart',
      text:
        'Stones connected along the lines are one {{group}} and share their ' +
        'breath. But look at Hoshi’s two stones: they touch only at the corner. ' +
        'Diagonal stones are NOT connected — yet.',
      focus: [{ x: 3, y: 3 }, { x: 4, y: 4 }]
    },
    {
      kind: 'move',
      point: { x: 4, y: 3 },
      speaker: 'tsuki',
      title: 'The cut',
      text:
        'I slip between your stones. A diagonal has two doors — I walk through ' +
        'one of them. Now your stones must each fend for themselves.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      text:
        'One white stone has turned two black stones into two separate, weaker ' +
        'groups. Divided stones are easier to capture — divide and conquer is ' +
        'as old as Go itself.'
    },
    {
      kind: 'move',
      point: { x: 3, y: 4 },
      speaker: 'hoshi',
      title: 'Connecting',
      text:
        'I close the second door. My three stones now stand on one breath — ' +
        'count their {{liberties}}: far more than any stone alone.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      text:
        'Notice the reversal: Hoshi’s wall is strong, and suddenly Tsuki’s ' +
        'cutting stone is the lonely one.',
      focus: [{ x: 4, y: 3 }]
    },
    {
      kind: 'move',
      point: { x: 4, y: 2 },
      speaker: 'tsuki',
      text:
        'A stone that dares to cut must be defended. I reinforce it before ' +
        'Hoshi can strike back.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      text:
        'Now study Tsuki’s other two stones, standing diagonally in the lower ' +
        'right. Diagonals move fast across the board — but they always leave ' +
        'two doors open.',
      focus: [{ x: 5, y: 5 }, { x: 6, y: 6 }]
    },
    {
      kind: 'quiz',
      title: 'You try: cut!',
      prompt:
        'Where could Black cut Tsuki’s diagonal stones apart? Two points work — click either.',
      accept: [{ x: 5, y: 6 }, { x: 6, y: 5 }],
      hint: 'The two empty points that touch BOTH white stones along the lines.',
      explainCorrect:
        'Cut! The white stones are now two separate groups, each needing its ' +
        'own two {{eyes}} to live. One strong group became two weak ones.',
      explainWrong:
        'Look for an empty point that touches both white stones along the lines — a door between them.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Half of all strategy',
      text:
        'Connect your own stones; cut your opponent’s. Strong shapes breathe ' +
        'together — and the player with fewer weak groups usually wins the fight.'
    }
  ]
};