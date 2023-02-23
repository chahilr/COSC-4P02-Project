import { useEffect, useState } from 'react';
import '../../index.css';

const SelectButton = (props) => {
  const [clicked, setClicked] = useState(false);

  return (
    <button
      className="option-button"
      onClick={() => setClicked(!clicked)}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      // style={{ backgroundColor: clicked ? '#EA252E' : '#7C7B81' }}
    >
      {props.name}
    </button>
  );
};

export default SelectButton;
