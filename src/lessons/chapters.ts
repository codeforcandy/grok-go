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