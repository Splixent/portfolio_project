// MediaCarousel.jsx
import { useEffect, useRef, useState } from 'react';
import useCornerColors from '../lib/useCornerColors';
import styles from '../pages/Desktop1.module.css';

export default function MediaCarousel({ sources = [], width = 667, height = 348, className, youtubeLink, youtubeBadgeSrc = '/youtubeLogo.webp' }) {
  const [index, setIndex] = useState(0);
  const wrapperRef = useRef(null);
  const videoRef = useCornerColors({ sampling: 'edges', sampleSize: 10, stride: 3, preferWeighted: true });

  const current = sources[index];

  // Restart video on slide change
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      try {
        v.currentTime = 0;
    // Ensure autoplay continues on iOS. Loop only if single source.
    v.muted = true;
    v.playsInline = true;
    v.loop = sources.length <= 1;
    v.autoplay = true;
    v.controls = false;
        const play = v.play?.();
        if (play && typeof play.catch === 'function') play.catch(() => {});
      } catch {}
    }
  }, [index, sources.length]);

  // Auto-advance when a video ends if not looping a single source
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onEnded = () => setIndex((i) => (i + 1) % sources.length);
    v.addEventListener('ended', onEnded);
    return () => v.removeEventListener('ended', onEnded);
  }, [sources.length]);

  // Swipe support (simple)
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    let startX = 0, dx = 0, dragging = false;
    const onDown = (e) => { dragging = true; startX = (e.touches?.[0]?.clientX ?? e.clientX); };
    const onMove = (e) => { if (!dragging) return; const x = (e.touches?.[0]?.clientX ?? e.clientX); dx = x - startX; };
    const onUp = () => {
      if (!dragging) return; dragging = false;
      if (dx > 40) setIndex((i) => (i - 1 + sources.length) % sources.length);
      else if (dx < -40) setIndex((i) => (i + 1) % sources.length);
      dx = 0;
    };
    el.addEventListener('pointerdown', onDown); el.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    el.addEventListener('touchstart', onDown); el.addEventListener('touchmove', onMove); el.addEventListener('touchend', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown); el.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      el.removeEventListener('touchstart', onDown); el.removeEventListener('touchmove', onMove); el.removeEventListener('touchend', onUp);
    };
  }, [sources.length]);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.galleryImage} ${className ?? ''}`}
      style={{ position: 'absolute', width, height, pointerEvents: 'auto', overflow: 'hidden' }}
    >
      <video
        ref={videoRef}
        src={current}
        width={width}
        height={height}
        muted
        playsInline
  autoPlay
  loop={sources.length <= 1}
        preload="auto"
        controls={false}
        aria-hidden="true"
        tabIndex={-1}
        onLoadedData={(e) => {
          const v = e.currentTarget;
          try {
            v.currentTime = 0;
            const p = v.play?.();
            if (p && typeof p.catch === 'function') p.catch(() => {});
          } catch {}
        }}
  style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', borderRadius: 'inherit', display: 'block' }}
      />
      {/* Optional YouTube badge/link (shown on hover) */}
      {youtubeLink && (
        <a
          href={youtubeLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.youtubeBadge}
          aria-label="Watch on YouTube"
        >
          <img src={youtubeBadgeSrc} alt="" />
        </a>
      )}
      {/* Arrows */}
      {sources.length > 1 && (
        <div className={styles.carouselNav} aria-hidden="true">
          <button className={styles.carouselBtn} onClick={() => setIndex((i) => (i - 1 + sources.length) % sources.length)}>{'‹'}</button>
          <button className={styles.carouselBtn} onClick={() => setIndex((i) => (i + 1) % sources.length)}>{'›'}</button>
        </div>
      )}
      {/* Dots */}
      {sources.length > 1 && (
        <div className={styles.carouselDots} role="tablist" aria-label="Media slides">
          {sources.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              className={`${styles.carouselDot} ${i === index ? styles.carouselDotActive : ''}`}
              onClick={() => setIndex(i)}
              tabIndex={-1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
