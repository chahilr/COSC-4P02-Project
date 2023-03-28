<<<<<<< HEAD
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
=======
import SelectButton from '../components/SelectButton';
import { useState } from 'react';
import TimelineItem from '../components/TimelineItem';
import { createTheme, colors, ThemeProvider, Slider } from '@mui/material';

// Theme for Slider
const theme = createTheme({
  palette: {
    secondary: {
      main: colors.red[500],
    },
  },
});

export default function TimelineCustomizer() {
  const [selectedExhibits, setSelectedExhibits] = useState(
    // stores what exhibits are clicked
    new Map([
      ['Ancient Greece', false],
      ['Ancient Rome', false],
      ['Ancient Egypt', false],
      ['Persian Empire', false],
    ])
  );
  const [selectedTags, setSelectedTags] = useState(
    // stores what tags are clicked
    new Map([
      ['Paintings', false],
      ['Technology', false],
      ['Weapons', false],
      ['Tools', false],
    ])
  );

  const [yearRange, setYearRange] = useState([-1000, 1000]); // stores [start year, end year] from slider

  // handles button clicks
  function toggle(buttonName) {
    if (selectedExhibits.get(buttonName) !== undefined) {
      setSelectedExhibits(
        (prevSelectedExhibits) =>
          new Map([
            ...prevSelectedExhibits,
            [buttonName, !selectedExhibits.get(buttonName)],
          ])
      );
    } else {
      setSelectedTags(
        (prevSelectedTags) =>
          new Map([
            ...prevSelectedTags,
            [buttonName, !selectedTags.get(buttonName)],
          ])
      );
    }
  }

  // when search button is clicked, user inputs are retrieved.
  function getUserInputs() {
    let exhibitKeys = [];
    for (let key of selectedExhibits.keys()) {
      if (selectedExhibits.get(key)) {
        exhibitKeys.push(key);
      }
    }
    let tagKeys = [];
    for (let key of selectedTags.keys()) {
      if (selectedTags.get(key)) {
        tagKeys.push(key);
      }
    }
    console.log(exhibitKeys, tagKeys, yearRange);
  }

  return (
    <ThemeProvider theme={theme}>
      <div
        id="logo-and-language"
        style={{ backgroundColor: 'transparent', marginBottom: '100px' }}
>>>>>>> EditTimelineArtifacts
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
<<<<<<< HEAD
            <span style={{ color: 'white' }}>Canadian Museum of History</span>
            <hr style={{ borderColor: 'white' }}></hr>
            <span style={{ color: 'white' }}>Museé Canadien de L'Histoire</span>
=======
            <span style={{ color: 'black' }}>Canadian Museum of History</span>
            <hr style={{ borderColor: 'black' }}></hr>
            <span style={{ color: 'black' }}>Museé Canadien de L'Histoire</span>
>>>>>>> EditTimelineArtifacts
          </div>

          <div style={{ clear: 'both' }}></div>
        </div>
      </div>
<<<<<<< HEAD
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
      </div>
    </>
=======

      <div style={{ width: '80%', margin: '75px auto' }}>
	//verticle slider
	<Slider
  sx={{
    '& input[type="range"]': {
      WebkitAppearance: 'slider-vertical',
    },
  }}
  orientation="vertical"
  defaultValue={30}
  aria-label="Temperature"
  valueLabelDisplay="auto"
  //onKeyDown={preventHorizontalKeyboardNavigation}
/>






<TimelineItem name = "test"/>



      </div>
    </ThemeProvider>
>>>>>>> EditTimelineArtifacts
  );
}
