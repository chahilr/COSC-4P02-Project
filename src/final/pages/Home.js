import { useEffect } from 'react';
import SelectButton from '../components/SelectButton';
import ancientgreece from '../../images/ancient-greece.png';
import ancientrome from '../../images/ancient-rome.png';
import ancientegypt from '../../images/ancient-egypt.png';
import persianempire from '../../images/persian-empire.png';
import museum from '../../images/museum.png';
import { Link } from 'react-router-dom';

export default function Home() {
  /** Handles mousing over any of the exhibit buttons.
   * @TODO: Add transition to the background image change.
   */
  const handleMouseEnter = (event) => {
    const target = event.target;
    const button_id = target.innerText.toLowerCase().replace(/\s/g, '');
    let image_id;

    switch (button_id) {
      case 'ancientgreece':
        image_id = { ancientgreece }.ancientgreece;
        break;

      case 'ancientrome':
        image_id = { ancientrome }.ancientrome;
        break;

      case 'ancientegypt':
        image_id = { ancientegypt }.ancientegypt;
        break;

      case 'persianempire':
        image_id = { persianempire }.persianempire;
        break;
    }
    const homeDiv = document.querySelector('.home');
    homeDiv.style.background = 'url(' + image_id + ')';
    homeDiv.style.transitionDuration = '200ms';
  };

  /** Handles mousing away from a button... changes the background image back to default
   * @TODO: Add transition to background image change.
   */
  const handleMouseLeave = (event) => {
    const image_id = { museum }.museum;
    const homeDiv = document.querySelector('.home');
    homeDiv.style.background = 'url(' + image_id + ')';
    homeDiv.style.transitionDuration = '200ms';
  };

  return (
    <div className="home">
      <div id="logo-and-language">
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
            <span>Canadian Museum of History</span>
            <hr></hr>
            <span>Museé Canadien de L'Histoire</span>
          </div>

          <div style={{ clear: 'both' }}></div>
        </div>

        {/* Language */}
        <div className="logo-text">
          <span>Language Select</span>
        </div>
      </div>

      <div className="center">
        <ul id="main-button-group">
          <Link to="/customizer">
            <li className="landing-page-main-button">
              Create Personalized Timeline
            </li>
          </Link>
          <li>
            <input
              id="landing-page-artifact-search-bar"
              type={'text'}
              placeholder="Search for Artifact"
            />
          </li>
        </ul>
      </div>

      <span className="translucent-banner">Travel Through Time</span>

      <ul id="exhibit-options-list">
        {/* First set of buttons, further apart */}
        <div id="exhibit-options-r1">
          <li>
            <SelectButton
              name="Ancient Greece"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </li>
          <li>
            <SelectButton
              name="Ancient Rome"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </li>
        </div>

        {/* Second set of buttons, closer together */}
        <div id="exhibit-options-r2">
          <li>
            <SelectButton
              name="Ancient Egypt"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </li>
          <li>
            <SelectButton
              name="Persian Empire"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </li>
        </div>
      </ul>
    </div>
  );
}
