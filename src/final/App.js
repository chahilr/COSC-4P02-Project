import { Route, Routes } from 'react-router-dom';
import ArtifactOverview from './pages/ArtifactOverview';

import Home from './pages/Home';
import TimelineCustomizer from './pages/TimelineCustomizer';
//import Timeline from './pages/Timeline';
import AddArtifact from './pages/AddArtifact'
import EditArtifact from './pages/EditArtifact'
import Artifactlist from './pages/ArtifactList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customizer" element={<TimelineCustomizer />} />
      <Route path="/artifact" element={<ArtifactOverview/>} />
      <Route path="/addartifact" element={<AddArtifact/>} />      
      <Route path="/editartifact" element={<EditArtifact/>} />
      <Route path="/artifactlist" element={<Artifactlist/>} />
            
    </Routes>
  );
}

export default App;
