import React,{useEffect, useState} from 'react'
import Spinner from '../../UI/Spinner'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import {
    TextField,
    Grid,
    Button,
} from '@material-ui/core'
import {API,Auth} from 'aws-amplify'
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

    const [myState,setMyState] = useState({
        registeredName:'',
        registeredAddress:'',
        registeredEmail:'',
        registeredContactNo:'',
        pan:'',
        gstin:'',
        accountHolderName:'',
        accountNumber:'',
        ifscCode:''
    })

    const classes = useStyles() 
    const [loading,setLoading] = useState(false)
    
    const [aadharProof,setAadharProof] = useState()
    const [panProof,setPanProof] = useState()
    const [gstinProof,setGSTINProof] = useState()
    
    const submitKYC =  () => {

        setLoading(true)
        var panLink,gstinLink
        var aadharLink;

        const metaData= {
            'contentType': aadharProof.type
        }
        const payload= {
             body: {
                 contentType: aadharProof.type,
                 metaData: metaData
             }
        }
        API.post(
            "GoFlexeOrderPlacement", '/kyc/document?type='+'serviceprovider', payload)
            .then((initiateResult)=>{
                aadharLink = `uploads/kycdocuments/${initiateResult.fileId}.${aadharProof.type}`
                axios.put(initiateResult.s3PutObjectUrl,aadharProof,{
                    headers: {
                        'Content-Type': aadharProof.type
                    }
                }).then(resp => {
                    console.log(resp)
                    const metaData= {
                        'contentType': panProof.type
                    }
                    const payload= {
                         body: {
                             contentType: panProof.type,
                             metaData: metaData
                         }
                    }
                    API.post(
                        "GoFlexeOrderPlacement", '/kyc/document?type='+'serviceprovider', payload)
                        .then((initiateResult)=>{
                            panLink = `uploads/kycdocuments/${initiateResult.fileId}.${panProof.type}`
                            axios.put(initiateResult.s3PutObjectUrl,panProof,{
                                headers: {
                                    'Content-Type': panProof.type
                                }
                            }).then(resp=>{
                                console.log(resp)
                                const metaData= {
                                    'contentType': gstinProof.type
                                }
                                const payload= {
                                     body: {
                                         contentType: gstinProof.type,
                                         metaData: metaData
                                     }
                                }
                                API.post(
                                    "GoFlexeOrderPlacement", '/kyc/document?type='+'serviceprovider', payload)
                                    .then((initiateResult)=>{
                                        gstinLink = `uploads/kycdocuments/${initiateResult.fileId}.${gstinProof.type}`
                                        axios.put(initiateResult.s3PutObjectUrl, gstinProof, {
                                            headers: {
                                              'Content-Type': gstinProof.type
                                            },
                                        }).then(resp=>{
                                            console.log(resp)
                                            Auth.currentUserInfo()
                                            .then((userDetails)=>{
                                                const payload={
                                                    body:{
                                                        id:userDetails.username,
                                                        type:'serviceprovider',
                                                        selfInfo:{
                                                        companyInfo:{
                                                            registeredName:myState.registeredName,
                                                            registeredAddress:myState.registeredAddress,
                                                            registeredEmail:myState.registeredEmail,
                                                            registeredContactNo:myState.registeredContactNo,
                                                            registrationProofLink:aadharLink
                                                        },
                                                        taxInfo:{
                                                        pan:myState.pan,
                                                        gstin:myState.gstin,
                                                        panLink:panLink,
                                                        gstinLink:gstinLink
                                                        },
                                                        accountInfo:{
                                                        accountHolderName:myState.accountHolderName,
                                                        accountNumber:myState.accountNumber,
                                                        ifscCode:myState.ifscCode
                                                        }
                                                    }
                                                    }
                                                }
                                                    API.post("GoFlexeOrderPlacement",'/kyc/info?type='+'serviceprovider',payload)
                                                    .then(resp=> console.log(resp))
                                                    .catch(err => console.log(err))
                                            })
                                            .catch(err=>console.log(err))
                                        })
                                        .catch(err=>console.log(err))
                                    })
                                    .catch(err=>console.log(err))
                            })
                            .catch(err=>console.log(err))
                        })
                        .catch(err=>console.log(err))
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        setLoading(false)
    }
    
    const onAadharProofChange = (event) => {
        setAadharProof(event.target.files[0])
    }
    const onPanProofChange = (event) => {
        setPanProof(event.target.files[0])
    }
    const onGSTINProofChange = (event) => {
        setGSTINProof(event.target.files[0])
    }
    const fieldsChange = (event) => {
        setMyState({...myState,[event.target.name]:event.target.value})
    }
    

    const CompanyDetailsForm = <React.Fragment>
        <Typography className={classes.formHeadings} >Company Details</Typography>
                    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                    
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="text"
                            id="registeredName"
                            name="registeredName"
                            label="Registered Name"
                            value={myState.registeredName}
                            onChange={(event)=>fieldsChange(event)}
                            fullWidth                            
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="text"
                            id="registeredAddress"
                            name="registeredAddress"
                            label="Registered Address"
                            value={myState.registeredAddress}
                            onChange={(event)=>fieldsChange(event)}
                            fullWidth                            
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="email"
                            id="registeredEmail"
                            name="registeredEmail"
                            label="Offcial Email Id"
                            value={myState.registeredEmail}
                            onChange={(event)=>fieldsChange(event)}
                            fullWidth                            
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="number"
                            id="registeredContactNo"
                            name="registeredContactNo"
                            label="Contact number"
                            value={myState.registeredContactNo}
                            onChange={(event)=>fieldsChange(event)}
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
    </React.Fragment>;


    const TaxDetails = <React.Fragment>
        <Typography className={classes.formHeadings} >Tax Details</Typography>
                    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                    
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            type="text"
                            id="pan"
                            name="pan"
                            value={myState.pan}
                            onChange={(event)=>fieldsChange(event)}
                            label="Enter PAN"
                            fullWidth                            
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            type="text"
                            id="gstin"
                            name="gstin"
                            label="GST Number"
                            value={myState.gstin}
                            onChange={(event)=>fieldsChange(event)}
                            fullWidth                            
                        />
                    </Grid>
                    {/* </Grid> */}
                    
                    <Typography className={classes.formHeadings} >Documents Upload</Typography>
                        <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                         <Grid item xs={12} >
                        <label>Pan Proof: </label>
                        <input   style={{marginLeft:'15px'}} type="file" onChange={(event) => onPanProofChange(event)}  /> 
                        </Grid>
                        <Grid item xs={12} >
                        <label>GSTIN Proof: </label>
                        <input   style={{marginLeft:'15px'}} type="file" onChange={(event) => onGSTINProofChange(event)}  /> 
                        </Grid>
                        </Grid>
                    </Grid>
    </React.Fragment>;

    const AccountDetails = <React.Fragment>
         <Typography className={classes.formHeadings} >Account Details</Typography>
                    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                    
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="text"
                            id="accountHolderName"
                            name="accountHolderName"
                            label="Account Holder's Name"
                            value={myState.accountHolderName}
                            onChange={(event)=>fieldsChange(event)}
                            fullWidth                            
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="text"
                            id="accountNumber"
                            name="accountNumber"
                            label="Account Number"
                            value={myState.accountNumber}
                            fullWidth                            
                            onChange={(event)=>fieldsChange(event)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="text"
                            id="ifscCode"
                            name="ifscCode"
                            label="IFSC Code"
                            value={myState.ifscCode}
                            fullWidth                            
                            onChange={(event)=>fieldsChange(event)}
                        />
                    </Grid>
                    </Grid>            
    </React.Fragment>;




    if(loading===true){
        return(
            <Spinner />
        )
    }

        return(
            <div style={{overflow:'hidden'}} >
                <Typography fullWidth className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                    Pending KYC
                </Typography>
                <form>
                    {CompanyDetailsForm}
                    {TaxDetails}
                    {AccountDetails}
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