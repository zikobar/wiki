import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './HeroCarousel.module.css';

export interface Slide {
  src: string;
  title: string;
  href: string;
}

interface Props {
  slidesObj: Record<string, Slide>;
  interval?: number;
  maxWidth?: number;
}

const HeroCarousel: React.FC<Props> = ({ slidesObj, interval = 5000, maxWidth = 1100 }) => {
  const slides = Object.values(slidesObj);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => {
      setCurrent((i) => (i + 1) % slides.length);
    }, interval);
    return () => clearInterval(t);
  }, [slides, interval]);

  const go = (dir: 1 | -1) => setCurrent((i) => (i + dir + slides.length) % slides.length);

  return (
    <div className={styles.carousel} style={{ maxWidth }}>
      <div className={styles.carouselInner}>
        {slides.map((s, i) => (
          <div
            key={i}
            className={`${styles.carouselItem} ${i === current ? styles.active : ''}`}
          >
            <Link to={s.href} className={styles.slideLink} aria-label={s.title}>
              <div className={styles.carouselImageWrapper}>
                <img className={styles.image} src={s.src} alt={s.title} />
                {/* убрали подпись под картинкой */}
              </div>
            </Link>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            className={`${styles.navButton} ${styles.prev}`}
            onClick={() => go(-1)}
            aria-label="Previous slide"
            type="button"
          >
            ‹
          </button>
          <button
            className={`${styles.navButton} ${styles.next}`}
            onClick={() => go(1)}
            aria-label="Next slide"
            type="button"
          >
            ›
          </button>

          <div className={styles.dots}>
            {slides.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === current ? styles.activeDot : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                type="button"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroCarousel;
