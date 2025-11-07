import React from "react";
import "./Input.css";

function Input(props) {
  const {
    title,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    name,
    maxLength,
    inputType = "text",
    width,
    hideError,
  } = props;
  const showTitle = title !== undefined && title !== null;

  const inputClass = error ? "input-field input-error" : "input-field";

  return (
    <div className="input-title-container" style={{ width: width }}>
      {showTitle && <div className="input_title">{title}</div>}

      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        className={inputClass}
      />
      {error && !hideError && <span className="error_message">{error}</span>}
    </div>
  );
}

export default Input;
