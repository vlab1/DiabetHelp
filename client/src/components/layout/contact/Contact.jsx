import React from "react";
import {
  Typography,
  Container,
  Button,
  Box,
  Grid,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const Contact = ({ contactForm, changeHandlerContactForm, sendEmail }) => {
  const { t } = useTranslation();

  return (
    <div style={{ marginTop: "50px", marginBottom: "100px" }}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h3" component="h2" gutterBottom={true}>
          <Typography variant="h3" component="span" color="inherit">
            {t("contact_us")}{" "}
          </Typography>
        </Typography>
      </Box>
      <Container maxWidth="lg">
        <Box textAlign="center">
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              height: "62vh",
              borderRadius: "1.5em",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box sx={{ padding: 4 }}>
              <Box component="form" noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <TextField
                      name="fullName"
                      value={contactForm.fullName}
                      onChange={changeHandlerContactForm}
                      label={`${t("full_name")}`}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      name="email"
                      value={contactForm.email}
                      onChange={changeHandlerContactForm}
                      label={`${t("email")}`}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid item md={12}>
                    <TextField
                      name="topic"
                      value={contactForm.topic}
                      onChange={changeHandlerContactForm}
                      label={`${t("topic")}`}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid item md={12}>
                    <TextField
                      name="text"
                      id="outlined-multiline-static"
                      label={`${t("text")}`}
                      multiline
                      fullWidth
                      rows={10}
                      variant="outlined"
                      value={contactForm.text}
                      onChange={changeHandlerContactForm}
                    />
                  </Grid>

                  <Grid item md={12}>
                    <Button
                      variant="contained"
                      type="submit"
                      color="secondary"
                      onClick={sendEmail}
                      sx={{ width: "200px", fontSize: "16px" }}
                    >
                      {`${t("submit")}`}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Contact;
