import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.scss';

function App() {
  return <div className="app">Historical Timeline App</div>;
}

createRoot(document.getElementById('root')!).render(<App />);
