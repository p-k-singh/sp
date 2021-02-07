import React,{useEffect, useState} from 'react'
import Spinner from '../../../UI/Spinner'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
 import {Auth,API} from 'aws-amplify'
 import axios from 'axios'
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
    const [registrationDoc,setRegistrationDoc] = useState()
    const [loading,setLoading] = useState(false)
    const [myState,setMyState] = useState({
        registeredName:'',
        registeredAddress:'',
        registeredEmail:'',
        registeredContactNo:'',
    })
    const fieldsChange = (event) => {
        setMyState({...myState,[event.target.name]:event.target.value})
    }
    const submitKYC =  () => {
        setLoading(true)
        var docLink;
        const metaData= {
            'contentType': registrationDoc.type
        }
        const payload= {
             body: {
                 contentType: registrationDoc.type,
                 metaData: metaData
             }
        }
        var ext=registrationDoc.name.split('.').pop();
        API.post(
            "GoFlexeOrderPlacement", '/kyc/document?type='+'serviceprovider', payload)
            .then((initiateResult)=>{
                docLink = `uploads/kycdocuments/serviceprovider/${initiateResult.fileId}.${ext}`
                axios.put(initiateResult.s3PutObjectUrl,registrationDoc,{
                    headers: {
                        'Content-Type': registrationDoc.type
                    }
                }).then(resp => {
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
                                    registrationDocLink:docLink
                                }
                            }
                            }
                        }
                            API.post("GoFlexeOrderPlacement",'/kyc/info?type='+'serviceprovider',payload)
                            .then(resp=> {console.log(resp) 
                                fun() })
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
                })
                .catch(err=>console.log(err))
            })
            .catch(err => console.log(err))
        setLoading(false)
    }
    const fun = () => {
        //alert(JSON.stringify(props))
        props.loadData()
    }
    const onRegistrationProofChange = (event) => {
        setRegistrationDoc(event.target.files[0])
    }
    if(loading===true){
        return(
            <Spinner />
        )
    }
    
        return(
            <div style={{overflow:'hidden'}} >
                {/* <Typography fullWidth className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                            Pending KYC
                        </Typography> */}
                        <form>
                          
                {/* <Typography className={classes.formHeadings} >Company Details</Typography> */}
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
                        <input   style={{marginLeft:'15px'}} type="file" onChange={(event) => onRegistrationProofChange(event)}  /> 
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