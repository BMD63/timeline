import React from 'react';
import './Slider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import type { TimelineEvent } from '@/types/timeline';

interface Props {
  events: TimelineEvent[];
}

export default function Slider({ events }: Props) {
  return (
    <div className="tlb-slider">
      <Swiper
        modules={[Navigation, A11y]}
        navigation
        spaceBetween={16}
        slidesPerView={3}
        a11y={{ enabled: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        {events.map((ev) => (
          <SwiperSlide key={ev.id}>
            <article className="tlb-card">
              <div className="tlb-cardTitle">{ev.title}</div>
              <div className="tlb-cardText">{ev.description}</div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
