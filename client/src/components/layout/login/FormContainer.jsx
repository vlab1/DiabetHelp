import { Box, useTheme } from "@mui/material";

const FormContainer = ({ type, isVisible, children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "absolute",
        width: 0.5,
        height: 1,
        p: 4,
        ...(type === "login"
          ? {
              left: 0,
            }
          : {
              right: 0,
            }),
        overflow: "hidden",
        transition: theme.transitions.create("transform"),
      }}
    >
      <Box
        style={{
          ...(type === "login" && {
            transform: `translateX(${isVisible ? "100%" : "0"})`,
          }),
          ...(type === "register" && {
            transform: `translateX(${isVisible ? "0" : "-100%"})`,
          }),
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 1,
          transition: theme.transitions.create("transform"),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default FormContainer;
