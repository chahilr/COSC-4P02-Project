export default function Logo(props) {
    return (
      <div
        id="logo-and-language"
        style={{ backgroundColor: 'transparent', marginBottom: '100px' }}
      >
        {/* Logo */}
        <div className="logo">
          <div className="logo-image">
            <img
              src={require('../../images/museum-logo.jpg')}
              alt="Museum logo"
              style={{ float: 'left', marginRight: '10px' }}
            />
          </div>
  
          <div className="logo-text">
            <span style={{ color: props.color }}>Canadian Museum of History</span>
            <hr style={{ borderColor: props.color }}></hr>
            <span style={{ color: props.color }}>
              Museé Canadien de L'Histoire
            </span>
          </div>
  
          <div style={{ clear: 'both' }}></div>
        </div>
      </div>
    );
  }
  