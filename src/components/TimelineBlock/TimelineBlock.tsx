import { useState, useRef, useEffect } from 'react';
import './TimelineBlock.scss';
import type { TimeRange } from '@/types/timeline';
import Ring from './Ring';
import Slider from './Slider';
import Years from './Years'; 

interface Props {
  ranges: TimeRange[];
}

export default function TimelineBlock({ ranges }: Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [sliderScale, setSliderScale] = useState(1);
  const [ring, setRing] = useState<{ x: number; y: number; id: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = ranges[activeIndex];



  const labels = ranges.map((r) => (r.events.length ? r.label : ''));
  const enabled = ranges.map((r) => r.events.length > 0);
  const total = ranges.length;
  const current = activeIndex + 1;

  const [isSwitching, setIsSwitching] = useState(false);

  const setActiveSafely = (i: number) => {
    if (i === activeIndex) return;
    setIsSwitching(true);
    setTimeout(() => {
      setActiveIndex(i);
      setIsSwitching(false);
    }, 250);
  };

  const canPrev = activeIndex > 0;
  const prev = () => { if (canPrev) setActiveSafely(activeIndex - 1); };

  const canNext = activeIndex < ranges.length - 1;
  const next = () => { if (canNext) setActiveSafely(activeIndex + 1); };

  const handleMouseDown: React.MouseEventHandler = (e) => {
    const el = rootRef.current;
    if (!el) {
      return
    };
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRing({ x, y, id: Date.now() }); 
  };
    useEffect(() => {
      const el = rootRef.current;
      if (!el) return;
      const ro = new ResizeObserver(([entry]) => {
        const width = entry.contentRect.width;
        const needed = 1104;
        const available = Math.max(0, width - 48);
        const s = Math.min(1, available / needed);
        setSliderScale(s);
        el.style.setProperty('--slider-scale', String(s));
      });
      ro.observe(el);
      return () => ro.disconnect();
    }, []);

  return (
    <section className="tlb-root" ref={rootRef} onMouseDown={handleMouseDown}>
      <div 
        className="tlb-lines" 
        aria-hidden
        style={{ ['--frame-shift' as any]: '310px' }} 
      >
        <span className="line v left" />
        <span className="line v center" />
        <span className="line h" />
      </div>
      <div className="tlb-header">
        <span className="tlb-accent" aria-hidden />
        <h2 className="tlb-title">Исторические даты</h2>
      </div>

      <div className="tlb-top">
      <Ring
         labels={labels}
         enabled={enabled}
         activeIndex={activeIndex}
         onSelect={setActiveIndex}
       >
          <Years start={active.startYear} end={active.endYear} />
        </Ring>
      </div>
      <div className="tlb-toolbar">
        <span className="tlb-counter">
          {String(current).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </span>
        <div className="tlb-arrows">
          <button className="tlb-arrowBtn" aria-label="Предыдущая категория" onClick={prev} disabled={!canPrev}>
            <img className="tlb-arrowIcon" src="/prev_arr.png" alt="" aria-hidden="true" />
          </button>
          <button className="tlb-arrowBtn" aria-label="Следующая категория" onClick={next} disabled={!canNext}>
            <img className="tlb-arrowIcon" src="/next_arr.png" alt="" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="tlb-sliderWrap" aria-busy={isSwitching ? 'true' : 'false'} key={active.id}>
        <Slider events={active.events} scale={sliderScale}
      />
      </div>
      {ring && (
        <div className="tlb-clickLayer" aria-hidden>
          <div key={ring.id} className="tlb-clickRing" style={{ left: ring.x, top: ring.y }} />
        </div>
      )}
    </section>
  );
}
