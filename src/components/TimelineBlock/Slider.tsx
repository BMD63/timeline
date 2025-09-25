import { useId, useState } from 'react';
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

  const uid = useId().replace(/:/g, '');
  const prevCls = `tlb-prev-${uid}`;
  const nextCls = `tlb-next-${uid}`;
  const [isBeginning, setBeginning] = useState(true);
  const [isEnd, setEnd] = useState(false);

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
      <div className="tlb-sliderNav" aria-hidden>
        <button
          className={`tlb-navBtn ${prevCls} ${isBeginning ? 'is-disabled' : ''}`}
          aria-label="Предыдущая карточка"
        >
          <img className="tlb-arrowIcon" src="/prev_arr.png" alt="" aria-hidden="true" />
        </button>
        <button
          className={`tlb-navBtn ${nextCls} ${isEnd ? 'is-disabled' : ''}`}
          aria-label="Следующая карточка"
        >
          <img className="tlb-arrowIcon" src="/next_arr.png" alt="" aria-hidden="true" />
        </button>
      </div>

      <Swiper
        className="tlb-swiper"
        modules={[Navigation, A11y]}
        slidesPerView="auto"
        centeredSlides
        spaceBetween={gap}
        initialSlide={1}
        grabCursor
        preventClicksPropagation
        speed={500}
        watchOverflow
        navigation={{
          prevEl: `.${prevCls}`,
          nextEl: `.${nextCls}`,
        }}
        onSlideChange={(s) => {
          setBeginning(s.isBeginning);
          setEnd(s.isEnd);
        }}
        onAfterInit={(s) => {
          setBeginning(s.isBeginning);
          setEnd(s.isEnd);
        }}
      >
        {events.map((ev, i) => (
          <SwiperSlide 
            key={`${ev.id}-${i}`}
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
