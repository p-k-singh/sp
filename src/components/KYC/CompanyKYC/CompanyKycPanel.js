import React, { useEffect,useState } from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import CompanyKYCForm from './CompanyKYCForm'
import IndexCompanyDetails from './CompanyDetails/IndexCompanyDetails'
import TaxIndex from './TaxDetails/TaxIndex'
import AccountIndex from './AccountDetails/AccountIndex'
import Tooltip from '@material-ui/core/Tooltip';

import {
  Button,
    Card,
    Grid,
    IconButton
} from '@material-ui/core'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles((theme) => ({
 
    root: {
       minWidth: 275,
    },
    title: {
      fontSize: 20,
      height: 50,
      padding: 10,
      paddingLeft: 55,
      color: 'white'
    },
    formHeadings: {
      margin: 20,
      marginBottom: 0
    }
  }));
const KYCPanel = () => {
    const classes = useStyles()
    const [pressed,setPressed] = useState(true)
    const [page,setPage] = useState('');
    
    const press = () => {
      setPressed(!pressed)
    }
    const changePage = (page) => {
      setPage(page)
    }
    if(page==='companyInfo'){
      return(
        <IndexCompanyDetails changePage={changePage} />
      );
    }
    if(page==='taxInfo'){
      return(
        <TaxIndex changePage={changePage} />
      )
    }
    if(page==='accountInfo'){
      return(
        <AccountIndex changePage={changePage} />
      );
    }
    const displayPanel = <Card>
    <Grid container style={{ backgroundColor: '#66bb6a',marginBottom:30}}  justify="space-between">  
    <Typography fullWidth className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }} inline variant="body1" align="left">Company Info KYC <CheckCircleOutlineIcon /> 
     </Typography>
    <Typography fullWidth className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }} inline variant="body1" align="right">
    <Tooltip title="Show details" interactive>
    <IconButton onClick={()=>changePage('companyInfo')} aria-label="expand row" size="small" ><ChevronRightIcon /> 
      </IconButton></Tooltip>
    </Typography>
    </Grid>
    <Grid container style={{ backgroundColor: '#66bb6a',marginTop:30,marginBottom:30,minHeight:'400%'}}  justify="space-between">  
    <Typography fullWidth className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }} inline variant="body1" align="left">Tax Info KYC <CheckCircleOutlineIcon />   </Typography>
    <Typography fullWidth className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }} inline variant="body1" align="right">
    <Tooltip title="Show details" interactive>
    <IconButton onClick={()=>changePage('taxInfo')} aria-label="expand row" size="small" >
        <ChevronRightIcon /> 
      </IconButton></Tooltip>
    </Typography>
    </Grid>
    <Grid container style={{ backgroundColor: '#66bb6a',marginTop:30,minHeight:'400%'}}  justify="space-between">  
    <Typography fullWidth className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }} inline variant="body1" align="left">Account Info KYC <CheckCircleOutlineIcon />   </Typography>
    <Typography fullWidth className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }} inline variant="body1" align="right">
    <Tooltip title="Show details" interactive>
    <IconButton onClick={()=>changePage('accountInfo')} aria-label="expand row" size="small" >
        <ChevronRightIcon /> 
      </IconButton></Tooltip>
    </Typography>
    </Grid>
  
</Card>;

    return(
      <React.Fragment>
      <Button onClick={()=>press()}>press</Button>
      {pressed && displayPanel}
      {!pressed && <CompanyKYCForm />}
      </React.Fragment>
    )
}

export default KYCPanel
