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

import { Button, Card, Grid, IconButton } from "@material-ui/core"; 
import Done from "@material-ui/icons/Done";
import WarningIcon from '@material-ui/icons/Warning';

import {Auth,API} from 'aws-amplify'

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
  const [loading,setLoading] = useState('true')
  const [companyDetails,setCompanyDetails] = useState(null)
  const [taxDetails,setTaxDetails] = useState(null)
  const [accountDetails,setAccountDetails] = useState(null)
  
  function loadData(){
    setLoading('true')
    Auth.currentUserInfo()
    .then((userDetails)=>{
      API.get("GoFlexeOrderPlacement",`/kyc/info?type=serviceprovider&id=${userDetails.username}`)
      .then(resp=> {
        console.log(resp)
        if(resp.length===0){
          setCompanyDetails(null)
          setTaxDetails(null)
          setAccountDetails(null)
        }
        else{
          if(resp[0].companyInfo!==undefined){
            setCompanyDetails(resp[0].companyInfo)
          }
          if(resp[0].accountInfo!==undefined){
            setAccountDetails(resp[0].accountInfo)
          }
          if(resp[0].taxInfo!==undefined){
            setTaxDetails(resp[0].taxInfo)
          }
          //setCompanyDetails(resp[0].)
          //setRows(resp[0].trucks)
        }
        setLoading('false')
      })
      .catch(err => {
        console.log(err)
        setLoading('error')
      })
    })
    .catch(err => {
      console.log(err)
      setLoading('error')
    })
  }
  useEffect(()=>{
    loadData()
  },[])

  const press = () => {
    setPressed(!pressed);
  };
  const changePage = (page) => {
    setPage(page);
   
  };

  const displayPanel = (
    <div className={classes.root}>
      <Accordion >
        <AccordionSummary
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
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
            Company Info {" "}

            {companyDetails!==null ?

            <Tooltip title="Done">
              <Done style={{ color: "green" }} />
            </Tooltip>   :
            <Tooltip title="Pending">
              <WarningIcon style={{ color: "orange" }} />
            </Tooltip> }
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {companyDetails===null ?<FormCompanyDetails loadData={loadData} />: <IndexCompanyDetails companyDetails={companyDetails} changePage={changePage} />}
            
            
          </Typography>
        </AccordionDetails>
      </Accordion>


      <Accordion>
        <AccordionSummary
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, .03)',
            borderBottom: '1px solid rgba(0, 0, 0, .125)',
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
            Tax Info {" "}
            {taxDetails!==null ?
              <Tooltip title="Done">
                <Done style={{ color: "green" }} />
              </Tooltip>   :
              <Tooltip title="Pending">
                <WarningIcon style={{ color: "orange" }} />
              </Tooltip> }
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {taxDetails===null ?<TaxForm loadData={loadData}/>:<TaxIndex taxDetails={taxDetails} changePage={changePage} /> }
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, .03)',
            borderBottom: '1px solid rgba(0, 0, 0, .125)',
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            fullWidth
            className={classes.title}
            gutterBottom
            //style={{ backgroundColor: "#DCDCDC", color: "#3f51b5" }}
            inline
            variant="body1"
            align="left"
          >
            Account Info {" "}
            {accountDetails!==null ?
              <Tooltip title="Done">
                <Done style={{ color: "green" }} />
              </Tooltip>   :
              <Tooltip title="Pending">
                <WarningIcon style={{ color: "orange" }} />
              </Tooltip> }
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {accountDetails===null ? <AccountInfoForm loadData={loadData} />:<AccountIndex accountDetails={accountDetails} changePage={changePage} />}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
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
