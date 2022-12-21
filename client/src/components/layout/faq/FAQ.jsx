import { useTheme } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import MuiCard from "@mui/material/Card";
import MuiCardContent from "@mui/material/CardContent";
import MuiCardMedia from "@mui/material/CardMedia";
import useMediaQuery from "@mui/material/useMediaQuery";
import Accordion from "../accordion/Accordion";
import {  Box, Typography } from "@mui/material";
import FAQs from "../../images/svg/FAQ/FAQs.svg"
const CardFAQ = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const widthCardResponsive = matches ? 1150 : 340;

  return (
    <div style={{ marginTop: "50px", marginBottom: "100px", }}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h3" component="h2" gutterBottom={true}>
          <Typography variant="h3" component="span" color="inherit">
            FAQ{" "}
          </Typography>
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        {" "}
        <MuiCard
          sx={{
            width: widthCardResponsive,
            borderRadius: "1.5em",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            overflow: "visible",
          }}
        >
          <MuiGrid container>
            <MuiGrid item xs={12} sm={6} sx={{ position: "relative"}}>
              <MuiCardMedia justifyContent="center" alignItems="center"
                component="img"
                sx={{
                  position: "absolute",
                  top: matches ? -20 : -140,
                  padding: "0 2em",
                  zIndex: 101,
                  width: 750 ,
                  ml: -10
                }}
                image={
                  matches
                    ? FAQs
                    : FAQs
                }
                alt="image"
              />
            </MuiGrid>

            <MuiGrid item xs={12} sm={6}>
              <MuiCardContent sx={{ marginTop: matches ? 0 : 12 }}>
                <Accordion />
              </MuiCardContent>
            </MuiGrid>
          </MuiGrid>
        </MuiCard>
      </Box>
    </div>
  );
};

export default CardFAQ;
