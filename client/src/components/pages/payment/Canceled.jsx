import React from "react";
import "./Payment.css";
import { Link } from "react-router-dom";

const Canceled = () => {
  return (
    <div class="body-payment">
      <div class="card">
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
          }}
        >
          <i class="checkmark i-canceled">✕</i>
        </div>
        <h1 class="h1-canceled">Canceled</h1>
        <p class="p-canceled">
          You canceled your purchase.
          <br /> Contact us if something went wrong.
        </p>
        <br />
        <Link to="/main">Back</Link>
      </div>
    </div>
  );
};

export default Canceled;
