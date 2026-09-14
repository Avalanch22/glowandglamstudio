import { useEffect, useRef } from 'react';

/* ── High-impact Studio Spotlight that tracks the mouse ── */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={ref} className="spotlight" aria-hidden="true">
      <div className="spotlight-core" />
      <div className="spotlight-halo" />
    </div>
  );
}

/* ── Floating gold dust particles ── */
export function DustParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Create particles
    const COLORS = ['hsl(38,40%,75%)', 'hsl(28,55%,62%)', 'hsl(38,60%,85%)'];
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: -(Math.random() * 0.4 + 0.1),
      opacity: Math.random() * 0.6 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        // drift
        p.x += p.dx;
        p.y += p.dy;
        p.opacity += (Math.random() - 0.5) * 0.01;
        p.opacity = Math.max(0.1, Math.min(0.8, p.opacity));
        if (p.y < -5)  p.y = H + 5;
        if (p.x < -5)  p.x = W + 5;
        if (p.x > W + 5) p.x = -5;
      }
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} id="dust-canvas" aria-hidden="true" />;
}

/* ── Vanity mirror bulb ring ── */
export function VanityRing({ count = 16 }: { count?: number }) {
  const bulbs = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 360;
    const rad = (angle * Math.PI) / 180;
    const r = 46; // % radius
    return {
      left: `${50 + r * Math.cos(rad)}%`,
      top:  `${50 + r * Math.sin(rad)}%`,
    };
  });

  return (
    <div className="vanity-ring" aria-hidden="true">
      {bulbs.map((pos, i) => (
        <div
          key={i}
          className="vanity-bulb"
          style={{ left: pos.left, top: pos.top, transform: 'translate(-50%,-50%)' }}
        />
      ))}
    </div>
  );
}

/* ── Makeup SVG Icons ── */

export function BrushIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21 C5 19 7 17 9 15" />
      <path d="M9 15 L19 5 Q21 3 20 2 Q19 1 17 3 L7 13" />
      <path d="M7 13 C5 15 4 18 3 21" />
      <path d="M9 15 C8 16 7 16 7 13" />
    </svg>
  );
}

export function LipstickIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="12" width="6" height="9" rx="1" />
      <path d="M9 12 L9 8 Q9 4 12 3 Q15 4 15 8 L15 12" />
      <path d="M9 8 Q11 6.5 15 8" />
      <path d="M9 15 H15" />
    </svg>
  );
}

export function PaletteIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2v-.5c0-.55.45-1 1-1h1c3.31 0 6-2.69 6-6C22 6.48 17.52 2 12 2z" />
      <circle cx="6.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PerfumeIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2h4v3h-4z"/>
      <path d="M7 5h10v2H7z"/>
      <path d="M15 3h3a2 2 0 0 1 2 2v1"/>
      <rect x="5" y="8" width="14" height="13" rx="2.5"/>
      <path d="M9 12h6"/>
      <path d="M9 15h6"/>
      <circle cx="12" cy="13.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

export function BlushIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="15" rx="8.5" ry="6"/>
      <ellipse cx="12" cy="15" rx="6" ry="4"/>
      <path d="M10.5 14.5c.5-1 2-1 2.5 0s1.5 1 2.5.5"/>
      <path d="M4 13C4.5 7.5 8 3.5 12 3.5s7.5 4 8 9.5"/>
      <path d="M8 8c1.5-2 3.5-2.5 5-2.5"/>
      <rect x="10.5" y="12" width="3" height="1.5" rx="0.5"/>
    </svg>
  );
}

export function MascaraIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="9" width="4" height="12" rx="1.5"/>
      <path d="M4 12h4"/>
      <rect x="5" y="7" width="2" height="2"/>
      <line x1="12" y1="14" x2="19" y2="7"/>
      <rect x="17.5" y="4" width="4" height="6" rx="1" transform="rotate(45 19.5 7)"/>
      <line x1="10" y1="13" x2="14" y2="17"/>
      <line x1="11.5" y1="11.5" x2="15.5" y2="15.5"/>
      <line x1="13" y1="10" x2="17" y2="14"/>
      <circle cx="9" cy="17" r="0.5" fill="currentColor"/>
    </svg>
  );
}

export function SpongeIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3C8.5 7.5 5 13 5 17a7 7 0 0 0 14 0c0-4-3.5-9.5-7-14z"/>
      <path d="M10 13c-1.5 2-1 4.5 0 6"/>
      <circle cx="12" cy="7.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

export function CurlerIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4c2.5-1.5 7.5-1.5 10 0"/>
      <path d="M8 6c2-1 6-1 8 0"/>
      <line x1="8" y1="4" x2="8" y2="7"/>
      <line x1="16" y1="4" x2="16" y2="7"/>
      <line x1="12" y1="6" x2="12" y2="12"/>
      <line x1="12" y1="12" x2="8" y2="17"/>
      <line x1="12" y1="12" x2="16" y2="17"/>
      <circle cx="7" cy="19" r="2.5"/>
      <circle cx="17" cy="19" r="2.5"/>
    </svg>
  );
}
