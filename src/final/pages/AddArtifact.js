import SelectButton from '../components/SelectButton';
import { useState } from 'react';
import TimelineItem from '../components/TimelineItem';
//import FileUpload from '../components/FileUpload';
import { createTheme, colors, ThemeProvider, Slider, Box, TextField, MenuItem, FormControl,InputLabel, Select, Button, Input} from '@mui/material';

// Theme for Slider
const theme = createTheme({
  palette: {
    secondary: {
      main: colors.red[500],
    },
  },
});

export default function AddArtifact() {

	function handleChange(){
	
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


      </div>
      
      
      
      
      <div>
      
      
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >

      <TextField id="name" label="Item Name" variant="filled" />
      <div>
      <h1>date of exhibit</h1>
      <TextField id="date" label="Year" variant="standard" />
      
      
<div>
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value="age"
    label="Age"
    onChange={handleChange}
  >
  <MenuItem value={"bc"}>BC</MenuItem>
    <MenuItem value={"ad"}>AD</MenuItem>
  </Select>
  
  </FormControl>
  </div>
  
  
  
      </div>
      
      
      
      
      
      <div>

<Button
  variant="contained"
  component="label"
>
  Upload File
  <input
    type="file"
    hidden
  />
</Button>

      </div>
      
      <div>
      <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          defaultValue=""
        />
      </div>
      
      <div>
      
<Button
  variant="contained"
  component="label"
>
  Update
</Button>

      </div>
    </Box>
    
    
    
    
    
      </div>
    </ThemeProvider>
    
   
  );
}
