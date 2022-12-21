import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useTranslation } from "react-i18next";

export default function EditRecordDialog({
  open,
  handleClose,
  recordEditFormToDefault,
  changeHandlerEditRecordForm,
  editRecordHandler,
  editRecordForm,
  setEditRecordForm,
}) {
  const { t } = useTranslation();
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("edit_record")}</DialogTitle>
        <DialogContent>
          <Grid container spacing={4} xs={12}>
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              item
              md={12}
            >
              <DialogContentText>
                {t("edit_record_desc1")}
              </DialogContentText>
            </Grid>
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              item
              md={12}
            >
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <DateTimePicker
                  label={t("date")}
                  name="date"
                  inputFormat="dd/MM/yyyy HH:MM"
                  ampm={false}
                  value={editRecordForm.date}
                  onChange={(newValue) => {
                    setEditRecordForm({
                      ...editRecordForm,
                      date: newValue,
                    });
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ minWidth: "50vh" }} {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              item
              md={12}
            >
              <TextField
                id="glucose"
                label={t("glucose")}
                type="number"
                name="glucose"
                value={editRecordForm.glucose}
                onChange={changeHandlerEditRecordForm}
                InputProps={{ inputProps: { min: 0, max: 15 } }}
                sx={{ minWidth: "50vh" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              item
              md={12}
            >
              <TextField
                id="weight"
                label={t("weight")}
                type="number"
                name="weight"
                value={editRecordForm.weight}
                onChange={changeHandlerEditRecordForm}
                InputProps={{ inputProps: { min: 0, max: 15 } }}
                sx={{ minWidth: "50vh" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              item
              md={12}
            >
              <TextField
                id="comment"
                label={t("comment")}
                name="comment"
                value={editRecordForm.comment}
                onChange={changeHandlerEditRecordForm}
                sx={{ minWidth: "50vh" }}
                multiline
                rows={5}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("cancel")}</Button>
          <Button
            onClick={() => {
              editRecordHandler()
                .then(recordEditFormToDefault())
                .then(handleClose());
            }}
          >
            {t("create")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
