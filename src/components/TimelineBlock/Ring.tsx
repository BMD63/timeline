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
  const baseAngles = CLOCK.slice(0, n); 
  const circleRadius = 264.5;
  const ringRotation = 30 - baseAngles[activeIndex];

  return (
    <div className="tlb-ringWrap">
      <div className="tlb-circle" />
      <div className="tlb-ring" style={{ transform: `rotate(${ringRotation}deg)` }}>
        {labels.map((label, i) => {
          const angle = baseAngles[i];
          const total = angle + ringRotation;
          return (
            <button
              key={label}
              className="tlb-point"
              data-index={i + 1}
              style={{
                transform: `rotate(${angle}deg) translateY(-${circleRadius}px)`,
                ['--angTotal' as any]: `${total}deg`,
              }}
              aria-selected={i === activeIndex}
              aria-label={`Категория: ${label}`}
              onClick={() => onSelect(i)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(i); }}
            />
          );
        })}
      </div>
      <div
        className="tlb-badgeAnchor"
        aria-hidden
        style={{ transform: `rotate(30deg) translateY(-${circleRadius}px) rotate(-30deg)` }}
      >
        <div className="tlb-badgeDot">{activeIndex + 1}</div>
        <div className="tlb-badgeText">{labels[activeIndex]}</div>
      </div>
      {children && <div className="tlb-center">{children}</div>}
    </div>
  );
}
