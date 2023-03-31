import styles from '../styles/ArtifactList.module.css';
import '../../utils/firestoreFunctions';
import { Link } from 'react-router-dom';
import { getAllArtifacts,queryName } from '../../utils/firestoreFunctions';
import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Logo from '../components/Logo';


export default function ArtifactList() {
  const [artifacts, setArtifacts] = useState([]);
  const [artifactsID, setArtifactsID] = useState([]);
  const [emptySearch,setEmptySearch]=useState(true);

  useEffect(() => {
    if(emptySearch){ //we get all database items only when search bar is empty
      getAllArtifacts().then((data) => {
        let artifactData=data.map(innerArray => innerArray[1])
        let artifactID=data.map(innerArray => innerArray[0])
        console.log(artifactData); 
        console.log(artifactID); 
        setArtifacts(artifactData);
        setArtifactsID(artifactID);
      });
    }
  }, [emptySearch]);

  //typing in the searchbar runs this function
  function handleSearchBarChange(e) {
    if(e==""){ //if the user clears the search bar
      setEmptySearch(true);
    }else{
      setEmptySearch(false);
      queryName(e).then((data)=>{
        // the data looks like [array(2)] meaning we have a 2d array, but all the useful
        // information is in the last column so lets use the map command
        let artifactData=data.map(innerArray => innerArray[1]) 
        let artifactID=data.map(innerArray => innerArray[0])
        console.log(artifactData); 
        console.log(artifactID); 
        setArtifacts(artifactData);
        setArtifactsID(artifactID);
      });
    }
  }


  

  return (
    <>
      <Logo />
      <div className={styles['background']}>
        <h1>Articles</h1>

        <div className={styles['article-container']}>
              
          <List sx={{ width: '100%', maxWidth: 500 }}>
            <div id={styles['input-div']}>
            <input
                id={styles['list-page-artifact-search-bar']}
                type="text"
                placeholder="Search for Artifact name"
                onChange={e=> handleSearchBarChange(e.target.value)}
              />
            </div>
          
            {artifacts.map((artifact, i) => {
              return (
                <div key={i}>
                  <Link style={{ textDecoration: 'none', color: 'inherit' }} 
                    to={'/editartifact'}
                      state= {{ 
                        id: artifactsID[i],
                        name: artifact.Name,
                        year: artifact.Year,
                        exhibit: artifact.Exhibition,
                      }}
                    >
                <ListItem  className={styles['individual-article']}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{ width: 75, height: 75, marginRight: 1 }}
                          src={artifact.Photos[0]}
                        ></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        className={styles['list-item-text']}
                        primary={artifact.Name}
                        secondary={artifact.Year}
                      />
                      <p>{artifact.Exhibition}</p>
                  
                </ListItem>
                </Link>
                </div>
              );
            })}
          </List>
        </div>
      </div>
    </>
  );
}
