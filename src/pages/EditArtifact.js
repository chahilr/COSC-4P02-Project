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
  OutlinedInput,
  ListItemText,
  Checkbox,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import styles from '../styles/EditArtifact.module.css';
//image upload stuff
import ImageUploading from 'react-images-uploading';
import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import {
  getDescrption,
  updateArtifact,
  deleteArtifact,
} from '../utils/firestoreFunctions';
import { storage } from '../utils/FirebaseApp.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const theme = createTheme({
  palette: {
    secondary: {
      main: colors.red[500],
    },
  },
});

const CssTextField = styled(TextField)({
  marginTop: 10,
  '& label.Mui-focused': {
    color: 'red',
    padding: '0 6px 0 6px',
    backgroundColor: 'white',
    borderRadius: '5px',
    borderColor: 'red',
  },
  '& label': {
    fontSize: '1.3rem',
    padding: '0 6px 0 6px',
    backgroundColor: 'white',
    borderRadius: '5px',
  },

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'red',
      borderRadius: '25px',
    },
    '&:hover fieldset': {
      borderColor: '#ff726f',
      borderRadius: '25px',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'red',
      borderRadius: '25px',
    },
  },
});

const CssFormField = styled(FormControl)({
  marginTop: 30,
  backgroundColor: 'white',
  borderRadius: '25px',
  width: 400,
  '& label.Mui-focused': {
    color: 'red',
    padding: '0 6px 0 6px',
    backgroundColor: 'white',
    borderRadius: '5px',
    borderColor: 'red',
  },
  '& label': {
    fontSize: '1.3rem',
    padding: '0 6px 0 6px',
    backgroundColor: 'white',
    borderRadius: '5px',
  },

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'red',
      borderRadius: '25px',
    },
    '&:hover fieldset': {
      borderColor: '#ff726f',
      borderRadius: '25px',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'red',
      borderRadius: '25px',
    },
  },
});

