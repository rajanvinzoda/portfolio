import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  l: number;
  d: number;
  h: number;
  r: number;
  b: boolean;
}

export const ParticleFX: React.FC<{ hue?: number }> = ({ hue = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const curRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const ringLabelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const fx = canvasRef.current;
    if (!fx) return;
    const g = fx.getContext('2d');
    if (!g) return;

    const cur = curRef.current;
    const ring = ringRef.current;
    const rl = ringLabelRef.current;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    const FX: Particle[] = [];
    let dpr = 1;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const fit = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      fx.width = window.innerWidth * dpr;
      fx.height = window.innerHeight * dpr;
    };
    fit();
    window.addEventListener('resize', fit);

    const spawn = (x: number, y: number, n: number, s: number, burst: boolean) => {
      if (reduce) return;
      for (let i = 0; i < n && FX.length < 380; i++) {
        const a = Math.random() * 6.28318;
        const v = s * (0.3 + Math.random() * (burst ? 2.4 : 1));
        FX.push({
          x,
          y,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v - (burst ? 0 : 0.3),
          l: 1,
          d: 0.014 + Math.random() * 0.02,
          h: (hue + Math.random() * 80) % 360,
          r: 1.5 + Math.random() * (burst ? 3.2 : 1.8),
          b: burst,
        });
      }
    };

    // Expose global spawn for custom triggers
    (window as any).__spawnParticles = spawn;

    const onPointerMove = (e: PointerEvent) => {
      const d = Math.hypot(e.clientX - mx, e.clientY - my);
      mx = e.clientX;
      my = e.clientY;

      if (!reduce && finePointer) {
        spawn(mx, my, Math.min(2, d / 16), 1.2, false);
      }

      if (ring && rl) {
        const target = (e.target as HTMLElement)?.closest?.('a, button, input, [data-cursor]');
        const cursorLabel = (target as HTMLElement)?.dataset?.cursor || '';
        ring.classList.toggle('big', !!cursorLabel);
        rl.textContent = cursorLabel;
        ring.style.borderColor = target ? '#fff' : '';
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (ring) ring.classList.add('dn');
      spawn(e.clientX, e.clientY, 24, 3.8, true);

      // Ripple effect on .rip elements
      const target = (e.target as HTMLElement)?.closest?.('.rip');
      if (target) {
        const rect = target.getBoundingClientRect();
        const rp = document.createElement('span');
        rp.className = 'rp';
        rp.style.left = `${e.clientX - rect.left}px`;
        rp.style.top = `${e.clientY - rect.top}px`;
        target.appendChild(rp);
        setTimeout(() => rp.remove(), 700);
      }
    };

    const onPointerUp = () => {
      if (ring) ring.classList.remove('dn');
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    let rafId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      if (finePointer && cur && ring) {
        rx = lerp(rx, mx, 0.18);
        ry = lerp(ry, my, 0.18);
        cur.style.transform = `translate(${mx}px, ${my}px)`;
        ring.style.transform = `translate(${rx}px, ${ry}px)`;
      }

      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, window.innerWidth, window.innerHeight);
      g.globalCompositeOperation = 'lighter';

      for (let i = FX.length - 1; i >= 0; i--) {
        const p = FX[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.975;
        p.vy *= 0.975;
        if (p.b) p.vy += 0.05;
        p.l -= p.d;
        if (p.l <= 0) {
          FX.splice(i, 1);
          continue;
        }
        g.fillStyle = `hsla(${p.h}, 95%, 62%, ${p.l})`;
        g.beginPath();
        g.arc(p.x, p.y, p.r * p.l + 0.4, 0, 6.28318);
        g.fill();
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', fit);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [hue]);

  return (
    <>
      <canvas ref={canvasRef} id="fx" className="fixed inset-0 z-[60] pointer-events-none" />
      <div ref={curRef} className="cur" id="cur" />
      <div ref={ringRef} className="ring" id="ring">
        <span ref={ringLabelRef} id="rl" />
      </div>
    </>
  );
};
