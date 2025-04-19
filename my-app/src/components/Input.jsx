import React from "react";

const areEqual = (prevProps, nextProps) => {
  console.log(1, prevProps.className === nextProps.className);
  console.log(2, prevProps.placeholder, prevProps.placeholder === nextProps.placeholder);
  console.log(3, prevProps.value, prevProps.value === nextProps.value);
  console.log(4, prevProps.onChange === nextProps.onChange);
  return (
    prevProps.className === nextProps.className &&
    prevProps.placeholder === nextProps.placeholder &&
    prevProps.value === nextProps.value &&
    prevProps.onChange === nextProps.onChange
  );
}

console.log(1)

const Input = ({ type, placeholder, value, onChange, className }) => {
  return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
      />
  );
};

export default React.memo(Input, areEqual);