import type { Lesson } from './types';

export const lesson16: Lesson = {
  id: 'snapback',
  title: 'Snapback',
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Give a little, take a lot',
      text:
        'A {{snapback}} is a counter-punch: you let the opponent capture a small ' +
        'stone, then immediately recapture a larger cluster they can no longer ' +
        'save. The bait is one point; the prize is many.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 3 },
      speaker: 'hoshi',
      text: 'I open the fight along the fourth line.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 3 },
      speaker: 'tsuki',
      text: 'A calm answer — but the cut is coming.'
    },
    {
      kind: 'move',
      point: { x: 3, y: 3 },
      speaker: 'hoshi',
      text: 'Pressure from the left. The shape tightens.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 4 },
      speaker: 'tsuki',
      text: 'I lean in. Short fights often hide long traps.'
    },
    {
      kind: 'move',
      point: { x: 3, y: 4 },
      speaker: 'hoshi',
      title: 'The bait',
      text:
        'I offer a stone. It looks like a loss — until you see what recapture ' +
        'creates.'
    },
    {
      kind: 'move',
      point: { x: 3, y: 5 },
      speaker: 'tsuki',
      text: 'Taken. One {{prisoner}} for me.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 5 },
      speaker: 'hoshi',
      text: 'I rebuild. The mouth around your stones is almost closed.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 4 },
      speaker: 'tsuki',
      text: 'I cut back in — still hungry.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 5 },
      speaker: 'hoshi',
      text: 'Another sacrifice on the way. Watch the recapture, not the capture.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 6 },
      speaker: 'tsuki',
      text: 'Another stone falls. Surely I am ahead in material.'
    },
    {
      kind: 'move',
      point: { x: 3, y: 6 },
      speaker: 'hoshi',
      text: 'The trap is set. One more capture and the snapback fires.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 6 },
      speaker: 'tsuki',
      title: 'The capture',
      text: 'I take what you offered. The board smiles at me — for one breath.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 7 },
      speaker: 'hoshi',
      text: 'And now the mouth is sealed. Unless you see the return...'
    },
    {
      kind: 'quiz',
      title: 'You try: snapback',
      prompt:
        'Black just captured on the right, but left a wound open. Play the ' +
        '{{snapback}} that wins back more than you gave.',
      accept: [{ x: 6, y: 5 }],
      hint: 'Strike the black cluster from the outside — where their shape is thinnest.',
      explainCorrect:
        'Snapback! You traded one stone for two — the classic bait. Always ask: ' +
        '“What happens right after they capture?”',
      explainWrong:
        'Look for the recapture that removes a whole clump, not just one stone. ' +
        'The {{snapback}} point hugs Black\'s weakest {{liberty}}.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Read the recapture first',
      text:
        'Whenever a capture looks too generous, pause. The best {{snapback}}s feel ' +
        'like mistakes until the very last stone settles.'
    }
  ]
};