
import '../styles/ArtifactList.css';
import '../../utils/firestoreFunctions';
import { Link } from 'react-router-dom';
import {
  getDescrption,
  queryTagsExhibitsYearRange,
  getAllArtifacts
} from '../../utils/firestoreFunctions';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ArtifactBubble from '../components/ArtifactBubble';
import ArtifactPreview from '../components/ArtifactPreview';
import { initializeApp } from "firebase/app";
import { collection,getFirestore, doc, getDocs } from 'firebase/firestore';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

export default function Timeline() {

    const theme = createTheme({
        components: {
          MuiStack: {
            defaultProps: {
              useFlexGap: true,
            },
          },
        },
    });
    
    
        //The Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyAa8m8jdGb85y-Qzfm2TW1jv2R_-Qq6nCQ",
            authDomain: "cosc4p02-project-a5335.firebaseapp.com",
            projectId: "cosc4p02-project-a5335",
            storageBucket: "cosc4p02-project-a5335.appspot.com",
            messagingSenderId: "941095700018",
            appId: "1:941095700018:web:88000e3b139f089d9ede2b",
            measurementId: "G-W1X36PE2R1"
        };
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        //getting firestore
        const db=getFirestore(app);
        

        async function getAllArtifacts() {
            const colRef = collection(db, "Artifacts");
            let tempArray=[];
            let i=0;
            try {
                const docsSnap = await getDocs(colRef);
                docsSnap.forEach(doc => {
                    tempArray[i]=doc.data();
                    //console.log(tempArray[i])
                    i++;
                })
            } catch (error) {
                console.log(error);
            }
            return tempArray;
        }

        
 
    const [artifacts, setArtifacts] = useState([]);
    
    

    useEffect(() => {
        getAllArtifacts().then((val) => {
        setArtifacts(val);
        });
    }, []);

//   for (let index = 0; index < artifacts.length; index++) {

//     console.log("haha")
//     console.log(artifacts[index]) 
//     }

  const handleArtifactClick = (artifact) => {
    <Link to="/artifact" style={{ textDecoration: 'none' }}>
    </Link>
  };

  return (
    <>
      
      <div
        id="logo-and-language"
        style={{
          backgroundColor: 'transparent',
          marginBottom: '100px',
          transform: 'scale(0.75)',
          translate: '-12.5%',
        }}

      >
        
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
            <hr style={{ borderColor: 'white' }}></hr>
            <span style={{ color: 'white' }}>Museé Canadien de L'Histoire</span>

          </div>

          <div style={{ clear: 'both' }}></div>
        </div>
      </div>
      <div className='background'>

        <div className='body'>
            <h1>Articles</h1>
            
            <div className='article-container'>
            <List sx={{ width: '100%', maxWidth: 500 }}>
                    
                        {artifacts.map((artifact,i)=>{
                            return(
                                <ListItem key={i} className='individual-article'>
                                <ListItemAvatar>
                                <Avatar></Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={artifact.Name}  secondary={artifact.Year}  />
                                    <p>   {artifact.Exhibition}     {console.log(artifact)}</p>
                                
                                </ListItem> 
                            )
                            })}
                    
                </List>
            </div>


        </div>

      </div>
    </>

  );
}
