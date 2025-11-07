import React from "react";
import "./PaymentForm.css";
import Input from "../Input/Input.jsx";
import ExpirationInput from "../Input/ExpirationInput.jsx";
import Button from "../Button/Button.jsx";

function PaymentForm({
  formData,
  handleChange,
  handleBlur,
  errors,
  handleSubmit,
}) {
  return (
    <form className="payment_form_container" onSubmit={handleSubmit} noValidate>
      <Input
        name="cardholderName"
        width="381px"
        title="cardholder name"
        placeholder="e.g. Jane Appleseed"
        value={formData.cardholderName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.cardholderName}
        maxLength="30"
      />

      <Input
        name="cardNumber"
        width="381px"
        title="Card Number"
        placeholder="e.g. 1234 5678 9123 0000"
        value={formData.cardNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.cardNumber}
        maxLength="19"
        inputType="tel"
      />

      <div className="expiration-date-cvc">
        <ExpirationInput
          formData={formData}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors}
        />
        <Input
          name="cvc"
          width="191px"
          title="CVC"
          placeholder="e.g. 123"
          value={formData.cvc}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.cvc}
          maxLength="3"
          inputType="tel"
        />
      </div>
      <Button title="Confirm" type="submit" />
    </form>
  );
}

export default PaymentForm;
