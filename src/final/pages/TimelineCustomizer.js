import React from 'react';
import '../styles/ArtifactOverview.css';
import { createTheme, colors, ThemeProvider } from '@mui/material';

export default function ArtifactOverview() {
  const theme = createTheme({
    palette: {
      primary: {
        main: colors.blue[500],
      },
    },
  });

  return (
    <div className="artifact-container">
      <div className="artifact-text">
        <h2>Mask of Agamemnon</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse consequat ut dui sit amet semper. Curabitur pharetra lacus in tellus tincidunt posuere. Pellentesque finibus purus vitae nunc efficitur vulputate. Suspendisse commodo magna at ornare porttitor. Sed dapibus sed dui ut tempus. Nunc elementum sagittis odio et suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum tempus facilisis. Ut in convallis purus, ac vestibulum quam. Fusce dolor lacus, finibus eu tellus non, porta vulputate felis. Donec pretium purus risus, et porta risus tempus eget. Vivamus a bibendum metus, vitae commodo tellus. Etiam volutpat justo diam, in rhoncus enim vulputate a.</p>
      </div>
      <div className="artifact-image">
        <img src={require('../../images/MaskOfAgamemnon.jpg')} />
      </div>
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
      </ThemeProvider>
    </div>
  );
}
