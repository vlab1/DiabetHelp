import React from "react";
import { Container, Grid, Box, Link } from "@mui/material";
import "./Footer.css";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return location.pathname !== "/login" &&
    location.pathname.indexOf("/success") < 0 &&
    location.pathname.indexOf("/canceled") < 0 ? (
    <footer>
      <Box>
        <Container maxWidth="lg" style={{ marginTop: "10px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Box style={{ marginBottom: "10px", fontWeight: "bolder" }}>           
                {t("about_diabet_help")}
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >                
                  {t("about_us")}
                </Link>
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >
                  {t("blog")}
                </Link>
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >                 
                  {t("locations")}
                </Link>
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >               
                  {t("news")}
                </Link>
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >                 
                  {t("d_b_cares")}
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box style={{ marginBottom: "10px", fontWeight: "bolder" }}>
                {t("accountUpper")}
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >
                  {t("account")}
                </Link>
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >                
                  {t("order_history")}
                </Link>
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >               
                  {t("d_b_yourself")}
                </Link>
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >                
                  {t("d_b_fan_club")}
                </Link>
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >               
                  {t("notification_settings")}
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box style={{ marginBottom: "10px", fontWeight: "bolder" }}>               
                {t("assistance")}
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >                  
                  {t("support_center")}
                </Link>
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >                
                  {t("returns_policy")}
                </Link>
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >                 
                  {t("cancelletion_policy")}
                </Link>
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >                
                  {t("replacement_policy")}
                </Link>
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >               
                  {t("accessibility_statement")}
                </Link>
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >             
                  {t("terms_conditions")}
                </Link>
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >               
                  {t("privacy_policy")}
                </Link>
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >            
                  {t("resellers")}
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box style={{ marginBottom: "10px", fontWeight: "bolder" }}>              
                {t("connect_with_us")}
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >                 
                  {t("contact_us1")}
                </Link>
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >
                  {t("twitter")}
                </Link>
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >                
                  {t("instagram")}
                </Link>
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >               
                  {t("facebook")}
                </Link>
              </Box>
              <Box>
                <Link
                  href="/"
                  color="inherit"
                  style={{ fontWeight: "lighter" }}
                >               
                  {t("youtube")}
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box
            color="gray"
            textAlign="center"
            pt={{ xs: 5, sm: 10 }}
            pb={{ xs: 5, sm: 0 }}
          >
            {" "}
            {t("right")}&reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  ) : (
    <></>
  );
};

export default Footer;
