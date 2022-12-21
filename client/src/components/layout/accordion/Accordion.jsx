import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiTypography from "@mui/material/Typography";
import MuiExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";

const Accordion = () => {
  const { t } = useTranslation();
  return (
    <div>
      <MuiAccordion disableGutters>
        <MuiAccordionSummary
          expandIcon={<MuiExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <MuiTypography variant="subtitle2" component="h2">
            {t("accordion_topic_1")}
          </MuiTypography>
        </MuiAccordionSummary>
        <MuiAccordionDetails>
          <MuiTypography variant="body1" component="p">       
            {t("accordion_description_1")}
          </MuiTypography>
        </MuiAccordionDetails>
      </MuiAccordion>

      <MuiAccordion disableGutters>
        <MuiAccordionSummary
          expandIcon={<MuiExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <MuiTypography variant="subtitle2" component="h2">      
            {t("accordion_topic_2")}
          </MuiTypography>
        </MuiAccordionSummary>
        <MuiAccordionDetails>
          <MuiTypography variant="body1" component="p">         
            {t("accordion_description_2")}
          </MuiTypography>
        </MuiAccordionDetails>
      </MuiAccordion>

      <MuiAccordion disableGutters>
        <MuiAccordionSummary
          expandIcon={<MuiExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <MuiTypography variant="subtitle2" component="h2">          
            {t("accordion_topic_3")}
          </MuiTypography>
        </MuiAccordionSummary>
        <MuiAccordionDetails>
          <MuiTypography variant="body1" component="p">           
            {t("accordion_description_3")}
          </MuiTypography>
        </MuiAccordionDetails>
      </MuiAccordion>

      <MuiAccordion disableGutters>
        <MuiAccordionSummary
          expandIcon={<MuiExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <MuiTypography variant="subtitle2" component="h2">          
            {t("accordion_topic_4")}
          </MuiTypography>
        </MuiAccordionSummary>
        <MuiAccordionDetails>
          <MuiTypography variant="body1" component="p">      
            {t("accordion_description_4")}
          </MuiTypography>
        </MuiAccordionDetails>
      </MuiAccordion>

      <MuiAccordion disableGutters>
        <MuiAccordionSummary
          expandIcon={<MuiExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <MuiTypography variant="subtitle2" component="h2">         
            {t("accordion_topic_5")}
          </MuiTypography>
        </MuiAccordionSummary>
        <MuiAccordionDetails>
          <MuiTypography variant="body1" component="p">         
            {t("accordion_description_5")}
          </MuiTypography>
        </MuiAccordionDetails>
      </MuiAccordion>

      <MuiAccordion disableGutters>
        <MuiAccordionSummary
          expandIcon={<MuiExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <MuiTypography variant="subtitle2" component="h2">
            
            {t("accordion_topic_6")}
          </MuiTypography>
        </MuiAccordionSummary>
        <MuiAccordionDetails>
          <MuiTypography variant="body1" component="p">           
            {t("accordion_description_6")}
          </MuiTypography>
        </MuiAccordionDetails>
      </MuiAccordion>

      <MuiAccordion disableGutters>
        <MuiAccordionSummary
          expandIcon={<MuiExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <MuiTypography variant="subtitle2" component="h2">         
            {t("accordion_topic_7")}
          </MuiTypography>
        </MuiAccordionSummary>
        <MuiAccordionDetails>
          <MuiTypography variant="body1" component="p">         
            {t("accordion_description_7")}
          </MuiTypography>
        </MuiAccordionDetails>
      </MuiAccordion>

      <MuiAccordion disableGutters>
        <MuiAccordionSummary
          expandIcon={<MuiExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <MuiTypography variant="subtitle2" component="h2">         
            {t("accordion_topic_8")}
          </MuiTypography>
        </MuiAccordionSummary>
        <MuiAccordionDetails>
          <MuiTypography variant="body1" component="p">         
            {t("accordion_description_8")}
          </MuiTypography>
        </MuiAccordionDetails>
      </MuiAccordion>
    </div>
  );
};

export default Accordion;
