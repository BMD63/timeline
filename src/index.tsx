import { createRoot } from 'react-dom/client';
import './styles/global.scss';
import TimelineBlock from '@/components/TimelineBlock/TimelineBlock';
import { SAMPLE_RANGES } from '@/data/sample';

function App() {
  return <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <TimelineBlock ranges={SAMPLE_RANGES} />
    </div>;
}

createRoot(document.getElementById('root')!).render(<App />);
