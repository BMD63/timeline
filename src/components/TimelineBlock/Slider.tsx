import './Slider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import type { TimelineEvent } from '@/types/timeline';

interface Props {
  events: TimelineEvent[];
  scale?: number;
}

export default function Slider({ events, scale = 1 }: Props) {
  const sideW = Math.round(320 * scale);
  const centerW = Math.round(400 * scale);
  const gap = Math.round(32 * scale);
  return (
    <div 
      className="tlb-slider"
      style={
      {
        ['--sideW' as any]: `${sideW}px`,
        ['--centerW' as any]: `${centerW}px`,
      } as React.CSSProperties
    }
    >
      <Swiper
        className="tlb-swiper"
        slidesPerView="auto"
        centeredSlides
        spaceBetween={gap}
        initialSlide={1}
        grabCursor
        preventClicksPropagation
        speed={500}
      >
        {events.map((ev) => (
          <SwiperSlide 
            key={ev.id}
            className="tlb-slide"
          >
            <article className="tlb-card">
              <h3 className="tlb-cardTitle">{ev.title}</h3>
              {ev.description && <p className="tlb-cardText">{ev.description}</p>}
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
