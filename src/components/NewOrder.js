import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './NewOrder.css';
import constants from '../Constants/constants';
import OrderDetails from './OrderDetails/OrderDetails'
import {
    TextField,
    Grid,
    FormControlLabel,
    Checkbox,
    Card,
    Button,
    Divider,
    InputAdornment
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
    }
});

const NewOrder = (props) => {
    const classes = useStyles();

    //State Variables for form fields

    const [driverName, setDriverName] = useState('');
    const [driverPhoneNumber, setDriverPhoneNumber] = useState(0);
    const [truckNumber, setTruckNumber] = useState(0);
    const [estimatedPickupDate, setEstimatedPickupDate] = useState('');
    const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('');


    const onDriverNameChangeController=(event)=>{
        var nameOfDriver=event.target.value;
        setDriverName(nameOfDriver);
    }
    const onDriverPhoneChangeController=(event)=>{
        var driverPhone=event.target.value;
        setDriverPhoneNumber(driverPhone);
    }

    const onTruckNumberChangeController=(event)=>{
        var truckNumber=event.target.value;
        setTruckNumber(truckNumber);
    }

    const onPickupDateChangeController=(event)=>{
        var pickupDate=event.target.value;
        setEstimatedPickupDate(pickupDate)
        
    }

    const onDeliveryDateChangeController=(event)=>{
        var deliveryDate=event.target.value;
        setEstimatedDeliveryDate(deliveryDate);
    }

    const handleServiceOrderClick=()=>{
        alert("Data is: "+driverName+", "+driverPhoneNumber+", "+truckNumber+", "+estimatedPickupDate+", "+estimatedDeliveryDate);
    }
    
    return (
                    <div>    
                        <Card className={classes.root}>  
                            <CardContent style={{ padding: 0 }}>
                                <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                                    Service Order Form
                                </Typography>
                                <form>
                                    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                                        
                                        <Grid item xs={12} sm={8}>
                                            <TextField
                                                required
                                                type="number"
                                                id="truckNumber"
                                                name="truckNumber"
                                                label={constants.truckNumber}
                                                fullWidth
                                                autoComplete="truck-number"
                                                onChange={(event)=>onTruckNumberChangeController(event)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="DriverName"
                                                name="DriverName"
                                                label={constants.driverName}
                                                fullWidth
                                                autoComplete="given-name"
                                                onChange={(event)=>onDriverNameChangeController(event)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                            required
                                            type="number"
                                            id="DriverPhone"
                                            name="DriverPhone"
                                            label={constants.driverNumber}
                                            fullWidth
                                            
                                            autoComplete="Phone"
                                            onChange={(event)=>onDriverPhoneChangeController(event)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                                            }}
                                            />
                                        </Grid>
                                        

                                    

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="datetime-pickup"
                                                label={constants.estimatedPickup}
                                                type="datetime-local"
                                                onChange={(event)=>onPickupDateChangeController(event)}
                                                className={classes.textField}
                                                InputLabelProps={{
                                                shrink: true,
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="datetime-delivery"
                                                label={constants.estimatedDelivery}
                                                onChange={(event)=>onDeliveryDateChangeController(event)}
                                                type="datetime-local"
                                                className={classes.textField}
                                                InputLabelProps={{
                                                shrink: true,
                                                }}
                                            />
                                        </Grid>
                                    
                                    </Grid>
                                </form>
                            </CardContent>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    margin: 20
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleServiceOrderClick}>
                                    Submit
                                </Button>                      
                            </div>
                        </Card>
                        
                        <OrderDetails/>

                        


                        
                    </div>
    )
}

export default NewOrder;


