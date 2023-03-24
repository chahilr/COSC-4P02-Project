import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ArtifactOverview.css';

export default function ArtifactOverview() {
  const { state } = useLocation();
  return (
    <>
      <div className="logo">
        <div className="logo-image">
          <img
            src={require('../../images/museum-logo.jpg')}
            alt="Museum logo"
            style={{ float: 'left', marginRight: '10px' }}
          />
        </div>
        <div className="logo-text">
          <span>Canadian Museum of History</span>
          <hr></hr>
          <span>Museé Canadien de L'Histoire</span>
        </div>
        <div style={{ clear: 'both' }}></div>
      </div>
      <div className="artifact-container">
        <div className="artifact-text">
          <h2>{state.title}</h2>
          <p>{state.description}</p>
        </div>
        <div className="artifact-image">
          <img src={state.image} alt="" height={'100dvh'} />
        </div>
      </div>
      <div className="button-container">
        <button id="return-button">Return</button>
        <button id="related-artifact-button">Related Artifact</button>
        <button id="other-media-button">Other Media</button>
      </div>
    </>
  );
}
