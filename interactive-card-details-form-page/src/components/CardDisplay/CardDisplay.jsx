import React from "react";
import "./CardDisplay.css";

function CardDisplay({ cardholderName, cardNumber, expMonth, expYear, cvc }) {
  const formattedCardNumber = cardNumber || "0000 0000 0000 0000";
  const formattedName = cardholderName
    ? cardholderName.toUpperCase()
    : "JANE APPLESEED";
  const formattedMonth = expMonth || "00";
  const formattedYear = expYear || "00";
  const formattedCVC = cvc || "000";

  return (
    <div className="card_display-container">
      <div className="card_display-background"></div>
      <div className="cards-container">
        <div className="card_display-front">
          <div className="circles">
            <div className="circle1"></div>
            <div className="circle2"></div>
          </div>
          <div className="card_display-front-card_number">
            {formattedCardNumber}
          </div>
          <div className="card_display-front-cardholder_name-exp_date">
            <div className="card_display-front-cardholder_name">
              {formattedName}
            </div>
            <div className="card_display-front-exp_date">{`${formattedMonth}/${formattedYear}`}</div>
          </div>
        </div>
        <div className="card_display-back">
          <div className="card_display-back-cvc">{formattedCVC}</div>
        </div>
      </div>
    </div>
  );
}

export default CardDisplay;
