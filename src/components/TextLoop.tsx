import React, { useRef, useState, useEffect, useId, useMemo, CSSProperties } from 'react';
import { gsap } from 'gsap';

export type TextLoopShape = 'wave' | 'circle' | 'infinity' | 'arch' | 'line';
export type TextLoopDirection = 'forward' | 'reverse';

export interface TextLoopProps {
  text?: string;
  shape?: TextLoopShape;
  path?: string;
  speed?: number;
  direction?: TextLoopDirection;
  separator?: string;
  curviness?: number;
  fontSize?: number;
  fontWeight?: number | string;
  letterSpacing?: number;
  uppercase?: boolean;
  color?: string;
  ribbon?: boolean;
  ribbonColor?: string;
  ribbonWidth?: number;
  pauseOnHover?: boolean;
  className?: string;
  style?: CSSProperties;
  viewWidth?: number;
  viewHeight?: number;
}

interface Metrics {
  length: number;
  reps: number;
}

const DEFAULT_VIEW_W = 1200;
const DEFAULT_VIEW_H = 520;
const EDGE_PAD = 6;

const buildPath = (
  shape: TextLoopShape,
  curviness: number,
  ribbonWidth: number,
  viewW: number,
  viewH: number
): string => {
  const cx = viewW / 2;
  const cy = viewH / 2;
  const c = Math.max(0, curviness);
  const room = Math.max(20, cy - Math.max(0, ribbonWidth) / 2 - EDGE_PAD);

  switch (shape) {
    case 'circle': {
      const r = Math.min(90 + c * 0.95, room);
      return `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} Z`;
    }
    case 'infinity': {
      const r = 150 + c * 1.4;
      const h = Math.min(60 + c * 0.95, room);
      return [
        `M ${cx} ${cy}`,
        `C ${cx + r * 0.55} ${cy - h} ${cx + r} ${cy - h} ${cx + r} ${cy}`,
        `C ${cx + r} ${cy + h} ${cx + r * 0.55} ${cy + h} ${cx} ${cy}`,
        `C ${cx - r * 0.55} ${cy - h} ${cx - r} ${cy - h} ${cx - r} ${cy}`,
        `C ${cx - r} ${cy + h} ${cx - r * 0.55} ${cy + h} ${cx} ${cy}`,
        'Z',
      ].join(' ');
    }
    case 'arch': {
      const rise = Math.min(120 + c * 1.1, room * 2);
      return `M 120 ${cy + rise / 2} Q ${cx} ${cy - rise * 1.5} ${viewW - 120} ${cy + rise / 2}`;
    }
    case 'line':
      return `M -320 ${cy} L ${viewW + 320} ${cy}`;
    case 'wave':
    default: {
      const a = Math.min(c * 2.2, room * 2);
      const step = 280;
      let pathStr = `M -${step} ${cy} Q -${step / 2} ${cy - a} 0 ${cy}`;
      for (let x = step; x <= viewW + step; x += step) {
        pathStr += ` T ${x} ${cy}`;
      }
      return pathStr;
    }
  }
};

