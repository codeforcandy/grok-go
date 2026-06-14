import type { Chapter } from './types';
import { lesson1 } from './lesson1';
import { lesson2 } from './lesson2';
import { lesson3 } from './lesson3';
import { lesson4 } from './lesson4';
import { lesson5 } from './lesson5';
import { lesson6 } from './lesson6';
import { lesson7 } from './lesson7';
import { lesson8 } from './lesson8';
import { lesson9 } from './lesson9';
import { lesson10 } from './lesson10';
import { lesson11 } from './lesson11';
import { lesson12 } from './lesson12';
import { lesson13 } from './lesson13';
import { lesson14 } from './lesson14';
import { lesson15 } from './lesson15';
import { lesson16 } from './lesson16';
import { lesson17 } from './lesson17';
import { lesson18 } from './lesson18';
import { lesson19 } from './lesson19';
import { lesson20 } from './lesson20';
import { lesson21 } from './lesson21';
import { lesson22 } from './lesson22';
import { lesson23 } from './lesson23';
import { lesson24 } from './lesson24';

export const chapters: Chapter[] = [
  {
    id: 'chapter-1',
    title: 'Chapter 1',
    subtitle: 'The Rules',
    lessons: [lesson1, lesson2, lesson3, lesson4, lesson5, lesson6]
  },
  {
    id: 'chapter-2',
    title: 'Chapter 2',
    subtitle: 'Playing to Win',
    lessons: [lesson7, lesson8, lesson9, lesson10, lesson11, lesson12]
  },
  {
    id: 'chapter-3',
    title: 'Chapter 3',
    subtitle: 'Tactics & Reading',
    lessons: [lesson13, lesson14, lesson15, lesson16, lesson17, lesson18]
  },
  {
    id: 'chapter-4',
    title: 'Chapter 4',
    subtitle: 'Life & Death Deep Dive',
    lessons: [lesson19, lesson20, lesson21, lesson22, lesson23, lesson24]
  }
];

export interface LessonLocation {
  chapter: Chapter;
  chapterIndex: number;
  lessonInChapter: number;
  globalIndex: number;
}

export function locateLesson(globalIndex: number): LessonLocation {
  let offset = 0;
  for (let chapterIndex = 0; chapterIndex < chapters.length; chapterIndex++) {
    const chapter = chapters[chapterIndex];
    if (globalIndex < offset + chapter.lessons.length) {
      return {
        chapter,
        chapterIndex,
        lessonInChapter: globalIndex - offset,
        globalIndex
      };
    }
    offset += chapter.lessons.length;
  }
  const last = chapters.length - 1;
  const lastChapter = chapters[last];
  return {
    chapter: lastChapter,
    chapterIndex: last,
    lessonInChapter: lastChapter.lessons.length - 1,
    globalIndex: offset - 1
  };
}

export function firstLessonIndexOfChapter(chapterIndex: number): number {
  let offset = 0;
  for (let i = 0; i < chapterIndex && i < chapters.length; i++) {
    offset += chapters[i].lessons.length;
  }
  return offset;
}