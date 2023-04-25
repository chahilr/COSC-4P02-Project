import { Link } from 'react-router-dom';
import styles from '../styles/ArtifactPreview.module.css';

export default function ArtifactPreview(props) {
  return (
    <div
      className={styles['artifact-preview']}
      onClick={(e) => e.stopPropagation()}
    >
      <p className={styles['artifact-title']}>{props.title}</p>
      <p>
        {props.year < 0 ? `${-props.year}BC` : `${props.year}AD`} |{' '}
        {props.exhibit}
      </p>
      <p>Tags: {props.tags.join(', ')}</p>
      <p className={styles['artifact-description']}>
        {props.description.substr(0, 200) +
          (props.description.length > 200 ? '\u2026' : '')}
      </p>
      <Link
        to="/artifact"
        style={{ textDecoration: 'none' }}
        state={{ ...props }}
      >
        <button className={`secondary-button ${styles['submit-button']}`}>
          More Info
        </button>
      </Link>
    </div>
  );
}
