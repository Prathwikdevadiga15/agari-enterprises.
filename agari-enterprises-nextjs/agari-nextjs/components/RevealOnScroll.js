'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Wraps children and reveals them (fade + rise) as they enter the viewport.
 * stagger: apply a staggered reveal to direct children instead of the wrapper itself.
 */
export default function RevealOnScroll({
  children,
  as: Tag = 'div',
  className = '',
  stagger = false,
  y = 28,
  delay = 0,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger ? Array.from(el.children) : [el];
    gsap.set(targets, { opacity: 0, y });

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: 'power3.out',
        stagger: stagger ? 0.08 : 0,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, y, delay]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
