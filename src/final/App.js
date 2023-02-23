import SelectButton from './components/SelectButton';
import { useEffect } from 'react';
import ancientgreece from '../images/ancient-greece.png';
import ancientrome from '../images/ancient-rome.png';
import ancientegypt from '../images/ancient-egypt.png';
import persianempire from '../images/persian-empire.png';
import museum from '../images/museum.png';



function App() {
  /** Adds the class 'home' to the body for the purpose of dynamic background image changes. */
  useEffect(() => {
    document.body.className = 'home';
    return () => { document.body.className = ''; }
  });

  /** Handles mousing over any of the exhibit buttons.
   * @TODO: Add transition to the background image change.
   */
  const handleMouseEnter = (event) => {
    const target = event.target;
    const button_id = ((target.innerText).toLowerCase()).replace(/\s/g, '');
    let image_id;

    switch(button_id) {
      case 'ancientgreece':
        image_id = {ancientgreece}.ancientgreece
        break;

      case 'ancientrome':
        image_id = {ancientrome}.ancientrome
        break;

      case 'ancientegypt':
        image_id = {ancientegypt}.ancientegypt
        break;

      case 'persianempire':
        image_id = {persianempire}.persianempire
        break;
    }
    document.body.style.background = "url(" + image_id + ")";
  };

  /** Handles mousing away from a button... changes the background image back to default
   * @TODO: Add transition to background image change.
   */
  const handleMouseLeave = (event) => {
    const image_id = {museum}.museum
    document.body.style.background = "url(" + image_id + ")";
  };

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

      {/* Create Personalized Timeline and Search for Artifact */}
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

      {/* Travel Through Time Banner */}
      <span className="translucent-banner">Travel Through Time</span>

      <ul id="exhibit-options-list">
        {/* First set of buttons, further apart */}
        <div id="exhibit-options-r1">
          <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <SelectButton name="Ancient Greece"  />
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
    </>
  );
}

export default App;
