import { play } from '../engine/board';
import { territory } from '../engine/territory';
import type { Color, Point } from '../engine/types';
import { lessons } from '../lessons/index';
import { stateAfter } from '../lessons/replay';
import type { Lesson, QuizStep, Step } from '../lessons/types';
import { Effects } from '../render/effects';
import { pixelOf, pointAt } from '../render/geometry';
import { Renderer, type RenderState } from '../render/renderer';
import { Ui } from '../ui/ui';

const AUTOPLAY_MS = 3500;
const PROGRESS_KEY = 'ngg-progress';

interface QuizState {
  answered: boolean;
  misses: number;
}

export class App {
  private lessonIndex = 0;
  private stepIndex = 0;
  private quiz: QuizState = { answered: false, misses: 0 };
  private autoplay = false;
  private lastAdvance = 0;
  private placing: RenderState['placing'] = null;
  private hover: Point | null = null;
  private completed = new Set<string>(loadProgress());
  private ui: Ui;

  constructor(
    private renderer: Renderer,
    private effects: Effects,
    canvas: HTMLCanvasElement
  ) {
    this.ui = new Ui({
      onFirst: () => this.goTo(0),
      onPrev: () => this.goTo(this.stepIndex - 1),
      onNext: () => this.next(),
      onToggleAuto: () => this.toggleAutoplay(),
      onSelectLesson: (i) => this.selectLesson(i),
      onShowMe: () => this.revealQuizAnswer()
    });

    canvas.addEventListener('click', (e) => this.onCanvasClick(e));
    canvas.addEventListener('mousemove', (e) => {
      this.hover = pointAt(this.renderer.geo, e.clientX, e.clientY);
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.goTo(this.stepIndex - 1);
      if (e.key === ' ') {
        e.preventDefault();
        this.toggleAutoplay();
      }
    });

    this.refreshUi();
  }

  private get lesson(): Lesson {
    return lessons[this.lessonIndex];
  }

  private get step(): Step {
    return this.lesson.steps[this.stepIndex];
  }

  private get quizPending(): boolean {
    return this.step.kind === 'quiz' && !this.quiz.answered;
  }

  private get boardStepIndex(): number {
    return this.quizPending ? this.stepIndex - 1 : this.stepIndex;
  }

  selectLesson(i: number): void {
    this.lessonIndex = Math.max(0, Math.min(lessons.length - 1, i));
    this.goTo(0);
  }

  private next(): void {
    if (this.quizPending) return;
    if (this.stepIndex >= this.lesson.steps.length - 1) {
      if (this.lessonIndex < lessons.length - 1) this.selectLesson(this.lessonIndex + 1);
      return;
    }
    this.goTo(this.stepIndex + 1, { animate: true });
  }

  private goTo(index: number, opts: { animate?: boolean } = {}): void {
    this.stepIndex = Math.max(0, Math.min(this.lesson.steps.length - 1, index));
    this.quiz = { answered: false, misses: 0 };
    this.placing = null;
    this.lastAdvance = performance.now();

    if (opts.animate && this.step.kind === 'move') {
      const s = stateAfter(this.lesson, this.stepIndex);
      this.placing = { point: this.step.point, color: colorOfLastMove(s.toPlay), start: performance.now() };
      this.spawnCaptureEffects(s.lastCaptured);
      this.spawnRippleAt(this.step.point);
    }

    if (this.stepIndex === this.lesson.steps.length - 1 && !this.completed.has(this.lesson.id)) {
      this.completed.add(this.lesson.id);
      saveProgress([...this.completed]);
    }

    this.refreshUi();
  }

  private toggleAutoplay(): void {
    this.autoplay = !this.autoplay;
    this.lastAdvance = performance.now();
    this.ui.setAutoplay(this.autoplay);
  }

