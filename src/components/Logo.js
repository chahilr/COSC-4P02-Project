import styles from '../styles/Logo.module.css';
import { Link } from 'react-router-dom';

export default function Logo(props) {
  const image_styles = {
    float: 'left',
    marginRight: '10px',
    background: props.background,
    ...(props.background && {padding: '1px'})
  };
  return (
    <div
      className={`${styles['logo-and-language']} ${styles[props.className]}`}
      style={{
        ...props?.style,
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className={styles['logo']}>
          <div className={styles['logo-image']}>
            <img
              src={require('../images/museum-logo.jpg')}
              alt="Museum logo"
              style={image_styles}
            />
          </div>

          <div className={styles['logo-text']}>
            <span style={{ color: props.color }}>Niagara On The Lake</span>
            <hr style={{ borderColor: props.color }}></hr>
            <span style={{ color: props.color }}>History Museum</span>
          </div>

          <div style={{ clear: 'both' }}></div>
        </div>
      </Link>
    </div>
  );
}
