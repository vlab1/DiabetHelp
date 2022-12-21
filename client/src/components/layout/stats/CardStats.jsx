import React from "react";
import {
  CardContent,
  CardMedia,
  Box,
  Typography,
  Card,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function CardStats(props) {
  const { t } = useTranslation();
  return props.maximum && props.minimum ? (
    <Card sx={{ display: "flex", minWidth: "68vh" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            <b>{props.titleTimeSpan}{" "}</b>{props.title}{" "}
          </Typography>
          <Box px={1}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography variant="subtitle1" color="text.secondary" noWrap>
                {t("record_number")}{" "}
              </Typography>
              <Typography variant="title" color="inherit" noWrap>
                &nbsp;
              </Typography>
              <Typography
                sx={{ fontWeight: 550 }}
                variant="subtitle1"
                color="text.inherit"
                noWrap
              >
                {props.countRecords}{" "}
              </Typography>
            </div>

            <p></p>

            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography
                color="textSecondary"
                variant="subtitle1"
                component="p"
              >
                {props.title01}
              </Typography>
              <Typography variant="title" color="inherit" noWrap>
                &nbsp;
              </Typography>
              <Typography
                variant="subtitle1"
                style={{}}
                color="text.inherit"
                noWrap
                sx={{ fontWeight: 550 }}
              >{props.maximum[props.value]}
               
              </Typography>
            </div>

            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography
                color="textSecondary"
                variant="subtitle1"
                component="p"
              >
                {props.title02}
              </Typography>
              <Typography variant="title" color="inherit" noWrap>
                &nbsp;
              </Typography>
              <Typography
                sx={{ fontWeight: 550 }}
                variant="subtitle1"
                color="text.inherit"
                noWrap
              >
                 {props.formatDate(props.maximum.date)}
              </Typography>
            </div>

            {/* <div style={{ display: "grid", alignItems: "baseline" }}>
              <Typography
                color="textSecondary"
                variant="subtitle1"
                component="p"
              >
                {props.title03}
              </Typography>

              <Typography
                style={{ wordWrap: "break-word" }}
                variant="subtitle1"
                color="text.inherit"
                sx={{
                  maxWidth: "40vh",
                  fontWeight: 550,
                }}
              >
                {props.maximum.comment}
              </Typography>
            </div> */}

            <p></p>

            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography
                color="textSecondary"
                variant="subtitle1"
                component="p"
              >
                {props.title11}
              </Typography>
              <Typography variant="title" color="inherit" noWrap>
                &nbsp;
              </Typography>
              <Typography
                sx={{ fontWeight: 550 }}
                variant="subtitle1"
                color="text.inherit"
                noWrap
              >{props.minimum[props.value]}
                
              </Typography>
            </div>

            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography
                color="textSecondary"
                variant="subtitle1"
                component="p"
              >
                {props.title12}
              </Typography>
              <Typography variant="title" color="inherit" noWrap>
                &nbsp;
              </Typography>
              <Typography
                sx={{ fontWeight: 550 }}
                variant="subtitle1"
                color="text.inherit"
                noWrap
              >
                {props.formatDate(props.minimum.date)}
              </Typography>
            </div>

            {/* <div style={{ display: "grid", alignItems: "baseline" }}>
              <Typography
                color="textSecondary"
                variant="subtitle1"
                component="p"
              >
                {props.title13}
              </Typography>

              <Typography
                style={{ wordWrap: "break-word" }}
                variant="subtitle1"
                color="text.inherit"
                sx={{
                  maxWidth: "40vh",
                  fontWeight: 550,
                }}
              >
                {props.minimum.comment}
              </Typography>
            </div> */}
          </Box>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 250, padding: 5 }}
        image={props.img}
        alt="Live from space album cover"
      />
    </Card>
  ) : <></>;
}
