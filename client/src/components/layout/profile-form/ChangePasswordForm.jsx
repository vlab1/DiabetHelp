import React from "react";
import { Grid, TextField, Container, Typography, Button} from "@mui/material";
import { useTranslation } from "react-i18next";

const ChangePasswordForm = ({ account, changeHandlerAccount, changePasswordHandler }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid  display="flex" justifyContent="center" alignItems="center"  item md={12}>
        <Typography variant="h5">{t("change_password")}</Typography>
        </Grid>
        <Grid container spacing={4} item xs={12}>
          <Grid display="flex" justifyContent="center" alignItems="center" item md={12}>
            {" "}
            <TextField
              name="password"
              label={`${t("password")}`}
              type="password"
              value={account.password}
              onChange={changeHandlerAccount}
              sx={{ minWidth: "30vh" }}
            />
          </Grid>
          <Grid display="flex" justifyContent="center" alignItems="center" item md={12}>
            {" "}
            <TextField
              name="repeat_password"
              label={`${t("repeat_password")}`}
              type="password"
              value={account.repeat_password}
              onChange={changeHandlerAccount}
              sx={{ minWidth: "30vh" }}
            />
          </Grid>
          <Grid display="flex" justifyContent="center" alignItems="center" item md={12}>
            {" "}
            <TextField
              name="new_password"
              label={`${t("new_password")}`}
              type="password"
              value={account.new_password}
              onChange={changeHandlerAccount}
              sx={{ minWidth: "30vh" }}
            />
          </Grid>
          <Grid  display="flex" justifyContent="center" alignItems="center" item md={12}>
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 1 }}
              color={"secondary"}
              onClick={changePasswordHandler}
            >
              {t("save")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChangePasswordForm;
