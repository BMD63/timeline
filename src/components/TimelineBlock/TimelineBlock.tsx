import React, { useState } from 'react';
import './TimelineBlock.scss';
import type { TimeRange } from '@/types/timeline';

interface Props { ranges: TimeRange[] }

export default function TimelineBlock({ ranges }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = ranges[activeIndex];

  const prev = () => setActiveIndex(i => (i - 1 + ranges.length) % ranges.length);
  const next = () => setActiveIndex(i => (i + 1) % ranges.length);

  return (
    <section className="tlb-root">
      <div className="tlb-header">
        <div className="tlb-title">Исторические даты</div>
        <div className="tlb-subtitle">Категории событий</div>
      </div>

      <div className="tlb-top">
        <button className="tlb-arrowBtn" aria-label="Предыдущая категория" onClick={prev}>⟵</button>

        <div style={{ textAlign: 'center' }}>
          <div className="tlb-ringStub">Кольцо (заглушка)</div>
          <div className="tlb-labelBubble">{active.label}</div>
        </div>

        <button className="tlb-arrowBtn" aria-label="Следующая категория" onClick={next}>⟶</button>
      </div>

      <div className="tlb-years">
        <div className="tlb-leftYear">{active.startYear}</div>
        <div className="tlb-rightYear">{active.endYear}</div>
      </div>
    </section>
  );
}
