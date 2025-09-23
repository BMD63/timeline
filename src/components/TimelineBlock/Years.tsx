import { useEffect, useRef } from 'react';
import gsap from 'gsap';

type Props = { start: number; end: number };

export default function Years({ start, end }: Props) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const prev = useRef({ start, end });

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.5, ease: 'power1.out' } });
    if (leftRef.current && prev.current.start !== start) {
      const obj = { v: prev.current.start };
      tl.to(obj, {
        v: start,
        onUpdate: () => { if (leftRef.current) leftRef.current.textContent = String(Math.round(obj.v)); }
      }, 0);
    } else if (leftRef.current) {
      leftRef.current.textContent = String(start);
    }

    if (rightRef.current && prev.current.end !== end) {
      const obj = { v: prev.current.end };
      tl.to(obj, {
        v: end,
        onUpdate: () => { if (rightRef.current) rightRef.current.textContent = String(Math.round(obj.v)); }
      }, 0);
    } else if (rightRef.current) {
      rightRef.current.textContent = String(end);
    }

    prev.current = { start, end };
    return () => { tl.kill(); };
  }, [start, end]);

  return (
    <div className="tlb-years">
      <div ref={leftRef} className="tlb-leftYear">{start}</div>
      <div ref={rightRef} className="tlb-rightYear">{end}</div>
    </div>
  );
}
