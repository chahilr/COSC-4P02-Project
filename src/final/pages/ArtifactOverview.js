import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDescrption } from '../../utils/firestoreFunctions';
import Logo from '../components/Logo';
import styles from '../styles/ArtifactOverview.module.css';

export default function ArtifactOverview() {
  const { state } = useLocation();
  const [description, setDescription] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(
    () =>
      getDescrption(state.id).then((result) => {
        setDescription(result.content);
      }),
    []
  );
  return (
    <>
      <Logo color="var(--white)" />
      <div className={styles['container']}>
        <div className={styles['artifact-container']}>
          <div className={styles['artifact-text']}>
            <h2>{state.title}</h2>
            <p>{state.description ?? description}</p>
          </div>
          <div className={styles['artifact-image']}>
            <img src={state.image} alt="" height={'100dvh'} />
          </div>
        </div>
        <div className={styles['button-container']}>
          <button id="return-button">Return</button>
          <button id="related-artifact-button">Related Artifact</button>
          <button id="other-media-button">Other Media</button>
        </div>
      </div>
    </>
  );
}
