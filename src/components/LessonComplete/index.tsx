import React from 'react';
import clsx from 'clsx';
import {useProgress} from '@site/src/lib/progress';
import styles from './styles.module.css';

export interface LessonCompleteProps {
  /**
   * Unique lesson id. Must match the doc id (e.g. `fundamentals/use-cases`)
   * so the homepage progress tracker counts it.
   */
  lessonId: string;
}

/**
 * "Mark this lesson complete" toggle. Persists to localStorage via the shared
 * progress store, so the homepage progress bar updates immediately.
 */
export default function LessonComplete({lessonId}: LessonCompleteProps) {
  const {isComplete, toggle} = useProgress();
  const done = isComplete(lessonId);

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={clsx(styles.button, {[styles.done]: done})}
        onClick={() => toggle(lessonId)}
        aria-pressed={done}>
        <span className={styles.check} aria-hidden="true">
          {done ? '✓' : ''}
        </span>
        {done ? 'Lesson completed' : 'Mark lesson complete'}
      </button>
      {done && (
        <span className={styles.hint}>
          Nice work — your progress is saved in this browser.
        </span>
      )}
    </div>
  );
}
