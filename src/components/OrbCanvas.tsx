import React, { useEffect, useRef } from 'react';

interface OrbCanvasProps {
  scrollVel?: number;
  hue?: number;
}

export const OrbCanvas: React.FC<OrbCanvasProps> = ({ scrollVel = 0, hue = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext('2d');
    if (!cx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const P: [number, number, number][] = [];
    const R = 18;

    for (let k = 0; k < R; k++) {
      const y = 1 - ((k + 0.5) / R) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const m = Math.max(5, Math.round(36 * r));
      for (let j = 0; j < m; j++) {
        const a = (j / m) * 6.2832 + k * 0.35;
        P.push([Math.cos(a) * r, y, Math.sin(a) * r]);
      }
    }

    let tx = 0;
    let ty = 0;
    let sx = 0;
    let sy = 0;
    let rot = 0;
    let osz = 0;
    let odpr = 1;
    let vis = true;
    let rafId: number;

    const ofit = () => {
      odpr = Math.min(2, window.devicePixelRatio || 1);
      osz = cv.clientWidth || 380;
      cv.width = cv.height = Math.round(osz * odpr);
    };

    ofit();
    window.addEventListener('resize', ofit);

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]) vis = entries[0].isIntersecting;
    });
    observer.observe(cv);

    const handlePointerMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 1.4;
      ty = (e.clientY / window.innerHeight - 0.5) * 1.4;
    };
    window.addEventListener('pointermove', handlePointerMove);

    const draw = (t: number) => {
      if (vis) {
        sx += (ty - sx) * 0.06;
        sy += (tx - sy) * 0.06;
        rot += reduce ? 0 : 0.004 + Math.abs(scrollVel) * 0.0016;

        const c = cv.width / 2;
        const S = c * 0.8 * (1 - Math.min(0.35, Math.abs(scrollVel) * 0.02));
        const ya = rot + sy * 1.4;
        const xa = 0.35 + sx;
        const cy = Math.cos(ya);
        const sy2 = Math.sin(ya);
        const cp = Math.cos(xa);
        const sp2 = Math.sin(xa);
        const hot = (t * 0.26) % P.length;

        const out: [number, number, number, number, number, number][] = [];
        cx.clearRect(0, 0, cv.width, cv.height);

        for (let i = 0; i < P.length; i++) {
          const p = P[i];
          const x1 = p[0] * cy + p[2] * sy2;
          const z1 = -p[0] * sy2 + p[2] * cy;
          const y2 = p[1] * cp - z1 * sp2;
          const z2 = p[1] * sp2 + z1 * cp;

          let dd = Math.abs(i - hot);
          if (dd > P.length - dd) dd = P.length - dd;
          const f = 2.8 / (2.8 - z2);
          out.push([c + x1 * S * f, c - y2 * S * f, (z2 + 1) / 2, Math.max(0, 1 - dd / 20), f, i]);
        }

        out.sort((a, b) => a[2] - b[2]);

        for (let j = 0; j < out.length; j++) {
          const o = out[j];
          const l = o[3] * o[3];
          const h = (o[5] * 3.2 + t * 0.05 + hue) % 360;
          cx.fillStyle = `hsla(${h}, 95%, ${62 + l * 20}%, ${Math.min(1, 0.18 + 0.7 * o[2] * o[2] + l)})`;
          cx.beginPath();
          cx.arc(o[0], o[1], (1.3 * (0.45 + 0.75 * o[2]) * o[4] + l * 2.4) * odpr * (osz / 520), 0, 6.2832);
          cx.fill();
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', ofit);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [scrollVel, hue]);

  return (
    <canvas
      ref={canvasRef}
      id="orb"
      className="absolute right-[-10vw] md:right-[-4vw] top-1/2 w-[min(90vw,720px)] aspect-square -translate-y-1/2 pointer-events-none opacity-90 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
