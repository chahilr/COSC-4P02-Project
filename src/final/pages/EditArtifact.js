import SelectButton from '../components/SelectButton';
import { useState } from 'react';
import TimelineItem from '../components/TimelineItem';
//import FileUpload from '../components/FileUpload';
import { createTheme, colors, ThemeProvider, Slider, Box, TextField, MenuItem, FormControl, InputLabel, Select, Button, Input} from '@mui/material';

import '../styles/EditArtifact.css';
//image upload stuff
import React from 'react';
import ImageUploading from 'react-images-uploading';
import {useLocation} from 'react-router-dom';



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

    const location = useLocation();
    const [name, setName]=React.useState("location.state.name");
    const [year, setYear]=React.useState("location.state.year");
    const [era, setEra]=React.useState("location.state.era");
    const [description,setDescription]=React.useState("location.state.description");
    const [exhibit,setExibit]=React.useState("location.state.exhibit");

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
                        <TextField id="name" label="Name" defaultValue={name} variant="filled" color='secondary' />
                    </div>

                    <div id="date">                
                        <TextField id="date" label="Year" defaultValue={year} variant="filled"  color='secondary' />
                        <TextField id="age" label="Age" defaultValue={era} variant="filled"  color='secondary' />
                    </div>

                    <div id="exhibit">
                        <TextField id="exhibit" label="Exhibit" defaultValue={exhibit} variant="filled"  color='secondary' />
                    </div>

                    

                </div>

                <div id="right">
                    <div id="description">
                        <TextField id="description" label="Description" defaultValue={description} multiline rows={15}  color='secondary' />
                    </div>
                </div>

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
                Upload File (click or drop here)
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
