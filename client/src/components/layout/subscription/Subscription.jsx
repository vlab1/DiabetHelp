import React from "react";
import {
  Typography,
  Container,
  Button,
  Box,
  Grid,
  CardHeader,
  CardContent,
  Card,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Subscription = ({ renewSubscriptionHandler, randGen, auth }) => {
  const { t } = useTranslation();

  return (
    <section>
      <Container maxWidth="lg">
        <Box py={8} textAlign="center">
          <Box mb={3}>
            <Container maxWidth="sm">
              <Typography variant="h3" component="h2" gutterBottom={true}>
                <Typography variant="h3" component="span" color="inherit">
                  {t("premium_sub")}{" "}
                </Typography>
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                paragraph={true}
              >
                {t("premium_description")}
              </Typography>
            </Container>
          </Box>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardHeader title={`7 ${t("days")} `}></CardHeader>
                <CardContent>
                  <Box px={1}>
                    <Typography variant="h3" component="h2" gutterBottom={true}>
                      300₴
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle1"
                      component="p"
                    >
                      {t("improved_statistics")}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle1"
                      component="p"
                    >
                      
                      {t("product_personalization")}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle1"
                      component="p"
                      paragraph={true}
                    >
                      {t("fast_feedback")}
                    </Typography>
                  </Box>
                  {auth.token && (
                    <Button
                      onClick={() => {
                        renewSubscriptionHandler(7, 300, "Premium", randGen());
                      }}
                      variant="outlined"
                      color="inherit"
                    >
                      {t("buy")}
                    </Button>
                  )}
                  {!auth.token && (
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to="/login"
                    >
                      <Button variant="outlined" color="inherit">
                        {t("buy")}
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardHeader title={`30 ${t("days")} `}></CardHeader>
                <CardContent>
                  <Box px={1}>
                    <Typography variant="h3" component="h2" gutterBottom={true}>
                      900₴
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle1"
                      component="p"
                    >
                      {t("improved_statistics")}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle1"
                      component="p"
                    >
                       {t("product_personalization")}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle1"
                      component="p"
                      paragraph={true}
                    >
                        {t("fast_feedback")}
                    </Typography>
                  </Box>
                  {auth.token && (
                    <Button
                      onClick={() => {
                        renewSubscriptionHandler(30, 900, "Premium", randGen());
                      }}
                      color={"secondary"}
                      variant="contained"
                    >
                      {t("buy")}
                    </Button>
                  )}
                  {!auth.token && (
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to="/login"
                    >
                      <Button variant="outlined" color="inherit">
                        {t("buy")}
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardHeader title={`365 ${t("days")} `}></CardHeader>
                <CardContent>
                  <Box px={1}>
                    <Typography variant="h3" component="h2" gutterBottom={true}>
                      1800₴
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle1"
                      component="p"
                    >
                      {t("improved_statistics")}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle1"
                      component="p"
                    >
                       {t("product_personalization")}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle1"
                      component="p"
                      paragraph={true}
                    >
                        {t("fast_feedback")}
                    </Typography>
                  </Box>
                  {auth.token && (
                    <Button
                      onClick={() => {
                        renewSubscriptionHandler(
                          365,
                          1800,
                          "Premium",
                          randGen()
                        );
                      }}
                      variant="outlined"
                      color="inherit"
                    >
                      {t("buy")}
                    </Button>
                  )}
                  {!auth.token && (
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to="/login"
                    >
                      <Button variant="outlined" color="inherit">
                        {t("buy")}
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
};

export default Subscription;
