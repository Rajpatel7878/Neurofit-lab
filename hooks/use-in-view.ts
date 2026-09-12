import { useEffect, useRef, useState } from 'react';

/**
 * Returns `true` once the element enters the viewport.
 * Re-fires only once (does NOT reset when element leaves viewport).
 */
export function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // fire once
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/**
 * Animates a number from 0 to `target` over `duration` ms.
 * Only starts when `enabled` is true.
 */
export function useCountUp(target: number, duration = 1800, enabled = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target, duration, enabled]);

  return value;
}
