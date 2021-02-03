import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import CompanyKYCForm from "./CompanyKYCForm";
import IndexCompanyDetails from "./CompanyDetails/IndexCompanyDetails";
import FormCompanyDetails from "./CompanyDetails/FormCompanyDetails";
import TaxForm from "./TaxDetails/TaxForm";
import TaxIndex from "./TaxDetails/TaxIndex";
import AccountInfoForm from "./AccountDetails/AccountForm";
import AccountIndex from "./AccountDetails/AccountIndex";
import Tooltip from "@material-ui/core/Tooltip";

import { Button, Card, Grid, IconButton } from "@material-ui/core"; import Done from "@material-ui/icons/Done";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     minWidth: 275,
//   },
//   title: {
//     fontSize: 20,
//     height: 50,
//     padding: 10,
//     paddingLeft: 55,
//     color: "#DCDCDC",
//   },
//   formHeadings: {
//     margin: 20,
//     marginBottom: 0,
//   },
// }));
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const KYCPanel = () => {
  const classes = useStyles();
  const [pressed, setPressed] = useState(true);
  const [page, setPage] = useState("");

  const press = () => {
    setPressed(!pressed);
  };
  const changePage = (page) => {
    setPage(page);
  };
  if (page === "companyInfo") {
    return <IndexCompanyDetails changePage={changePage} />;
  }
  if (page === "taxInfo") {
    return <TaxIndex changePage={changePage} />;
  }
  if (page === "accountInfo") {
    return <AccountIndex changePage={changePage} />;
  }

  const displayPanel = (
    <div className={classes.root}>
      <Accordion stles={{ backgroundColor: "grey" }}>
        <AccordionSummary
          style={{
            backgroundColor: "rgba(0, 0, 0, .03)",
            borderBottom: "1px solid rgba(0, 0, 0, .125)",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            fullWidth
            className={classes.title}
            gutterBottom
            inline
            variant="body1"
            align="left"
          >
            Company Info{" "}
            <Tooltip title="Done">
              <Done style={{ color: "green" }} />
            </Tooltip>{" "}
            <Tooltip title="Warning">
              <ErrorOutlineIcon style={{ color: "orange" }} />
            </Tooltip>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <IndexCompanyDetails changePage={changePage} />
            <FormCompanyDetails />
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          style={{
            backgroundColor: "rgba(0, 0, 0, .03)",
            borderBottom: "1px solid rgba(0, 0, 0, .125)",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            fullWidth
            className={classes.title}
            gutterBottom
            inline
            variant="body1"
            align="left"
          >
            Tax Info{" "}
            <Tooltip title="Done">
              <Done style={{ color: "green" }} />
            </Tooltip>{" "}
            <Tooltip title="Warning">
              <ErrorOutlineIcon style={{ color: "orange" }} />
            </Tooltip>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <TaxIndex changePage={changePage} />
            <TaxForm />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          style={{
            backgroundColor: "rgba(0, 0, 0, .03)",
            borderBottom: "1px solid rgba(0, 0, 0, .125)",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            fullWidth
            className={classes.title}
            gutterBottom
            inline
            variant="body1"
            align="left"
          >
            Account Info{" "}
            <Tooltip title="Done">
              <Done style={{ color: "green" }} />
            </Tooltip>{" "}
            <Tooltip title="Warning">
              <ErrorOutlineIcon style={{ color: "orange" }} />
            </Tooltip>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <AccountIndex changePage={changePage} />
            <AccountInfoForm />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
    /*  {<Grid
        container
        style={{ backgroundColor: "#66bb6a", marginBottom: 30 }}
        justify="space-between"
      >
        <Typography
          fullWidth
          className={classes.title}
          gutterBottom
          style={{ backgroundColor: "#66bb6a" }}
          inline
          variant="body1"
          align="left"
        >
          Company Info KYC <CheckCircleOutlineIcon /> <ErrorOutlineIcon />
        </Typography>
        <Typography
          fullWidth
          className={classes.title}
          gutterBottom
          style={{ backgroundColor: "#66bb6a" }}
          inline
          variant="body1"
          align="right"
        >
          <Tooltip title="Show details" interactive>
            <IconButton
              onClick={() => changePage("companyInfo")}
              aria-label="expand row"
              size="small"
            >
              <ChevronRightIcon />
            </IconButton>
          </Tooltip>
        </Typography>
      </Grid>
      <Grid
        container
        style={{
          backgroundColor: "#66bb6a",
          marginTop: 30,
          marginBottom: 30,
          minHeight: "400%",
        }}
        justify="space-between"
      >
        <Typography
          fullWidth
          className={classes.title}
          gutterBottom
          style={{ backgroundColor: "#66bb6a" }}
          inline
          variant="body1"
          align="left"
        >
          Tax Info KYC <CheckCircleOutlineIcon /> <ErrorOutlineIcon />{" "}
        </Typography>
        <Typography
          fullWidth
          className={classes.title}
          gutterBottom
          style={{ backgroundColor: "#66bb6a" }}
          inline
          variant="body1"
          align="right"
        >
          <Tooltip title="Show details" interactive>
            <IconButton
              onClick={() => changePage("taxInfo")}
              aria-label="expand row"
              size="small"
            >
              <ChevronRightIcon />
            </IconButton>
          </Tooltip>
        </Typography>
      </Grid>
      <Grid
        container
        style={{
          backgroundColor: "#66bb6a",
          marginTop: 30,
          minHeight: "400%",
        }}
        justify="space-between"
      >
        <Typography
          fullWidth
          className={classes.title}
          gutterBottom
          style={{ backgroundColor: "#66bb6a" }}
          inline
          variant="body1"
          align="left"
        >
          Account Info KYC <CheckCircleOutlineIcon />
          <ErrorOutlineIcon />{" "}
        </Typography>
        <Typography
          fullWidth
          className={classes.title}
          gutterBottom
          style={{ backgroundColor: "#66bb6a" }}
          inline
          variant="body1"
          align="right"
        >
          <Tooltip title="Show details" interactive>
            <IconButton
              onClick={() => changePage("accountInfo")}
              aria-label="expand row"
              size="small"
            >
              <ChevronRightIcon />
            </IconButton>
          </Tooltip>
        </Typography>
      </Grid> */
    //  }
  );

  return (
    <React.Fragment>
      <Button onClick={() => press()}>press</Button>
      {pressed && displayPanel}
      {!pressed && <CompanyKYCForm />}
    </React.Fragment>
  );
};

export default KYCPanel;
