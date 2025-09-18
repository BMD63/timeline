export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date?: string;
  image?: string;
}

export interface TimeRange {
  id: string;      
  label: string;   
  startYear: number;
  endYear: number;
  events: TimelineEvent[];
}
