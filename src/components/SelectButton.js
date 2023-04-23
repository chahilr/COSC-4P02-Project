import { useState } from 'react';

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
      className="primary-button"
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
        backgroundColor: clicked || hover?  'var(--red)': 'var(--grey)',
        color: 'var(--white)'
      }}
    >
      {props.name}
    </button>
  );
};

export default SelectButton;
