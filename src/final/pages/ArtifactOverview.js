import { useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import styles from '../styles/ArtifactOverview.module.css';

export default function ArtifactOverview() {
  const { state } = useLocation();
  return (
    <>
      <Logo
        color="var(--white)"
        style={{
          position: 'relative',
          marginBottom: 0,
          marginTop: 0,
          backgroundColor: 'black',
        }}
      />
      <div className={styles['container']}>
        <div className={styles['artifact-container']}>
          <div className={styles['artifact-text']}>
            <h2>{state.title}</h2>
            <p>{state.description}</p>
          </div>
          <div className={styles['artifact-image']}>
            <img src={state.image} alt="" height={'100dvh'} />
          </div>
        </div>
        <div className={styles['nav-container']}>
          <div className={styles['button-container']}>
            <button id="return-button">Back to Timeline</button>
            <button id="related-artifact-button">Related Artifact</button>
            <button id="other-media-button">Other Media</button>
          </div>
        </div>
      </div>
    </>
  );
}
