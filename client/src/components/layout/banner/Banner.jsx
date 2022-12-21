import React from "react";
import { Link } from "react-router-dom";
import { Typography, Container, Button, Box, Stack } from "@mui/material";
import { useTranslation } from 'react-i18next'

const Banner = ({auth}) => {
  const { t } = useTranslation();

  return (
    <div className="bg">
      <Box
        component="image"
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {t("start_now")}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            {t("banner_description")}
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            {auth.token && <Link style={{ textDecoration: "none" }} to="/statistics">
              <Button color={"secondary"} variant="contained">
                {t("my_statistics")}
              </Button>
            </Link>}
            {!auth.token && <Link style={{ textDecoration: "none" }} to="/login">
              <Button color={"secondary"} variant="contained">
              {t("my_statistics")}
              </Button>
            </Link>}
            <Button
              onClick={() => {
                window.scrollTo({ top: 600, left: 0, behavior: "smooth" });
              }}
              color="inherit"
              variant="outlined"
            >         
              {t("buy_premium")}
            </Button>
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

export default Banner;
