import { Box,  useTheme } from "@mui/material";
import OverlayPanel from "./OverlayPanel";
import { useTranslation } from "react-i18next";

const OverlayContainer = ({ isVisible, toggle }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      style={{
        transform: `translateX(${isVisible ? "-100%" : "0"})`,
      }}
      sx={{
        position: "absolute",
        top: 0,
        left: "50%",
        width: 0.5,
        height: 1,
        overflow: "hidden",
        zIndex: 100,
        transition: theme.transitions.create("transform"),
      }}
    >
      <Box
        style={{
          transform: `translateX(${isVisible ? "50%" : "0"})`,
        }}
        sx={{
          position: "relative",
          width: "200%",
          height: 1,
          left: "-100%",
          bgcolor: "secondary.main",
          color: "secondary.contrastText",
          transition: theme.transitions.create("transform"),
        }}
      >
        <OverlayPanel
          position="left"
          headline={t("overlay_panel11")}
          text={t("overlay_panel1")}
          btnText={t("login")}
          isVisible={isVisible}
          toggle={toggle}
        />

        <OverlayPanel
          position="right"
          headline={t("overlay_panel22")}
          text={t("overlay_panel2")}
          btnText={t("create_an_acc")}
          isVisible={isVisible}
          toggle={toggle}
        />
      </Box>
    </Box>
  );
};

export default OverlayContainer;
