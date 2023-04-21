import styles from '../styles/Timeline.module.css';
import '../../utils/firestoreFunctions';
import {
  getDescrption,
  queryTagsExhibitsYearRange,
} from '../../utils/firestoreFunctions';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArtifactBubble from '../components/ArtifactBubble';
import ArtifactPreview from '../components/ArtifactPreview';
import Logo from '../components/Logo';
import PreferenceIcon from '../../images/preference-icon.svg';

export default function Timeline() {
  const { state } = useLocation();
  const [artifacts, setArtifacts] = useState([]);
  const [showPreview, setShowPreview] = useState(null);
  let alternator = 0;

  useEffect(() => {
    queryTagsExhibitsYearRange(
      state.exhibitKeys,
      state.tagKeys,
      state.yearRange[0],
      state.yearRange[1]
    ).then((val) => {
      setArtifacts(val);
    });
  }, []);

  const handleArtifactClick = (artifact) => {
    getDescrption(artifact[0]).then((description) => {
      setShowPreview({
        title: artifact[1].Name,
        year: artifact[1].Year,
        exhibit: artifact[1].Exhibition,
        tags: artifact[1].Tags,
        description: description.content,
        image: artifact[1].Photos[0],
      });
    });
  };

  return (
    <>
      <div
        className={styles['background']}
        onClick={() => setShowPreview(null)}
      >
        <Logo
          color="var(--white)"
          style={{
            backgroundColor: 'transparent',
            marginBottom: '100px',
            transform: 'scale(0.75)',
            translate: '-12.5%',
          }}
        />
        <Link to="/customizer" state={state}>
          <img
            className={styles['preference-icon']}
            src={PreferenceIcon}
            alt="Customizer"
          />
        </Link>
        <div className={styles['timeline-container']}>
          {showPreview != null && <ArtifactPreview {...showPreview} />}
          <div
            className={styles['timeline-line']}
            style={{
              position: 'absolute',
              top: 0,
              left: 'auto',
              right: 'auto',
              height: '100%',
            }}
          ></div>
          <div
            className={`${styles['timeline-line']} ${styles['timeline-offset']}`}
            style={{ height: '3em' }}
          ></div>
          {artifacts.map((artifact) => {
            if (alternator++ % 2 === 0) {
              return (
                <div key={artifact[0]} className={styles['timeline-segment']}>
                  <ArtifactBubble
                    visible={true}
                    artifact={artifact[1]}
                    onClick={() => handleArtifactClick(artifact)}
                    alternator={alternator}
                  />
                  <div className={styles['spacer']}></div>
                  <ArtifactBubble
                    visible={false}
                    artifact={artifact[1]}
                    onClick={() => handleArtifactClick(artifact)}
                    alternator={alternator}
                  />
                </div>
              );
            } else {
              return (
                <div key={artifact[0]} className={styles['timeline-segment']}>
                  <ArtifactBubble
                    visible={false}
                    artifact={artifact[1]}
                    onClick={() => handleArtifactClick(artifact)}
                    alternator={alternator}
                  />
                  <div className={styles['spacer']}></div>
                  <ArtifactBubble
                    visible={true}
                    artifact={artifact[1]}
                    onClick={() => handleArtifactClick(artifact)}
                    alternator={alternator}
                  />
                </div>
              );
            }
          })}
        </div>
        <Legend exhibits={state.exhibitKeys} />
      </div>
    </>
  );
}

const Legend = ({ exhibits }) => {
  const color = {
    'Ancient Greece': 'green',
    'Ancient Rome': 'red',
    'Ancient Egypt': 'blue',
    'Persian Empire': 'yellow',
  };

  return (
    <div className={styles['legend-container']}>
      <ul>
        {exhibits.map((exhibit, id) => (
          <li className={exhibit} key={id}>
            <div
              className={styles['icon']}
              style={{ backgroundColor: color[exhibit] }}
            ></div>
            {exhibit}
          </li>
        ))}
      </ul>
    </div>
  );
};
