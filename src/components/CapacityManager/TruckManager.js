import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    Button,
    Divider,
    TextField,
    Grid
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

const TruckManager = (props) => {
    const classes = useStyles();  
    const [showForm,setShowForm] = useState(false)
    const [newCapacity,setNewCapacity] = useState('');
    const [newTruckNumber,setNewTruckNumber] = useState('');
    const [checkboxes,setCheckboxes] = useState({
        gps:false,
        fastag:false,
        frozen:false,
        perishable:false,
        consumable:false,
        edible:false,
        art:false,
        hardlines:false,
        liquid:false,
        hazardous:false
    })
    const [trucks,setTrucks] = useState([
        {
            truckNumber:'AS02H5501',
            capacity:'17'
        },
        {
            truckNumber:'BR01AX4459',
            capacity:'25'
        },
        {
            truckNumber:'AS02H1234',
            capacity:'17'
        },
        {
            truckNumber:'DL09X7586',
            capacity:'25'
        },
        
    ]);
    const handleCheckboxesChange = (event) => {
        setCheckboxes({ ...checkboxes, [event.target.name]: event.target.checked });
    }
    const onTruckcapacityChange = (event) => {
        setNewCapacity(event.target.value)
    }
    const onTruckNumberChange = (event) => {
        setNewTruckNumber(event.target.value)
    }
    const submitTruck = () => {
        if(newCapacity==='' || newTruckNumber==='')
        {
            alert('Please fill required fields')
            return
        }
        setShowForm(false)
        var temp = {
            truckNumber:newTruckNumber,
            capacity: newCapacity
        }
        let a = trucks.slice()
        a.push(temp)
        setTrucks(a)
        alert('Truck details has been submitted, please Click here to fill the KYC form ')
    }
    const addTruckForm = () => {
        return(
            <div style={{overflow:'hidden'}} >
            <Typography fullWidth className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                        Truck Details               
            </Typography>         
                    <form>
            <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        type="number"
                        id="capacity"
                        name="capacity"
                        label="Enter Truck Capacity(In tons)"
                        value={newCapacity}
                        onChange={(event) => onTruckcapacityChange(event)}
                        fullWidth                             
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        type="text"
                        id="truckNumber"
                        name="truckNumber"
                        label="Enter Truck Number"
                        value={newTruckNumber}
                        onChange={(event) => onTruckNumberChange(event)}
                        fullWidth          
                    />
                </Grid>
            </Grid>   
            <FormGroup style={{marginBottom:'20px'}} row>
                <FormControlLabel
                    style={{marginLeft:'50px'}}
                control={
                <Checkbox
                    checked={checkboxes.gps}
                    onChange={handleCheckboxesChange}
                    name="gps"
                    color="primary"
                />
                }
                label="GPS enabled"
                />
                <FormControlLabel
                style={{marginLeft:'50px'}}
                control={
                <Checkbox
                    checked={checkboxes.fastag}
                    onChange={handleCheckboxesChange}
                    name="fastag"
                    color="primary"
                />
                }
                label="Fastag"
                />
                
            </FormGroup> 
            <Typography className={classes.formHeadings} style={{marginBottom:'20px'}} >
                        Suppliable Products:              
            </Typography>  
            <FormGroup style={{marginBottom:'10px'}} row>
                <FormControlLabel
                    style={{marginLeft:'50px'}}
                control={
                <Checkbox
                    checked={checkboxes.perishable}
                    onChange={handleCheckboxesChange}
                    name="perishable"
                    color="primary"
                />
                }
                label="Perishable"
                />
                <FormControlLabel
                style={{marginLeft:'50px'}}
                control={
                <Checkbox
                    checked={checkboxes.consumable}
                    onChange={handleCheckboxesChange}
                    name="consumable"
                    color="primary"
                />
                }
                label="Consumable"
                />
                <FormControlLabel
                style={{marginLeft:'50px'}}
                control={
                <Checkbox
                    checked={checkboxes.edible}
                    onChange={handleCheckboxesChange}
                    name="edible"
                    color="primary"
                />
                }
                label="Edible"
                />
                <FormControlLabel
                style={{marginLeft:'50px'}}
                control={
                <Checkbox
                    checked={checkboxes.art}
                    onChange={handleCheckboxesChange}
                    name="art"
                    color="primary"
                />
                }
                label="Art"
                />
                <FormControlLabel
                    style={{marginLeft:'50px'}}
                control={
                <Checkbox
                    checked={checkboxes.hardlines}
                    onChange={handleCheckboxesChange}
                    name="hardlines"
                    color="primary"
                />
                }
                label="Hardlines"
                />
            </FormGroup> 
            <FormGroup style={{marginBottom:'40px'}} row>
                
                <FormControlLabel
                style={{marginLeft:'50px'}}
                control={
                <Checkbox
                    checked={checkboxes.liquid}
                    onChange={handleCheckboxesChange}
                    name="liquid"
                    color="primary"
                />
                }
                label="Liquid"
                />
                <FormControlLabel
                style={{marginLeft:'80px'}}
                control={
                <Checkbox
                    checked={checkboxes.frozen}
                    onChange={handleCheckboxesChange}
                    name="frozen"
                    color="primary"
                />
                }
                label="Frozen Items"
                />
                <FormControlLabel
                style={{marginLeft:'50px'}}
                control={
                <Checkbox
                    checked={checkboxes.hazardous}
                    onChange={handleCheckboxesChange}
                    name="hazardous"
                    color="primary"
                />
                }
                label="Hazardous"
                />
                
            </FormGroup> 
            <Button 
                onClick={submitTruck}
                className="row"
                variant='contained' style={{float:'right',backgroundColor:'#f9a825', marginBottom:'10px'}}
        >Submit</Button>
    <Button 
                onClick={toggleForm}
                className="row"
                variant='contained' color='default' style={{float:'right',marginRight:'10px', marginBottom:'10px'}}
        >Cancel</Button>
    </form>

        </div>
        )
       
    }


    const eachUser = (truck,idx) => {
        return(
            <div className="row" style={{marginTop:'15px', fontSize:'19px'}}>
                <div className="col col-xs-6 col-sm-3">
                    {truck.truckNumber}
                </div>
                <div className="col col-xs-6 col-sm-3">
                    {truck.capacity} tons
                </div>
                <div className="col col-xs-6 col-sm-3">
                <Link
                   
                ><EditIcon />Edit</Link>
                </div>
                <div className="col col-xs-6 col-sm-3">
                <Link><DeleteIcon />Delete</Link>
                </div>
                
            </div>
        );
    }

    const toggleForm = () => {
        setShowForm(!showForm)
    }
    return (
        <div>
            <div style={{overflow:'hidden'}}>
            <Button 
             onClick={toggleForm}
            className="row"
                variant='contained' style={{backgroundColor:'#f9a825', marginBottom:'10px',float:'right'}}
            >Add New Truck</Button>
            </div>
            <Divider />
             <div style={{marginTop:'30px'}}></div>
             {showForm && 
                addTruckForm() 
            }
            
            {!showForm && trucks.map((truck,idx) => eachUser(truck,idx))}
            <div style={{marginTop:'60px'}}></div>
            {/* {users.map((user,idx) => eachUser1(user,idx))} */}
        </div>
       
    )
}


export default TruckManager;
