//import FileUpload from '../components/FileUpload';
import {
  createTheme,
  colors,
  ThemeProvider,
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
} from '@mui/material';

import styles from '../styles/AddArtifact.module.css';
//image upload stuff
import ImageUploading from 'react-images-uploading';
import { useState } from 'react';
import Logo from '../components/Logo';

// Theme for Slider
const theme = createTheme({
  palette: {
    secondary: {
      main: colors.red[500],
    },
  },
});

export default function AddArtifact() {
  function handleChange() {}
  //new image stuff
  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <ThemeProvider theme={theme}>
      <Logo />
      <div id={styles['logout']}>
        <Button variant="contained" component="label" color="secondary">
          Logout
        </Button>
      </div>

      <div style={{ width: '80%', margin: '75px auto' }}></div>

      <div id={styles['artifact-add-form']}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div id={styles['form-outer']}>
            <div id={styles['left']}>
              <div id={styles['name']}>
                <TextField
                  id="name"
                  label="Name of Artifact"
                  variant="filled"
                  color="secondary"
                />
              </div>

              <div id={styles['date']}>
                <h1>Date of exhibit</h1>
                <TextField
                  id="date"
                  variant="standard"
                  placeholder="Year"
                  color="secondary"
                />

                <div>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" color="secondary">
                      Age
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value="age"
                      label="Age"
                      onChange={handleChange}
                      color="secondary"
                    >
                      <MenuItem value={'bc'}>BC</MenuItem>
                      <MenuItem value={'ad'}>AD</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div id={styles['exhibit']}>
                <FormControl fullWidth>
                  <InputLabel id="exhibit-label" color="secondary">
                    Exhibit
                  </InputLabel>
                  <Select
                    labelId="exhibit-label"
                    id="exhibit"
                    value="exhibit"
                    label="Exhibit"
                    onChange={handleChange}
                    color="secondary"
                  >
                    <MenuItem value={'Greece'}>Greece</MenuItem>
                    <MenuItem value={'Rome'}>Rome</MenuItem>
                    <MenuItem value={'Egypt'}>Egypt</MenuItem>
                    <MenuItem value={'Persian'}>Persian</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div id={styles['upload']}>
                <Button variant="contained" component="label" color="secondary">
                  Upload File
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/jpg"
                    hidden
                  />
                </Button>
              </div>
            </div>

            <div id={styles['right']}>
              <div id={styles['description']}>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={15}
                  defaultValue=""
                  color="secondary"
                />
              </div>
            </div>
            <div id={styles['add']}>
              <Button
                variant="contained"
                component="label"
                id="add-button"
                color="secondary"
              >
                Add
              </Button>
            </div>
          </div>

          <div></div>
        </Box>

        <div className={styles['upload']}>
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
              <div className={styles['upload__image-wrapper']}>
                <button
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Upload File (click or drop here)
                </button>
                &nbsp;
                {imageList.map((image, index) => (
                  <div key={index} className={styles['image-item']}>
                    <img src={image['data_url']} alt="" width="100" />
                    <div className={styles['image-item__btn-wrapper']}>
                      <button onClick={() => onImageUpdate(index)}>
                        Update
                      </button>
                      <button onClick={() => onImageRemove(index)}>
                        Remove
                      </button>
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
