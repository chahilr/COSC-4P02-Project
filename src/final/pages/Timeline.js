import styles from '../styles/Timeline.module.css';
import '../../utils/firestoreFunctions';
import {
  getDescrption,
  queryTagsExhibitsYearRange,
} from '../../utils/firestoreFunctions';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ArtifactBubble from '../components/ArtifactBubble';
import ArtifactPreview from '../components/ArtifactPreview';
import Logo from '../components/Logo';

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
        description: description.content,
        image: artifact[1].Photos[0],
      });
    });
  };

  return (
    <>
      <Logo
        color="var(--white)"
        style={{
          backgroundColor: 'transparent',
          marginBottom: '100px',
          transform: 'scale(0.75)',
          translate: '-12.5%',
        }}
      />

      <div
        className={styles['background']}
        onClick={() => setShowPreview(null)}
      >
        <div className={styles['timeline-container']}>
          {showPreview != null && <ArtifactPreview {...showPreview} />}
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
                  <div className={styles['timeline-line']}></div>
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
                  <div className={styles['timeline-line']}></div>
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
