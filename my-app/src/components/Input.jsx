import React from "react";

const Input = ({ type, placeholder, value, onChange, ref,className}) => {
  return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={ref}
        className={className}
      />
  );
};

export default React.memo(Input);