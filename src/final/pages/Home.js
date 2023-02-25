import SelectButton from '../components/SelectButton';
import ancientgreece from '../../images/ancient-greece.png';
import ancientrome from '../../images/ancient-rome.png';
import ancientegypt from '../../images/ancient-egypt.png';
import persianempire from '../../images/persian-empire.png';
import museum from '../../images/museum.png';
import { Link } from 'react-router-dom';

export default function Home() {
  /** Handles mousing over any of the exhibit buttons. */
  const handleMouseEnter = (event) => {
    const target = event.target;
    const button_id = target.innerText.toLowerCase().replace(/\s/g, '');
    let image_id;

    switch (button_id) {
      case 'ancientgreece':
        image_id = ancientgreece;
        break;

      case 'ancientrome':
        image_id = ancientrome;
        break;

      case 'ancientegypt':
        image_id = ancientegypt;
        break;

      case 'persianempire':
        image_id = persianempire;
        break;
      default:
    }
    const homeDiv = document.querySelector('.home');
    homeDiv.style.backgroundImage = 'url(' + image_id + ')';
    homeDiv.style.transitionDuration = '200ms';
  };

  /** Handles mousing away from a button... changes the background image back to default
   * @TODO: Add transition to background image change.
   */
  const handleMouseLeave = (event) => {
    const image_id = museum;
    const homeDiv = document.querySelector('.home');
    homeDiv.style.backgroundImage = 'url(' + image_id + ')';
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
          <Link className="landing-page-main-button-link" to="/customizer">
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
          <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <SelectButton name="Ancient Greece" />
          </li>
          <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <SelectButton name="Ancient Rome" />
          </li>
        </div>

        {/* Second set of buttons, closer together */}
        <div id="exhibit-options-r2">
          <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <SelectButton name="Ancient Egypt" />
          </li>
          <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <SelectButton name="Persian Empire" />
          </li>
        </div>
      </ul>
    </div>
  );
}
