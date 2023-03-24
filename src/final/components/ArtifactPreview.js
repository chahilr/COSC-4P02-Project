import { Link } from 'react-router-dom';
import '../styles/ArtifactPreview.css';

export default function ArtifactPreview(props) {
  return (
    <div className="artifact-preview" onClick={(e) => e.stopPropagation()}>
      <p className="artifact-title">{props.title}</p>
      <p>
        {props.year < 0 ? `${-props.year}BC` : `${props.year}AD`} |{' '}
        {props.exhibit}
      </p>
      <p className="artifact-description">{props.description}</p>
      <Link
        to="/artifact"
        style={{ textDecoration: 'none' }}
        state={{ ...props }}
      >
        <button className="submit-button">More Info</button>
      </Link>
    </div>
  );
}
