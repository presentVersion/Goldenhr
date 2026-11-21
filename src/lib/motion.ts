import { gsap } from 'gsap';

export const MOTION_TOKENS = {
  dur: {
    instant: 0.12,
    fast: 0.20,
    base: 0.35,
    slow: 0.60,
    hero: 0.90,
  },
  ease: {
    enter: 'power3.out',
    exit: 'power2.in',
    pop: 'back.out(1.7)',
    sheet: 'power4.out',
    linear: 'none',
    breathe: 'sine.inOut',
  },
  stagger: {
    list: 0.06,
  },
  distance: {
    small: 12,
    base: 24,
    large: 48,
  },
} as const;

export const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Screen enter animation according to Section 4.3:
 * Container: opacity 0->1, y distance.base->0, dur.base, ease.enter.
 * Children with .motion-item stagger stagger.list with the same tween.
 * Reduced motion: opacity only, dur.fast.
 */
export const animateScreenEnter = (container: HTMLElement | null) => {
  if (!container) return;
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.fromTo(
      container,
      { opacity: 0, y: MOTION_TOKENS.distance.base },
      {
        opacity: 1,
        y: 0,
        duration: MOTION_TOKENS.dur.base,
        ease: MOTION_TOKENS.ease.enter,
      }
    );

    const items = container.querySelectorAll('.motion-item');
    if (items.length > 0) {
      // Max 4 items staggered as per Section 4.4 Sequencing rule
      const staggerItems = Array.from(items).slice(0, 4);
      gsap.fromTo(
        staggerItems,
        { opacity: 0, y: MOTION_TOKENS.distance.small },
        {
          opacity: 1,
          y: 0,
          duration: MOTION_TOKENS.dur.base,
          ease: MOTION_TOKENS.ease.enter,
          stagger: MOTION_TOKENS.stagger.list,
          delay: 0.05,
        }
      );
    }
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.fromTo(
      container,
      { opacity: 0 },
      { opacity: 1, duration: MOTION_TOKENS.dur.fast }
    );
  });
};

/**
 * Pop animation for badges, confirmations, SOS release:
 * scale 0.6->1, opacity 0->1, dur.base, ease.pop.
 */
export const animatePop = (element: HTMLElement | null) => {
  if (!element) return;
  if (isReducedMotion()) {
    gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: MOTION_TOKENS.dur.fast });
    return;
  }
  gsap.fromTo(
    element,
    { scale: 0.6, opacity: 0 },
    { scale: 1, opacity: 1, duration: MOTION_TOKENS.dur.base, ease: MOTION_TOKENS.ease.pop }
  );
};

/**
 * Card rise animation:
 * opacity 0->1, y distance.small->0, scale 0.98->1, dur.base, ease.enter.
 */
export const animateCardRise = (element: HTMLElement | null) => {
  if (!element) return;
  if (isReducedMotion()) {
    gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: MOTION_TOKENS.dur.fast });
    return;
  }
  gsap.fromTo(
    element,
    { opacity: 0, y: MOTION_TOKENS.distance.small, scale: 0.98 },
    { opacity: 1, y: 0, scale: 1, duration: MOTION_TOKENS.dur.base, ease: MOTION_TOKENS.ease.enter }
  );
};

/**
 * SOS breathe animation:
 * scale 1->1.04->1, repeat -1 yoyo, dur 1.6s, ease.breathe.
 * Disabled under reduced motion.
 */
export const createSOSBreathe = (element: HTMLElement | null) => {
  if (!element || isReducedMotion()) return null;
  return gsap.to(element, {
    scale: 1.04,
    duration: 1.6,
    repeat: -1,
    yoyo: true,
    ease: MOTION_TOKENS.ease.breathe,
  });
};

/**
 * Alert takeover icon shake:
 * rotate -6->6->0 three times at dur.instant once on open only.
 * Reduced motion: no shake.
 */
export const animateTakeoverShake = (element: HTMLElement | null) => {
  if (!element || isReducedMotion()) return;
  gsap.fromTo(
    element,
    { rotation: -6 },
    {
      rotation: 6,
      duration: MOTION_TOKENS.dur.instant,
      repeat: 3,
      yoyo: true,
      ease: 'power1.inOut',
      onComplete: () => {
        gsap.set(element, { rotation: 0 });
      },
    }
  );
};
