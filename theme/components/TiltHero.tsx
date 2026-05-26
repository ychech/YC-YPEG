import { useEffect, useRef } from 'react';

export function TiltHero(props: {
  title: string;
  lead: string;
  imageSrc: string;
  variant?: 'card' | 'plain';
}) {
  const { title, lead, imageSrc, variant = 'card' } = props;
  const isPlain = variant === 'plain';
  const baseUrlRaw = ((import.meta as any).env?.BASE_URL as string | undefined) || '/';
  const baseUrl = baseUrlRaw.endsWith('/') ? baseUrlRaw : `${baseUrlRaw}/`;
  const resolvedImageSrc = `${baseUrl}${imageSrc.startsWith('/') ? imageSrc.slice(1) : imageSrc}`;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const plainImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (isPlain) return;
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
  }, [isPlain]);

  useEffect(() => {
    if (!isPlain) return;
    const root = rootRef.current;
    const img = plainImgRef.current;
    if (!root || !img) return;

    let raf = 0;
    const baseTransform = 'translate3d(0px, -30%, 0px) rotateX(0deg) rotateY(0deg) scale(1)';

    const reset = () => {
      img.style.transform = baseTransform;
    };

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 10;
      const rotateX = (0.5 - y) * 8;
      const tx = (x - 0.5) * 12;
      const ty = (y - 0.5) * 10;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        img.style.transform = `translate3d(${tx}px, calc(-30% + ${ty}px), 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
    };

    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', reset);
    root.addEventListener('pointerdown', reset);
    reset();

    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', reset);
      root.removeEventListener('pointerdown', reset);
    };
  }, [isPlain]);

  return (
    <div
      ref={rootRef}
      className={`yc-tilt-hero${variant === 'plain' ? ' yc-tilt-hero--plain' : ''}`}
      style={{ ['--yc-tilt-hero-bg' as any]: `url(${resolvedImageSrc})` }}
    >
      <div className="yc-tilt-hero__bg" />
      <div className="yc-tilt-hero__layout">
        <div className="yc-tilt-hero__copy">
          <h1 className="yc-tilt-hero__title">{title}</h1>
          <p className="yc-tilt-hero__lead">{lead}</p>
        </div>
        {!isPlain && (
          <div className="yc-tilt-hero__stage" ref={stageRef}>
            <img ref={imgRef} className="yc-tilt-hero__img" src={resolvedImageSrc} alt="" />
          </div>
        )}
      </div>
      {isPlain && (
        <img ref={plainImgRef} className="yc-tilt-hero__plain-img" src={resolvedImageSrc} alt="" />
      )}
    </div>
  );
}
