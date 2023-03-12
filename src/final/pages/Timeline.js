import '../styles/Timeline.css';
import '../../utils/firestoreFunctions';
import { getArtifact } from '../../utils/firestoreFunctions';
import { useEffect, useState } from 'react';

export default function Timeline(props) {
  const [artifacts, setArtifacts] = useState();

  useEffect(() => {
    const fetchArtifacts = async () => {
      await getArtifact('08C1DHn7Wp6kD0v87HFo').then((val) =>
        setArtifacts(val.Photos[0])
      );
    };
    fetchArtifacts();
  }, []);

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
            <span style={{ color: 'black' }}>Canadian Museum of History</span>
            <hr style={{ borderColor: 'black' }}></hr>
            <span style={{ color: 'black' }}>Museé Canadien de L'Histoire</span>
          </div>

          <div style={{ clear: 'both' }}></div>
        </div>
      </div>

      <div className="timeline-container">
        <div className="timeline-segment">
          <img className="timeline-image" src={artifacts} alt="Artifact" />
          <div className="timeline-line"></div>
          <img className="timeline-image" src={artifacts} alt="Artifact" />
        </div>
      </div>
    </>
  );
}