export default function EditArtifact() {
  const { state } = useLocation();
  const id = state?.id;
  const [name, setName] = useState(state?.Name);
  const [year, setYear] = useState(state?.Year);
  const [era, setEra] = useState('');
  const [description, setDescription] = useState('');
  const [exhibit, setExibit] = useState(state?.Exhibition);
  const [tags, setTags] = useState(state?.Tags);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(state?.Photos[0]);
  const [newPicture, setNewPicture] = useState([state?.Photos[0]]);
  const [newPictureGiven, setNewPictureGiven] = useState(false);
  const [finalButtonPressed, setFinalButtonPressed] = useState(false);
  const [wantToDelete, setWantToDelete] = useState(false);
  const [percent, setPercent] = useState(0);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const tagNames = ['Paintings', 'Technology', 'Weapons', 'Tools'];

  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  //drop down menu for exhibit
  function onMenuChange(event) {
    setExibit(event.target.value);
  }

  function onNameChange(event) {
    setName(event.target.value);
  }

  function onEraChange(event) {
    setEra(event.target.value);
  }

  function onDateChange(event) {
    setYear(event.target.value);
  }

  function onDescriptionChange(event) {
    setDescription(event.target.value);
  }

  const addToDatabase = (event) => {
    console.log(exhibit);
    console.log(name);
    console.log(year);
    console.log(era);
    console.log(tags);
    console.log(description);
    console.log(newPicture);

    var updatedYear = parseInt(year);

    if (era === 'BC') {
      updatedYear = -Math.abs(updatedYear);
    }

    updateArtifact(
      id,
      name,
      updatedYear,
      description,
      exhibit,
      tags,
      newPicture
    );
    alert('Artifact Updated!');
  };

  useEffect(
    () => {
      getDescrption(state?.id).then((result) => {
        setDescription(result.content);
      });
      if (newPictureGiven) {
        addToDatabase();
      }
      if (year < 0) {
        setYear(year * -1);
        setEra(`BC`);
        console.log('bcccc');
      } else {
        setEra(`AD`);
      }
    },
    [newPicture, newPictureGiven],
    year
  );

  const onDeleteArtifact = async (event) => {
    setWantToDelete(true);
  };

  const cancelButton = async (event) => {
    setWantToDelete(false);
  };

  const confirmDeleteTheArtifact = async (event) => {
    await deleteArtifact(id);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setUrl(reader.result);
    };
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    setFinalButtonPressed(true);

    if (
      !name ||
      !year ||
      !era ||
      !exhibit ||
      !description ||
      tags.length == 0
    ) {
      if (year > 2000 || year < 0) {
        alert(
          'The year needs to be between 0-2000. There could be missing data too, re-check the form!'
        );
      } else {
        alert('Missing data, re-check the form!');
      }
    } else if (
      file &&
      !(!name || !year || !era || !exhibit || !description || tags.length == 0)
    ) {
      const storageRef = ref(storage, `/Pictures/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            setNewPicture([url]);
            setNewPictureGiven(true);
          });
        }
      );
    } else {
      setNewPicture([url]);
      setNewPictureGiven(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Logo
        color="var(--white)"
        style={{
          position: 'relative',
          backgroundColor: 'var(--translucent-grey)',
          marginTop: 'unset',
          padding: '1dvh 1em',
        }}
      />
      <div id={styles['logout']}>
        <Button variant="contained" component="label" color="secondary">
          Logout
        </Button>
      </div>
      <div className={styles['body-overlay']}>
        <Grid sx={{ flexGrow: 1 }} container id={styles['container']}>
          <h1 id={styles['title']}>Edit Artifact</h1>
          <Grid item xs={500}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid
                item
                sx={{
                  height: 500,
                  width: 430,
                  backgroundColor: 'var(--translucent-grey)',
                  margin: 1,
                  borderRadius: '25px',
                }}
              >
                <CssTextField
                  label="Name"
                  sx={{ backgroundColor: 'white', borderRadius: '25px' }}
                  value={name}
                  onChange={(e) => onNameChange(e)}
                />

                {finalButtonPressed && !name && (
                  <p className={styles['error-msg']}>*Name is required</p>
                )}
                <br />
                <CssTextField
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '25px',
                    marginTop: 3,
                  }}
                  label="Year"
                  type="number"
                  value={year}
                  onChange={(e) => onDateChange(e)}
                />

                <CssFormField sx={{ marginTop: 3, marginLeft: 3, width: 100 }}>
                  <InputLabel id="age-label">Era</InputLabel>
                  <Select
                    inputProps={{ MenuProps: { disableScrollLock: true } }}
                    labelId="era-label"
                    id="era"
                    value={era}
                    onChange={onEraChange}
                  >
                    <MenuItem value="AD">AD</MenuItem>
                    <MenuItem value="BC">BC</MenuItem>
                  </Select>
                </CssFormField>
                {finalButtonPressed && !year && (
                  <p className={styles['error-msg']}>*Year is required</p>
                )}
                {finalButtonPressed && !era && (
                  <p className={styles['error-msg']}>*Era is required</p>
                )}
                {finalButtonPressed && (year < 0 || year > 2000) && (
                  <p className={styles['error-msg']}>
                    *Year needs to be between 0-2000
                  </p>
                )}
                <br />
                <CssFormField>
                  <InputLabel id={styles['exhibit-label']} color="secondary">
                    Exhibit
                  </InputLabel>
                  <Select
                    inputProps={{ MenuProps: { disableScrollLock: true } }}
                    labelId="exhibit-label"
                    id={styles['exhibit']}
                    value={exhibit}
                    label="Exhibit"
                    onChange={(e) => onMenuChange(e)}
                    color="secondary"
                  >
                    <MenuItem value={'Ancient Greece'}>Ancient Greece</MenuItem>
                    <MenuItem value={'Ancient Rome'}>Ancient Rome</MenuItem>
                    <MenuItem value={'Ancient Egypt'}>Ancient Egypt</MenuItem>
                    <MenuItem value={'Persian Empire'}>Persian Empire</MenuItem>
                  </Select>
                </CssFormField>
                {finalButtonPressed && !exhibit && (
                  <p className={styles['error-msg']}>*Select an Exhibit</p>
                )}
                <br />

                <CssFormField>
                  <InputLabel>Tags</InputLabel>
                  <Select
                    inputProps={{ MenuProps: { disableScrollLock: true } }}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={tags}
                    onChange={handleTagChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    color="secondary"
                  >
                    {tagNames.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={tags.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </CssFormField>
                {finalButtonPressed && tags.length == 0 && (
                  <p className={styles['error-msg']}>
                    *At least one Tag is required
                  </p>
                )}
              </Grid>

              {wantToDelete && (
                <div
                  className={styles['delete-preview']}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h1 className={styles['artifact-title']}>
                    Are you sure you want to delete?
                  </h1>
                  <button
                    className={styles['cancel-button']}
                    onClick={cancelButton}
                  >
                    Cancel
                  </button>
                  <Link to="/artifactlist" style={{ textDecoration: 'none' }}>
                    <button
                      className={styles['submit-button']}
                      onClick={confirmDeleteTheArtifact}
                    >
                      ! Delete !
                    </button>
                  </Link>
                </div>
              )}

              <Grid
                item
                sx={{
                  height: 630,
                  width: 385,
                  backgroundColor: 'var(--translucent-grey)',
                  margin: 1,
                  borderRadius: '25px',
                }}
              >
                <CssTextField
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '25px',
                    width: 350,
                  }}
                  id="description"
                  label="Description"
                  value={description}
                  multiline
                  rows={15}
                  onChange={(e) => onDescriptionChange(e)}
                />
                {finalButtonPressed && !description && (
                  <p className={styles['error-msg']}>
                    *Description cannot be empty!
                  </p>
                )}

                <div className={styles['update-delete-button-container']}>
                  <button
                    className={'secondary-button'}
                    onClick={(e) => handleUpload(e)}
                  >
                    Update Artifact
                  </button>

                  <button
                    className={'secondary-button'}
                    onClick={(e) => onDeleteArtifact(e)}
                  >
                    !! Delete Artifact !!
                  </button>
                </div>
              </Grid>

              <Grid
                item
                sx={{
                  height: 'fit-content',
                  width: 500,
                  backgroundColor: 'var(--translucent-grey)',
                  margin: 1,
                  borderRadius: '25px',
                }}
              >
                {url && (
                  <div>
                    <img
                      className={styles['new-img']}
                      src={url}
                      alt="Uploaded image"
                    />
                  </div>
                )}

                {!url && (
                  <label className={styles['no-url-upload']}>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    Click To Select Image
                  </label>
                )}

                {finalButtonPressed && !url && (
                  <p className={styles['error-msg']}>*An Image is required</p>
                )}

                {url && (
                  <label className={styles['custom-file-upload']}>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    Change Image
                  </label>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
