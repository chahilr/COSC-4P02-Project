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
        //backgroundColor: 'red',

        //backgroundColor:  hover && clicked ? 'white' : '#7C7B81',
        
        //backgroundColor: hover ? 'white' : 'red',
        //backgroundColor: clicked ? '#7C7B81' : "red",

        // backgroundColor: clicked || hover?  'grey': "red",
        // padding: hover ? '2vw' : '1vw',
      }}
    >
      {props.name}
    </button>
  );
};

export default SelectButton;
