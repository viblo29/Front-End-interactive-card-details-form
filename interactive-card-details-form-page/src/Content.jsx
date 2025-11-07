import React, { useState, useEffect } from "react";
import CardDisplay from "./components/CardDisplay/CardDisplay.jsx";
import PaymentForm from "./components/PaymentForm/PaymentForm.jsx";
import ThankYouView from "./components/ThankYouView/ThankYouView.jsx";
import "./index.css";

const validationRegex = {
  cardholderName: /^[a-zA-Z\s]{2,}$/,
  cardNumber: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
  expMonth: /^(0[1-9]|1[0-2])$/,
  expYear: /^\d{2}$/,
  cvc: /^\d{3}$/,
};

const initialState = {
  cardholderName: "",
  cardNumber: "",
  expMonth: "",
  expYear: "",
  cvc: "",
};

const validateField = (name, value) => {
  if (!value) {
    return "Can't be blank";
  }
  if (validationRegex[name] && !validationRegex[name].test(value)) {
    if (name === "cardNumber") return "Wrong format";
    if (name === "cardholderName") return "Wrong format, letters only";
    return "Wrong format";
  }
  if (name === "expYear" && value) {
    const currentYear = new Date().getFullYear() % 100;
    if (parseInt(value, 10) < currentYear) {
      return "Expired year";
    }
  }
  return "";
};

const getInitialState = () => {
  const savedData = localStorage.getItem("paymentFormData");
  const savedIsSubmitted = localStorage.getItem("isSubmitted") === "true";

  if (savedData) {
    try {
      return {
        formData: JSON.parse(savedData),
        isSubmitted: savedIsSubmitted,
      };
    } catch (e) {
      console.error("Failed to parse localStorage data", e);
    }
  }
  return {
    formData: initialState,
    isSubmitted: false,
  };
};

function Content() {
  const [data, setData] = useState(getInitialState);
  const [errors, setErrors] = useState({});

  const { formData, isSubmitted } = data;

  useEffect(() => {
    localStorage.setItem("paymentFormData", JSON.stringify(formData));
    localStorage.setItem("isSubmitted", isSubmitted);
  }, [formData, isSubmitted]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "cardNumber") {
      let formattedValue = value.replace(/\D/g, "");
      formattedValue = formattedValue.match(/.{1,4}/g)?.join(" ") || "";
      value = formattedValue.substring(0, 19);
    } else if (name === "expMonth" || name === "expYear" || name === "cvc") {
      value = value.replace(/\D/g, "").substring(0, name === "cvc" ? 3 : 2);
    }

    setData((prev) => ({
      ...prev,
      formData: { ...prev.formData, [name]: value },
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let allErrors = {};
    let formIsValid = true;

    Object.keys(formData).forEach((name) => {
      const error = validateField(name, formData[name]);
      if (error) {
        allErrors[name] = error;
        formIsValid = false;
      }
    });

    setErrors(allErrors);

    if (formIsValid) {
      setData((prev) => ({ ...prev, isSubmitted: true }));
    }
  };

  const handleContinue = () => {
    localStorage.removeItem("paymentFormData");
    localStorage.removeItem("isSubmitted");
    window.location.reload();
  };

  return (
    <div className="content-container">
      <CardDisplay {...formData} />

      <div className="form-wrapper">
        {!isSubmitted ? (
          <PaymentForm
            formData={formData}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            handleSubmit={handleSubmit}
          />
        ) : (
          <ThankYouView onContinue={handleContinue} />
        )}
      </div>
    </div>
  );
}

export default Content;
