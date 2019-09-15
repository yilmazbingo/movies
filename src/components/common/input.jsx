import React from "react";

const Input = ({
  name,
  label,
  // defaultValue,
  // onChange,
  error,
  // placeholder,
  // type
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {/* html for: when user clicks on label, referenced input field automatically will focus. */}
      <input
        {...rest}
        autoFocus
        name={name}
        id={name}
        className="form-control"
        aria-describedby="emailHelp"
      />
      <small id="emailHelp" className="form-text text-muted">
        We'll never share your email with anyone else.
      </small>{" "}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
