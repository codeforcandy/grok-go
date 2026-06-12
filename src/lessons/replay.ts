import { createBoard, opponent, play, toIndex } from '../engine/board';
import type { Board, Color, Point } from '../engine/types';
import type { Lesson, Step } from './types';

export interface DerivedState {
  board: Board;
  toPlay: Color;
  lastMove: Point | null;
  lastCaptured: Point[];
}

const consumesTurn = (s: Step): boolean => s.kind === 'move' || s.kind === 'quiz';

function setupBoard(lesson: Lesson): Board {
  const board = createBoard();
  if (!lesson.setup) return board;
  const cells = [...board.cells];
  for (const p of lesson.setup.black) cells[toIndex(board.size, p)] = 'black';
  for (const p of lesson.setup.white) cells[toIndex(board.size, p)] = 'white';
  return { ...board, cells };
}

/**
 * Board state after applying steps 0..stepIndex (inclusive).
 * Pass -1 for the setup-only position. Quiz steps place their first
 * accept point (the canonical answer). Throws on illegal scripted moves —
 * lesson bugs are build-time failures, not runtime states.
 */
export function stateAfter(lesson: Lesson, stepIndex: number): DerivedState {
  let board = setupBoard(lesson);
  let toPlay = lesson.firstToPlay;
  let lastMove: Point | null = null;
  let lastCaptured: Point[] = [];

  for (let i = 0; i <= stepIndex && i < lesson.steps.length; i++) {
    const step = lesson.steps[i];
    if (!consumesTurn(step)) continue;
    const point = step.kind === 'move' ? step.point : (step as { accept: Point[] }).accept[0];
    const result = play(board, toPlay, point);
    if (!result.ok) {
      throw new Error(
        `Illegal scripted move in lesson '${lesson.id}' step ${i}: ` +
          `${toPlay} at (${point.x},${point.y}) — ${result.reason}`
      );
    }
    board = result.board;
    lastMove = point;
    lastCaptured = result.captured;
    toPlay = opponent(toPlay);
  }

  return { board, toPlay, lastMove, lastCaptured };
}