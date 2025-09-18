import React from 'react';
import './Ring.scss';

interface Props {
  labels: string[];      // 2–6
  activeIndex: number;
  onSelect: (i: number) => void;
}

export default function Ring({ labels, activeIndex, onSelect }: Props) {
  const n = labels.length;
  // «Часовые» позиции:
  const CLOCK = [30, 90, 150, 210, 270, 330] as const;
  const positions = CLOCK.slice(0, n); // первые n позиций

  return (
    <div className="tlb-ringWrap">
      <div className="tlb-circle" />
      <div className="tlb-ring">
        {labels.map((label, i) => {
          // активная всегда на 30°; остальные заполняют часы по кругу
          const angle = positions[(i - activeIndex + n) % n];
          return (
            <button
              key={label}
              className="tlb-point"
              style={{ transform: `rotate(${angle}deg) translateY(-120px)` }}
              aria-selected={i === activeIndex}
              aria-label={`Категория: ${label}`}
              onClick={() => onSelect(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelect(i);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
