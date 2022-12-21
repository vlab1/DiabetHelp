import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const RegisterForm = ({ changeHandlerRegister, registerHandler, loading, formRegister }) => {
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
        {t("create_an_acc")}
      </Typography>
      <TextField
        variant="filled"
        fullWidth
        label={t("name")}
        margin="dense"
        name="name"
        value={formRegister.name}
        onChange={changeHandlerRegister}
      />
      <TextField
        variant="filled"
        fullWidth
        label={t("email")}
        margin="dense"
        name="email"
        value={formRegister.email}
        onChange={changeHandlerRegister}
      />
      <TextField
        variant="filled"
        fullWidth
        label={t("password")}
        margin="dense"
        name="password"
        value={formRegister.password}
        onChange={changeHandlerRegister}
        type="password"
      />
      <TextField
        variant="filled"
        fullWidth
        label={t("confirm_password")}
        margin="dense"
        name="password_confirmation"
        value={formRegister.password_confirmation}
        onChange={changeHandlerRegister}
        type="password"
      />
      <Button
        variant="contained"
        size="large"
        fullWidth
        color="secondary"
        sx={{ mt: 1 }}
        onClick={registerHandler}
        disabled={loading}
      >
         {t("create_an_acc")}
      </Button>
    </Box>
  );
};

export default RegisterForm;
