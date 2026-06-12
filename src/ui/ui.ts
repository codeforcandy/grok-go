import { glossary } from '../lessons/glossary';
import type { Chapter } from '../lessons/types';
import type { Speaker } from '../lessons/types';

export interface CommentBlock {
  speaker: Speaker;
  text: string;
}

export interface UiCallbacks {
  onFirst: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleAuto: () => void;
  onSelectChapter: (index: number) => void;
  onSelectLesson: (index: number) => void;
  onShowMe: () => void;
}

const speakerNames: Record<Speaker, string> = {
  hoshi: 'Hoshi · Black',
  tsuki: 'Tsuki · White',
  narrator: 'Narrator'
};

export function renderText(text: string): string {
  const escaped = text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
  return escaped.replace(/\{\{([^}]+)\}\}/g, (_m, term: string) => {
    const def = glossary[term] ?? '';
    return `<span class="term" title="${def.replaceAll('"', '&quot;')}">${term}</span>`;
  });
}

export class Ui {
  private el = {
    chapterBar: document.querySelector<HTMLElement>('#chapter-bar')!,
    chips: document.querySelector<HTMLElement>('#chips')!,
    label: document.querySelector<HTMLElement>('#panel-label')!,
    title: document.querySelector<HTMLElement>('#panel-title')!,
    body: document.querySelector<HTMLElement>('#panel-body')!,
    quizBox: document.querySelector<HTMLElement>('#quiz-box')!,
    quizPrompt: document.querySelector<HTMLElement>('#quiz-prompt')!,
    quizFeedback: document.querySelector<HTMLElement>('#quiz-feedback')!,
    quizShowMe: document.querySelector<HTMLButtonElement>('#quiz-showme')!,
    btnFirst: document.querySelector<HTMLButtonElement>('#btn-first')!,
    btnPrev: document.querySelector<HTMLButtonElement>('#btn-prev')!,
    btnNext: document.querySelector<HTMLButtonElement>('#btn-next')!,
    btnAuto: document.querySelector<HTMLButtonElement>('#btn-auto')!,
    counter: document.querySelector<HTMLElement>('#move-counter')!
  };

  private onSelectChapter: (index: number) => void;
  private onSelectLesson: (index: number) => void;

  constructor(callbacks: UiCallbacks) {
    this.el.btnFirst.addEventListener('click', callbacks.onFirst);
    this.el.btnPrev.addEventListener('click', callbacks.onPrev);
    this.el.btnNext.addEventListener('click', callbacks.onNext);
    this.el.btnAuto.addEventListener('click', callbacks.onToggleAuto);
    this.el.quizShowMe.addEventListener('click', callbacks.onShowMe);
    this.onSelectChapter = callbacks.onSelectChapter;
    this.onSelectLesson = callbacks.onSelectLesson;
  }

  setChapters(chapters: Chapter[], activeChapter: number): void {
    this.el.chapterBar.replaceChildren(
      ...chapters.map((chapter, i) => {
        const b = document.createElement('button');
        b.innerHTML = `${chapter.title}<span>${chapter.subtitle}</span>`;
        b.classList.toggle('active', i === activeChapter);
        b.addEventListener('click', () => this.onSelectChapter(i));
        return b;
      })
    );
  }

  setLessons(titles: string[], active: number, completed: boolean[]): void {
    this.el.chips.replaceChildren(
      ...titles.map((title, i) => {
        const b = document.createElement('button');
        b.textContent = `${i + 1} · ${title}`;
        b.classList.toggle('active', i === active);
        b.classList.toggle('done', completed[i]);
        b.addEventListener('click', () => this.onSelectLesson(i));
        return b;
      })
    );
  }

  setStep(opts: {
    label: string;
    title: string;
    blocks: CommentBlock[];
    counter: string;
    prevEnabled: boolean;
    nextEnabled: boolean;
  }): void {
    this.el.label.textContent = opts.label;
    this.el.title.textContent = opts.title;
    this.el.body.innerHTML = opts.blocks
      .map(
        (b) =>
          `<div class="speaker"><span class="dot dot-${b.speaker}"></span>${speakerNames[b.speaker]}</div>` +
          `<p>${renderText(b.text)}</p>`
      )
      .join('');
    this.el.counter.textContent = opts.counter;
    this.el.btnPrev.disabled = !opts.prevEnabled;
    this.el.btnFirst.disabled = !opts.prevEnabled;
    this.el.btnNext.disabled = !opts.nextEnabled;
    this.hideQuiz();
  }

  showQuiz(prompt: string): void {
    this.el.quizBox.hidden = false;
    this.el.quizPrompt.innerHTML = renderText(prompt);
    this.el.quizFeedback.hidden = true;
    this.el.quizShowMe.hidden = true;
  }

  showQuizFeedback(kind: 'correct' | 'wrong', text: string, showMe: boolean): void {
    this.el.quizFeedback.hidden = false;
    this.el.quizFeedback.className = kind;
    this.el.quizFeedback.innerHTML = renderText(text);
    this.el.quizShowMe.hidden = !showMe;
  }

  hideQuiz(): void {
    this.el.quizBox.hidden = true;
  }

  setAutoplay(on: boolean): void {
    this.el.btnAuto.classList.toggle('engaged', on);
  }
}