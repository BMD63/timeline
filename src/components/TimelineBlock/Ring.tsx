import React from 'react';
import './Ring.scss';

interface Props {
  labels: string[];
  activeIndex: number;
  onSelect: (i: number) => void;
  children?: React.ReactNode;         
}

export default function Ring({ labels, activeIndex, onSelect, children }: Props) {
  const n = labels.length;
  const CLOCK = [30, 90, 150, 210, 270, 330] as const;
  const positions = CLOCK.slice(0, n);
  const circleRadius = 264.5;
  const angleFor = (i: number) => positions[(i - activeIndex + n) % n];

  return (
    <div className="tlb-ringWrap">
      <div className="tlb-circle" />
      <div className="tlb-ring">
        {labels.map((label, i) => {
          if (i === activeIndex) return null;
          const angle = angleFor(i);
          return (
            <button
              key={label}
              className="tlb-point"
              style={{ transform: `rotate(${angle}deg) translateY(-${circleRadius}px)` }}
              aria-selected={false}
              aria-label={`Категория: ${label}`}
              onClick={() => onSelect(i)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(i); }}
            />
          );
        })}
      </div>
      <div
        className="tlb-badge"
        aria-hidden
        style={{
          transform: `rotate(${angleFor(activeIndex)}deg) translateY(-${circleRadius}px) rotate(-${angleFor(
            activeIndex
          )}deg)`
        }}
      >
        <div className="tlb-badgeDot">{activeIndex + 1}</div>
        <div className="tlb-badgeText">{labels[activeIndex]}</div>
      </div>
      {children && <div className="tlb-center">{children}</div>}
    </div>
  );
}
