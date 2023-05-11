import React from "react";

const InputForm = ({ placeholder, value, name, onChange }) => {
  return (
    <>
      <input
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
    </>
  );
};

export default InputForm;
