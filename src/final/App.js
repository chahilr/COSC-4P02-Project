import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import TimelineCustomizer from './pages/TimelineCustomizer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customizer" element={<TimelineCustomizer />} />
    </Routes>
  );
}

export default App;
