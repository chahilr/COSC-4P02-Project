import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getDescrption } from '../../utils/firestoreFunctions';
import Logo from '../components/Logo';
import styles from '../styles/ArtifactOverview.module.css';

export default function ArtifactOverview() {
  const navigate = useNavigate();
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
      <div className={styles['container']}>
        <Logo
          color="var(--white)"
          style={{
            position: 'relative',
            backgroundColor: 'var(--translucent-grey)',
            marginTop: 'unset',
            padding: '1dvh 1em',
          }}
        />
        <div className={styles['artifact-container']}>
          <div className={styles['artifact-text']}>
            <h2>{state.title}</h2>
            <p>{state.description ?? description}</p>
          </div>
          <div className={styles['artifact-image']}>
            <img src={state.image} alt="" />
          </div>
        </div>
        <div className={styles['nav-container']}>
          <div className={styles['button-container']}>
            <button id="return-button" onClick={() => navigate(-1)}>
              Back to Timeline
            </button>
            <Link
              to="/timeline"
              state={{
                exhibitKeys: [
                  'Ancient Greece',
                  'Ancient Rome',
                  'Ancient Egypt',
                  'Persian Empire',
                ],
                tagKeys: state.tags,
                yearRange: [-2000, 2000],
              }}
            >
              <button id="related-artifact-button">Related Artifact</button>
            </Link>
            <button id="other-media-button">Other Media</button>
          </div>
        </div>
      </div>
    </>
  );
}
