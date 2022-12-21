import React from "react";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Typography,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const PhysicalParametersForm = ({
  account,
  changeHandlerAccount,
  setAccount,
  physicalParametersHandler
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid display="flex" justifyContent="center" alignItems="center"  item md={12}>
          <Typography variant="h5">{t("physical_params")}</Typography>
        </Grid>
        <Grid  container spacing={4} item xs={12}>
          <Grid display="flex" justifyContent="center" alignItems="center"  item md={12}>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <DatePicker
                label={`${t("birth_date")}`}
                name="birth_date"
                inputFormat="dd/MM/yyyy"
                value={account.birth_date}
                onChange={(newValue) => {
                  setAccount({ ...account, birth_date: newValue });
                }}
                renderInput={(params) => (
                  <TextField sx={{ minWidth: "30vh" }} {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid display="flex" justifyContent="center" alignItems="center"  item md={12}>
            <FormControl sx={{ minWidth: 223 }}>
              <InputLabel sx={{ minWidth: "30vh" }} id="Sex">
              {t("sex")}
              </InputLabel>
              <Select
                labelId="sex"
                id="sex"
                name="sex"
                value={account.sex}
                label={`${t("sex")}`}
                sx={{ minWidth: "30vh" }}
                onChange={(newValue) => {
                  setAccount({ ...account, sex: newValue.target.value });
                }}
              >
                <MenuItem value="Male">{t("male")}</MenuItem>
                <MenuItem value="Female">{t("female")}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid display="flex" justifyContent="center" alignItems="center"  item md={12}>
            <FormControl sx={{ minWidth: 223 }}>
              <InputLabel sx={{ minWidth: "30vh" }} id="Diabetes_type">
              {t("diabetes_type")}
              </InputLabel>
              <Select
                labelId="diabetes_type"
                id="diabetes_type"
                name="diabetes_type"
                value={account.diabetes_type}
                label={t("diabetes_type")}
                sx={{ minWidth: "30vh" }}
                onChange={(newValue) => {
                  setAccount({ ...account, diabetes_type: newValue.target.value });
                }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid display="flex" justifyContent="center" alignItems="center"  item md={12}>
            <TextField
              id="high_sugar"
              label={t("high_sugar")}
              type="number"
              name="high_sugar"
              InputProps={{ inputProps: { min: 0, max: 15 } }}
              sx={{ minWidth: "30vh" }}
              InputLabelProps={{
                shrink: true,
              }}
              value={account.high_sugar}
              onChange={changeHandlerAccount}
            />
          </Grid>
          <Grid display="flex" justifyContent="center" alignItems="center"  item md={12}>
            <TextField
              id="low_sugar"
              label={t("low_sugar")}
              type="number"
              name="low_sugar"
              InputProps={{ inputProps: { min: 0, max: 15 } }}
              sx={{ minWidth: "30vh" }}
              InputLabelProps={{
                shrink: true,
              }}
              value={account.low_sugar}
              onChange={changeHandlerAccount}
            />
          </Grid>
          <Grid display="flex" justifyContent="center" alignItems="center"  item md={12}>
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 1 }}
              color={"secondary"}
              onClick={physicalParametersHandler}
            >
              {t("save")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PhysicalParametersForm;
