import {useCallback, useEffect, useState} from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const STORAGE_KEY = 'datapower-course-progress-v1';
const EVENT_NAME = 'datapower-progress-change';

function readCompleted(): Set<string> {
  if (!ExecutionEnvironment.canUseDOM) {
    return new Set();
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as string[];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function writeCompleted(set: Set<string>): void {
  if (!ExecutionEnvironment.canUseDOM) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
    // Notify all listeners in this tab (storage event only fires cross-tab).
    window.dispatchEvent(new Event(EVENT_NAME));
  } catch {
    /* localStorage unavailable (private mode, etc.) — fail silently */
  }
}

/**
 * Reactive hook over the set of completed lesson ids. Re-renders when progress
 * changes anywhere in the app (or in another tab).
 */
export function useProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    const sync = () => setCompleted(readCompleted());
    sync();
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const isComplete = useCallback(
    (lessonId: string) => completed.has(lessonId),
    [completed],
  );

  const setComplete = useCallback((lessonId: string, value: boolean) => {
    const next = readCompleted();
    if (value) {
      next.add(lessonId);
    } else {
      next.delete(lessonId);
    }
    writeCompleted(next);
  }, []);

  const toggle = useCallback((lessonId: string) => {
    const next = readCompleted();
    if (next.has(lessonId)) {
      next.delete(lessonId);
    } else {
      next.add(lessonId);
    }
    writeCompleted(next);
  }, []);

  const reset = useCallback(() => {
    writeCompleted(new Set());
  }, []);

  return {completed, isComplete, setComplete, toggle, reset};
}
