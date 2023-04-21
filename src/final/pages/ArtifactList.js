import styles from '../styles/ArtifactList.module.css';
import '../../utils/firestoreFunctions';
import { Link } from 'react-router-dom';
import { getAllArtifacts, queryName } from '../../utils/firestoreFunctions';
import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Logo from '../components/Logo';

export default function ArtifactList() {
  const [artifacts, setArtifacts] = useState([]);
  const [searchSubstring, setSearchSubstring] = useState([]);

  useEffect(() => {
    getAllArtifacts().then((val) => {
      console.log(val)
      setArtifacts(val);
    });
  }, []);

  const filterList = (event) => {
    setSearchSubstring(event.target.value);
  };

  return (
    <>
      <Logo />
      <div className={styles['background']}>
        <h1>Articles</h1>
        <input
          id={styles['artifact-search-bar']}
          type="text"
          placeholder="Search for Artifact"
          onChange={filterList}
        />

        <div className={styles['article-container']}>
          <List sx={{ width: '100%', maxWidth: 500 }}>
            {artifacts
              .filter((artifact) =>
                artifact.Name.toLowerCase().includes(searchSubstring)
              )
              .map((artifact, id) => {
                return (
                  <Link
                    to="/editartifact"
                    state={{ ...artifact }}
                    className={styles['link']}
                  >
                    <ListItem key={id} className={styles['individual-article']}>
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
                );
              })}
          </List>
        </div>
      </div>
    </>
  );
}