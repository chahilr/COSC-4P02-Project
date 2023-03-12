import { Route, Routes } from 'react-router-dom';
import ArtifactOverview from './pages/ArtifactOverview';

import Home from './pages/Home';
import TimelineCustomizer from './pages/TimelineCustomizer';
import Timeline from './pages/Timeline';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customizer" element={<TimelineCustomizer />} />
      <Route path="/artifact" element={<ArtifactOverview />} />
      <Route path="/timeline" element={<Timeline />} />
    </Routes>
  );
}

export default App;
