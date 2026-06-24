import React, {useState} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export interface QuizOption {
  /** The answer text shown to the learner. */
  text: string;
  /** Whether this option is a correct answer. */
  correct?: boolean;
}

export interface QuizQuestion {
  /** The question prompt. */
  prompt: string;
  options: QuizOption[];
  /** Optional explanation revealed after answering. */
  explanation?: string;
}

export interface QuizProps {
  /** Optional heading shown above the questions. */
  title?: string;
  questions: QuizQuestion[];
}

interface QuestionState {
  selected: number | null;
  revealed: boolean;
}

function Question({question}: {question: QuizQuestion}) {
  const [state, setState] = useState<QuestionState>({
    selected: null,
    revealed: false,
  });

  const choose = (index: number) => {
    if (state.revealed) return;
    setState({selected: index, revealed: true});
  };

  const isCorrect =
    state.selected !== null && !!question.options[state.selected]?.correct;

  return (
    <div className={styles.question}>
      <p className={styles.prompt}>{question.prompt}</p>
      <ul className={styles.options}>
        {question.options.map((option, index) => {
          const chosen = state.selected === index;
          const showAsCorrect = state.revealed && option.correct;
          const showAsWrong = state.revealed && chosen && !option.correct;
          return (
            <li key={index}>
              <button
                type="button"
                className={clsx(styles.option, {
                  [styles.correct]: showAsCorrect,
                  [styles.wrong]: showAsWrong,
                  [styles.chosen]: chosen && !state.revealed,
                })}
                onClick={() => choose(index)}
                disabled={state.revealed}
                aria-pressed={chosen}>
                <span className={styles.marker} aria-hidden="true">
                  {showAsCorrect ? '✓' : showAsWrong ? '✗' : ''}
                </span>
                <span>{option.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {state.revealed && (
        <div
          className={clsx(styles.feedback, {
            [styles.feedbackCorrect]: isCorrect,
            [styles.feedbackWrong]: !isCorrect,
          })}>
          <strong>{isCorrect ? 'Correct! ' : 'Not quite. '}</strong>
          {question.explanation}
          {!isCorrect && (
            <button
              type="button"
              className={styles.retry}
              onClick={() => setState({selected: null, revealed: false})}>
              Try again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Knowledge-check quiz for use inside MDX lessons.
 *
 * ```mdx
 * <Quiz questions={[{
 *   prompt: 'Which service is the workhorse of DataPower?',
 *   options: [
 *     {text: 'Multi-Protocol Gateway', correct: true},
 *     {text: 'Web Token Service'},
 *   ],
 *   explanation: 'The MPGW handles most request/response mediation.',
 * }]} />
 * ```
 */
export default function Quiz({title = 'Knowledge Check', questions}: QuizProps) {
  return (
    <section className={styles.quiz} aria-label={title}>
      <h4 className={styles.title}>
        <span className={styles.titleIcon} aria-hidden="true">
          ?
        </span>
        {title}
      </h4>
      {questions.map((q, i) => (
        <Question key={i} question={q} />
      ))}
    </section>
  );
}
