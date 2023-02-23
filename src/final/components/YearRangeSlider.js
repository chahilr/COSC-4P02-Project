import { Slider } from '@mui/material';

function formatYear(val) {
  return val < 0 ? `${-val}BCE` : `${val}AD`;
}

function YearRangeSlider(props) {
  return (
    <>
      <Slider
        color="secondary"
        value={props.value}
        onChange={props.onChange}
        valueLabelDisplay="on"
        valueLabelFormat={formatYear}
        min={-2000}
        max={2000}
      />
    </>
  );
}

export default YearRangeSlider;
