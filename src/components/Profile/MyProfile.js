
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { useAppContext } from '../../libs/contextLibs'
import {
    TextField,
    Button
  } from '@material-ui/core';
import { Auth } from 'aws-amplify';


  
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  textfield:{
      width:'60%',
  }
}));

 const ControlledAccordions= (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { userHasAuthenticated } = useAppContext();
  const [details,setDetails] = useState({
      name:'guest',
      email:'guest@guest.com',
      contactNo:'99999',
      address:'somewhere'
  });
  const [tempName,setTempName] = useState('');
  const [tempEmail,setTempEmail] = useState('');
  const [tempContactNo,setTempContactNo] = useState('');
  const [tempAddress,setTempAddress] = useState('');
  const [valChanged,setValChanged] = useState(false);
  useEffect( ()=>{
     Auth.currentUserInfo()
      .then((user) => {
        if(user===null || user===undefined)
        return
        console.log(user)
        var tempEmail = user.attributes.email === undefined ? details.email : user.attributes.email
        var tempPhone =  user.attributes.phone_number === undefined ? details.contactNo : user.attributes.phone_number
        var tempName =  user.attributes.name === undefined ? details.name : user.attributes.name
        setDetails({...details,email:tempEmail,contactNo:tempPhone,name:tempName})
        
       
      })
      .catch()
   
    
  },[])
  async function signOut() {
    try {
        await Auth.signOut({ global: true });
        userHasAuthenticated(false)
        
        
    } catch (error) {
        console.log('error signing out: ', error);
    }
}
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const onNameSubmitController=()=>{
      if(tempName!==''){
        setDetails({...details,name:tempName});
        setValChanged(true);
      }
    setExpanded(false)
  }
  const onNameChangeController=(event)=>{
    var nameOfCustomer=event.target.value;
    setTempName(nameOfCustomer);
  }
  const onEmailSubmitController=()=>{
    setDetails({...details,email:tempEmail});
    setExpanded(false)
    setValChanged(true);
  }
  const onEmailChangeController=(event)=>{
    var emailOfCustomer=event.target.value;
    setTempEmail(emailOfCustomer);
  }
  const onContactNoSubmitController=()=>{
    setDetails({...details,contactNo:tempContactNo});
    setExpanded(false)
    setValChanged(true);
  }
  const onContactNoChangeController=(event)=>{
    var contactNoOfCustomer=event.target.value;
    setTempContactNo(contactNoOfCustomer);
  }
  const onAddressSubmitController=()=>{
    setDetails({...details,address:tempAddress});
    setExpanded(false)
    setValChanged(true);
  }
  const onAddressChangeController=(event)=>{
    var addressOfCustomer=event.target.value;
    setTempAddress(addressOfCustomer);
  }
  

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<EditIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Name</Typography>
          <Typography className={classes.secondaryHeading}>{details.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        
                    <TextField
                    className={classes.textfield}
                    xs={12} sm={6}
                    value={props.name}
                    autoComplete="given-name"
                    onChange={(event)=>onNameChangeController(event)}
                    />
                    <Button onClick={onNameSubmitController} color="secondary">Change</Button>
       
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<EditIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Email</Typography>
          <Typography className={classes.secondaryHeading}>
            {details.email}
          </Typography>
        </AccordionSummary>
            <AccordionDetails>
            <TextField
            className={classes.textfield}
            xs={12} sm={6}
            value={props.name}
            autoComplete="given-name"
            onChange={(event)=>onEmailChangeController(event)}
            />
            <Button onClick={onEmailSubmitController} color="secondary">Change</Button>
            </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<EditIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Contact No</Typography>
          <Typography className={classes.secondaryHeading}>
            {details.contactNo}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <TextField
            className={classes.textfield}
            xs={12} sm={6}
            value={props.name}
            autoComplete="given-name"
            onChange={(event)=>onContactNoChangeController(event)}
            />
            <Button onClick={onContactNoSubmitController} color="secondary">Change</Button>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<EditIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Address</Typography>
          <Typography className={classes.secondaryHeading}>
            {details.address}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <TextField
            className={classes.textfield}
            xs={12} sm={6}
            value={props.name}
            autoComplete="given-name"
            onChange={(event)=>onAddressChangeController(event)}
            />
            <Button onClick={onAddressSubmitController} color="secondary">Change</Button>
        </AccordionDetails>
      </Accordion>
      {valChanged && 
        <Button
         style={{float:'right',marginTop:'10px'}} color='secondary'
         variant='contained'
         >
             Change my Details
        </Button>
      }
      <Button
      onClick={signOut}
         style={{marginTop:'10px'}} color='default'
         variant='contained'
         >
             Logout
        </Button>
        <Button
         style={{marginTop:'10px',marginLeft:'10px',backgroundColor:'#FF8C00'}} 
         variant='contained'
         >
             Change Password
        </Button>
    </div>
  );
}

export default ControlledAccordions;