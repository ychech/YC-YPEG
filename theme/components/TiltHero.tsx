import { useEffect, useRef } from 'react';

export function TiltHero(props: {
  title: string;
  lead: string;
  imageSrc: string;
  variant?: 'card' | 'plain';
}) {
  const { title, lead, imageSrc, variant = 'card' } = props;
  const stageRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const img = imgRef.current;
    if (!stage || !img) return;

    let raf = 0;
    const reset = () => {
      stage.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
      img.style.transform = 'translateZ(30px) scale(1.02)';
    };

    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 10;
      const rotateX = (0.5 - y) * 8;
      const tx = (x - 0.5) * 10;
      const ty = (y - 0.5) * 10;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        stage.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        img.style.transform = `translate3d(${tx}px, ${ty}px, 42px) scale(1.04)`;
      });
    };

    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', reset);
    stage.addEventListener('pointerdown', reset);
    reset();

    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', reset);
      stage.removeEventListener('pointerdown', reset);
    };
  }, []);

  return (
    <div
      className={`yc-tilt-hero${variant === 'plain' ? ' yc-tilt-hero--plain' : ''}`}
      style={{ ['--yc-tilt-hero-bg' as any]: `url(${imageSrc})` }}
    >
      <div className="yc-tilt-hero__bg" />
      <div className="yc-tilt-hero__layout">
        <div className="yc-tilt-hero__copy">
          <h1 className="yc-tilt-hero__title">{title}</h1>
          <p className="yc-tilt-hero__lead">{lead}</p>
        </div>
        <div className="yc-tilt-hero__stage" ref={stageRef}>
          <img ref={imgRef} className="yc-tilt-hero__img" src={imageSrc} alt="" />
        </div>
      </div>
    </div>
  );
}