export default function TextLoop({
  text = 'Amazone Airlines ✦ Prestige & Excellence',
  shape = 'wave',
  path,
  speed = 90,
  direction = 'forward',
  separator = '✦',
  curviness = 90,
  fontSize = 46,
  fontWeight = 800,
  letterSpacing = 2,
  uppercase = true,
  color = '#ffffff',
  ribbon = true,
  ribbonColor = '#C69214',
  ribbonWidth = 86,
  pauseOnHover = true,
  className = '',
  style = {},
  viewWidth = DEFAULT_VIEW_W,
  viewHeight = DEFAULT_VIEW_H,
}: TextLoopProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const measureRef = useRef<SVGTextElement | null>(null);
  const headRef = useRef<SVGTextPathElement | null>(null);
  const tailRef = useRef<SVGTextPathElement | null>(null);

  const [metrics, setMetrics] = useState<Metrics>({ length: 0, reps: 1 });

  const rawId = useId();
  const pathId = useMemo(
    () => `text-loop-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`,
    [rawId]
  );

  const d = useMemo(
    () => path || buildPath(shape, curviness, ribbonWidth, viewWidth, viewHeight),
    [path, shape, curviness, ribbonWidth, viewWidth, viewHeight]
  );

  const unit = useMemo(() => {
    const base = uppercase ? String(text).toUpperCase() : String(text);
    const gap = separator ? `\u00A0${separator}\u00A0` : '\u00A0\u00A0\u00A0';
    return `${base}${gap}`;
  }, [text, uppercase, separator]);

  const textStyle = useMemo<CSSProperties>(
    () => ({
      fontSize: `${fontSize}px`,
      fontWeight,
      letterSpacing: `${letterSpacing}px`,
      fontFamily: 'inherit',
    }),
    [fontSize, fontWeight, letterSpacing]
  );

  const loopText = useMemo(() => unit.repeat(metrics.reps), [unit, metrics.reps]);
  const fitLength = useMemo(() => metrics.length || undefined, [metrics.length]);

  useEffect(() => {
    let cancelled = false;

    const measureOnce = () => {
      if (cancelled) return;
      const pathEl = pathRef.current;
      const measureEl = measureRef.current;
      if (!pathEl || !measureEl) return;

      let length = 0;
      let unitWidth = 0;
      try {
        length = pathEl.getTotalLength();
        unitWidth = measureEl.getComputedTextLength();
      } catch {
        return;
      }
      if (!length) return;

      const reps = unitWidth > 0 ? Math.max(1, Math.round(length / unitWidth)) : 1;
      setMetrics((prev) =>
        prev.length === length && prev.reps === reps ? prev : { length, reps }
      );
    };

    measureOnce();
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(measureOnce).catch(() => {});
    }

    return () => {
      cancelled = true;
    };
  }, [d, unit, fontSize, fontWeight, letterSpacing]);

  useEffect(() => {
    const { length } = metrics;
    const head = headRef.current;
    const tail = tailRef.current;
    if (!head || !tail || !length) return;

    const apply = (offset: number) => {
      const partner = offset >= 0 ? offset - length : offset + length;
      head.setAttribute('startOffset', String(offset));
      tail.setAttribute('startOffset', String(partner));
    };

    apply(0);

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || speed <= 0) return;

    const state = { offset: 0 };
    const tween = gsap.to(state, {
      offset: direction === 'reverse' ? -length : length,
      duration: length / speed,
      ease: 'none',
      repeat: -1,
      onUpdate: () => apply(state.offset),
    });

    const root = rootRef.current;
    const pause = () => tween.pause();
    const resume = () => tween.resume();

    if (pauseOnHover && root) {
      root.addEventListener('pointerenter', pause);
      root.addEventListener('pointerleave', resume);
    }

    return () => {
      tween.kill();
      if (pauseOnHover && root) {
        root.removeEventListener('pointerenter', pause);
        root.removeEventListener('pointerleave', resume);
      }
    };
  }, [metrics, speed, direction, pauseOnHover]);

  return (
    <div
      ref={rootRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={style}
    >
      <svg
        className="block w-full h-auto"
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={text}
      >
        <defs>
          <linearGradient id={`${pathId}-gold`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8860B" />
            <stop offset="30%" stopColor="#C69214" />
            <stop offset="70%" stopColor="#E5A81B" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
          <filter id={`${pathId}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#000000" floodOpacity="0.35" />
          </filter>
        </defs>

        <path
          ref={pathRef}
          id={pathId}
          d={d}
          fill="none"
          stroke={ribbon ? (ribbonColor === 'gold' ? `url(#${pathId}-gold)` : ribbonColor) : 'none'}
          strokeWidth={ribbon ? ribbonWidth : 0}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${pathId}-shadow)`}
        />

        <text
          ref={measureRef}
          className="invisible pointer-events-none"
          style={textStyle}
          aria-hidden="true"
        >
          {unit}
        </text>

        <text
          className="select-none"
          style={textStyle}
          fill={color}
          dominantBaseline="central"
          aria-hidden="true"
        >
          <textPath
            ref={headRef}
            href={`#${pathId}`}
            startOffset="0"
            textLength={fitLength}
            lengthAdjust="spacing"
          >
            {loopText}
          </textPath>
        </text>

        <text
          className="select-none"
          style={textStyle}
          fill={color}
          dominantBaseline="central"
          aria-hidden="true"
        >
          <textPath
            ref={tailRef}
            href={`#${pathId}`}
            startOffset="0"
            textLength={fitLength}
            lengthAdjust="spacing"
          >
            {loopText}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
