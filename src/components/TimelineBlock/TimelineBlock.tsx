import { useState } from 'react';
import './TimelineBlock.scss';
import type { TimeRange } from '@/types/timeline';
import Ring from './Ring';
import Slider from './Slider';
import Years from './Years'; 

interface Props {
  ranges: TimeRange[];
}

export default function TimelineBlock({ ranges }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = ranges[activeIndex];



  const labels = ranges.map((r) => r.label);
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
  const prev = () =>
      setActiveSafely((activeIndex - 1 + ranges.length) % ranges.length);

    const next = () =>
      setActiveSafely((activeIndex + 1) % ranges.length);


  return (
    <section className="tlb-root">
      <div className="tlb-header">
        <div className="tlb-title">Исторические даты</div>
      </div>

      <div className="tlb-top">
        <Ring labels={labels} activeIndex={activeIndex} onSelect={setActiveIndex}>
          <Years start={active.startYear} end={active.endYear} />
        </Ring>
      </div>
      <div className="tlb-toolbar">
        <span className="tlb-counter">
          {String(current).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </span>
        <div className="tlb-arrows">
          <button className="tlb-arrowBtn" aria-label="Предыдущая категория" onClick={prev}>⟵</button>
          <button className="tlb-arrowBtn" aria-label="Следующая категория" onClick={next}>⟶</button>
        </div>
      </div>
      <div className="tlb-sliderWrap" aria-busy={isSwitching ? 'true' : 'false'} key={active.id}>
        <Slider events={active.events} />
      </div>
        
    </section>
  );
}
