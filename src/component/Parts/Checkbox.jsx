import React from "react";

const Checkbox = ({ id, name, text }) => {
  return (
    <>
      <input
        type='checkbox'
        name={name}
        id={id}
        className='form__input-checkbox'
        value=''
      />
      <label htmlFor={id} className='form__label'>
        {text}
      </label>
    </>
  );
};

export default Checkbox;
