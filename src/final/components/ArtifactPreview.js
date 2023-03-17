export default function ArtifactPreview(props) {
  return (
    <div className="artifact-preview">
      <p className="artifact-title">{props.title}</p>
      <p className="artifact-description">{props.description}</p>
    </div>
  );
}
