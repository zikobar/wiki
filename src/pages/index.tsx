import React, { ReactNode } from 'react';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HeroCarousel from '../components/HeroCarousel';
import styles from './index.module.css';

const slidesObj = {
  mystic: {
    src: '/img/updates/update_test1.jpg',
    title: 'Мистические Каникулы',
    href: '/docs/gos',
  },
  skills: {
    src: '/img/updates/update_test2.png',
    title: 'Фракционные навыки',
    href: '/docs/mafias',
  },
  internet: {
    src: '/img/updates/update_test3.jpg',
    title: 'Интернет',
    href: '/docs/ghetto',
  },
};

function HomepageHeader() {
  return (
    <header className={styles.heroNoBg}>
      <HeroCarousel slidesObj={slidesObj} interval={5000} maxWidth={1100} />
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout title="GTA5RP Wiki" description="Официальная вики по функционалу GTA5RP">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
