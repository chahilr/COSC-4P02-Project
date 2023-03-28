import styles from '../styles/ArtifactOverview.module.css';
import React from 'react';
import '../../mobile.css';
import { useLocation } from 'react-router-dom';


export default function ArtifactOverview() {
  const { state } = useLocation();
  return (
    <div className="artifact-container">
      <div className="logo">
          <div className="logo-image">
            <img
              src={require('../../images/museum-logo.jpg')}
              alt="Museum logo"
              style={{ float: 'left', marginRight: '10px' }}
            />/
          </div>
          <div className={styles['artifact-image']}>
            <img src={state.image} alt="" height={'100dvh'} />
          </div>
          

        </div>
      <div className="artifact-image">
        <img src={require('../../images/MaskOfAgamemnon.jpg')} alt="Mask of Agamemnon" />
        
      </div>
      <div className="artifact-text">
        <h2>Mask of Agamemnon</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse consequat ut dui sit amet semper. Curabitur pharetra lacus in tellus tincidunt posuere. Pellentesque finibus purus vitae nunc efficitur vulputate. Suspendisse commodo magna at ornare porttitor. Sed dapibus sed dui ut tempus. Nunc elementum sagittis odio et suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum tempus facilisis. Ut in convallis purus, ac vestibulum quam. Fusce dolor lacus, finibus eu tellus non, porta vulputate felis. Donec pretium purus risus, et porta risus tempus eget. Vivamus a bibendum metus, vitae commodo tellus. Etiam volutpat justo diam, in rhoncus enim vulputate a.</p>
      </div>
      <div style={{ clear: 'both' }}></div>
          <div class="button-container">
            <button id="return-button">Return</button>
            <button id="related-artifact-button">Related Artifact</button>
            <button id="other-media-button">Other Media</button>
          </div>
    </div>

  );
}
