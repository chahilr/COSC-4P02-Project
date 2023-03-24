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
        year: artifact[1].Year,
        exhibit: artifact[1].Exhibition,
        description: description.content,
        image: artifact[1].Photos[0],
      });
    });
  };

  return (
    <>
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
      <div className="background" onClick={() => setShowPreview(null)}>
        <div className="timeline-container">
          {showPreview != null && <ArtifactPreview {...showPreview} />}
          {artifacts.map((artifact) => {
            if (alternator++ % 2 === 0) {
              return (
                <div key={artifact[0]} className="timeline-segment">
                  <ArtifactBubble
                    visible={true}
                    artifact={artifact[1]}
                    onClick={() => handleArtifactClick(artifact)}
                    alternator={alternator}
                  />
                  <div className="timeline-line"></div>
                  <ArtifactBubble
                    visible={false}
                    artifact={artifact[1]}
                    onClick={() => handleArtifactClick(artifact)}
                    alternator={alternator}
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
                    alternator={alternator}
                  />
                  <div className="timeline-line"></div>
                  <ArtifactBubble
                    visible={true}
                    artifact={artifact[1]}
                    onClick={() => handleArtifactClick(artifact)}
                    alternator={alternator}
                  />
                </div>
              );
            }
          })}
        </div>
        <Legend exhibits={state.exhibitKeys} />
      </div>
    </>
  );
}

const Legend = ({ exhibits }) => {
  const color = {
    'Ancient Greece': 'green',
    'Ancient Rome': 'red',
    'Ancient Egypt': 'blue',
    'Persian Empire': 'yellow',
  };

  return (
    <div className="legend-container">
      <ul>
        {exhibits.map((exhibit, id) => (
          <li className={exhibit} key={id}>
            <div
              className="icon"
              style={{ backgroundColor: color[exhibit] }}
            ></div>
            {exhibit}
          </li>
        ))}
      </ul>
    </div>
  );
};
