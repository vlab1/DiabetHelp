import { Box, Button, Typography, useTheme } from "@mui/material";

const OverlayPanel = ({
  isVisible,
  toggle,
  headline,
  text,
  btnText,
  position
}) => {
  const theme = useTheme();

  return (
    <Box
      style={{
        ...(position === "left" && {
          transform: `translateX(${isVisible ? "0" : "-30%"})`
        }),
        ...(position === "right" && {
          transform: `translateX(${isVisible ? "30%" : "0"})`
        })
      }}
      sx={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        width: 0.5,
        height: 1,
        p: 4,
        top: 0,
        transition: theme.transitions.create("transform"),
        ...(position === "left" && {
          left: 0
        }),
        ...(position === "right" && {
          right: 0
        })
      }}
    >
      <Typography component="h1" variant="h4" align="center">
        {headline}
      </Typography>
      <Typography align="center">{text}</Typography>
      <Button variant="outlined" color="inherit" size="large" onClick={toggle}>
        {btnText}
      </Button>
    </Box>
  );
};

export default OverlayPanel;
