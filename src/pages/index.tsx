import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ProgressTracker from '@site/src/components/ProgressTracker';
import {modules} from '@site/src/lib/courseData';
import styles from './index.module.css';

function Hero() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.hero)}>
      <div className="container">
        <span className={styles.kicker}>Skunkworks Academy · Self-paced</span>
        <h1 className={styles.title}>{siteConfig.title}</h1>
        <p className={styles.tagline}>{siteConfig.tagline}</p>
        <p className={styles.lede}>
          Learn how IBM DataPower Gateway secures, transforms, and routes traffic
          at the edge of the enterprise — from first principles to hands-on
          configuration. Work through the modules at your own pace; your progress
          is saved automatically in your browser.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            Get started →
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/labs/intro">
            Jump to labs
          </Link>
        </div>
      </div>
    </header>
  );
}

function ModuleCards() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Course modules</h2>
        <div className={styles.cards}>
          {modules.map((m) => (
            <Link
              key={m.id}
              to={m.lessons[0].path}
              className={clsx('card', styles.card)}>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{m.label}</h3>
                <p className={styles.cardDesc}>{m.description}</p>
              </div>
              <div className={styles.cardFooter}>
                {m.lessons.length} lesson{m.lessons.length === 1 ? '' : 's'} →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Course`}
      description="A self-paced, hands-on course on IBM DataPower Gateway by Skunkworks Academy.">
      <Hero />
      <main>
        <section className={styles.section}>
          <div className="container">
            <ProgressTracker />
          </div>
        </section>
        <ModuleCards />
      </main>
    </Layout>
  );
}
