import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HeroCarousel from '@site/src/components/HeroCarousel';
import styles from './index.module.css';

const slides = [
  { src: '/img/updates/update_test1.jpg', href: '/docs/gos',    alt: 'Мистические Каникулы' },
  { src: '/img/updates/update_test2.png', href: '/docs/mafias', alt: 'Фракционные навыки'   },
  { src: '/img/updates/update_test3.jpg', href: '/docs/ghetto', alt: 'Интернет'             },
];

function HomepageHeader() {
  return (
    <header className={styles.heroNoBg}>
      {/* 4.5 сек автопрокрутка, соотношение кадра 16:9 */}
      <HeroCarousel slides={slides} autoPlayMs={4500} aspectRatio="16/9" />
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
