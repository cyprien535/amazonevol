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
  ticketCut?: boolean;
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

interface SnakeWaveData {
  centerPath: string;
  ribbonPolygon: string;
  stitchTop: string;
  stitchBottom: string;
}

/**
 * Generates an organic, continuously undulating serpentine wave
 * with saw-tooth zigzag ticket cutter edges and dashed perforation stitch lines.
 */
function buildSnakeWave(
  curviness: number,
  ribbonWidth: number,
  viewW: number,
  viewH: number
): SnakeWaveData {
  const cy = viewH / 2;
  const c = Math.max(5, curviness);
  const room = Math.max(8, cy - ribbonWidth / 2 - 4);
  const a = Math.min(c, room);
  const wavelength = 320;

  const xStart = -wavelength * 1.5;
  const xEnd = viewW + wavelength * 1.5;

  // 1. Center Path for textPath (continuous cubic Bezier harmonic S-curves - pure sinusoidal motion)
  let centerD = `M ${xStart.toFixed(1)} ${cy.toFixed(1)}`;
  for (let x = xStart; x < xEnd; x += wavelength) {
    const x0 = x;
    const x1 = x + wavelength / 2;
    const x2 = x + wavelength;

    centerD += ` C ${(x0 + wavelength * 0.18).toFixed(1)} ${(cy - a).toFixed(1)}, ${(x1 - wavelength * 0.18).toFixed(1)} ${(cy - a).toFixed(1)}, ${x1.toFixed(1)} ${cy.toFixed(1)}`;
    centerD += ` C ${(x1 + wavelength * 0.18).toFixed(1)} ${(cy + a).toFixed(1)}, ${(x2 - wavelength * 0.18).toFixed(1)} ${(cy + a).toFixed(1)}, ${x2.toFixed(1)} ${cy.toFixed(1)}`;
  }

  // 2. Zigzag Ticket Cut Ribbon Polygon (delicate, refined ticket teeth)
  const toothH = Math.min(2.4, ribbonWidth * 0.06);
  const stepPx = 5.5;
  const w2 = ribbonWidth / 2;
  const stitchInset = Math.min(4.5, ribbonWidth * 0.11);

  const topPts: [number, number][] = [];
  const btmPts: [number, number][] = [];
  const stitchTopPts: [number, number][] = [];
  const stitchBtmPts: [number, number][] = [];

  let idx = 0;
  for (let x = xStart; x <= xEnd; x += stepPx) {
    const theta = (2 * Math.PI * (x - xStart)) / wavelength;
    const y = cy - a * Math.sin(theta);
    const slope = -a * (2 * Math.PI / wavelength) * Math.cos(theta);
    const len = Math.sqrt(1 + slope * slope);
    const nx = -slope / len;
    const ny = 1 / len;

    // Alternating tooth: saw-tooth ticket edge
    const tooth = idx % 2 === 0 ? toothH : -toothH;
    const rTop = w2 + tooth;
    const rBtm = w2 + tooth;

    const tx = x - rTop * nx;
    const ty = y - rTop * ny;
    const bx = x + rBtm * nx;
    const by = y + rBtm * ny;

    topPts.push([tx, ty]);
    btmPts.push([bx, by]);

    const stx = x - (w2 - stitchInset) * nx;
    const sty = y - (w2 - stitchInset) * ny;
    const sbx = x + (w2 - stitchInset) * nx;
    const sby = y + (w2 - stitchInset) * ny;

    stitchTopPts.push([stx, sty]);
    stitchBtmPts.push([sbx, sby]);

    idx++;
  }

  // Build closed ribbon path with zigzag cut edges
  let ribbonD = `M ${topPts[0][0].toFixed(1)} ${topPts[0][1].toFixed(1)}`;
  for (let i = 1; i < topPts.length; i++) {
    ribbonD += ` L ${topPts[i][0].toFixed(1)} ${topPts[i][1].toFixed(1)}`;
  }

  // Right edge ticket notch down to bottom
  const lastIdx = topPts.length - 1;
  const midRightX = (topPts[lastIdx][0] + btmPts[lastIdx][0]) / 2 + toothH;
  const midRightY = (topPts[lastIdx][1] + btmPts[lastIdx][1]) / 2;
  ribbonD += ` L ${midRightX.toFixed(1)} ${midRightY.toFixed(1)}`;
  ribbonD += ` L ${btmPts[lastIdx][0].toFixed(1)} ${btmPts[lastIdx][1].toFixed(1)}`;

  // Bottom edge from right to left
  for (let i = btmPts.length - 2; i >= 0; i--) {
    ribbonD += ` L ${btmPts[i][0].toFixed(1)} ${btmPts[i][1].toFixed(1)}`;
  }

  // Left edge ticket notch back to top
  const midLeftX = (topPts[0][0] + btmPts[0][0]) / 2 - toothH;
  const midLeftY = (topPts[0][1] + btmPts[0][1]) / 2;
  ribbonD += ` L ${midLeftX.toFixed(1)} ${midLeftY.toFixed(1)}`;
  ribbonD += ` Z`;

  // Build stitch lines
  let stitchTopD = `M ${stitchTopPts[0][0].toFixed(1)} ${stitchTopPts[0][1].toFixed(1)}`;
  for (let i = 1; i < stitchTopPts.length; i++) {
    stitchTopD += ` L ${stitchTopPts[i][0].toFixed(1)} ${stitchTopPts[i][1].toFixed(1)}`;
  }

  let stitchBtmD = `M ${stitchBtmPts[0][0].toFixed(1)} ${stitchBtmPts[0][1].toFixed(1)}`;
  for (let i = 1; i < stitchBtmPts.length; i++) {
    stitchBtmD += ` L ${stitchBtmPts[i][0].toFixed(1)} ${stitchBtmPts[i][1].toFixed(1)}`;
  }

  return {
    centerPath: centerD,
    ribbonPolygon: ribbonD,
    stitchTop: stitchTopD,
    stitchBottom: stitchBtmD,
  };
}

