import React, { useState } from 'react';
import './TimelineBlock.scss';
import type { TimeRange } from '@/types/timeline';
import Ring from './Ring';
import Slider from './Slider';

interface Props {
  ranges: TimeRange[];
}

export default function TimelineBlock({ ranges }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = ranges[activeIndex];

  const prev = () => setActiveIndex((i) => (i - 1 + ranges.length) % ranges.length);
  const next = () => setActiveIndex((i) => (i + 1) % ranges.length);

  const labels = ranges.map((r) => r.label);
  const total = ranges.length;
  const current = activeIndex + 1;

  return (
    <section className="tlb-root">
      <div className="tlb-header">
        <div className="tlb-title">Исторические даты</div>
      </div>

      <div className="tlb-top">
        <Ring labels={labels} activeIndex={activeIndex} onSelect={setActiveIndex}>
          <div className="tlb-years">
            <div className="tlb-leftYear">{active.startYear}</div>
            <div className="tlb-rightYear">{active.endYear}</div>
          </div>
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
      <Slider events={active.events} />
    </section>
  );
}
