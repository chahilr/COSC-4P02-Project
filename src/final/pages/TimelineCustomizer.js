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
  /** Adds the class 'home' to the body for the purpose of dynamic background image changes. */
  const [val, setVal] = useState([-1000, 1000]);

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
        <SelectButton name="Ancient Greece" />
        <SelectButton name="Ancient Rome" />
        <SelectButton name="Ancient Egypt" />
        <SelectButton name="Persian Empire" />
      </div>
      <h4 className="instruction-heading">Select one or more tags</h4>
      {/* Create Personalized Timeline and Search for Artifact */}
      <div className="button-row">
        <SelectButton name="Paintings" />
        <SelectButton name="Technology" />
        <SelectButton name="Weapons" />
        <SelectButton name="Tools" />
      </div>
      <h4 className="instruction-heading">Filter your date range</h4>
      <div style={{ width: '80%', margin: '75px auto' }}>
        <YearRangeSlider value={val} onChange={(e, data) => setVal(data)} />
      </div>
      <button className="submit-button">Search</button>
    </ThemeProvider>
  );
}
