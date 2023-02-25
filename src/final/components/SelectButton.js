import { useState } from 'react';
import '../../index.css';

const SelectButton = (props) => {
  const [clicked, setClicked] = useState(false);
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <button
      className="option-button"
      onClick={() => {
        props.onClick?.(props.name);
        setClicked(!clicked);
      }}
      onMouseEnter={() => {
        props.onMouseEnter?.();
        handleMouseEnter();
      }}
      onMouseLeave={() => {
        props.onMouseLeave?.();
        handleMouseLeave();
      }}
      style={{
        backgroundColor: clicked || hover ? '#EA252E' : '#7C7B81',
        // padding: hover ? '2vw' : '1vw',
      }}
    >
      {props.name}
    </button>
  );
};

export default SelectButton;
