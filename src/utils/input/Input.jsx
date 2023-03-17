import React from "react";

const Input = (props) => {
  return (
    <input
      onChange={(e) => props.setValue(e.target.value)}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
