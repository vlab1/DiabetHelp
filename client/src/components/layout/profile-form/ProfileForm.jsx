import React from "react";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  Grid,
  TextField,
  Typography,
  Container,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useTranslation } from "react-i18next";

const ProfileForm = ({ account, changeHandlerAccount, setAccount, profileHandler }) => {
  const { t } = useTranslation();
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid display="flex" justifyContent="center" alignItems="center"  item md={12}>
          <Typography variant="h5">{t("acc2")}</Typography>
        </Grid>
        <Grid container spacing={4} item xs={12}>
          <Grid display="flex" justifyContent="center" alignItems="center"  item md={12}>
            <TextField
              name="name"
              label={t("name")}
              value={account.name}
              onChange={changeHandlerAccount}
              sx={{ minWidth: "30vh" }}
            />
          </Grid>
          <Grid display="flex" justifyContent="center" alignItems="center"  item md={12}>
            {" "}
            <TextField
              name="email"
              label={t("email1")}
              disabled
              value={account.email}
              onChange={changeHandlerAccount}
              sx={{ minWidth: "30vh" }}
            />
          </Grid>
          {account.premiumExpires && (
            <Grid display="flex" justifyContent="center" alignItems="center"  item md={12}>
              {" "}
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <DatePicker
                  label={t("premium_expires")}
                  name="premiumExpires"
                  inputFormat="dd/MM/yyyy"
                  value={account.premiumExpires}
                  disabled
                  onChange={(newValue) => {
                    setAccount({ ...account, premiumExpires: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ minWidth: "30vh" }} {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          )}
          <Grid display="flex" justifyContent="center" alignItems="center"  item md={12}>
            <MuiTelInput
              value={account.phone}
              sx={{ minWidth: "30vh" }}
              onChange={(newValue) => {
                setAccount({ ...account, phone: newValue });
              }}
            />
          </Grid>
          {/* <Grid  display="flex" justifyContent="center" alignItems="center"  item md={12}>
            <FormControl sx={{ minWidth: 223 }}>
              <InputLabel sx={{ minWidth: "30vh" }} id="Diabetes_type">
              {t("localization")}
              </InputLabel>
              <Select
                labelId="localization"
                id="localization"
                name="localization"
                value={account.localization}
                label={t("localization")}
                sx={{ minWidth: "30vh" }}
                onChange={(newValue) => {
                  setAccount({ ...account, localization: newValue.target.value });
                }}
              >
                <MenuItem value={"En"}>En</MenuItem>
                <MenuItem value={"Ukr"}>Ukr</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          <Grid display="flex" justifyContent="center" alignItems="center"  item md={12}>
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 1 }}
              color={"secondary"}
              onClick={profileHandler}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileForm;