const buildClassicPath = (
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
      const minDim = Math.min(viewW, viewH);
      const maxR = Math.max(20, minDim / 2 - Math.max(0, ribbonWidth) / 2 - EDGE_PAD);
      const r = Math.min(90 + c * 1.25, maxR);
      return [
        `M ${cx - r} ${cy}`,
        `A ${r} ${r} 0 1 1 ${cx + r} ${cy}`,
        `A ${r} ${r} 0 1 1 ${cx - r} ${cy}`,
        `A ${r} ${r} 0 1 1 ${cx + r} ${cy}`,
        `A ${r} ${r} 0 1 1 ${cx - r} ${cy}`,
      ].join(' ');
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
      return buildSnakeWave(curviness, ribbonWidth, viewW, viewH).centerPath;
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
  curviness = 36,
  fontSize = 22,
  fontWeight = 800,
  letterSpacing = 2.5,
  uppercase = true,
  color = '#ffffff',
  ribbon = true,
  ribbonColor = 'gold',
  ribbonWidth = 66,
  ticketCut = true,
  pauseOnHover = true,
  className = '',
  style = {},
  viewWidth,
  viewHeight,
}: TextLoopProps) {
  const actualViewW = viewWidth ?? (shape === 'circle' ? 500 : DEFAULT_VIEW_W);
  const actualViewH = viewHeight ?? (shape === 'circle' ? 500 : 200);

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

  const isSnakeWaveWithTicketCut = useMemo(
    () => shape === 'wave' && !path && ticketCut && ribbon,
    [shape, path, ticketCut, ribbon]
  );

  const snakeData = useMemo(() => {
    if (!isSnakeWaveWithTicketCut) return null;
    return buildSnakeWave(curviness, ribbonWidth, actualViewW, actualViewH);
  }, [isSnakeWaveWithTicketCut, curviness, ribbonWidth, actualViewW, actualViewH]);

  const d = useMemo(() => {
    if (path) return path;
    if (snakeData) return snakeData.centerPath;
    return buildClassicPath(shape, curviness, ribbonWidth, actualViewW, actualViewH);
  }, [path, snakeData, shape, curviness, ribbonWidth, actualViewW, actualViewH]);

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
        viewBox={`0 0 ${actualViewW} ${actualViewH}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={text}
      >
        <defs>
          {/* Shimmering High-End Gold Gradient */}
          <linearGradient id={`${pathId}-gold`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#996515" />
            <stop offset="18%" stopColor="#C69214" />
            <stop offset="38%" stopColor="#E5A81B" />
            <stop offset="50%" stopColor="#FDE68A" />
            <stop offset="62%" stopColor="#E5A81B" />
            <stop offset="82%" stopColor="#C69214" />
            <stop offset="100%" stopColor="#996515" />
          </linearGradient>

          {/* Deep Luxurious Shadow for 3D Floating Ticket Ribbon */}
          <filter id={`${pathId}-shadow`} x="-20%" y="-25%" width="140%" height="150%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.4" />
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* 1. Ticket Cut Zigzag Ribbon (Snake Silhouette) */}
        {isSnakeWaveWithTicketCut && snakeData ? (
          <g filter={`url(#${pathId}-shadow)`}>
            {/* Solid Gold Ticket Body with Zigzag Cut Edges */}
            <path
              d={snakeData.ribbonPolygon}
              fill={ribbonColor === 'gold' ? `url(#${pathId}-gold)` : ribbonColor}
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="0.8"
            />

            {/* Top Boarding Pass / Ticket Perforation Stitch Line */}
            <path
              d={snakeData.stitchTop}
              fill="none"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="1.4"
              strokeDasharray="5 4"
            />

            {/* Bottom Boarding Pass / Ticket Perforation Stitch Line */}
            <path
              d={snakeData.stitchBottom}
              fill="none"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="1.4"
              strokeDasharray="5 4"
            />
          </g>
        ) : (
          ribbon && (
            <path
              d={d}
              fill="none"
              stroke={ribbonColor === 'gold' ? `url(#${pathId}-gold)` : ribbonColor}
              strokeWidth={ribbonWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#${pathId}-shadow)`}
            />
          )
        )}

        {/* Central Path used by GSAP for measurement and <textPath> text binding */}
        <path
          ref={pathRef}
          id={pathId}
          d={d}
          fill="none"
          stroke="none"
        />

        {/* Hidden measurement text */}
        <text
          ref={measureRef}
          className="invisible pointer-events-none"
          style={textStyle}
          aria-hidden="true"
        >
          {unit}
        </text>

        {/* Scrolling text paths: Head and Tail for continuous looping */}
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
