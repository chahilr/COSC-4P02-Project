import '../styles/Timeline.css';
import '../../utils/firestoreFunctions';
import { queryTagsExhibitsYearRange } from '../../utils/firestoreFunctions';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ArtifactBubble from '../components/ArtifactBubble';

export default function Timeline() {
  const { state } = useLocation();
  const [artifacts, setArtifacts] = useState([]);
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

  // useEffect(() => {}, [retrievedArtifacts]);

  return (
    <div className="background">
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
        {artifacts.map((artifact) => {
          if (alternator++ % 2 === 0) {
            return (
              <div key={artifact[0]} className="timeline-segment">
                <ArtifactBubble visible={true} artifact={artifact[1]} />
                <div className="timeline-line"></div>
                <ArtifactBubble visible={false} artifact={artifact[1]} />
              </div>
            );
          } else {
            return (
              <div key={artifact[0]} className="timeline-segment">
                <ArtifactBubble visible={false} artifact={artifact[1]} />
                <div className="timeline-line"></div>
                <ArtifactBubble visible={true} artifact={artifact[1]} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
