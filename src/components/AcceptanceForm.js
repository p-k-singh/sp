import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./NewOrder.css";
import constants from "../Constants/constants";
import OrderDetails from "./OrderDetails/OrderDetails";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { Link } from "react-router-dom";
import { Auth, API } from "aws-amplify";
import Spinner from "./UI/Spinner";
import {
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  Card,
  Button,
  Divider,
  InputAdornment,
} from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    // minWidth: 275,
  },
  title: {
    fontSize: 20,
    height: 50,
    padding: 10,
    paddingLeft: 55,
    color: "white",
  },
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
  formControl: {
    marginTop: "1%",
  },
  button: {
    marginRight: "10px",
  },
});

const AcceptanceForm = (props) => {
  const classes = useStyles();
  const {
    match: { params },
  } = props;
  const [Order, setOrder] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(async () => {
    // async function putOrders(){
    var temp = await API.get(
      "GoFlexeOrderPlacement",
      `/customerorder/${params.id}`
    );
    console.log(temp.Item);
    setOrder(temp.Item);
  }, []);

  const acceptOrder = async () => {
    setLoading(true);
    console.log(Auth.currentUserInfo());
    var providerDetails = await Auth.currentUserInfo();

    const payload = {
      body: {
        orderId: params.id,
        providerId: providerDetails.id,
        sub: providerDetails.attributes.sub,
        username: providerDetails.username,
        email: providerDetails.attributes.email,
        phone: providerDetails.attributes.phone,
      },
    };
    console.log(payload);
    API.post("GoFlexeOrderPlacement", `/serviceorder/acceptance`, payload)
      .then((response) => {
        console.log(response);
        setLoading(false);
        setAccepted(true);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  };
  if (Order === null) {
    return <Spinner />;
  }
   if ( Order === null) return <Spinner />;
   else if (Order.items === undefined) {
     return (
       <div>
         <div
           style={{
             display: "flex",
             flexDirection: "row",
             justifyContent: "flex-end",
             paddingBottom: 10,
           }}
         >
           {Loading == true ? (
             <Spinner />
           ) : accepted == true ? (
             <p>Order Accepted Successfully</p>
           ) : (
             <Button
               variant="contained"
               color="primary"
               onClick={acceptOrder}
               className={classes.button}
               startIcon={<CheckIcon />}
             >
               Accept
             </Button>
           )}
         </div>
         <Card>
           <Typography
             className={classes.title}
             style={{ color: "black", backgroundColor: "lightgrey" }}
           >
             Order Acceptance Form
           </Typography>
           <table>
             <Grid
               container
               spacing={3}
               style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
             >
               <Grid item xs={12} sm={6}>
                 <tr>
                   <th scope="row">{constants.pickupAddress + " : "}</th>
                   <td>
                     {Order.fromAddress},{Order.fromPin}
                   </td>
                 </tr>
               </Grid>
               <Grid item xs={12} sm={6}>
                 <tr>
                   <th scope="row">{constants.destinationAddress + " : "}</th>
                   <td>
                     {Order.toAddress},{Order.toPin}
                   </td>
                 </tr>
               </Grid>
               <Grid item xs={12} sm={6}>
                 <tr>
                   <th scope="row">{constants.noOfUnits + " : "}</th>
                   <td> {Order.noOfUnits}</td>
                 </tr>
               </Grid>
               <Grid item xs={12} sm={6}>
                 <tr>
                   <th scope="row">{constants.weightPerUnit + " : "}</th>
                   <td> {Order.weightPerUnit} Kg</td>
                 </tr>
               </Grid>
               <Grid item xs={12} sm={6}>
                 <tr>
                   <th scope="row">{constants.DimensionPerUnit + " : "}</th>
                   <td>
                     {Order.height} x {Order.width} x {Order.breadth}{" "}
                     {Order.unit || Order.unit.label}
                   </td>
                 </tr>
               </Grid>
             </Grid>
           </table>
         </Card>
       </div>
     );
    
   } else if (Order.items.length == 1) {
     return (
       <div>
         <div
           style={{
             display: "flex",
             flexDirection: "row",
             justifyContent: "flex-end",
             paddingBottom: 10,
           }}
         >
           {Loading == true ? (
             <Spinner />
           ) : accepted == true ? (
             <p>Order Accepted Successfully</p>
           ) : (
             <Button
               variant="contained"
               color="primary"
               onClick={acceptOrder}
               className={classes.button}
               startIcon={<CheckIcon />}
             >
               Accept
             </Button>
           )}
         </div>
         <Card>
           <Typography
             className={classes.title}
             style={{ color: "black", backgroundColor: "lightgrey" }}
           >
             Order Acceptance Form
           </Typography>

           <table>
             <Grid
               container
               spacing={3}
               style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
             >
               <Grid item xs={12} sm={12}>
                 <tr>
                   <th scope="row">{constants.pickupAddress + " : "}</th>
                   <td>
                     {Order.fromAddress},{Order.fromPin}
                   </td>
                 </tr>
               </Grid>

               <Grid item xs={12} sm={12}>
                 <tr>
                   <th scope="row">{constants.destinationAddress + " : "}</th>
                   <td>
                     {Order.toAddress},{Order.toPin}
                   </td>
                 </tr>
               </Grid>
             </Grid>
           </table>
           {Order.items.map((each, index) => (
             <div>
               <Typography
                 className={classes.title}
                 style={{ color: "black", backgroundColor: "lightgrey" }}
               >
                 Product Details
               </Typography>
               <table>
                 <Grid
                   container
                   spacing={3}
                   style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
                 >
                   <Grid item xs={12} sm={6}>
                     <tr>
                       <th scope="row">{"Product Name : "}</th>
                       <td>{each.productName}</td>
                     </tr>
                   </Grid>
                   {each.measurable == true ? (
                     <Grid item xs={12} sm={6}>
                       <tr>
                         <th scope="row">{"No. of Units : "}</th>
                         <td>{each.noOfUnits}</td>
                       </tr>
                     </Grid>
                   ) : (
                     <p></p>
                   )}
                   {each.measurable == true ? (
                     <Grid item xs={12} sm={6}>
                       <tr>
                         <th scope="row">{"Weight per Unit : "}</th>
                         <td>{each.weightPerUnit} Kg</td>
                       </tr>
                     </Grid>
                   ) : (
                     <p></p>
                   )}
                   {each.measurable == false ? (
                     <Grid item xs={12} sm={6}>
                       <tr>
                         <th scope="row">{"Total Weight : "}</th>
                         <td>{each.totalWeight} Kg</td>
                       </tr>
                     </Grid>
                   ) : (
                     <p></p>
                   )}
                   <Grid item xs={12} sm={6}>
                     <tr>
                       <th scope="row">{"Product Type : "}</th>
                       <td>{each.productType.label || each.productType}</td>
                     </tr>
                   </Grid>
                   {each.measurable == true ? (
                     <Grid item xs={12} sm={6}>
                       <tr>
                         <th scope="row">{"Dimensions : "}</th>
                         <td>
                           {each.height} x {each.length} x {each.width}{" "}
                           {each.unit.label || each.unit}
                         </td>
                       </tr>
                     </Grid>
                   ) : (
                     <p></p>
                   )}

                   <Grid item xs={12} sm={6}>
                     <tr>
                       <th scope="row">{"Category: "}</th>
                       <td>
                         {each.categories.map((unit) => unit.label + ",")}{" "}
                       </td>
                     </tr>
                   </Grid>
                 </Grid>
               </table>
             </div>
           ))}
         </Card>
       </div>
     );
   } else if (Order.items.length > 1) {
     return (
       <div>
         <div
           style={{
             display: "flex",
             flexDirection: "row",
             justifyContent: "flex-end",
             paddingBottom: 10,
           }}
         >
           {Loading == true ? (
             <Spinner />
           ) : accepted == true ? (
             <p>Order Accepted Successfully</p>
           ) : (
             <Button
               variant="contained"
               color="primary"
               onClick={acceptOrder}
               className={classes.button}
               startIcon={<CheckIcon />}
             >
               Accept
             </Button>
           )}
         </div>
         <Card>
           <Typography
             className={classes.title}
             style={{ color: "black", backgroundColor: "lightgrey" }}
           >
             Order Acceptance Form
           </Typography>

           <table>
             <Grid
               container
               spacing={3}
               style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
             >
               <Grid item xs={12} sm={12}>
                 <tr>
                   <th scope="row">{constants.pickupAddress + " : "}</th>
                   <td>
                     {Order.fromAddress},{Order.fromPin}
                   </td>
                 </tr>
               </Grid>

               <Grid item xs={12} sm={12}>
                 <tr>
                   <th scope="row">{constants.destinationAddress + " : "}</th>
                   <td>
                     {Order.toAddress},{Order.toPin}
                   </td>
                 </tr>
               </Grid>
             </Grid>
           </table>
           {Order.items.map((each, index) => (
             <div>
               <Typography
                 className={classes.title}
                 style={{ color: "black", backgroundColor: "lightgrey" }}
               >
                 Product No. {index + 1}
               </Typography>
               <table>
                 <Grid
                   container
                   spacing={3}
                   style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
                 >
                   <Grid item xs={12} sm={6}>
                     <tr>
                       <th scope="row">{"Product Name : "}</th>
                       <td>{each.productName}</td>
                     </tr>
                   </Grid>
                   {each.measurable == true ? (<Grid item xs={12} sm={6}>
                     <tr>
                       <th scope="row">{"No. of Units : "}</th>
                       <td>{each.noOfUnits}</td>
                     </tr>
                   </Grid>):(<p></p>)}
                   {each.measurable == true ? (
                     <Grid item xs={12} sm={6}>
                       <tr>
                         <th scope="row">{"Weight per Unit : "}</th>
                         <td>{each.weightPerUnit} Kg</td>
                       </tr>
                     </Grid>
                   ) : (
                     <p></p>
                   )}
                   {each.measurable == false ? (
                     <Grid item xs={12} sm={6}>
                       <tr>
                         <th scope="row">{"Total Weight : "}</th>
                         <td>{each.totalWeight} Kg</td>
                       </tr>
                     </Grid>
                   ) : (
                     <p></p>
                   )}
                   <Grid item xs={12} sm={6}>
                     <tr>
                       <th scope="row">{"Product Type : "}</th>
                       <td>{each.productType.label || each.productType}</td>
                     </tr>
                   </Grid>
                   {each.measurable == true ? (
                     <Grid item xs={12} sm={6}>
                       <tr>
                         <th scope="row">{"Dimensions : "}</th>
                         <td>
                           {each.height} x {each.length} x {each.width}{" "}
                           {each.unit.label || each.unit}
                         </td>
                       </tr>
                     </Grid>
                   ) : (
                     <p></p>
                   )}

                   <Grid item xs={12} sm={6}>
                     <tr>
                       <th scope="row">{"Category: "}</th>
                       <td>
                         {each.categories.map((unit) => unit.label + ",")}{" "}
                       </td>
                     </tr>
                   </Grid>
                 </Grid>
               </table>
             </div>
           ))}
         </Card>
       </div>
     );
};
}
export default AcceptanceForm;
