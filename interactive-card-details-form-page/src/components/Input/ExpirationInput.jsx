import React from "react";
import Input from "./Input.jsx";
import "./ExpirationInput.css";

function ExpirationInput({ formData, handleChange, handleBlur, errors }) {
  const monthError = errors.expMonth;
  const yearError = errors.expYear;
  const combinedError = monthError || yearError;

  return (
    <div className="expiration-input-group">
      <div className="input_title">Exp. Date (MM/YY)</div>
      <div className="input-row">
        <Input
          name="expMonth"
          value={formData.expMonth}
          onChange={handleChange}
          onBlur={handleBlur}
          error={monthError}
          hideError={true}
          maxLength="2"
          width="80px"
          placeholder="MM"
          inputType="tel"
        />
        <Input
          name="expYear"
          value={formData.expYear}
          onChange={handleChange}
          onBlur={handleBlur}
          error={yearError}
          hideError={true}
          maxLength="2"
          width="80px"
          placeholder="YY"
          inputType="tel"
        />
      </div>
      {combinedError && <span className="error_message">{combinedError}</span>}
    </div>
  );
}

export default ExpirationInput;
