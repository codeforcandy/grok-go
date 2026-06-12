import type { Color, Point } from '../engine/types';

export type Speaker = 'hoshi' | 'tsuki' | 'narrator';

export interface NoteStep {
  kind: 'note';
  speaker: Speaker;
  title?: string;
  text: string;
  focus?: Point[];
}

export interface MoveStep {
  kind: 'move';
  point: Point;
  speaker: Speaker;
  title?: string;
  text: string;
}

export interface QuizStep {
  kind: 'quiz';
  title?: string;
  prompt: string;
  accept: Point[];
  hint: string;
  explainCorrect: string;
  explainWrong: string;
  nearMisses?: { point: Point; text: string }[];
}

export interface HighlightStep {
  kind: 'highlight';
  points: Point[];
  style: 'glow' | 'territory-black' | 'territory-white';
  speaker?: Speaker;
  title?: string;
  text: string;
}

export type Step = NoteStep | MoveStep | QuizStep | HighlightStep;

export interface Lesson {
  id: string;
  title: string;
  setup?: { black: Point[]; white: Point[] };
  firstToPlay: Color;
  steps: Step[];
}