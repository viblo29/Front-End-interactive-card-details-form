import React from "react";
import "./ThankYouView.css";
import Button from "../Button/Button.jsx";
import Checked from "../../../public/checked purple background.svg";

function ThankYouView({ onContinue }) {
  return (
    <div className="success_container">
      <div className="checked">
        <img src={Checked} alt="" />
      </div>
      <h1>THANK YOU!</h1>
      <h2>We’ve added your card details</h2>
      <Button title="Continue" onClick={onContinue} />
    </div>
  );
}

export default ThankYouView;
