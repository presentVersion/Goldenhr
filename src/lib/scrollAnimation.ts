import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

let lenisInstance: Lenis | null = null;

export const initLenisAndGsap = (): Lenis | null => {
  if (typeof window === 'undefined') return null;
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  });

  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
};

export const animateScrollFloat = (container: HTMLElement | null) => {
  if (!container || typeof window === 'undefined') return;

  const targets = container.querySelectorAll<HTMLElement>(
    '.scroll-float, .mivo-card, .glass-specular, [data-scroll-float="true"]'
  );

  targets.forEach((el) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 40,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );
  });
};

export const animateHeroEntrance = (container: HTMLElement | null) => {
  if (!container || typeof window === 'undefined') return;

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  const eyebrow = container.querySelector('.hero-eyebrow');
  const title = container.querySelector('.hero-title');
  const subtitle = container.querySelector('.hero-subtitle');
  const orb = container.querySelector('.hero-orb');
  const ctas = container.querySelectorAll('.hero-cta');

  if (eyebrow) {
    tl.fromTo(eyebrow, { opacity: 0, y: -20, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6 });
  }
  if (title) {
    tl.fromTo(title, { opacity: 0, y: 30, filter: 'blur(12px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, '-=0.4');
  }
  if (subtitle) {
    tl.fromTo(subtitle, { opacity: 0, y: 20, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6 }, '-=0.5');
  }
  if (orb) {
    tl.fromTo(orb, { opacity: 0, scale: 0.9, filter: 'blur(16px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1 }, '-=0.6');
  }
  if (ctas && ctas.length > 0) {
    tl.fromTo(ctas, { opacity: 0, y: 25, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, stagger: 0.15 }, '-=0.5');
  }
};
