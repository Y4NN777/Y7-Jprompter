'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface InfiniteScrollProps {
  children: ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
}

export function InfiniteScroll({
  children,
  direction = 'left',
  speed = 50,
  className = '',
  pauseOnHover = true,
}: InfiniteScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const isPaused = useRef(false);

  useEffect(() => {
    if (!scrollerRef.current || !containerRef.current) return;

    // Clone children for seamless loop
    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      const duplicate = item.cloneNode(true);
      scrollerRef.current?.appendChild(duplicate);
    });
  }, []);

  useAnimationFrame((time, delta) => {
    if (isPaused.current || !scrollerRef.current) return;

    const moveAmount = (direction === 'left' ? -1 : 1) * speed * (delta / 1000);
    const currentX = x.get();
    const scrollerWidth = scrollerRef.current.scrollWidth / 2;

    let newX = currentX + moveAmount;

    // Reset position for seamless loop
    if (direction === 'left' && newX <= -scrollerWidth) {
      newX = 0;
    } else if (direction === 'right' && newX >= 0) {
      newX = -scrollerWidth;
    }

    x.set(newX);
  });

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && (isPaused.current = true)}
      onMouseLeave={() => pauseOnHover && (isPaused.current = false)}
    >
      <motion.div
        ref={scrollerRef}
        className="flex gap-6 w-max"
        style={{ x }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Vertical infinite scroll
interface VerticalInfiniteScrollProps {
  children: ReactNode;
  direction?: 'up' | 'down';
  speed?: number;
  className?: string;
  height?: number;
}

export function VerticalInfiniteScroll({
  children,
  direction = 'up',
  speed = 30,
  className = '',
  height = 400,
}: VerticalInfiniteScrollProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      const duplicate = item.cloneNode(true);
      scrollerRef.current?.appendChild(duplicate);
    });
  }, []);

  useAnimationFrame((time, delta) => {
    if (!scrollerRef.current) return;

    const moveAmount = (direction === 'up' ? -1 : 1) * speed * (delta / 1000);
    const currentY = y.get();
    const scrollerHeight = scrollerRef.current.scrollHeight / 2;

    let newY = currentY + moveAmount;

    if (direction === 'up' && newY <= -scrollerHeight) {
      newY = 0;
    } else if (direction === 'down' && newY >= 0) {
      newY = -scrollerHeight;
    }

    y.set(newY);
  });

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ height }}
    >
      <motion.div
        ref={scrollerRef}
        className="flex flex-col gap-4"
        style={{ y }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Parallax scroll container
interface ParallaxScrollProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxScroll({ children, speed = 0.5, className = '' }: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollProgress = -rect.top * speed;
      y.set(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, y]);

  return (
    <motion.div ref={ref} className={className} style={{ y: smoothY }}>
      {children}
    </motion.div>
  );
}

// Magnetic hover effect
interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className = '', strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

// Reveal on scroll
interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function RevealOnScroll({ children, className = '', delay = 0 }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView.current) {
          isInView.current = true;
          ref.current?.classList.add('animate-reveal');
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-8 ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionProperty: 'opacity, transform',
        transitionDuration: '800ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}

// Glitch text effect
interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <span
        className="absolute inset-0 text-[var(--accent-primary)] animate-glitch-1"
        aria-hidden
      >
        {text}
      </span>
      <span
        className="absolute inset-0 text-[var(--accent-secondary)] animate-glitch-2"
        aria-hidden
      >
        {text}
      </span>
    </div>
  );
}

// Morphing text
interface MorphingTextProps {
  words: string[];
  className?: string;
  interval?: number;
}

export function MorphingText({ words, className = '', interval = 3000 }: MorphingTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!ref.current) return;

      ref.current.style.opacity = '0';
      ref.current.style.transform = 'translateY(20px)';

      setTimeout(() => {
        if (!ref.current) return;
        indexRef.current = (indexRef.current + 1) % words.length;
        ref.current.textContent = words[indexRef.current];
        ref.current.style.opacity = '1';
        ref.current.style.transform = 'translateY(0)';
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <span
      ref={ref}
      className={`inline-block transition-all duration-300 ${className}`}
    >
      {words[0]}
    </span>
  );
}

// Scramble text effect on hover
interface ScrambleTextProps {
  text: string;
  className?: string;
}

export function ScrambleText({ text, className = '' }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  const scramble = () => {
    if (!ref.current) return;

    let iteration = 0;
    const originalText = text;

    const interval = setInterval(() => {
      if (!ref.current) return;

      ref.current.textContent = originalText
        .split('')
        .map((char, index) => {
          if (index < iteration) return originalText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={scramble}
    >
      {text}
    </span>
  );
}
