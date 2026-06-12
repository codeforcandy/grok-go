import { chapters } from './chapters';

export { chapters, locateLesson, firstLessonIndexOfChapter } from './chapters';

export const lessons = chapters.flatMap((c) => c.lessons);