import React from 'react';
import clsx from 'clsx';
import type { ReactNode } from 'react';
// Try importing directly from theme-classic
import Heading from '@docusaurus/theme-classic/lib/theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Risk and Liquidity Intelligence',
    image: 'images/veritas-vault-logo.jpg',
    description: (
      <>
        Comprehensive risk assessment and liquidity monitoring tools powered by advanced analytics.
      </>
    ),
  },
  {
    title: 'AI-Powered Analysis',
    image: 'images/feature-ai.png',
    description: (
      <>
        Leverage artificial intelligence for predictive financial modeling and trend analysis.
      </>
    ),
  },
  {
    title: 'Traditional Financial MLS',
    image: 'images/feature-mls.png',
    description: (
      <>
        Seamlessly integrate with traditional financial market listing services and data providers.
      </>
    ),
  },
];
  
function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={image} className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
