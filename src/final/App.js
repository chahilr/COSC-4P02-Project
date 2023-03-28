import { Route, Routes } from 'react-router-dom';
import ArtifactOverview from './pages/ArtifactOverview';
import {AuthenticationContext} from '../utils/Auth.js'
import { AdminRoutes } from '../utils/AdminRoutes.js';

import Home from './pages/Home';
import TimelineCustomizer from './pages/TimelineCustomizer';
import Timeline from './pages/Timeline';
import AdminPage from './pages/AdminPage';
import AdminHome from '../final/pages/AdminHome.js';

function App() {
  return (
    <AuthenticationContext>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customizer" element={<TimelineCustomizer />} />
        <Route path="/artifact" element={<ArtifactOverview />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route element={<AdminRoutes />}>
          <Route path="/adminHome" element={<AdminHome />} />
        </Route>
      </Routes>
    </AuthenticationContext>
  );
}

export default App;
