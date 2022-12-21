import { Container, Paper, Snackbar, Alert } from "@mui/material";
import OverlayContainer from "../../layout/login/OverlayContainer";
import FormContainer from "../../layout/login/FormContainer";
import LoginForm from "../../layout/login/LoginForm";
import RegisterForm from "../../layout/login/RegisterForm";
import { useState, useContext } from "react";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth_, provider } from "../../../firebase";
import { useTranslation } from "react-i18next";

const Login = () => {
  const auth = useContext(AuthContext);

  const getDefaultStateLogin = () => {
    return {
      email: "",
      password: "",
    };
  };
  const { t } = useTranslation();
  const getDefaultStateRegister = () => {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
  };

  const [isVisible, setIsVisible] = useState(false);
  const { loading, request } = useHttp();
  const [snackBar, setSnackBar] = useState({
    open: null,
    severity: null,
    content: null,
  });
  const [formLogin, setFormLogin] = useState(getDefaultStateLogin());
  const [formRegister, setFormRegister] = useState(getDefaultStateRegister());

  const toggle = () => setIsVisible((prev) => !prev);

  const handleClose = (event) => {
    setSnackBar({ ...snackBar, open: false });
  };

  const changeHandlerLogin = (event) => {
    setFormLogin({ ...formLogin, [event.target.name]: event.target.value });
  };

  const changeHandlerRegister = (event) => {
    setFormRegister({
      ...formRegister,
      [event.target.name]: event.target.value,
    });
  };

  const loginHandler = async () => {
    try {
      await request("/api/account/login", "POST", {
        ...formLogin,
      }).then((res) => {
        auth.login(res.data);
        setSnackBar({
          ...snackBar,
          open: true,
          severity: "success",
          content: `${t("logged_in")}`,
        });
        setFormLogin(getDefaultStateLogin());
        window.location.pathname = "/main";
      });
    } catch (e) {
      setSnackBar({
        ...snackBar,
        open: true,
        severity: "error",
        content: `${t("incorrect_data")}`,
      });
    }
  };

  const registerHandler = async () => {
    try {
      await request("/api/account/register", "POST", {
        ...formRegister,
      }).then((res) => {
        auth.login(res.data);
        setFormRegister(getDefaultStateRegister());
        setSnackBar({
          ...snackBar,
          open: true,
          severity: "success",
          content: `${t("logged_in")}`,
        });
        window.location.pathname = "/main";
      });
    } catch (e) {
      setSnackBar({
        ...snackBar,
        open: true,
        severity: "error",
        content: `${t("incorrect_data")}`,
      });
    }
  };

  const googleloginHandler = async () => {
    try {
      signInWithPopup(auth_, provider).then(async (result) => {
        try {
          await request("/api/account/google/login", "POST", {
            email: result.user.email,
            passwordGoogle: result.user.uid,
            name: result.user.displayName,
          }).then((res) => {
            auth.login(res.data);
            setSnackBar({
              ...snackBar,
              open: true,
              severity: "success",
              content: "You are logged in",
            });
            window.location.pathname = "/main";
          });
        } catch (e) {}
      });
    } catch (e) {
      setSnackBar({
        ...snackBar,
        open: true,
        severity: "error",
        content: "Incorrect data",
      });
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        height: "100vh",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          position: "relative",
          width: 1,
          minHeight: "30rem",
          overflow: "hidden",
        }}
      >
        <FormContainer type="login" isVisible={isVisible}>
          <LoginForm
            formLogin={formLogin}
            changeHandlerLogin={changeHandlerLogin}
            loginHandler={loginHandler}
            loading={loading}
            googleloginHandler={googleloginHandler}
          />
        </FormContainer>
        <FormContainer type="register" isVisible={isVisible}>
          <RegisterForm
            formRegister={formRegister}
            changeHandlerRegister={changeHandlerRegister}
            registerHandler={registerHandler}
            loading={loading}
          />
        </FormContainer>
        <OverlayContainer isVisible={isVisible} toggle={toggle} />
      </Paper>
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
    </Container>
  );
};

export default Login;
