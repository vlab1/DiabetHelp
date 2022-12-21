import "./Payment.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useState, useCallback, useEffect, useContext } from "react";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";

const Success = () => {
  const { time, days, key } = useParams();
  const timeNow = new Date().getTime();

  const auth = useContext(AuthContext);
  const { request } = useHttp();

  const fetchAccount = useCallback(async () => {
    try {
      if (
        time &&
        days &&
        key &&
        (key.length === 100) & (timeNow - time < 3600000) &&
        days < 366
      ) {
        await request("/api/account", "GET", null, null, {
          Authorization: `Bearer ${auth.token}`,
        }).then(async (res) => {
          const paymentKeys = res.data.paymentKeys;
          const allPaymentKeys = res.data.allPaymentKeys;
          if (!paymentKeys.includes(key) && allPaymentKeys.includes(key)) {
            await request(
              "/api/account/premium/renew",
              "PUT",
              { days: days, key: key },
              null,
              {
                Authorization: `Bearer ${auth.token}`,
              }
            );
          }
        });
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

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
          <i class="checkmark i-success">✓</i>
        </div>
        <h1 class="h1-success">Success</h1>
        <p class="p-success">
          Your purchase request has been processed.
          <br /> Contact us if something went wrong.
        </p>
        <br />
        <Link to="/main">Back</Link>
      </div>
    </div>
  );
};

export default Success;
