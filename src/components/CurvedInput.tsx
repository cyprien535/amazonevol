import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useId,
  type CSSProperties,
} from 'react';

const DEG = 180 / Math.PI;

const round2 = (n: number): number => Math.round(n * 100) / 100;

const hexToRgba = (hex: string, alpha: number): string => {
  let h = String(hex).replace('#', '');
  if (h.length === 3)
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  const n = parseInt(h.slice(0, 6), 16);
  if (Number.isNaN(n)) return hex;
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

export type ShadowSize = 'none' | 'sm' | 'md' | 'lg';
export type Theme = 'dark' | 'light';

const SHADOWS: Record<ShadowSize, [number, number, number]> = {
  none: [0, 0, 0],
  sm: [5, 12, 0.3],
  md: [10, 24, 0.4],
  lg: [16, 40, 0.52],
};

interface ThemePalette {
  backgroundColor: string;
  textColor: string;
  placeholderColor: string;
  borderColor: string;
  buttonColor: string;
  buttonTextColor: string;
  shadowColor: string;
}

const THEMES: Record<Theme, ThemePalette> = {
  dark: {
    backgroundColor: '#071526',
    textColor: '#f5f5f5',
    placeholderColor: '#94a3b8',
    borderColor: '#1e293b',
    buttonColor: '#C69214',
    buttonTextColor: '#ffffff',
    shadowColor: '#000000',
  },
  light: {
    backgroundColor: '#ffffff',
    textColor: '#1e293b',
    placeholderColor: '#94a3b8',
    borderColor: '#cbd5e1',
    buttonColor: '#C69214',
    buttonTextColor: '#ffffff',
    shadowColor: '#0f172a',
  },
};

interface Geometry {
  straight: boolean;
  W: number;
  T: number;
  svgH: number;
  R?: number;
  dir?: number;
  uPerLen: number;
  point: (u: number, v: number) => [number, number];
  angleAt: (u: number) => number;
  uFromPoint: (x: number, y?: number) => number;
}

const buildGeometry = (
  width: number,
  bend: number,
  thickness: number,
  pad: number
): Geometry => {
  const W = width;
  const T = thickness;
  const s = Math.max(-W * 0.35, Math.min(bend, W * 0.35));
  const a = Math.abs(s);
  const dir = s >= 0 ? 1 : -1;
  const svgH = T + a + pad * 2;

  if (a < 0.75) {
    const midY = pad + T / 2;
    return {
      straight: true,
      W,
      T,
      svgH,
      uPerLen: 1,
      point: (u, v) => [u, midY + v],
      angleAt: () => 0,
      uFromPoint: (x) => x,
    };
  }

  const R = (W * W * 0.25 + a * a) / (2 * a);
  const cx = W / 2;
  const apexY = pad + T / 2 + (dir > 0 ? 0 : a);
  const cy = apexY + dir * R;
  const phi = Math.asin(Math.min(1, W / (2 * R)));

  return {
    straight: false,
    W,
    T,
    svgH,
    R,
    dir,
    uPerLen: W / (2 * R * phi),
    point: (u, v) => {
      const th = ((u - cx) / cx) * phi;
      const rho = R - dir * v;
      return [cx + rho * Math.sin(th), cy - dir * rho * Math.cos(th)];
    },
    angleAt: (u) => dir * ((u - cx) / cx) * phi * DEG,
    uFromPoint: (x, y = 0) => {
      const th = Math.atan2(x - cx, dir * (cy - y));
      return cx + (th / phi) * cx;
    },
  };
};

const fmt = (g: Geometry, u: number, v: number): string => {
  const [x, y] = g.point(u, v);
  return `${round2(x)} ${round2(y)}`;
};

const edgeSeg = (g: Geometry, uTo: number, v: number, ltr: boolean): string => {
  if (g.straight) return `L ${fmt(g, uTo, v)}`;
  const rho = round2(g.R! - g.dir! * v);
  const sweep = ltr === g.dir! > 0 ? 1 : 0;
  return `A ${rho} ${rho} 0 0 ${sweep} ${fmt(g, uTo, v)}`;
};

const bentRectPath = (
  g: Geometry,
  u0: number,
  u1: number,
  vTop: number,
  vBot: number,
  radius: number
): string => {
  const rc = Math.max(0, Math.min(radius, (vBot - vTop) / 2, (u1 - u0) / 2));
  return [
    `M ${fmt(g, u0 + rc, vTop)}`,
    edgeSeg(g, u1 - rc, vTop, true),
    `Q ${fmt(g, u1, vTop)} ${fmt(g, u1, vTop + rc)}`,
    `L ${fmt(g, u1, vBot - rc)}`,
    `Q ${fmt(g, u1, vBot)} ${fmt(g, u1 - rc, vBot)}`,
    edgeSeg(g, u0 + rc, vBot, false),
    `Q ${fmt(g, u0, vBot)} ${fmt(g, u0, vBot - rc)}`,
    `L ${fmt(g, u0, vTop + rc)}`,
    `Q ${fmt(g, u0, vTop)} ${fmt(g, u0 + rc, vTop)}`,
    'Z',
  ].join(' ');
};

const bentLinePath = (g: Geometry, u0: number, u1: number, v: number): string =>
  `M ${fmt(g, u0, v)} ${edgeSeg(g, u1, v, true)}`;

const SELECTABLE_TYPES = ['text', 'search', 'tel', 'url', 'password'];

interface Layout {
  btnInset: number;
  chipH: number;
  chipW: number;
  iconU: number;
  textStartU: number;
  textEndU: number;
  btnU0: number;
  btnU1: number;
  winLen: number;
}

export interface CurvedInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  buttonText?: string;
  type?: string;
  name?: string;
  ariaLabel?: string;
  theme?: Theme;
  width?: number | string;
  bend?: number;
  height?: number;
  cornerRadius?: number;
  borderWidth?: number;
  fontSize?: number;
  backgroundColor?: string;
  textColor?: string;
  placeholderColor?: string;
  borderColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  iconColor?: string;
  shadowSize?: ShadowSize;
  shadowColor?: string;
  showButton?: boolean;
  showIcon?: boolean;
  icon?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function CurvedInput({
  value,
  defaultValue = '',
  onChange,
  onSubmit,
  placeholder = 'Enter your email',
  buttonText = 'Get Started',
  type = 'email',
  name,
  ariaLabel,
  theme = 'dark',
  width = '100%',
  bend = 20,
  height = 56,
  cornerRadius = 18,
  borderWidth = 1.5,
  fontSize = 15,
  backgroundColor,
  textColor,
  placeholderColor,
  borderColor,
  buttonColor,
  buttonTextColor,
  iconColor,
  shadowSize = 'md',
  shadowColor,
  showButton = true,
  showIcon = true,
  icon,
  className = '',
  style = {},
}: CurvedInputProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const layoutPathId = `ci-text-${uid}`;
  const buttonPathId = `ci-btn-${uid}`;
  const clipId = `ci-clip-${uid}`;

  const rootRef = useRef<HTMLFormElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textRef = useRef<SVGTextElement | null>(null);
  const btnMeasureRef = useRef<SVGTextElement | null>(null);

  const [w, setW] = useState(0);
  const [innerValue, setInnerValue] = useState(defaultValue);
  const [caretIndex, setCaretIndex] = useState(defaultValue.length);
  const [focused, setFocused] = useState(false);
  const [caretU, setCaretU] = useState(0);
  const [scrollLen, setScrollLen] = useState(0);
  const [btnTextW, setBtnTextW] = useState(0);
  const [fontTick, setFontTick] = useState(0);

  const scrollRef = useRef(0);

  const val = value !== undefined ? value : innerValue;
  const display = type === 'password' ? '•'.repeat(val.length) : val;

  const palette = THEMES[theme] ?? THEMES.dark;
  const bgColor = backgroundColor ?? palette.backgroundColor;
  const fgColor = textColor ?? palette.textColor;
  const phColor = placeholderColor ?? palette.placeholderColor;
  const strokeColor = borderColor ?? palette.borderColor;
  const accentColor = buttonColor ?? palette.buttonColor;
  const btnFgColor = buttonTextColor ?? palette.buttonTextColor;
  const shColor = shadowColor ?? palette.shadowColor;

  const pad = Math.ceil(borderWidth / 2) + 6;

  const geom = useMemo<Geometry | null>(() => {
    return w > 2 ? buildGeometry(w, bend, height, pad) : null;
  }, [w, bend, height, pad]);

  const layout = useMemo<Layout | null>(() => {
    if (!geom) return null;
    const T = height;
    const btnInset = Math.max(5, borderWidth + 4);
    const chipH = Math.min(32, Math.max(16, T * 0.36));
    const chipW = chipH * 1.25;
    const iconU = 20 + chipW / 2;
    const textStartU = showIcon ? 20 + chipW + 12 : 20;
    const btnW = showButton
      ? Math.max(btnTextW + fontSize * 2.5, T * 1.35)
      : 0;
    const btnU1 = geom.W - btnInset;
    const btnU0 = btnU1 - btnW;
    const textEndU = Math.max(
      textStartU + 20,
      showButton ? btnU0 - 12 : geom.W - 20
    );
    const winLen = (textEndU - textStartU) / geom.uPerLen;
    return {
      btnInset,
      chipH,
      chipW,
      iconU,
      textStartU,
      textEndU,
      btnU0,
      btnU1,
      winLen,
    };
  }, [geom, height, borderWidth, showIcon, showButton, btnTextW, fontSize]);

  useEffect(() => {
    void fontTick;

    if (btnMeasureRef.current) {
      const bw = btnMeasureRef.current.getComputedTextLength();
      if (Math.abs(btnTextW - bw) > 0.5) setBtnTextW(bw);
    }

    if (!geom || !layout) return;

    const textEl = textRef.current;
    const caret = Math.min(caretIndex, display.length);
    let caretLen = 0;
    let totalLen = 0;
    if (textEl && display.length) {
      try {
        totalLen = textEl.getSubStringLength(0, display.length);
        caretLen = caret > 0 ? textEl.getSubStringLength(0, caret) : 0;
      } catch {
        totalLen = 0;
        caretLen = 0;
      }
    }
    let next = scrollRef.current;
    if (caretLen - next > layout.winLen - 2) next = caretLen - layout.winLen + 2;
    if (caretLen - next < 0) next = caretLen;
    if (totalLen - next < layout.winLen)
      next = Math.max(0, totalLen - layout.winLen);
    next = Math.max(0, next);
    if (Math.abs(next - scrollRef.current) > 0.5) {
      scrollRef.current = next;
      setScrollLen(next);
    }
    setCaretU(layout.textStartU + (caretLen - next) * geom.uPerLen);
  }, [display, caretIndex, geom, layout, fontTick, btnTextW]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const cw = entries[0]?.contentRect?.width ?? el.clientWidth;
      setW(Math.round(cw));
    });
    ro.observe(el);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        setFontTick((t) => t + 1);
      }).catch(() => {});
    }

    return () => {
      ro.disconnect();
    };
  }, []);

  const commitValue = (v: string) => {
    if (value === undefined) setInnerValue(v);
    onChange?.(v);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    commitValue(target.value);
    setCaretIndex(target.selectionStart ?? target.value.length);
  };

  const handleSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setCaretIndex(target.selectionStart ?? target.value.length);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onSubmit?.(val);
  };

  const handleSurfaceClick = (e: React.MouseEvent) => {
    const input = inputRef.current;
    if (!input) return;
    let idx = display.length;
    const svg = svgRef.current;
    if (svg && geom && layout && textRef.current && display.length) {
      try {
        const ctm = svg.getScreenCTM();
        if (!ctm) throw new Error('missing screen CTM');
        const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(
          ctm.inverse()
        );
        const target =
          scrollRef.current +
          (geom.uFromPoint(pt.x, pt.y) - layout.textStartU) / geom.uPerLen;
        let best = 0;
        let bestDist = Infinity;
        for (let i = 0; i <= display.length; i++) {
          const li = i === 0 ? 0 : textRef.current.getSubStringLength(0, i);
          const d = Math.abs(li - target);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        }
        idx = best;
      } catch {
        idx = display.length;
      }
    }
    input.focus();
    try {
      input.setSelectionRange(idx, idx);
    } catch {
      // selection unsupported for input type
    }
    setCaretIndex(idx);
  };

  const handleButtonKeydown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const safeType = SELECTABLE_TYPES.includes(type) ? type : 'text';
  const inputModeValue =
    type === 'email'
      ? 'email'
      : type === 'number'
      ? 'decimal'
      : undefined;

  const svgStyle: CSSProperties | undefined = useMemo(() => {
    const shadow = SHADOWS[shadowSize];
    if (!shadow || shadowSize === 'none') return undefined;
    return {
      filter: `drop-shadow(0 ${shadow[0]}px ${shadow[1]}px ${hexToRgba(
        shColor,
        shadow[2]
      )})`,
    };
  }, [shadowSize, shColor]);

  const rootStyle: CSSProperties = useMemo(
    () => ({
      width: typeof width === 'number' ? `${width}px` : width,
      ...style,
    }),
    [width, style]
  );

  const content = useMemo(() => {
    if (!geom || !layout) return null;

    const T = height;
    const vBase = fontSize * 0.34;
    const scrollU = scrollLen * geom.uPerLen;
    const bandPath = bentRectPath(geom, 0, geom.W, -T / 2, T / 2, cornerRadius);
    const layoutPathD = bentLinePath(geom, layout.textStartU - scrollU, geom.W, vBase);
    const clipPathD = bentRectPath(
      geom,
      layout.textStartU - 6,
      layout.textEndU + 8,
      -T / 2,
      T / 2,
      0
    );

    const chipFill = iconColor || accentColor;
    const { chipW, chipH } = layout;
    const ew = chipW * 0.5;
    const eh = chipH * 0.5;
    const sw = Math.max(1.1, chipH * 0.075);
    const [ix, iy] = geom.point(layout.iconU, 0);
    const iconAngle = geom.angleAt(layout.iconU);

    const [caretX, caretY] = geom.point(caretU, 0);
    const caretAngle = geom.angleAt(caretU);
    const caretH = Math.min(T * 0.58, fontSize * 1.45);

    const btnH = T - layout.btnInset * 2;
    const buttonPath = showButton
      ? bentRectPath(
          geom,
          layout.btnU0,
          layout.btnU1,
          -T / 2 + layout.btnInset,
          T / 2 - layout.btnInset,
          Math.min(cornerRadius * 0.72, btnH / 2)
        )
      : '';
    const buttonTextPathD = showButton
      ? bentLinePath(geom, layout.btnU0, layout.btnU1, vBase)
      : '';

    return {
      vBase,
      bandPath,
      layoutPathD,
      clipPathD,
      chipFill,
      chipW,
      chipH,
      ew,
      eh,
      sw,
      ix,
      iy,
      iconAngle,
      caretX,
      caretY,
      caretAngle,
      caretH,
      buttonPath,
      buttonTextPathD,
    };
  }, [geom, layout, height, fontSize, cornerRadius, scrollLen, iconColor, accentColor, caretU, showButton]);

  return (
    <form
      ref={rootRef}
      className={`block relative m-0 w-full max-w-full ${className}`}
      style={rootStyle}
      noValidate
      onSubmit={handleSubmit}
    >
      {geom && content && (
        <svg
          ref={svgRef}
          className="block w-full h-auto overflow-visible cursor-text select-none"
          width={geom.W}
          height={round2(geom.svgH)}
          viewBox={`0 0 ${geom.W} ${round2(geom.svgH)}`}
          style={svgStyle}
          onPointerDown={(e) => e.preventDefault()}
          onClick={handleSurfaceClick}
        >
          <defs>
            <clipPath id={clipId}>
              <path d={content.clipPathD} />
            </clipPath>
          </defs>

          {/* Focus outer ring */}
          <path
            className="transition-opacity duration-200 ease-in-out pointer-events-none"
            style={{ opacity: focused ? 0.35 : 0 }}
            d={content.bandPath}
            fill="none"
            stroke={accentColor}
            strokeWidth={borderWidth + 6}
          />

          {/* Main Arched Band */}
          <path
            d={content.bandPath}
            fill={bgColor}
            stroke={strokeColor}
            strokeWidth={borderWidth}
          />

          {/* Curve text guide */}
          <path id={layoutPathId} d={content.layoutPathD} fill="none" />

          {/* Leading Icon Chip */}
          {showIcon && (
            <g
              transform={`translate(${round2(content.ix)} ${round2(
                content.iy
              )}) rotate(${round2(content.iconAngle)})`}
              aria-hidden="true"
            >
              {icon ? (
                icon
              ) : (
                <>
                  <rect
                    x={-content.chipW / 2}
                    y={-content.chipH / 2}
                    width={content.chipW}
                    height={content.chipH}
                    rx={content.chipH * 0.28}
                    fill={content.chipFill}
                  />
                  <rect
                    x={-content.ew / 2}
                    y={-content.eh / 2}
                    width={content.ew}
                    height={content.eh}
                    rx={1.4}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={content.sw}
                    strokeLinejoin="round"
                  />
                  <path
                    d={`M ${round2(-content.ew / 2)} ${round2(
                      -content.eh / 2 + content.sw * 0.4
                    )} L 0 ${round2(content.eh * 0.14)} L ${round2(
                      content.ew / 2
                    )} ${round2(-content.eh / 2 + content.sw * 0.4)}`}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={content.sw}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </>
              )}
            </g>
          )}

          {/* Input Text & Caret (Clipped to bar) */}
          <g clipPath={`url(#${clipId})`}>
            <text
              ref={textRef}
              style={{ fontSize: `${fontSize}px`, fontWeight: 500 }}
              fill={fgColor}
              xmlSpace="preserve"
              aria-hidden="true"
            >
              <textPath href={`#${layoutPathId}`}>{display}</textPath>
            </text>

            {!display && placeholder && (
              <text
                style={{ fontSize: `${fontSize}px`, fontWeight: 400 }}
                fill={phColor}
                xmlSpace="preserve"
                aria-hidden="true"
              >
                <textPath href={`#${layoutPathId}`}>{placeholder}</textPath>
              </text>
            )}

            {focused && (
              <g
                key={`${display}-${Math.min(caretIndex, display.length)}`}
                transform={`translate(${round2(content.caretX)} ${round2(
                  content.caretY
                )}) rotate(${round2(content.caretAngle)})`}
              >
                <line
                  y1={-content.caretH / 2}
                  y2={content.caretH / 2}
                  stroke={accentColor || fgColor}
                  strokeWidth="1.75"
                  strokeLinecap="round"
                >
                  <animate
                    attributeName="opacity"
                    values="1;0"
                    dur="1.06s"
                    calcMode="discrete"
                    repeatCount="indefinite"
                  />
                </line>
              </g>
            )}
          </g>

          {/* Curved Submit Button */}
          {showButton && (
            <g
              className="group outline-none cursor-pointer select-none"
              role="button"
              tabIndex={0}
              aria-label={buttonText}
              onClick={(e) => {
                e.stopPropagation();
                handleSubmit();
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onKeyDown={handleButtonKeydown}
            >
              <path
                className="transition-[filter,opacity] duration-200 ease-in-out group-hover:brightness-110 group-active:brightness-95"
                d={content.buttonPath}
                fill={accentColor}
              />
              <path id={buttonPathId} d={content.buttonTextPathD} fill="none" />
              <text
                fill={btnFgColor}
                textAnchor="middle"
                className="pointer-events-none"
                style={{ fontSize: `${fontSize}px`, fontWeight: 600 }}
              >
                <textPath href={`#${buttonPathId}`} startOffset="50%">
                  {buttonText}
                </textPath>
              </text>
            </g>
          )}

          {/* Measurement text for button label */}
          <text
            ref={btnMeasureRef}
            style={{ fontSize: `${fontSize}px`, fontWeight: 600 }}
            x="-9999"
            y="-9999"
            visibility="hidden"
            aria-hidden="true"
          >
            {buttonText}
          </text>
        </svg>
      )}

      {/* Accessible native input element for keyboard, touch & screen readers */}
      <input
        ref={inputRef}
        className="absolute inset-0 bg-transparent opacity-0 m-0 p-0 border-0 outline-none w-full h-full text-transparent text-base caret-transparent pointer-events-none"
        type={safeType}
        inputMode={inputModeValue}
        name={name}
        value={val}
        onChange={handleInputChange}
        onSelect={handleSelect}
        onKeyUp={handleSelect}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={ariaLabel || placeholder || 'Newsletter email input'}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />
    </form>
  );
}
