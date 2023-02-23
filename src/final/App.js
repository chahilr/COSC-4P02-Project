import { createTheme, colors, ThemeProvider } from '@mui/material';
import SelectButton from './components/SelectButton';
import { useState, useEffect } from 'react';
import YearRangeSlider from './components/YearRangeSlider';

const theme = createTheme({
  palette: {
    secondary: {
      main: colors.red[500],
    },
  },
});

// function App() {
//   useEffect(() => {
//     document.body.className = 'home';
//     return () => {
//       document.body.className = '';
//     };
//   });

//   return (
//     <>
//       <div id="logo-and-language">
//         {/* Logo */}
//         <div className="logo">
//           <div className="logo-image">
//             <img
//               src={require('../images/museum-logo.jpg')}
//               alt="Museum logo"
//               style={{ float: 'left', marginRight: '10px' }}
//             />
//           </div>

//           <div className="logo-text">
//             <span>Canadian Museum of History</span>
//             <hr></hr>
//             <span>Museé Canadien de L'Histoire</span>
//           </div>

//           <div style={{ clear: 'both' }}></div>
//         </div>

//         {/* Language */}
//         <div className="logo-text">
//           <span>Language Select</span>
//         </div>
//       </div>

//       <div className="center">
//         <ul id="main-button-group">
//           <li>Create Personalized Timeline</li>
//           <li>Search for Artifact</li>
//         </ul>
//       </div>

//       <span className="translucent-banner">Travel Through Time</span>

//       <ul id="exhibit-options-list">
//         {/* First set of buttons, further apart */}
//         <div id="exhibit-options-outer">
//           <li>
//             <SelectButton name="Ancient Greece" />
//           </li>
//           <li>
//             <SelectButton name="Ancient Rome" />
//           </li>
//         </div>

//         {/* Second set of buttons, closer together */}
//         <div id="exhibit-options-inner">
//           <li>
//             <SelectButton name="Ancient Egypt" />
//           </li>
//           <li>
//             <SelectButton name="Persian Empire" />
//           </li>
//         </div>
//       </ul>
//     </>
//   );
// }

function App() {
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
              src={require('../images/museum-logo.jpg')}
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

export default App;
