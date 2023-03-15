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
  );
}
