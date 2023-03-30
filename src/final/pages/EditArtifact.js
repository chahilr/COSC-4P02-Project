import {
  createTheme,
  colors,
  ThemeProvider,
  Box,
  TextField,
  Button,
} from '@mui/material';

import styles from '../styles/EditArtifact.module.css';
//image upload stuff
import ImageUploading from 'react-images-uploading';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../components/Logo';

/**
 * Fahad Umair / Evan's code as reference
 * March 19th, 2023
 */

// Theme for Slider
const theme = createTheme({
  palette: {
    secondary: {
      main: colors.red[500],
    },
  },
});

export default function EditArtifact() {
  const { state } = useLocation();
  const [name, setName] = useState(state.name);
  const [year, setYear] = useState(state.year);
  const [era, setEra] = useState(state.era);
  const [description, setDescription] = useState(state.description);
  const [exhibit, setExibit] = useState(state.exhibit);

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
                  label="Name"
                  defaultValue={name}
                  variant="filled"
                  color="secondary"
                />
              </div>

              <div id={styles['date']}>
                <TextField
                  id="date"
                  label="Year"
                  defaultValue={year}
                  variant="filled"
                  color="secondary"
                />
                <TextField
                  id="age"
                  label="Age"
                  defaultValue={era}
                  variant="filled"
                  color="secondary"
                />
              </div>

              <div id={styles['exhibit']}>
                <TextField
                  id="exhibit"
                  label="Exhibit"
                  defaultValue={exhibit}
                  variant="filled"
                  color="secondary"
                />
              </div>
            </div>

            <div id={styles['right']}>
              <div id={styles['description']}>
                <TextField
                  id="description"
                  label="Description"
                  defaultValue={description}
                  multiline
                  rows={15}
                  color="secondary"
                />
              </div>
            </div>
          </div>
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
