import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import constants from '../../Constants/constants';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Link} from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox';

import {
    Button,
    Card,
    Grid,
    Input,
    InputLabel,
    Select,
    MenuItem,
    Breadcrumbs
  } from '@material-ui/core'
const useStyles = makeStyles({
    root: {
        // minWidth: 275,
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
    },
    formControl: {
        marginTop:'1%'
    },
    container :{
        justifyContent: 'space-between',
        flexDirection: 'column',
        display: 'flex'
    },
    btnHolder: {
        justifyContent: 'flex-end',
        display: 'flex',
        marginRight:'30px',
        marginBottom:'30px'
      }
});
const EditUser = () => {
    const classes = useStyles();
    const [newName,setNewName] = useState('');
    const [newEmail,setNewEmail] = useState('');
    const [newPhone,setNewPhone] = useState('');
    const [newDepartment,setNewDepartment] = useState('');
    const [newDesignation,setNewDesignation] = useState('');
    const [newRole,setNewRole] = useState('');
    const onNameChangeController = (event) =>{
        var temp=event.target.value;
        setNewName(temp);
    }
    const onEmailChangeController = (event) => {
        setNewEmail(event.target.value);
    }
    const onDesignationChangeController = (event) => {
        setNewDesignation(event.target.value);
    }
    const onDepartmentChangeController = (event) => {
        setNewDepartment(event.target.value);
    }
    const onRoleChangeController = (event) => {
        setNewRole(event.target.value);
    }
    const onPhoneChangeController = (event) => {
        setNewPhone(event.target.value);
    }
    return (
        <div>
            <Breadcrumbs style={{marginBottom:'10px'}} aria-label="breadcrumb">
                <Link color="inherit" to='/userManager'>
                    User-Manager
                </Link>
                    <Typography color="textPrimary">Edit User</Typography>
            </Breadcrumbs>
            <Card className={classes.paper} style={{marginBottom:'30px'}}>
             <CardContent style={{ padding: 0,marginTop:10 }}>
                                 <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                                     User Details
                                 </Typography>
                                 <table>
                                 <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                                 
                                 <Grid item xs={12} sm={6} >
                                 <div className="form-group">
                                    <InputLabel  id="name">Name</InputLabel>
                                    <Input disableUnderline='true' type="name" className="form-control"  />
                                 </div>
                                 </Grid>

                                 <Grid item xs={12} sm={6} >
                                 <div className="form-group">
                                    <InputLabel  id="email">Email</InputLabel>
                                    <Input disableUnderline='true' type="email" className="form-control" />
                                 </div>
                                 </Grid>
                                 
                                 

                                 <Grid item xs={12} sm={6} >
                                 <div className="form-group">
                                    <InputLabel  id="department">Department</InputLabel>
                                    <Input disableUnderline='true' type="text" className="form-control"   />
                                 </div>
                                 </Grid>

                                 <Grid item xs={12} sm={6} >
                                 <div className="form-group">
                                    <InputLabel  id="designation">Designation</InputLabel>
                                    <Input disableUnderline='true' type="text" className="form-control"   />
                                 </div>
                                 </Grid>


                                 <Grid item xs={12} sm={6} >
                                 <div className="form-group">
                                 <InputLabel  id="phone">Phone</InputLabel>
                                     <Input disableUnderline='true' type="text" className="form-control"   />
                                 </div>
                                 </Grid>
                                 
                                 <Grid item xs={12} sm={6} >
                                 <div className="form-group">
                                 <InputLabel  id="role">Role</InputLabel>
                                 <Select onChange={(event) => onRoleChangeController(event)} disableUnderline='true' className="form-control" labelId="label" id="select" value={newRole}>
                                    <MenuItem value="executive">Executive</MenuItem>
                                    <MenuItem value="reviewer">Reviewer</MenuItem>
                                    <MenuItem value="auditor">Auditor</MenuItem>
                                    <MenuItem value="manager">Manager</MenuItem>
                                    <MenuItem value="teamLead">Team Lead</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                 </Select>
                                     {/* <Input disableUnderline='true' type="text" className="form-control" placeholder={constants.usersDesignation}  /> */}
                                 </div>
                                 </Grid>

                                 <Grid item xs={12} sm={6} >
                                 <div className="form-group">
                                    <InputLabel  id="password">Password</InputLabel>
                                    <Input disableUnderline='true' type="password" className="form-control"  />
                                 </div>
                                 </Grid>

                                 <Grid item xs={12} sm={6} >
                                 <div className="form-group">
                                 <InputLabel  id="confirmPassword">Confirm Password</InputLabel>
                                     <Input disableUnderline='true' type="password" className="form-control"   />
                                 </div>
                                 </Grid>
                             </Grid>
        
                                     <div className={classes.container}>
                                     <div className={classes.btnHolder}>
                                     <Button
                                     component={Link}
                                     to='/userManager'
                                     size='large' 
                                     style={{marginRight:'5px'}}
                                         className="row"
                                             variant='contained'
                                             color='default'
                                         >Cancel</Button>
                                     <Button
                                     size='large' 
                                     style={{marginRight:'0px'}}
                                         className="row"
                                             variant='contained'
                                             color='primary'
                                         >Update</Button>
                                     </div>
                                     </div>
        
                                 </table>
                                 </CardContent>
                             </Card>
        </div>
         );
}
export default EditUser;