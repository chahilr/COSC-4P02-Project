import '../styles/Timeline.css';
import '../../utils/firestoreFunctions';
import {
  getDescrption,
  queryTagsExhibitsYearRange,
} from '../../utils/firestoreFunctions';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ArtifactBubble from '../components/ArtifactBubble';
import ArtifactPreview from '../components/ArtifactPreview';

export default function Timeline() {
  const { state } = useLocation();
  const [artifacts, setArtifacts] = useState([]);
  const [showPreview, setShowPreview] = useState(null);
  let alternator = 0;

  useEffect(() => {
    queryTagsExhibitsYearRange(
      state.exhibitKeys,
      state.tagKeys,
      state.yearRange[0],
      state.yearRange[1]
    ).then((val) => {
      setArtifacts(val);
    });
  }, []);

  const handleArtifactClick = (artifact) => {
    getDescrption(artifact[0]).then((description) => {
      setShowPreview({
        title: artifact[1].Name,
        description: description.content,
      });
    });
  };

  return (
    <div className="background" onClick={() => setShowPreview(null)}>
      <div
        id="logo-and-language"
        style={{
          backgroundColor: 'transparent',
          marginBottom: '100px',
          transform: 'scale(0.75)',
          translate: '-12.5%',
        }}
      >
        {/* Logo */}
        <div className="logo">
          <div className="logo-image">
            <img
              src={require('../../images/museum-logo.jpg')}
              alt="Museum logo"
              style={{ float: 'left', marginRight: '10px' }}
            />
          </div>

          <div className="logo-text">
            <span style={{ color: 'white' }}>Canadian Museum of History</span>
            <hr style={{ borderColor: 'white' }}></hr>
            <span style={{ color: 'white' }}>Museé Canadien de L'Histoire</span>
          </div>

          <div style={{ clear: 'both' }}></div>
        </div>
      </div>

      <div className="timeline-container">
        {showPreview != null && (
          <ArtifactPreview
            title={showPreview.title}
            description={showPreview.description}
          />
        )}
        {artifacts.map((artifact) => {
          if (alternator++ % 2 === 0) {
            return (
              <div key={artifact[0]} className="timeline-segment">
                <ArtifactBubble
                  visible={true}
                  artifact={artifact[1]}
                  onClick={() => handleArtifactClick(artifact)}
                />
                <div className="timeline-line"></div>
                <ArtifactBubble
                  visible={false}
                  artifact={artifact[1]}
                  onClick={() => handleArtifactClick(artifact)}
                />
              </div>
            );
          } else {
            return (
              <div key={artifact[0]} className="timeline-segment">
                <ArtifactBubble
                  visible={false}
                  artifact={artifact[1]}
                  onClick={() => handleArtifactClick(artifact)}
                />
                <div className="timeline-line"></div>
                <ArtifactBubble
                  visible={true}
                  artifact={artifact[1]}
                  onClick={() => handleArtifactClick(artifact)}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
