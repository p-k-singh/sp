import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './NewOrder.css';
import constants from '../Constants/constants';
import OrderDetails from './OrderDetails/OrderDetails'
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import {Link} from 'react-router-dom';
import { Auth, API} from "aws-amplify";
import Spinner from './UI/Spinner'
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
    },
    button:{
        marginRight:"10px"
    }

});

const AcceptanceForm = (props) => {
    const classes = useStyles();
    const { match: { params } } = props;
    const [Order,setOrder] = useState(null);
///customerorder/{orderId}

    useEffect( async () => {
        
        // async function putValues(){
            var temp=await API.get("GoFlexeOrderPlacement",`/customerorder/${params.id}`)
            console.log(temp.Item)
            setOrder(temp.Item)
        // }
        // putValues()

    },[])

    const  acceptOrder = async () => {
        console.log(Auth.currentUserInfo())
        var providerDetails = await Auth.currentUserInfo()

        const payload={
            body:{
                orderId:params.id,
                providerId:providerDetails.id,
                sub:providerDetails.attributes.sub,
                username:providerDetails.username,
                email:providerDetails.attributes.email,
                phone:providerDetails.attributes.phone
            }
        }
        console.log(payload)
        API
        .post("GoFlexeOrderPlacement", `/serviceorder/acceptance`, payload)
        .then(response => {
            // Add your code here
            console.log(response);
            
        })
        .catch(error => {
            console.log(error.response);
        
        });
    }
    if(Order===null){
        return(
            <Spinner />
        );
    }
    return (
                    <div>    
                        <Card className={classes.root}>  
                            <CardContent style={{ padding: 0 }}>
                                <Typography className={classes.title} gutterBottom >
                                    Order Acceptance Form
                                </Typography>
                                <form>
                                    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                                        
                                        
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="requiredCapacity"
                                                name="requiredCapacity"
                                                label="Required Capacity"
                                                value="50 tonnes"
                                                disabled
                                                fullWidth
                                                autoComplete="available capacity"
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="pickupAddress"
                                                name="pickupAddress"
                                                label="Pickup Address"
                                                value={Order.fromAddress}
                                                disabled
                                                fullWidth
                                                autoComplete="pickup address"
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="deliverAddress"
                                                name="deliverAddress"
                                                label="Deliver Address"
                                                value={Order.toAddress}
                                                disabled
                                                fullWidth
                                                autoComplete="deliver address"
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="estimatedPickup"
                                                name="estimatedPickup"
                                                label="Estimated Pickup"
                                                value="14-01-2021"
                                                disabled
                                                fullWidth
                                                autoComplete="estimated pickup"
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="estimatedDelivery"
                                                name="estimatedDelivery"
                                                label="Estimated Delivery"
                                                value="20-01-2021"
                                                disabled
                                                fullWidth
                                                autoComplete="estimated delivery"
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="estimatedPrice"
                                                name="estimatedPrice"
                                                label="Estimated Price"
                                                value="Rs 2,00,000"
                                                disabled
                                                fullWidth
                                                autoComplete="estimated price"
                                                
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
                                    margin: 20,
                                    padding:10
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={acceptOrder}
                                    className={classes.button}
                                    startIcon={<CheckIcon />}
                                    >
                                    Accept
                                </Button> 
                                {/* <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<ClearIcon/>}
                                    >
                                    Reject
                                </Button>                      */}
                            </div>
                        </Card>
                    </div>
    )
}

export default AcceptanceForm;


