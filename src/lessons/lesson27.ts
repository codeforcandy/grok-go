import type { Lesson } from './types';

export const lesson27: Lesson = {
  id: 'peep-and-connect',
  title: 'Peep and Answer',
  setup: {
    white: [{ x: 3, y: 3 }, { x: 5, y: 3 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'A knock on the door',
      text:
        'A {{peep}} is a one-point knock that threatens to cut. The defender must ' +
        'answer — usually by connecting. It is a quiet move that forces a loud reply.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 4 },
      speaker: 'hoshi',
      title: 'The peep',
      text:
        'I do not cut yet — I only knock. If you ignore me, your stones split like ' +
        'branches in wind.'
    },
    {
      kind: 'quiz',
      title: 'You try: answer the peep',
      prompt:
        'White to play. Answer the {{peep}} — connect your two stones before the cut.',
      accept: [{ x: 4, y: 3 }],
      hint: 'Fill the gap between your stones on the third line.',
      explainCorrect:
        'Connected. You answered the {{peep}} and removed the cut. Defense can be ' +
        'one calm stone between two panicked ones.',
      explainWrong:
        'The gap between your stones is the wound. Play there to connect before ' +
        'Black cuts.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'hoshi',
      text:
        'You answered, so I wander. A {{peep}} that earns a reply is often worth ' +
        'more than the cut itself — I learned your shape.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Probe, then choose',
      text:
        '{{Peep}}s gather information. Sometimes you connect; sometimes you counter- ' +
        'attack. But never ignore a cut that matters — the answer is part of ' +
        '{{haengma}}.'
    }
  ]
};