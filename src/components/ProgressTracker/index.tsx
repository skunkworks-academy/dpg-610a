import React from 'react';
import Link from '@docusaurus/Link';
import {useProgress} from '@site/src/lib/progress';
import {modules, totalLessons} from '@site/src/lib/courseData';
import styles from './styles.module.css';

/**
 * Course-wide progress dashboard for the homepage. Shows the overall completion
 * bar plus a per-module breakdown, and a link into the next unfinished lesson.
 */
export default function ProgressTracker() {
  const {completed, reset} = useProgress();

  const completedCount = completed.size;
  const pct =
    totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  // Find the first lesson the learner hasn't completed yet.
  const nextLesson = modules
    .flatMap((m) => m.lessons)
    .find((l) => !completed.has(l.id));

  return (
    <section className={styles.tracker}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.heading}>Your progress</h2>
          <p className={styles.sub}>
            {completedCount} of {totalLessons} lessons complete · saved in this
            browser
          </p>
        </div>
        <div className={styles.actions}>
          {nextLesson ? (
            <Link
              className="button button--primary button--lg"
              to={nextLesson.path}>
              {completedCount === 0 ? 'Start course' : 'Continue'} →
            </Link>
          ) : (
            <span className={styles.doneBadge}>🎉 Course complete!</span>
          )}
        </div>
      </div>

      <div
        className={styles.bar}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}>
        <div className={styles.fill} style={{width: `${pct}%`}} />
        <span className={styles.barLabel}>{pct}%</span>
      </div>

      <div className={styles.modules}>
        {modules.map((m) => {
          const done = m.lessons.filter((l) => completed.has(l.id)).length;
          const mpct = Math.round((done / m.lessons.length) * 100);
          return (
            <div key={m.id} className={styles.moduleRow}>
              <Link to={m.lessons[0].path} className={styles.moduleLabel}>
                {m.label}
              </Link>
              <div className={styles.moduleBar}>
                <div
                  className={styles.moduleFill}
                  style={{width: `${mpct}%`}}
                />
              </div>
              <span className={styles.moduleCount}>
                {done}/{m.lessons.length}
              </span>
            </div>
          );
        })}
      </div>

      {completedCount > 0 && (
        <button type="button" className={styles.reset} onClick={reset}>
          Reset progress
        </button>
      )}
    </section>
  );
}
