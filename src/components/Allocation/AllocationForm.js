import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import OrderDetails from '../OrderDetails/OrderDetails';
import constants from '../../Constants/constants';
import './AllocationForm.css';
import PhoneIcon from '@material-ui/icons/Phone';
import PersonIcon from '@material-ui/icons/Person';
import {API,Auth} from 'aws-amplify'
import {
    TextField,
    Grid,
    Card,
    Button,
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

const AllocationForm = (props) => {
    const classes = useStyles();

    //State Variables for form fields
    const { match: { params } } = props;
    const [driverName, setDriverName] = useState([]);
    const [driverPhoneNumber, setDriverPhoneNumber] = useState([]);
    const [numberOfDrivers,setNumberOfDrivers]=useState(2);
    const [estimatedPickupDate, setEstimatedPickupDate] = useState('');
    const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('');


    const onDriverNameChangeController=(event,index)=>{
        let driverNameArr = driverName.slice(); 
        var currentDriverName=event.target.value;
        driverNameArr[index] = currentDriverName;
        setDriverName(driverNameArr);
    }
    const onDriverPhoneChangeController=(event,index)=>{
        let driverPhoneArr = driverPhoneNumber.slice(); 
        var currentDriverPhone=event.target.value;
        driverPhoneArr[index] = currentDriverPhone;
        setDriverPhoneNumber(driverPhoneArr);
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
        var currentuser;
        Auth.currentUserInfo()
        .then((res)=>{
            currentuser = res.username
        })
        .catch(err=>console.log(err))
        const driversArray=[];
            for(var i=0;i<numberOfDrivers;i++){
                const driver={
                    driverName:driverName[i],
                    driverPhoneNumber:driverPhoneNumber[i]
                }
                driversArray.push(driver);
            }
        //alert(JSON.stringify(driversArray));
        const payload={
            body:{
                username:currentuser,
                serviceOrderId:params.id,
                drivers:driversArray,
                estimatedPickupDate:estimatedPickupDate,
                estimatedDeliveryDate:estimatedDeliveryDate   
        }
    }
        API
        .post("GoFlexeOrderPlacement", `/serviceorder`, payload)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>console.log(err))
        //console.log(estimatedPickupDate,estimatedDeliveryDate);
    }

    let content=Array.apply(null, { length:numberOfDrivers}).map((e, i) => (
            <React.Fragment>
                <Typography className={classes.formHeadings}>Truck Number : {i+1}</Typography>
                    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="DriverName"
                                    name="DriverName"
                                    label={constants.driverName}
                                    fullWidth
                                    autoComplete="given-name"
                                    onChange={(event)=>onDriverNameChangeController(event,i)}
                                    InputProps={{
                                        startAdornment: <PersonIcon/>,
                                    }}
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
                                onChange={(event)=>onDriverPhoneChangeController(event,i)}
                                InputProps={{
                                    startAdornment: <PhoneIcon/>,
                                }}
                                />
                            </Grid>
                        </Grid>
            </React.Fragment>
    ));
    
    return (
                    <div>    
                        {params.id}
                        <Card className={classes.root}>  
                            <CardContent style={{ padding: 0 }}>
                                <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                                    Driver Allocation Form
                                </Typography>
                                 <div>
                                    <img src="https://us.123rf.com/450wm/patrimonio/patrimonio1410/patrimonio141000034/32311174-stock-vector-illustration-of-a-flatbed-truck-with-driver-waving-hello-on-isolated-white-background-done-in-cartoo.jpg?ver=6"  className="formImage" alt="recipe thumbnail"/>
                                </div>
                                <form>
                                    
                                    {content}
                                    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
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
                        
                        

                        


                        
                    </div>
    )
}

export default AllocationForm;



