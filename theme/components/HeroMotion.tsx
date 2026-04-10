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
        <div className="yc-hero-window" aria-hidden="true">
          <div className="yc-hero-window__topbar">
            <div className="yc-hero-window__dots">
              <span className="yc-hero-window__dot yc-hero-window__dot--red" />
              <span className="yc-hero-window__dot yc-hero-window__dot--yellow" />
              <span className="yc-hero-window__dot yc-hero-window__dot--green" />
            </div>
            <div className="yc-hero-window__title">关于本指南</div>
            <div className="yc-hero-window__pill" />
          </div>
          <div className="yc-hero-window__body">
            <div className="yc-hero-window__content">
              <div className="yc-hero-window__line yc-hero-window__line--h">本指南说明</div>
              <div className="yc-hero-window__line">汇集实战经验与主流提示词资料，取其精华，并结合案例拆解。</div>
              <div className="yc-hero-window__line">AI 发展很快，难免存在过时与疏漏；文档会持续更新。</div>
              <div className="yc-hero-window__line">个人编写，难免疏漏，欢迎指正。</div>
            </div>
            <div className="yc-hero-window__spacer" />
            <div className="yc-hero-window__loading-block">
              <div className="yc-hero-window__sk-line yc-hero-window__sk-line--brand" />
              <div className="yc-hero-window__sk-line yc-hero-window__sk-line--w72" />
              <div className="yc-hero-window__sk-line yc-hero-window__sk-line--w88" />
              <div className="yc-hero-window__sk-line yc-hero-window__sk-line--w84" />
              <div className="yc-hero-window__sk-line yc-hero-window__sk-line--w60" />
            </div>
          </div>
        </div>
      </div>
      <img className="yc-hero-motion__mascot" src="/YC-fox.png" alt="YPEG" draggable={false} />
    </div>
  );
}
