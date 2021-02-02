import React,{useEffect, useState} from 'react'

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import {Auth,API} from 'aws-amplify'
// import axios from 'axios'
import {Link} from 'react-router-dom'
import {
    TextField,
    Grid,
    Button,
    Breadcrumbs
} from '@material-ui/core'
const useStyles = makeStyles({
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
  });


const CompanyKYC = (props) => {
   
    const classes = useStyles()
    const [aadharDoc,setAadharDoc] = useState()

    const submitKYC =  () => {
        
    }
    const fun = (page) => {
        //alert(JSON.stringify(props))
        props.changePage(page)
    }
    const onAadharProofChange = (event) => {
        setAadharDoc(event.target.files[0])
    }
    
        return(
            <div style={{overflow:'hidden'}} >
                <Breadcrumbs style={{marginBottom:'10px'}} aria-label="breadcrumb">
        <Link color="inherit" onClick={() => fun('')}>
            KYC
        </Link>
            <Typography color="textPrimary">Company Info KYC</Typography>
    </Breadcrumbs>
                <Typography fullWidth className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                            Pending KYC
                        </Typography>
                        <form>
                          
                <Typography className={classes.formHeadings} >Company Details</Typography>
                    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                    
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="text"
                            id="registeredName"
                            name="registeredName"
                            label="Registered Name"
                            fullWidth                            
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="text"
                            id="registeredAddress"
                            name="registeredAddress"
                            label="Registered Address"
                            fullWidth                            
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="email"
                            id="email"
                            name="email"
                            label="Offcial Email Id"
                            fullWidth                            
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="number"
                            id="contact"
                            name="contact"
                            label="Contact number"
                            fullWidth                            
                        />
                    </Grid>
                    
                    <Typography className={classes.formHeadings} >Documents Upload</Typography>
                        <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                         <Grid item xs={12} >
                        <label>Registration  Proof: </label>
                        <input   style={{marginLeft:'15px'}} type="file" onChange={(event) => onAadharProofChange(event)}  /> 
                        </Grid>
                        
                        </Grid>


                    </Grid>                    
                
                <Button 
                    onClick={submitKYC}
                    className="row"
                    variant='contained' style={{float:'right',backgroundColor:'#f9a825', marginBottom:'10px'}}
            >Submit KYC</Button>
            
            
        </form>
            </div>
        );
    
}
export default CompanyKYC