import SelectButton from './components/SelectButton';
import { useState, useEffect } from 'react';

function App() {
  useEffect(() => {
    document.body.className = 'home';
    return () => { document.body.className = ''; }
  });

  return (
    <>
      <div id="logo-and-language">
        {/* Logo */}
        <div className="logo">
          <div className="logo-image">
            <img src={require('../images/museum-logo.jpg')} alt="Image" style={{float: 'left', marginRight: '10px'}} />
          </div>
        
          <div className='logo-text'>
            <span>Canadian Museum of History</span>
            <hr></hr>
            <span>Museé Canadien de L'Histoire</span>
          </div>
        
          <div style={{clear: 'both'}}></div>
        </div>

        {/* Language */}
        <div className='logo-text'>
          <span>Language Select</span>
        </div>

      </div>

      <div className="center">
        <ul id="main-button-group">
          <li>
            Create Personalized Timeline
          </li>
          <li>
            Search for Artifact
          </li>
        </ul>
      </div>

      <span className="translucent-banner">Travel Through Time</span>

      <ul id="exhibit-options-list">
        {/* First set of buttons, further apart */}
        <div id="exhibit-options-outer">
          <li>
            <SelectButton name="Ancient Greece" />
          </li>
          <li>
            <SelectButton name="Ancient Rome" />
          </li>
        </div>

        {/* Second set of buttons, closer together */}
        <div id="exhibit-options-inner">
          <li>
            <SelectButton name="Ancient Egypt" />
          </li>
          <li>
            <SelectButton name="Persian Empire" />
          </li>
        </div>
      </ul>
    </>
  );
}

export default App;
