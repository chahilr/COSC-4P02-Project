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
  Grid,Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import styles from '../styles/AddArtifact.module.css';
//image upload stuff
import ImageUploading from 'react-images-uploading';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import { getDescrption, addArtifact } from '../utils/firestoreFunctions';
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
    marginTop:10,
  '& label.Mui-focused': {
    color: 'red',
    padding:'0 6px 0 6px',
    backgroundColor:'white',
    borderRadius:"5px",
    borderColor: 'red',
  },
  '& label': {
    fontSize:'1.3rem',
    padding:'0 6px 0 6px',
    backgroundColor:'white',
    borderRadius:"5px"
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
  marginTop:30,
  backgroundColor:'white',
  borderRadius:'25px',
  width:400,
  '& label.Mui-focused': {
  color: 'red',
  padding:'0 6px 0 6px',
  backgroundColor:'white',
  borderRadius:"5px",
  borderColor: 'red',
  },
  '& label': {
  fontSize:'1.3rem',
  padding:'0 6px 0 6px',
  backgroundColor:'white',
  borderRadius:"5px"
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



export default function AddArtifact() {
  const [name, setName] = useState();
  const [year, setYear] = useState();
  const [era, setEra] = useState();
  const [description, setDescription] = useState('');
  const [exhibit, setExibit] = useState('');
  const [tags, setTags] = useState([]);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState();
  const [picture, setPicture] = useState([]);
  const [percent, setPercent] = useState(0);
  const [finalButtonPressed, setFinalButtonPressed] = useState(false);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;



  useEffect(() => {
    if (picture.length != 0) {
      addToDatabase();
    }
  }, [picture]);

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
        width: 250,
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
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
    console.log(picture);

    var updatedYear=parseInt(year);

    if(era==="BC"){
      updatedYear=-Math.abs(updatedYear);
    }

    addArtifact(
      exhibit,
      name,
      updatedYear,
      picture,
      '',
      tags,
      [],
      description
    );
    alert('Artifact Added!');
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

    if (!file || !name || !year || !era || !exhibit || !description || tags.length==0) {
      if(year>2000 || year<0){
        alert('The year needs to be between 0-2000. There could be missing data too, re-check the form!');
      }else{
        alert('Missing data, re-check the form!');
      }
      
    }
    
    else{
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
        getDownloadURL(uploadTask.snapshot.ref).then((newUrl) => {
          setPicture([newUrl]);
        });
      }
    );}
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


      <Grid sx={{ flexGrow: 1 }} container id={styles['container']} >
        <h1 id={styles['title']}>Add Artifact</h1>
        <Grid item xs={500}>
          <Grid container justifyContent="center" spacing={2}>
            
              <Grid item  sx={{height: 500,width: 430,backgroundColor:'var(--translucent-grey)',margin:1,borderRadius:'25px'}} >
                
                
                <CssTextField label="Name" value={name} onChange={(e) => onNameChange(e)} />
                {finalButtonPressed && !name  &&(<p className={styles['error-msg']}>*Name is required</p>)}
                <br/>
                <CssTextField label="Year" type="number" defaultValue={year} sx={{marginTop:3}} onChange={(e) => onDateChange(e)}/>
                

                <CssFormField  sx={{marginTop:3,marginLeft:3, width:100,}} >
                  <InputLabel id="age-label" >Era</InputLabel>
                    <Select
                      inputProps={{MenuProps: {disableScrollLock: true}}}
                      labelId="era-label"
                      id="era"
                      value={era}
                      onChange={onEraChange}
                      >
                    <MenuItem value="AD">AD</MenuItem>
                    <MenuItem value="BC">BC</MenuItem>
                  </Select>
                </CssFormField>
                {finalButtonPressed && !year  && (<p className={styles['error-msg']}>*Year is required</p>)}
                {finalButtonPressed &&  !era && (<p className={styles['error-msg']}>*Era is required</p>)}
                {finalButtonPressed && (year<0 || year>2000) && (<p className={styles['error-msg']}>*Year needs to be between 0-2000</p>)}
                <br/>
                <CssFormField >
                  <InputLabel id={styles['exhibit-label']} color="secondary">
                    Exhibit
                  </InputLabel>
                  <Select
                    inputProps={{MenuProps: {disableScrollLock: true}}}
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
                {finalButtonPressed && !exhibit && (<p className={styles['error-msg']}>*Select an Exhibit</p>)}
                <br/>

                
                
                <CssFormField >
                  <InputLabel >
                    Tags
                  </InputLabel>
                  <Select
                    inputProps={{MenuProps: {disableScrollLock: true}}}
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
                      <MenuItem  key={name} value={name} >
                        <Checkbox checked={tags.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </CssFormField>
                {finalButtonPressed &&  (tags.length==0) && (<p className={styles['error-msg']}>*At least one Tag is required</p>)}




                
                
              </Grid>
              
              {/* second column wit hthe description input */}
              <Grid item sx={{height: 550,width: 385,backgroundColor:'var(--translucent-grey)',margin:1,borderRadius:'25px'}}>
                
                <CssTextField
                  sx={{backgroundColor:'white',borderRadius:'25px',width: 350,}}
                  id="description"
                  label="Description"
                  value={description}
                  multiline
                  rows={15}
                  onChange={(e) => onDescriptionChange(e)}
                />
                  {finalButtonPressed && !description && (<p className={styles['error-msg']}>*Description cannot be empty!</p>)}
                  <button  id={styles['final-button']} onClick={(e) => handleUpload(e)}>
                    Add to database
                  </button>

              </Grid>

              <Grid item sx={{height: 500,width: 500,backgroundColor:'var(--translucent-grey)',margin:1,borderRadius:'25px'}} >
              
              {url && (
                <div>
                  <img className={styles['new-img']} src={url} alt="Uploaded image" />
                </div>
              )}


              {!url && (
                <label className={styles['no-url-upload']}><input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                />
                  Click To Select Image
                </label>
              )}

              {finalButtonPressed && !url && (<p className={styles['error-msg']}>*An Image is required</p>)}

              {url && (
                <label className={styles['custom-file-upload']}><input
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

















      {/* <div id={styles['artifact-add-form']}>
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
              <div >
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
                  type="number"
                  
                  onChange={(e) => onDateChange(e)}
                />
                <FormControl variant="filled">
                  <InputLabel id="age-label">Age</InputLabel>
                  <Select
                    labelId="age-label"
                    id="age"
                    value={year}
                    onChange={onDateChange}
                    sx={{
                      bgcolor: 'white', // Set the background color to white
                      color: 'black', // Adjust the text color as needed
                      width: '100px', // Set the width of the field
                      borderRadius: '20px', // Set the border radius for round edges
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', // Set the border color to white
                      },
                      '&:hover': {
                        bgcolor: 'white', // Set the background color on hover to white
                      },
                      '&.Mui-focused': {
                        bgcolor: 'white', // Keep the background color white when focused
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          '& .MuiMenuItem-root': {
                            '&.Mui-selected': {
                              bgcolor: 'white', // Keep the background color white for selected menu items
                              color: 'black', // Adjust the text color as needed
                            },
                            '&:hover': {
                              bgcolor: 'white', // Keep the background color white for hovered menu items
                              color: 'black', // Adjust the text color as needed
                            },
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem value="AD">AD</MenuItem>
                    <MenuItem value="BC">BC</MenuItem>
                  </Select>
                </FormControl>
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
                <FormControl id={styles['tag']} fullWidth>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Tags
                  </InputLabel>
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
              <button onClick={(e) => handleUpload(e)}>Add to database</button>
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
      </div> */}
    </ThemeProvider>
  );
}
