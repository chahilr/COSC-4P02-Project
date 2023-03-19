import SelectButton from '../components/SelectButton';
import { useState } from 'react';
import TimelineItem from '../components/TimelineItem';
//import FileUpload from '../components/FileUpload';
import { createTheme, colors, ThemeProvider, Slider, Box, TextField, MenuItem, FormControl, InputLabel, Select, Button, Input} from '@mui/material';

import '../styles/AddArtifact.css';
//image upload stuff
import React from 'react';
import ImageUploading from 'react-images-uploading';



// Theme for Slider
const theme = createTheme({
  palette: {
    secondary: {
      main: colors.red[500],
    },
  },
});

export default function AddArtifact() {

  function handleChange() {

  }
  //new image stuff
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;
  
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  
  //

//image stuff
const [myFile, setFile] = useState('');
const input = document.querySelector("uploadFile")
const output = document.querySelector("output")
const image = null
let imagesArray = []

  function uploadFile(){
  	alert("uploading");
  	  	console.log("uploading");
  	console.image(myFile);
  }


//

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
            <span style={{ color: 'white' }}>Canadian Museum of History</span>
            <hr style={{ borderColor: 'black' }}></hr>
            <span style={{ color: 'white' }}>Museé Canadien de L'Histoire</span>
          </div>
          <div id="logout">
            <Button
              variant="contained"
              component="label"
              color='secondary'
            >
              Logout

            </Button>
          </div>
        </div>

      </div>

      <div style={{ width: '80%', margin: '75px auto' }}>


      </div>




      <div id="artifact-add-form">


        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div id="form-outer">
            <div id="left">
              <div id="name">
                <TextField id="name" label="Name of Artifact" variant="filled" color='secondary' />
              </div>

              <div id="date">
                <h1>Date of exhibit</h1>
                <TextField id="date" variant="standard" placeholder="Year" color='secondary' />


                <div>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" color='secondary'>Age</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value="age"
                      label="Age"
                      onChange={handleChange}
                      color='secondary'
                    >
                      <MenuItem value={"bc"}>BC</MenuItem>
                      <MenuItem value={"ad"}>AD</MenuItem>
                    </Select>

                  </FormControl>
                </div>



              </div>

              <div id="exhibit">
                <FormControl fullWidth>
                  <InputLabel id="exhibit-label" color='secondary' >Exhibit</InputLabel>
                  <Select
                    labelId="exhibit-label"
                    id="exhibit"
                    value="exhibit"
                    label="Exhibit"
                    onChange={handleChange}
                    color='secondary'
                  >
                    <MenuItem value={"Greece"}>Greece</MenuItem>
                    <MenuItem value={"Rome"}>Rome</MenuItem>
                    <MenuItem value={"Egypt"}>Egypt</MenuItem>
                    <MenuItem value={"Persian"}>Persian</MenuItem>
                  </Select>

                </FormControl>
              </div>



              <div id="upload">

                <Button
                  variant="contained"
                  component="label"
                  color='secondary'
                >
                  Upload File
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/jpg"
                    onChange={uploadFile}
                    value={myFile}
                    hidden
                  />
                </Button>

              </div>

            </div>

            <div id="right">
              <div id="description">
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={15}
                  defaultValue=""
                  color='secondary'
                />
              </div>
            </div>
            <div id="add">

              <Button
                variant="contained"
                component="label"
                id="add-button"
                color='secondary'
              >
                Add
              </Button>

            </div>
            <img id="myImage" src={myFile} />
          </div>
          
          <div>
                
          </div>
        </Box>








<div className="upload">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;

            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>



      </div>
      
    </ThemeProvider>
    
    


  );
}
