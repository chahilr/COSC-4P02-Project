import SelectButton from '../components/SelectButton';
import { useState } from 'react';
import YearRangeSlider from '../components/YearRangeSlider';
import { createTheme, colors, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

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
    if (exhibitKeys.length === 0 || tagKeys.length === 0) {
      return null;
    }
    return { exhibitKeys, tagKeys, yearRange };
  }

  return (
    <ThemeProvider theme={theme}>
      <Logo color="var(--black)" style={{ position: 'relative' }} />

      <h4 className="instruction-heading">Select one or more exhibits</h4>
      <div className="button-row">
        {/* Row of Exhibit Buttons */}
        <SelectButton name="Ancient Greece" onClick={toggle} />
        <SelectButton name="Ancient Rome" onClick={toggle} />
        <SelectButton name="Ancient Egypt" onClick={toggle} />
        <SelectButton name="Persian Empire" onClick={toggle} />
      </div>
      <h4 className="instruction-heading">Select one or more tags</h4>
      {/* Row of Tag Buttons */}
      <div className="button-row">
        <SelectButton name="Paintings" onClick={toggle} />
        <SelectButton name="Technology" onClick={toggle} />
        <SelectButton name="Weapons" onClick={toggle} />
        <SelectButton name="Tools" onClick={toggle} />
      </div>
      <h4 className="instruction-heading">Filter your date range</h4>
      <div style={{ width: '80%', margin: '75px auto' }}>
        {/* Slider */}
        <YearRangeSlider
          value={yearRange}
          onChange={(e, data) => {
            setYearRange(data);
          }}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        {getUserInputs() != null ? (
          <Link
            style={{
              textDecoration: 'none',
              display: 'inline-block',
            }}
            to={getUserInputs() != null ? '/timeline' : '#'}
            state={getUserInputs()}
          >
            <button className="submit-button">Search</button>
          </Link>
        ) : (
          <button
            className="submit-button"
            onClick={() => alert('Must add atleast 1 exhibit and tag!')}
          >
            Search
          </button>
        )}
      </div>
    </ThemeProvider>
  );
}
