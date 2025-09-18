import type { TimeRange } from '@/types/timeline';

const ev = (id: string, title: string): any => ({
  id, title, description: 'Короткое описание события.'
});

export const SAMPLE_RANGES: TimeRange[] = [
  { id: 'science',    label: 'Наука',       startYear: 2015, endYear: 2022, events: [ev('s1','2015'), ev('s2','2017')] },
  { id: 'cinema',     label: 'Кино',        startYear: 2010, endYear: 2020, events: [ev('c1','2012'), ev('c2','2016')] },
  { id: 'literature', label: 'Литература',  startYear: 2005, endYear: 2015, events: [ev('l1','2007'), ev('l2','2011')] },
  { id: 'sport',      label: 'Спорт',       startYear: 2012, endYear: 2024, events: [ev('sp1','2014'), ev('sp2','2018')] },
  { id: 'tech',       label: 'Технологии',  startYear: 2016, endYear: 2023, events: [ev('t1','2017'), ev('t2','2020')] },
  { id: 'music',      label: 'Музыка',      startYear: 2000, endYear: 2010, events: [ev('m1','2002'), ev('m2','2008')] }
];
