import React,{useEffect, useState} from 'react'
import Spinner from '../../../UI/Spinner'
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


const AccountInfoForm = (props) => {
   
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
                {/* <Breadcrumbs style={{marginBottom:'10px'}} aria-label="breadcrumb">
        <Link color="inherit" onClick={() => fun('')}>
            KYC
        </Link>
            <Typography color="textPrimary">Account KYC</Typography>
    </Breadcrumbs> */}
                <Typography fullWidth className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                            Pending KYC
                        </Typography>
                        <form>
                          
                        <Typography className={classes.formHeadings} >Account Details</Typography>
                    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                    
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="text"
                            id="accountHolderName"
                            name="accountHolderName"
                            label="Account Holder's Name"
                            fullWidth                            
                     
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="text"
                            id="accountNumber"
                            name="accountNumber"
                            label="Account Number"
                            fullWidth                            
                            
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="text"
                            id="ifscCode"
                            name="ifscCode"
                            label="IFSC Code"
                            fullWidth                            
                    
                        />
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
export default AccountInfoForm