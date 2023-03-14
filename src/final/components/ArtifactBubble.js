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
    <img
      className="timeline-image"
      style={{
        border: `5px solid ${color}`,
        visibility: props.visible ? 'visible' : 'hidden',
      }}
      src={props.artifact.Photos[0]}
      alt="Artifact"
    />
  );
};

export default ArtifactBubble;
