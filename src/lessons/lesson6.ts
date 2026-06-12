import type { Lesson, Step } from './types';

const wallCommentary: string[] = [
  'We end where every game ends: with territory. I stake my claim on this side.',
  'And I answer, line for line. My fence rises opposite yours.',
  'Stone by stone, my border grows south.',
  'Mine grows with it. A wall is only as strong as its weakest gap.',
  'No gaps in mine.',
  'Nor mine. Watch the empty land behind each fence — that is the real prize.',
  'The land to my left will be mine alone.',
  'And the land to my right, mine.',
  'Halfway down the board now.',
  'Patience. Counting comes to those who finish their fences.',
  'I could turn and invade — but a broken fence loses more than it gains.',
  'Wise. Greed is how fences crumble.',
  'Three lines to go.',
  'Three for me as well.',
  'Almost to the edge.',
  'The edge is a fence that neither of us had to build.',
  'My border is complete.',
  'And mine. Now — shall we count?'
];

const wallSteps: Step[] = wallCommentary.map((text, i) => ({
  kind: 'move' as const,
  point: { x: i % 2 === 0 ? 3 : 5, y: Math.floor(i / 2) },
  speaker: i % 2 === 0 ? ('hoshi' as const) : ('tsuki' as const),
  text
}));

export const lesson6: Lesson = {
  id: 'a-real-game',
  title: 'A Real Game',
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'The whole game, small',
      text:
        'Tonight Hoshi and Tsuki play a simplified game — one fence each, then ' +
        'we count. Real games sprawl across corners and centers, but the ' +
        'arithmetic at the end is exactly the same.'
    },
    ...wallSteps,
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'The board is divided',
      text:
        'Black owns everything left of his wall; White everything right of ' +
        'hers. The column between the fences touches both colors — those are ' +
        '{{dame}}, neutral points worth nothing.',
      focus: [{ x: 4, y: 3 }, { x: 4, y: 4 }, { x: 4, y: 5 }]
    },
    {
      kind: 'move',
      point: { x: 4, y: 4 },
      speaker: 'hoshi',
      text:
        'I seal the center path. A neutral point — it scores nothing, but it ' +
        'closes the argument.'
    },
    {
      kind: 'move',
      point: { x: 0, y: 0 },
      speaker: 'tsuki',
      title: 'The raid',
      text:
        'Before we count — one desperate raid behind enemy lines! A stone in ' +
        'your corner. What will it cost you to remove me?'
    },
    {
      kind: 'move',
      point: { x: 1, y: 0 },
      speaker: 'hoshi',
      text:
        'It cannot live there — no room for two {{eyes}}. I cut off its escape. ' +
        'One {{liberty}} left: {{atari}}.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 2 },
      speaker: 'tsuki',
      text:
        'While you tidy your house, I take another neutral point — free moves, ' +
        'since you are busy answering me.'
    },
    {
      kind: 'quiz',
      title: 'You try: end the raid',
      prompt: 'Capture the white raider and end the game. Click the point.',
      accept: [{ x: 0, y: 1 }],
      hint: 'The raider’s last {{liberty}} is beside it, on the edge.',
      explainCorrect:
        'Captured — the raid is over, one more {{prisoner}} for Black. Both ' +
        'players now pass: there are no moves left worth making. The game ends.',
      explainWrong: 'Find the white stone’s one remaining empty neighbor.'
    },
    {
      kind: 'highlight',
      points: [],
      style: 'territory-black',
      speaker: 'narrator',
      title: 'Counting Black',
      text:
        'Black’s {{territory}}: 25 empty points behind his fence. Notice the ' +
        'cost of the raid — Hoshi placed two stones inside his own land, and ' +
        'each one erased a point of territory.'
    },
    {
      kind: 'highlight',
      points: [],
      style: 'territory-white',
      speaker: 'narrator',
      title: 'Counting White',
      text:
        'White’s {{territory}}: 27 untouched points. Tsuki spent her spare ' +
        'moves on {{dame}} — worthless, but also costless.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'The score',
      text:
        'Black: 25 territory + 1 {{prisoner}} = 26. White: 27. Tsuki wins by ' +
        'one point — the exact price of answering a doomed raid twice inside ' +
        'your own land. (In real games White also receives {{komi}} — bonus ' +
        'points for moving second.)'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'You know the game now',
      text:
        'Stones breathe, groups live with two {{eyes}}, ko forbids eternity, ' +
        'and the player who fences more empty land wins. Everything else — ' +
        'all of it — is just getting better at these few truths. Play.'
    }
  ]
};