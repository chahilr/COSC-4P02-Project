import SelectButton from '../components/SelectButton';
import { useState } from 'react';
import YearRangeSlider from '../components/YearRangeSlider';
import { createTheme, colors, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    secondary: {
      main: colors.red[500],
    },
  },
});

export default function TimelineCustomizer() {
  // TODO: Clicking buttons does not always flip boolean for exhibits/tags
  let selectedExhibits = {
    'Ancient Greece': false,
    'Ancient Rome': false,
    'Ancient Egypt': false,
    'Persian Empire': false,
  };
  let selectedTags = {
    Paintings: false,
    Technology: false,
    Weapons: false,
    Tools: false,
  };

  const [val, setVal] = useState([-1000, 1000]);

  function toggle(buttonName) {
    if (selectedExhibits[buttonName] != null) {
      selectedExhibits[buttonName] = !selectedExhibits[buttonName];
    } else {
      selectedTags[buttonName] = !selectedTags[buttonName];
    }
    // console.log(
    //   Object.keys(selectedExhibits).filter((key) => selectedExhibits[key])
    // );
    // console.log(Object.keys(selectedTags).filter((key) => selectedTags[key]));
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
      <h4 className="instruction-heading">Select one or more exhibits</h4>
      <div className="button-row">
        <SelectButton name="Ancient Greece" onClick={toggle} />
        <SelectButton name="Ancient Rome" onClick={toggle} />
        <SelectButton name="Ancient Egypt" onClick={toggle} />
        <SelectButton name="Persian Empire" onClick={toggle} />
      </div>
      <h4 className="instruction-heading">Select one or more tags</h4>
      {/* Create Personalized Timeline and Search for Artifact */}
      <div className="button-row">
        <SelectButton name="Paintings" onClick={toggle} />
        <SelectButton name="Technology" onClick={toggle} />
        <SelectButton name="Weapons" onClick={toggle} />
        <SelectButton name="Tools" onClick={toggle} />
      </div>
      <h4 className="instruction-heading">Filter your date range</h4>
      <div style={{ width: '80%', margin: '75px auto' }}>
        <YearRangeSlider
          value={val}
          onChange={(e, data) => {
            setVal(data);
          }}
        />
      </div>
      <button
        className="submit-button"
        onClick={() => console.log(selectedExhibits, selectedTags, val)}
      >
        Search
      </button>
    </ThemeProvider>
  );
}
