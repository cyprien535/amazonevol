import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { Sparkles, Zap, ShieldCheck, Clock, Luggage, Award, Armchair } from 'lucide-react';
import { motion } from 'motion/react';

export default function Advantages() {
  const steps = [
    {
      number: '01',
      stepIndex: 0,
      title: 'Gain de temps décisif',
      icon: Zap,
      description:
        'Reliez Cotonou à Parakou en seulement 1h15 de vol direct, contre 8 à 10 heures d’épreuve sur la route RNIE 2.',
    },
    {
      number: '02',
      stepIndex: 1,
      title: '3 rotations quotidiennes',
      icon: Clock,
      description:
        'Des vols programmés le matin, le midi et en fin de journée entre Cotonou-Cadjehoun et Parakou-Tourou pour s’adapter à vos obligations.',
    },
    {
      number: '03',
      stepIndex: 2,
      title: 'Sécurité & conformité ANAC',
      icon: ShieldCheck,
      description:
        'Appareils suivis sous programmes de maintenance stricts et équipages qualifiés formés aux plus hauts standards aéronautiques.',
    },
    {
      number: '04',
      stepIndex: 3,
      title: 'Confort en cabine pressurisée',
      icon: Armchair,
      description:
        'Sièges ergonomiques, climatisation régulée et service d’accueil avec rafraîchissements locaux et eau minérale servis en vol.',
    },
    {
      number: '05',
      stepIndex: 4,
      title: 'Franchise bagages transparente',
      icon: Luggage,
      description:
        '23 kg en soute et 7 kg en cabine inclus sur l’ensemble de nos billets. Restitution rapide des bagages dès votre arrivée.',
    },
    {
      number: '06',
      stepIndex: 5,
      title: 'Services d’affaires & VIP',
      icon: Award,
      description:
        'Accès aux salons d’attente dédiés, procédures au sol fluides et solutions d’affrètement personnalisé pour délégations et entreprises.',
    },
  ];

  const leftSteps = [steps[0], steps[2], steps[4]];
  const rightSteps = [steps[1], steps[3], steps[5]];

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [svgDimensions, setSvgDimensions] = useState<{ width: number; height: number }>({ width: 1000, height: 1000 });

  // Dynamically compute exact pixel-perfect connection paths anchored directly to the card edges
  const calculateConnections = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newPaths: string[] = [];

    setSvgDimensions({
      width: Math.ceil(containerRect.width),
      height: Math.ceil(containerRect.height),
    });

    const isDesktop = window.innerWidth >= 1024;

    for (let i = 0; i < 5; i++) {
      const cardA = cardRefs.current[i];
      const cardB = cardRefs.current[i + 1];
      if (!cardA || !cardB) continue;

      const rectA = cardA.getBoundingClientRect();
      const rectB = cardB.getBoundingClientRect();

      let x1 = 0;
      let y1 = 0;
      let x2 = 0;
      let y2 = 0;

      if (isDesktop) {
        // Desktop Zig-Zag:
        // Even indices (0->1, 2->3, 4->5): from Left Column to Right Column
        // Odd indices (1->2, 3->4): from Right Column back to Left Column
        if (i % 2 === 0) {
          x1 = rectA.right - containerRect.left;
          y1 = rectA.top + rectA.height * 0.5 - containerRect.top;
          x2 = rectB.left - containerRect.left;
          y2 = rectB.top + rectB.height * 0.5 - containerRect.top;
        } else {
          x1 = rectA.left - containerRect.left;
          y1 = rectA.top + rectA.height * 0.55 - containerRect.top;
          x2 = rectB.right - containerRect.left;
          y2 = rectB.top + rectB.height * 0.45 - containerRect.top;
        }

        const midX = (x1 + x2) / 2;
        // Smooth Cubic Bézier starting horizontally from card A and entering card B smoothly
        const d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
        newPaths.push(d);
      } else {
        // Mobile single-column: direct vertical link from bottom of card A to top of card B
        x1 = rectA.left + rectA.width * 0.5 - containerRect.left;
        y1 = rectA.bottom - containerRect.top;
        x2 = rectB.left + rectB.width * 0.5 - containerRect.left;
        y2 = rectB.top - containerRect.top;

        const d = `M ${x1} ${y1} L ${x2} ${y2}`;
        newPaths.push(d);
      }
    }

    setPaths(newPaths);
  };

  useLayoutEffect(() => {
    calculateConnections();
    const handleResize = () => calculateConnections();
    window.addEventListener('resize', handleResize);

    const observer = new ResizeObserver(() => calculateConnections());
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  // Re-run once after short tick to ensure DOM paints properly
  useEffect(() => {
    const t = setTimeout(calculateConnections, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="avantages" className="py-24 bg-white relative overflow-hidden">
      {/* Background soft grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#0A4D80_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#0A4D80]/10 text-[#0A4D80] text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#C69214]" />
            <span>Nos engagements</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-dark tracking-tight [text-wrap:balance]">
            Pourquoi voyager avec Amazone Airlines ?
          </h2>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Une solution de transport aérien pensée pour les professionnels, délégations et familles qui privilégient la rapidité, la sécurité et la sérénité.
          </p>
        </div>

        {/* Desktop Zig-Zag Staggered Layout with Pixel-Perfect Connectors */}
        <div ref={containerRef} className="relative">
          {/* Dynamic SVG Connection Overlay: Anchor points are physically locked to the cards */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg
              className="w-full h-full"
              width={svgDimensions.width}
              height={svgDimensions.height}
              fill="none"
            >
              <defs>
                <linearGradient id="flightLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0A4D80" />
                  <stop offset="50%" stopColor="#C69214" />
                  <stop offset="100%" stopColor="#0A4D80" />
                </linearGradient>
              </defs>

              {paths.map((dPath, i) => (
                <motion.g
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.5 + 0.25, duration: 0.35 }}
                >
                  {/* Subtle background glow guide */}
                  <path
                    d={dPath}
                    stroke="#0A4D80"
                    strokeWidth="3"
                    strokeOpacity="0.1"
                  />
                  {/* Clean flight dashed line anchored to the cards */}
                  <motion.path
                    d={dPath}
                    stroke="url(#flightLineGrad)"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.5 + 0.25, duration: 0.35, ease: 'easeOut' }}
                  />
                </motion.g>
              ))}
            </svg>
          </div>

          {/* 2-Column Staggered Grid on Desktop, 1-Column on Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 relative z-10">
            {/* Left Column (01: delay 0s, 03: delay 1.0s, 05: delay 2.0s) */}
            <div className="space-y-12 lg:space-y-24">
              {leftSteps.map((item) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.number}
                    ref={(el) => {
                      cardRefs.current[item.stepIndex] = el;
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.stepIndex * 0.5, duration: 0.45 }}
                    className="bg-white p-8 sm:p-9 rounded-[24px] border border-slate-200/90 shadow-sm hover:shadow-lg transition-all relative group"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="w-12 h-12 rounded-2xl bg-[#0A4D80]/10 text-[#0A4D80] font-mono font-bold text-lg flex items-center justify-center border border-[#0A4D80]/20 group-hover:scale-105 transition-transform">
                        {item.number}
                      </span>
                      <div className="flex items-center gap-2.5">
                        <IconComponent className="w-5 h-5 text-[#C69214]" />
                        <h3 className="text-xl font-semibold text-brand-dark tracking-tight">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Column (02: delay 0.5s, 04: delay 1.5s, 06: delay 2.5s) */}
            <div className="space-y-12 lg:space-y-24 lg:pt-16">
              {rightSteps.map((item) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.number}
                    ref={(el) => {
                      cardRefs.current[item.stepIndex] = el;
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.stepIndex * 0.5, duration: 0.45 }}
                    className="bg-white p-8 sm:p-9 rounded-[24px] border border-slate-200/90 shadow-sm hover:shadow-lg transition-all relative group"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="w-12 h-12 rounded-2xl bg-[#0A4D80]/10 text-[#0A4D80] font-mono font-bold text-lg flex items-center justify-center border border-[#0A4D80]/20 group-hover:scale-105 transition-transform">
                        {item.number}
                      </span>
                      <div className="flex items-center gap-2.5">
                        <IconComponent className="w-5 h-5 text-[#C69214]" />
                        <h3 className="text-xl font-semibold text-brand-dark tracking-tight">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
