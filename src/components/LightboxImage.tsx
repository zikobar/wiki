import React, {useEffect, useState} from 'react';

type Stage = 'closed' | 'opening' | 'open' | 'closing';

type Props = {
  src: string;
  alt?: string;
  style?: React.CSSProperties;    // стили мини-картинки в тексте
  maxWidthVW?: number;            // макс. ширина в зуме, по умолч. 90
  maxHeightVH?: number;           // макс. высота в зуме, по умолч. 90
  durationMs?: number;            // длительность анимации, по умолч. 220
  easing?: string;                // функция сглаживания, по умолч. 'cubic-bezier(.2,.8,.2,1)'
};

const LightboxImage: React.FC<Props> = ({
  src,
  alt = '',
  style,
  maxWidthVW = 90,
  maxHeightVH = 90,
  durationMs = 350,
  easing = 'cubic-bezier(.2,.8,.2,1)',
}) => {
  const [stage, setStage] = useState<Stage>('closed');
  const visible = stage !== 'closed';

  // Открыть с плавной анимацией: сначала отрисовываем «начальное» состояние,
  // затем в следующий кадр переключаемся в target (будет плавный переход).
  const open = () => {
    setStage('opening');
    requestAnimationFrame(() => setStage('open'));
  };

  // Закрыть с плавной анимацией: ждём завершения и размонтируем
  const close = () => {
    setStage('closing');
    setTimeout(() => setStage('closed'), durationMs);
  };

  // ESC для закрытия и блокировка скролла страницы
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = original;
    };
  }, [visible]);

  return (
    <>
      {/* мини-картинка */}
      <img
        src={src}
        alt={alt}
        style={{ cursor: 'zoom-in', borderRadius: 8, ...style }}
        onClick={open}
      />

      {/* лайтбокс-оверлей */}
      {visible && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            // плавное появление/исчезновение фона
            opacity: stage === 'open' ? 1 : 0,
            transition: `opacity ${durationMs}ms ${easing}`,
          }}
        >
          {/* зум-картинка */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: `${maxWidthVW}vw`,
              maxHeight: `${maxHeightVH}vh`,
              objectFit: 'contain',
              borderRadius: 10,
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
              cursor: 'zoom-out',
              // плавный scale + лёгкий fade
              transform: stage === 'open' ? 'scale(1)' : 'scale(0.96)',
              opacity: stage === 'open' ? 1 : 0.92,
              transition: `transform ${durationMs}ms ${easing}, opacity ${durationMs}ms ${easing}`,
              willChange: 'transform, opacity',
            }}
          />

          {/* крестик */}
          <button
            aria-label="Закрыть"
            onClick={close}
            style={{
              position: 'fixed',
              top: 12,
              right: 16,
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255,255,255,0.18)',
              color: '#fff',
              fontSize: 22,
              lineHeight: 1,
              cursor: 'pointer',
              transition: `background ${durationMs}ms ${easing}`,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
};

export default LightboxImage;
