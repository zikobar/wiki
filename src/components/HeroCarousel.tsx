import React, {useEffect, useRef, useState} from 'react';
import styles from './HeroCarousel.module.css';

export type Slide = { src: string; href?: string; alt?: string };

type Props = {
  slides: Slide[];
  autoPlayMs?: number;     // авто-пролистыватель (0 — отключить)
  aspectRatio?: `${number}/${number}`; // по умолчанию 16/9
};

export default function HeroCarousel({
  slides,
  autoPlayMs = 4500,
  aspectRatio = '16/9',
}: Props) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const total = slides.length;

  const go = (i: number) => setIndex((prev) => (i + total) % total);
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  // autoplay
  const stop = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
  };
  const start = () => {
    if (autoPlayMs > 0 && !timerRef.current) {
      timerRef.current = window.setInterval(next, autoPlayMs);
    }
  };

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, autoPlayMs, total]);

  return (
    <div
      className={styles.hc}
      style={{aspectRatio}}
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      <div
        className={styles.hcTrack}
        style={{transform: `translateX(-${index * 100}%)`}}
      >
        {slides.map((s, i) => (
          <div className={styles.hcSlide} key={i}>
            <img className={styles.hcImg} src={s.src} alt={s.alt ?? ''} />
            {s.href && <a className={styles.hcLink} href={s.href} />}
          </div>
        ))}
      </div>

      <button className={`${styles.hcNav} ${styles.hcPrev}`} onClick={prev} aria-label="Предыдущий">
        ‹
      </button>
      <button className={`${styles.hcNav} ${styles.hcNext}`} onClick={next} aria-label="Следующий">
        ›
      </button>

      <div className={styles.hcDotBar}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.hcDot} ${i === index ? styles.hcDotActive : ''}`}
            aria-label={`Слайд ${i + 1}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
}
