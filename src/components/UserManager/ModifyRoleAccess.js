import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { Breadcrumbs,Card,CardContent, Divider,Button } from '@material-ui/core';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';




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

export default function CheckboxLabels() {
    const classes = useStyles()
  const [state, setState] = React.useState({
    
  });

  const handleChange = (event) => {
      
    setState({ ...state, [event.target.name]: event.target.checked });
  };

    const submitClicked = () => {
        alert(JSON.stringify(state))
    }
  const roles = [
      'Admin',
      'Executive',
      'Finance'
  ]
  const features = [
      'Create Orders',
      'Manage Users'
  ]
  const eachFeature = (role,feature) => {
      var stateName = '';
      if(role==='Admin'){
          stateName+='admin'
      }
      else if(role==='Executive'){
          stateName+='executive'
      }
      else{
          stateName+='finance'
      }
      
      if(feature=='Create Orders'){
          stateName+='Create'
      }
      else{
          stateName+='Manage'
      }
      console.log(stateName)
      return(
                 <div className="row" >
                        <div className="col col-xs-6 col-3" ></div>
                            <div className="col col-xs-6 col-3" ><h4>{feature}</h4></div>
                            <div className="col col-2">
                                 <FormControlLabel
                                control={
                                <Checkbox
                                    checked={state[`${stateName}Read`]}
                                    onChange={(event)=>handleChange(event)}
                                    name={`${stateName}Read`}
                                    color="primary"
                                />
                                }
                                label="Read"
                            />
                            </div>
                            <div className="col col-2">
                                 <FormControlLabel
                                control={
                                <Checkbox
                                    checked={state[`${stateName}Edit`]}
                                    onChange={(event) => handleChange(event)}
                                    name={`${stateName}Edit`}
                                    color="primary"
                                />
                                }
                                label="Edit"
                            />
                            </div>
                            <div className="col col-1">
                                 <FormControlLabel
                                control={
                                <Checkbox
                                    checked={state[`${stateName}Delete`]}
                                    onChange={(event) => handleChange(event)}
                                    name={`${stateName}Delete`}
                                    color="primary"
                                />
                                }
                                label="Delete"
                            />
                            </div>
                        </div>
      )
  }
  const eachRole = (role) => {
    return (
        <>
        <Divider />
            <div className="row">
                <div className="col col-xs-6 col-3" style={{marginLeft:'10px',marginBottom:'10px',marginTop:'10px'}}><h3><u>{role}</u></h3></div>
            </div>
            {features.map((feature) => eachFeature(role,feature))}
            
        </>
    );
  }
  return (
    <>
    <Breadcrumbs style={{marginBottom:'10px'}} aria-label="breadcrumb">
        <Link color="inherit" to='/userManager'>
            User-Manager
        </Link>
            <Typography color="textPrimary">Modify Role Accesses</Typography>
    </Breadcrumbs>
    <Card className={classes.root}>
                    <CardContent style={{ padding: 0 }}>
                        <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                            Modify Role Accesses
                        </Typography>
                        <div className="row">
                            <div className="col col-xs-6 col-sm-3" style={{marginLeft:'10px'}} >
                              <h2>Role</h2>
                            </div>
                            <div className="col col-xs-6 col-sm-3">
                              <h2>Feature</h2>
                            </div>
                            <div className="col " style={{alignItems:'center',alignContent:'center',textAlign:'center'}}>
                              <h2>Accesses</h2>
                            </div>
                        </div>
                        <Divider />
                        <Divider />
                        <Divider />
                         {roles.map((role)=>eachRole(role))}
                        <div style={{overflow:'hidden'}}>
                            <Button variant='contained' style={{float:'right',backgroundColor:'#f9a825',marginBottom:'20px',marginRight:'20px'}} onClick={submitClicked}>Submit</Button>
                        </div>
                    </CardContent>
    </Card>
</>
  );
}
