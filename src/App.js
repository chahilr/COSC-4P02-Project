import { Route, Routes } from 'react-router-dom';
import ArtifactOverview from './pages/ArtifactOverview';
import { AuthenticationContext } from './utils/Auth';
import { AdminRoutes } from './utils/AdminRoutes';

import Home from './pages/Home';
import TimelineCustomizer from './pages/TimelineCustomizer';
import Timeline from './pages/Timeline';
import AdminPage from './pages/AdminPage';
import AdminHome from './pages/AdminHome';
import AddArtifact from './pages/AddArtifact';
import EditArtifact from './pages/EditArtifact';
import ArtifactList from './pages/ArtifactList';
import ManageAdmins from './pages/ManageAdmins';
import { MainAdminRoutes } from './utils/MainAdminRoutes';
import AdminSettings from './pages/AdminSettings';
import AddAdmin from './pages/AddAdmin';

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
          <Route path="/adminSettings" element={<AdminSettings />} />
          <Route path="/addartifact" element={<AddArtifact />} />
          <Route path="/editartifact" element={<EditArtifact />} />
          <Route path="/artifactlist" element={<ArtifactList />} />
          <Route element={<MainAdminRoutes />}>
            <Route path="/mangeAdmins" element={<ManageAdmins />} />
            <Route path="/addAdmin" element={<AddAdmin />} />
          </Route>
        </Route>
      </Routes>
    </AuthenticationContext>
  );
}

export default App;
