import '../styles/Timeline.css';
import '../../utils/firestoreFunctions';
import { queryTagsExhibitsYearRange } from '../../utils/firestoreFunctions';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Timeline() {
  const { state } = useLocation();
  const [artifacts, setArtifacts] = useState();

  useEffect(() => {
    const fetchArtifacts = async () => {
      await queryTagsExhibitsYearRange(
        state.exhibitKeys,
        state.tagKeys,
        state.yearRange[0],
        state.yearRange[1]
      ).then((val) => {
        setArtifacts(val);
        console.log(val);
      });
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
        {/* {artifacts.map((artifact) =>  (
            <div className="timeline-segment">
              <img
                className="timeline-image"
                src={artifact.Photos[0]}
                alt="Artifact"
              />
              <div className="timeline-line"></div>
              <img
                className="timeline-image"
                src={artifact.Photos[0]}
                alt="Artifact"
              />
            </div>
          ))} */}
      </div>
    </>
  );
}
