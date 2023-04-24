import styles from '../styles/ArtifactBubble.module.css';

const ArtifactBubble = (props) => {
  let color;
  switch (props.artifact.Exhibition) {
    case 'Ancient Greece':
      color = 'green';
      break;
    case 'Ancient Rome':
      color = 'red';
      break;
    case 'Ancient Egypt':
      color = 'blue';
      break;
    case 'Persian Empire':
      color = 'yellow';
      break;
    default:
      color = 'white';
  }
  return (
    <div
      className={`${styles['bubble-container']} ${
        props.alternator % 2 === 0 ? styles['column'] : styles['reverse-column']
      }`}
    >
      {props.alternator % 2 !== 0 && (
        <p
          className={styles['artifact-bubble-heading']}
          style={{
            color: 'white',
            visibility: props.visible ? 'visible' : 'hidden',
          }}
        >
          {props.artifact.Name} <br></br> {(props.artifact.Year < 0)?((-1*props.artifact.Year) + " BC"):(props.artifact.Year) + " AD"}
        </p>
      )}

      <img
        className={styles['timeline-image']}
        style={{
          border: `5px solid ${color}`,
          visibility: props.visible ? 'visible' : 'hidden',
        }}
        src={props.artifact.Photos[0]}
        alt="Artifact"
        onClick={props.onClick}
      />

      {props.alternator % 2 === 0 && (
        <p
          className={styles['artifact-bubble-heading']}
          style={{
            color: 'white',
            visibility: props.visible ? 'visible' : 'hidden',
          }}
        >
          {props.artifact.Name} <br></br> {(props.artifact.Year < 0)?((-1*props.artifact.Year) + " BC"):(props.artifact.Year) + " AD"}
        </p>
      )}
    </div>
  );
};

export default ArtifactBubble;
