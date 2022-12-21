import { Box, Button, TextField, Typography } from "@mui/material";
import './LoginForm.scss'
import { useTranslation } from "react-i18next";

const LoginForm = ({
  changeHandlerLogin,
  loginHandler,
  loading,
  formLogin,
  googleloginHandler,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      component="form"
      noValidate
      sx={{
        width: 1,
      }}
    >
      <Typography component="h1" variant="h4" align="center" sx={{ mb: 2 }}>
         {t("login")}
      </Typography>
      <TextField
        variant="filled"
        name="email"
        fullWidth
        label= {t("email")}
        margin="dense"
        value={formLogin.email}
        onChange={changeHandlerLogin}
      />
      <TextField
        variant="filled"
        name="password"
        fullWidth
        label={t("password")}
        margin="dense"
        value={formLogin.password}
        onChange={changeHandlerLogin}
        type="password"
      />
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 1 }}
        color={"secondary"}
        onClick={loginHandler}
        disabled={loading}
      >
         {t("login")}
      </Button>
      <button
      style={{marginTop: "2vh", marginLeft: "9vh", cursor: "pointer"}}
        onClick={googleloginHandler}
        type="button"
        class="login-with-google-btn"
      >
        
        {t("google_login")}
      </button>
    </Box>
  );
};

export default LoginForm;
