import MDXComponents from '@theme-original/MDXComponents';
import Quiz from '@site/src/components/Quiz';
import LessonComplete from '@site/src/components/LessonComplete';

// Register course components globally so lessons can use <Quiz> and
// <LessonComplete> in MDX without importing them in every file.
export default {
  ...MDXComponents,
  Quiz,
  LessonComplete,
};
