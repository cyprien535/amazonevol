import React, { useRef, useEffect, useCallback, ReactNode, CSSProperties } from 'react';

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

export interface ClickSparkProps {
  children?: ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  extraScale?: number;
  className?: string;
  style?: CSSProperties;
}

export default function ClickSpark({
  children,
  sparkColor = '#D4A017',
  sparkSize = 10,
  sparkRadius = 16,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  className = 'relative w-full',
  style,
}: ClickSparkProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationIdRef = useRef<number | null>(null);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        case 'ease-out':
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  const draw = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(dpr, dpr);

      sparksRef.current = sparksRef.current.filter((spark: Spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      ctx.restore();

      if (sparksRef.current.length > 0) {
        animationIdRef.current = requestAnimationFrame(draw);
      } else {
        animationIdRef.current = null;
      }
    },
    [duration, easeFunc, sparkColor, sparkRadius, sparkSize, extraScale]
  );

  const startAnimation = useCallback(() => {
    if (!animationIdRef.current) {
      animationIdRef.current = requestAnimationFrame(draw);
    }
  }, [draw]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const now = performance.now();
      const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
        x,
        y,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now,
      }));

      sparksRef.current.push(...newSparks);
      startAnimation();
    },
    [sparkCount, startAnimation]
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(parent);

    resizeCanvas();

    return () => {
      resizeObserver.disconnect();
      clearTimeout(resizeTimeout);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [resizeCanvas]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={style}
      onClickCapture={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-50 overflow-hidden"
      />
      {children}
    </div>
  );
}
