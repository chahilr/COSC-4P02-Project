import styles from '../styles/Logo.module.css';

export default function Logo(props) {
  return (
    <div
      className={styles['logo-and-language']}
      style={{
        ...props?.style
      }}
    >
      {/* Logo */}
      <div className={styles['logo']}>
        <div className={styles['logo-image']}>
          <img
            src={require('../../images/museum-logo.jpg')}
            alt="Museum logo"
            style={{ float: 'left', marginRight: '10px' }}
          />
        </div>

        <div className={styles['logo-text']}>
          <span style={{ color: props.color }}>Niagara On The Lake</span>
          <hr style={{ borderColor: props.color }}></hr>
          <span style={{ color: props.color }}>
            History Museum
          </span>
        </div>

        <div style={{ clear: 'both' }}></div>
      </div>
    </div>
  );
}
