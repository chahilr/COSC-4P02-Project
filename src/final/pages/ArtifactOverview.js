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
      <Logo
        color="var(--white)"
        style={{ position: 'relative', backgroundColor: "var(--translucent-grey)", marginTop: "0", padding: "1em", borderRadius: "5px" }}
      />
      <div className={styles['container']}>
        <div className={styles['artifact-text']} style={{ position: 'absolute', top: '20%', left: '5%', zIndex: 10 }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1em' }}>{state.title}</h2>
          <p style={{ fontSize: '1.4rem', lineHeight: '1.6', textAlign: 'justify' }}>{state.description ?? description}</p>
        </div>
        <div className={styles['artifact-image']} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
          <img src={state.image} alt="" style={{ maxWidth: '95%', maxHeight: '90vh', objectFit: 'contain', borderRadius: '5px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
        </div>
        <div className={styles['nav-container']} style={{ marginTop: '2em' }}>
          <div className={styles['button-container']}>
            <button id="return-button" style={{ fontSize: '1.2rem', padding: '12px 24px', borderRadius: '5px', marginRight: '1em' }}>Back to Timeline</button>
            <button id="related-artifact-button" style={{ fontSize: '1.2rem', padding: '12px 24px', borderRadius: '5px', marginRight: '1em' }}>Related Artifact</button>
            <button id="other-media-button" style={{ fontSize: '1.2rem', padding: '12px 24px', borderRadius: '5px' }}>Other Media</button>
          </div>
        </div>
      </div>
    </>
  );
}
