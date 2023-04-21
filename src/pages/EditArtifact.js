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
} from '@mui/material';

import styles from '../styles/EditArtifact.module.css';
//image upload stuff
import ImageUploading from 'react-images-uploading';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import { getDescrption, updateArtifact } from '../utils/firestoreFunctions';
import { storage } from '../utils/FirebaseApp.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const theme = createTheme({
  palette: {
    secondary: {
      main: colors.red[500],
    },
  },
});

export default function EditArtifact() {
  const { state } = useLocation();
  const id = state?.id;
  const [name, setName] = useState(state?.Name);
  const [year, setYear] = useState(state?.Year);
  // const [era, setEra] = useState(state?.era);
  const [description, setDescription] = useState('');
  const [exhibit, setExibit] = useState(state?.Exhibition);
  const [tags, setTags] = useState(state?.Tags);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(state?.Photos[0]);
  const [newPicture, setNewPicture] = useState([state?.Photos[0]]);
  const [newPictureGiven, setNewPictureGiven] = useState(false);
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

  console.log(tags);

  //drop down menu for exhibit
  function onMenuChange(event) {
    setExibit(event.target.value);
  }

  function onNameChange(event) {
    setName(event.target.value);
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
    console.log(tags);
    console.log(description);
    console.log(newPicture);

    updateArtifact(
      id,
      name,
      parseInt(year),
      description,
      exhibit,
      tags,
      newPicture
    );
    alert('Artifact Updated!');
  };

  useEffect(() => {
    getDescrption(state?.id).then((result) => {
      setDescription(result.content);
    });
    if (newPictureGiven) {
      addToDatabase();
    }
  }, [newPicture, newPictureGiven]);

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

    if (!file) {
      alert('Please upload an image first!');
    }

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
  };

  return (
    <ThemeProvider theme={theme}>
      <Logo />
      <div id={styles['logout']}>
        <Button variant="contained" component="label" color="secondary">
          Logout
        </Button>
      </div>

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
                  onChange={(e) => onNameChange(e)}
                />
              </div>

              <div id={styles['date']}>
                <TextField
                  id="date"
                  label="Year"
                  defaultValue={year}
                  variant="filled"
                  color="secondary"
                  onChange={(e) => onDateChange(e)}
                />
                <TextField
                  id="age"
                  label="Age"
                  variant="filled"
                  color="secondary"
                  defaultValue={year < 0 ? 'BC' : 'AD'}
                />
              </div>

              <div id={styles['exhibit']}>
                <FormControl fullWidth>
                  <InputLabel id={styles['exhibit-label']} color="secondary">
                    Exhibit
                  </InputLabel>
                  <Select
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
                </FormControl>
              </div>

              <div>
                <FormControl id={styles['tag']}>
                  <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                  <Select
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
                </FormControl>
              </div>

              {url && (
                <div>
                  <img src={url} alt="Uploaded image" />
                </div>
              )}
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                id={styles['chooseButton']}
              />
              <button onClick={(e) => handleUpload(e)} disabled={!file}>
                Update
              </button>
            </div>

            <div id={styles['right']}>
              <div id={styles['description']}>
                <TextField
                  id="description"
                  label="Description"
                  value={description}
                  multiline
                  rows={15}
                  color="secondary"
                  onChange={(e) => onDescriptionChange(e)}
                />
              </div>
            </div>
          </div>
        </Box>
      </div>
    </ThemeProvider>
  );
}
