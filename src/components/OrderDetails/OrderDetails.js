import React,{useState,useEffect} from 'react';
import axios from 'axios';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import constants from '../../Constants/constants';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    
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
const OrderDetails = (props) => {
    const classes=useStyles();
    const [allDetails,setAllDetails] = useState(null);
    useEffect(()=>{
        const url='https://t2v0d33au7.execute-api.ap-south-1.amazonaws.com/Staging01/customerorder/'+props.id;
        console.log(url);
        axios.get(url)
        .then(resp=>{
            console.log(resp);
            setAllDetails(resp.data.Item);
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today =yyyy +'-'+mm+'-'+dd ;
    if(allDetails===null || allDetails===[]){
        return(<div><h1>Loading</h1></div>);
    }
    else
    return (

        <Card className={classes.root}>
            <CardContent style={{ padding: 0,marginTop:10 }}>
                                <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                                    Order Details
                                </Typography>
                                <table>
                                    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                                        <Grid item xs={12} sm={6} >
                                            <tr>
                                                <th scope="row">Order Date</th>
                                                <td>{today}</td>
                                            </tr>
                                        </Grid>
                                        
                                        
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.pickupAddress}</th>
                                                <td>{allDetails.fromAddress},{allDetails.fromPin}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.destinationAddress}</th>
                                                <td>{allDetails.toAddress},{allDetails.toPin}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.noOfUnits}</th>
                                                <td>{allDetails.noOfUnits}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.weightPerUnit}</th>
                                                <td>{allDetails.weightPerUnit} kg</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.DimensionPerUnit}</th>
                                                <td>{allDetails.width} x {allDetails.height} x {allDetails.breadth} {allDetails.unit} </td>
                                            </tr>
                                        </Grid>

                                    </Grid>
                                </table>
                </CardContent>
            </Card>
                    
    )
}
export default OrderDetails