  private onCanvasClick(e: MouseEvent): void {
    if (!this.quizPending) return;
    const p = pointAt(this.renderer.geo, e.clientX, e.clientY);
    if (!p) return;
    const quiz = this.step as QuizStep;

    if (quiz.accept.some((a) => a.x === p.x && a.y === p.y)) {
      this.completeQuiz(quiz, quiz.explainCorrect);
      return;
    }

    this.quiz.misses += 1;
    const near = quiz.nearMisses?.find((n) => n.point.x === p.x && n.point.y === p.y);
    const before = stateAfter(this.lesson, this.stepIndex - 1);
    const legality = play(before.board, before.toPlay, p);
    const text = near
      ? near.text
      : !legality.ok
        ? 'That point cannot be played — it is occupied or forbidden. ' + quiz.hint
        : this.quiz.misses === 1
          ? quiz.explainWrong
          : quiz.explainWrong + ' Hint: ' + quiz.hint;
    this.ui.showQuizFeedback('wrong', text, this.quiz.misses >= 2);
  }

  private revealQuizAnswer(): void {
    const quiz = this.step as QuizStep;
    this.completeQuiz(quiz, 'Here is the move: ' + quiz.explainCorrect);
  }

  private completeQuiz(quiz: QuizStep, feedback: string): void {
    this.quiz.answered = true;
    const s = stateAfter(this.lesson, this.stepIndex);
    this.placing = {
      point: quiz.accept[0],
      color: colorOfLastMove(s.toPlay),
      start: performance.now()
    };
    this.spawnCaptureEffects(s.lastCaptured);
    this.spawnRippleAt(quiz.accept[0]);
    this.lastAdvance = performance.now();
    this.refreshUi();
    this.ui.showQuizFeedback('correct', feedback, false);
  }

  private spawnRippleAt(p: Point): void {
    const { px, py } = pixelOf(this.renderer.geo, p);
    this.effects.spawnRipple(px, py, this.renderer.geo.cell);
  }

  private spawnCaptureEffects(captured: Point[]): void {
    for (const c of captured) {
      const { px, py } = pixelOf(this.renderer.geo, c);
      this.effects.spawnEmbers(px, py, this.renderer.geo.cell);
    }
  }

  private refreshUi(): void {
    const step = this.step;
    const n = this.lesson.steps.length;
    const title =
      step.kind === 'quiz'
        ? step.title ?? 'You try'
        : step.title ?? (step.kind === 'move' ? 'The game continues' : this.lesson.title);
    const blocks =
      step.kind === 'quiz'
        ? []
        : [{ speaker: step.kind === 'highlight' ? step.speaker ?? 'narrator' : step.speaker, text: step.text }];

    this.ui.setLessons(
      lessons.map((l) => l.title),
      this.lessonIndex,
      lessons.map((l) => this.completed.has(l.id))
    );
    this.ui.setStep({
      label: `Lesson ${this.lessonIndex + 1} · ${this.lesson.title}`,
      title,
      blocks,
      counter: `Step ${this.stepIndex + 1} / ${n}`,
      prevEnabled: this.stepIndex > 0,
      nextEnabled: !this.quizPending
    });
    if (this.quizPending) this.ui.showQuiz((step as QuizStep).prompt);
  }

  buildRenderState(): RenderState {
    const derived = stateAfter(this.lesson, this.boardStepIndex);
    const step = this.step;
    const focus = step.kind === 'note' ? step.focus ?? null : null;
    const glow = step.kind === 'highlight' && step.style === 'glow' ? step.points : [];
    const territoryOverlay =
      step.kind === 'highlight' && step.style.startsWith('territory')
        ? territory(derived.board).ownerOf
        : null;

    return {
      board: derived.board,
      lastMove: derived.lastMove,
      placing: this.placing,
      focus,
      glow,
      territoryOverlay,
      hover: this.hover,
      quizActive: this.quizPending
    };
  }

  frame(now: number): void {
    if (
      this.autoplay &&
      !this.quizPending &&
      now - this.lastAdvance > AUTOPLAY_MS &&
      this.stepIndex < this.lesson.steps.length - 1
    ) {
      this.next();
    }
    this.renderer.draw(this.buildRenderState(), now);
  }
}

function colorOfLastMove(toPlay: Color): Color {
  return toPlay === 'black' ? 'white' : 'black';
}

function loadProgress(): string[] {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? (JSON.parse(raw) as { completed: string[] }).completed : [];
  } catch {
    return [];
  }
}

function saveProgress(completed: string[]): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({ completed }));
  } catch {
    // Progress persistence is best-effort.
  }
}