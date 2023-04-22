import SelectButton from '../components/SelectButton';
import ancientgreece from '../images/ancient-greece.png';
import ancientrome from '../images/ancient-rome.png';
import ancientegypt from '../images/ancient-egypt.png';
import persianempire from '../images/persian-empire.png';
import museum from '../images/museum.png';
import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import Logo from '../components/Logo';
import { queryName } from '../utils/firestoreFunctions';
import { useState } from 'react';
import SearchSuggestions from '../components/SearchSuggestions';

export default function Home() {
  const presetTags = ['Weapons', 'Paintings', 'Tools', 'Technology'];
  const presetYearRange = [-2000, 2000];
  const [searchResults, setSearchResults] = useState([]);

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
    const homeDiv = document.querySelector('.' + styles['home']);
    homeDiv.style.backgroundImage = 'url(' + image_id + ')';
  };

  /** Handles mousing away from a button... changes the background image back to default
   * @TODO: Add transition to background image change.
   */
  const handleMouseLeave = (event) => {
    const image_id = museum;
    const homeDiv = document.querySelector('.' + styles['home']);
    homeDiv.style.backgroundImage = 'url(' + image_id + ')';
  };

  const getSuggestions = (event) => {
    const value = event.target.value;
    value === ''
      ? setSearchResults([])
      : queryName(value).then((results) => {
          setSearchResults(results);
        });
  };

  return (
    <>
      {/* The following line introduces an issue in the mobile design where there is vertical and horizontal overflow. */}
      <Logo
        color="var(--white)"
        style={{
          background: 'var(--translucent-grey)',
          width: 'calc(100% - 2em)',
          marginTop: 'unset',
          padding: '1dvh 1em',
        }}
      />
      {/* <Logo color="var(--white)" style={{marginTop: "unset", padding: "1dvh 1em"}} /> */}
      <div className={styles['home']}>
        <div className={styles['center']}>
          <ul className={styles['main-button-group']}>
            <Link
              className={styles['landing-page-main-button-link']}
              to="/customizer"
            >
              <li className={styles['landing-page-main-button']}>
                Create Personalized Timeline
              </li>
            </Link>
            <li>
              <input
                id={styles['landing-page-artifact-search-bar']}
                type="text"
                placeholder="Search for Artifact"
                onChange={getSuggestions}
              />
            </li>
          </ul>
          <SearchSuggestions results={searchResults} />
        </div>

        <span className={styles['translucent-banner']}>
          Travel Through Time
        </span>

        <ul id={styles['exhibit-options-list']}>
          {/* First set of buttons, further apart */}
          <div id={styles['exhibit-options-r1']}>
            <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Link
                to="/timeline"
                state={{
                  exhibitKeys: ['Ancient Greece'],
                  tagKeys: presetTags,
                  yearRange: presetYearRange,
                }}
              >
                <SelectButton name="Ancient Greece" />
              </Link>
            </li>
            <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Link
                to="/timeline"
                state={{
                  exhibitKeys: ['Ancient Rome'],
                  tagKeys: presetTags,
                  yearRange: presetYearRange,
                }}
              >
                <SelectButton name="Ancient Rome" />
              </Link>
            </li>
          </div>

          {/* Second set of buttons, closer together */}
          <div id={styles['exhibit-options-r2']}>
            <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Link
                to="/timeline"
                state={{
                  exhibitKeys: ['Ancient Egypt'],
                  tagKeys: presetTags,
                  yearRange: presetYearRange,
                }}
              >
                <SelectButton name="Ancient Egypt" />
              </Link>
            </li>
            <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Link
                to="/timeline"
                state={{
                  exhibitKeys: ['Persian Empire'],
                  tagKeys: presetTags,
                  yearRange: presetYearRange,
                }}
              >
                <SelectButton name="Persian Empire" />
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
}