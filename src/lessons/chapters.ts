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
import { lesson25 } from './lesson25';
import { lesson26 } from './lesson26';
import { lesson27 } from './lesson27';
import { lesson28 } from './lesson28';
import { lesson29 } from './lesson29';
import { lesson30 } from './lesson30';
import { lesson31 } from './lesson31';
import { lesson32 } from './lesson32';
import { lesson33 } from './lesson33';
import { lesson34 } from './lesson34';
import { lesson35 } from './lesson35';
import { lesson36 } from './lesson36';
import { lesson37 } from './lesson37';
import { lesson38 } from './lesson38';
import { lesson39 } from './lesson39';
import { lesson40 } from './lesson40';
import { lesson41 } from './lesson41';
import { lesson42 } from './lesson42';
import { lesson43 } from './lesson43';
import { lesson44 } from './lesson44';
import { lesson45 } from './lesson45';
import { lesson46 } from './lesson46';
import { lesson47 } from './lesson47';
import { lesson48 } from './lesson48';
import { lesson49 } from './lesson49';
import { lesson50 } from './lesson50';
import { lesson51 } from './lesson51';
import { lesson52 } from './lesson52';
import { lesson53 } from './lesson53';
import { lesson54 } from './lesson54';
import { lesson55 } from './lesson55';
import { lesson56 } from './lesson56';
import { lesson57 } from './lesson57';
import { lesson58 } from './lesson58';
import { lesson59 } from './lesson59';
import { lesson60 } from './lesson60';

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
  },
  {
    id: 'chapter-5',
    title: 'Chapter 5',
    subtitle: 'Direction & Urgency',
    lessons: [lesson25, lesson26, lesson27, lesson28, lesson29, lesson30]
  },
  {
    id: 'chapter-6',
    title: 'Chapter 6',
    subtitle: 'Influence & Thickness',
    lessons: [lesson31, lesson32, lesson33, lesson34, lesson35, lesson36]
  },
  {
    id: 'chapter-7',
    title: 'Chapter 7',
    subtitle: 'Joseki on 9×9',
    lessons: [lesson37, lesson38, lesson39, lesson40, lesson41, lesson42]
  },
  {
    id: 'chapter-8',
    title: 'Chapter 8',
    subtitle: 'Ko Fighting',
    lessons: [lesson43, lesson44, lesson45, lesson46, lesson47, lesson48]
  },
  {
    id: 'chapter-9',
    title: 'Chapter 9',
    subtitle: 'Endgame',
    lessons: [lesson49, lesson50, lesson51, lesson52, lesson53, lesson54]
  },
  {
    id: 'chapter-10',
    title: 'Chapter 10',
    subtitle: 'One Full Night',
    lessons: [lesson55, lesson56, lesson57, lesson58, lesson59, lesson60]
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