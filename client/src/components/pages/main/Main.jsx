import React, { useState, useCallback, useEffect, useContext } from "react";
import "./Main.css";
import Banner from "../../layout/banner/Banner.jsx";
import Subscription from "../../layout/subscription/Subscription.jsx";
import Contact from "../../layout/contact/Contact.jsx";
import FAQ from "../../layout/faq/FAQ";
import emailjs from "@emailjs/browser";
import { Snackbar, Alert } from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import Loader from "../../layout/loader/Loader";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Main = () => {
  const randGen = () => {
    const abc =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let random = "";
    while (random.length < 100) {
      random += abc[Math.floor(Math.random() * abc.length)];
    }
    return random;
  };
  const { t } = useTranslation();
  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    topic: "",
    text: "",
  });
  const [snackBar, setSnackBar] = useState({
    open: null,
    severity: null,
    content: null,
  });

  const handleClose = (event) => {
    setSnackBar({ ...snackBar, open: false });
  };

  const changeHandlerContactForm = (event) => {
    setContactForm({
      ...contactForm,
      [event.target.name]: event.target.value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        contactForm,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          setSnackBar({
            ...snackBar,
            open: true,
            severity: "success",
            content: `${t("sent_message")}`,
          });
          setContactForm({
            fullName: "",
            email: "",
            topic: "",
            text: "",
          });
        },
        (error) => {
          setSnackBar({
            ...snackBar,
            open: true,
            severity: "error",
            content: `${t("something_went_wrong")}`,
          });
        }
      );
  };

  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAccount = useCallback(async () => {
    try {
      await request("/api/account", "GET", null, null, {
        Authorization: `Bearer ${auth.token}`,
      }).then((res) => {
        setAccount(res.data);
        setIsLoading(false);
      });
    } catch (e) {
      setIsLoading(false);
    }
  }, [request, auth]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  const renewSubscriptionHandler = async (days, price, name, key) => {
    try {
      await request(
        "/api/account/payment",
        "PUT",
        {
          ...{ days, price, name, key },
        },
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      ).then(async (res) => {
        window.location.href = res.data;
        // setSnackBar({
        //   ...snackBar,
        //   open: true,
        //   severity: "success",
        //   content: "Success",
        // });
      });
    } catch (e) {
      // setSnackBar({
      //   ...snackBar,
      //   open: true,
      //   severity: "error",
      //   content: "Something went wrong",
      // });
    }
  };

  return !isLoading ? (
    <div>
      <div>
        <Banner auth={auth} />
        <div className="bg1">
          <Subscription
            renewSubscriptionHandler={renewSubscriptionHandler}
            randGen={randGen}
            auth={auth}
          />
          <Contact
            contactForm={contactForm}
            changeHandlerContactForm={changeHandlerContactForm}
            sendEmail={sendEmail}
          />
          <FAQ />
        </div>
      </div>
      <Snackbar
        open={snackBar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackBar.severity}
          sx={{ width: "100%" }}
        >
          {snackBar.content}
        </Alert>
      </Snackbar>
    </div>
  ) : (
    <Loader></Loader>
  );
};

export default Main;
