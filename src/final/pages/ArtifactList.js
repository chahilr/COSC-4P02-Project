import styles from '../styles/ArtifactList.module.css';
import '../../utils/firestoreFunctions';
import { Link } from 'react-router-dom';
import { getAllArtifacts } from '../../utils/firestoreFunctions';
import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Logo from '../components/Logo';

export default function ArtifactList() {
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    getAllArtifacts().then((val) => {
      setArtifacts(val);
    });
  }, []);

  return (
    <>
      <Logo />
      <div className={styles['background']}>
        <div className={styles['body']}>
          <h1>Articles</h1>

          <div className={styles['article-container']}>
            <List sx={{ width: '100%', maxWidth: 500 }}>
              {artifacts.map((artifact, i) => {
                return (
                  <ListItem key={i} className={styles['individual-article']}>
                    <ListItemAvatar>
                      <Avatar></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                    <p>
                      {artifact.Name} {artifact.Exhibition} {artifact.Year}{' '}
                      {console.log(artifact)}
                    </p>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </div>
      </div>
    </>
  );
}
