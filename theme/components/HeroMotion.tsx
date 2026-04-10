import { useEffect, useRef } from 'react';

export function HeroMotion() {
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rect = el.getBoundingClientRect();
    const updateRect = () => {
      rect = el.getBoundingClientRect();
    };

    const onMove = (e: MouseEvent) => {
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      lastRef.current.x = Math.max(-1, Math.min(1, x));
      lastRef.current.y = Math.max(-1, Math.min(1, y));

      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        el.style.setProperty('--mx', String(lastRef.current.x));
        el.style.setProperty('--my', String(lastRef.current.y));
      });
    };

    const onLeave = () => {
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('resize', updateRect);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={ref} className="yc-hero-motion" style={{ ['--mx' as any]: 0, ['--my' as any]: 0 }}>
      <div className="yc-hero-motion__bg" />
      <div className="yc-hero-motion__window-wrap">
        <div className="yc-hero-motion__window-glow" />
        <img className="yc-hero-motion__window" src="/hero-image.svg" alt="" draggable={false} />
      </div>
      <img className="yc-hero-motion__mascot" src="/YC-fox.png" alt="YPEG" draggable={false} />
    </div>
  );
}
