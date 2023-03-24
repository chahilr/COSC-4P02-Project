import { Route, Routes } from 'react-router-dom';
import ArtifactOverview from './pages/ArtifactOverview';

import Home from './pages/Home';
import TimelineCustomizer from './pages/TimelineCustomizer';
import Timeline from './pages/Timeline';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customizer" element={<TimelineCustomizer />} />
      <Route path="/artifact" element={<ArtifactOverview />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
