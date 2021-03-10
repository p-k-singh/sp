import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import "./MyOrders.css";
import constants from "../../Constants/constants";
import {
  TextField,
  Checkbox,
  Grid,
  Card,
  Button,
  IconButton,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import TodayIcon from "@material-ui/icons/Today";
import Typography from "@material-ui/core/Typography";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import ClassTwoToneIcon from "@material-ui/icons/ClassTwoTone";
import { API, Auth } from "aws-amplify";
import Spinner from "../UI/Spinner";
import CardContent from "@material-ui/core/CardContent";
const useStyles = makeStyles((theme) => ({
  "@keyframes blinker": {
    from: { opacity: 1 },
    to: { opacity: 0.2, color: "#3f51b5", fontWeight: "400" },
  },
  button: {
    marginBottom: theme.spacing(1),
  },
  allocationButton: {
    animationName: "$blinker",
    animationDuration: "0.7s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  title: {
    fontSize: 20,
    height: 50,
    padding: 10,
    paddingLeft: 55,
    borderBottomStyle: "solid",
    borderWidth: "1px",
    borderRadius: "5px",
  },
}));

const MyOrders = () => {
  const classes = useStyles();
  const [activeOrders, setActiveOrders] = useState([]);
  const [OrderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function putValues() {
      var currentUser = await Auth.currentUserInfo();
      var currentUsername = currentUser.username;
      //currentUser.username
      var temp = await API.get(
        "GoFlexeOrderPlacement",
        `/serviceorder?username=${currentUsername}`
      );
      console.log(temp);

      // return temp;
      var i;
      for (i = 0; i < temp.length; i++) {
        var temporderData = await API.get(
          "GoFlexeOrderPlacement",
          `/customerorder/${temp[i].customerOrderId}`
        );
        temp[i].customerDetails = temporderData;
      }
      for (i = 0; i < temp.length; i++) {
        var tempTrackData = await API.get(
          "GoFlexeOrderPlacement",
          `/tracking?type=getProcess&orderId=${temp[i].ServiceOrderId}`
        );
        temp[i].trackingDetails = tempTrackData;
      }

      console.log(temp);
      setActiveOrders(temp);
      setLoading(false);
    }
    putValues();
  }, []);

  if (activeOrders == "") {
    if (loading == true) {
      return (
        <div>
          <Spinner />
        </div>
      );
    } else {
      return (
        <div>
          <Typography
            style={{ fontSize: 20, height: 50, padding: 10, paddingLeft: 55 }}
          >
            You have not accepted any orders yet.
          </Typography>
        </div>
      );
    }
  } else {
    return (
      <div>
        <section className="">
          <div>
            <Grid
              container
              spacing={10}
              style={{ paddingTop: 20, paddingBottom: 30, paddingLeft: 70 }}
            >
              {constants.orders.map((orders) => {
                return (
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          //checked={state.checkedB}
                          //onChange={handleChange}
                          name={orders.name}
                          color="primary"
                        />
                      }
                      label={orders.name}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </div>
          {activeOrders.map((eachOrder) => (
            <div>
              <Card
                style={{
                  margin: 0,
                  marginTop: 20,
                }}
              >
                <CardContent
                  style={{
                    marginTop: 0,
                    padding: 16,
                  }}
                >
                  <Grid container spacing={0}>
                    <Grid item xs={2}>
                      <figure
                        style={{
                          marginTop: 0,
                          marginBottom: 0,
                          padding: 10,
                        }}
                      >
                        <img
                          alt="truck"
                          src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMjU2IiB4Mj0iMjU2IiB5MT0iNTEyIiB5Mj0iMCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDBiNTljIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjOWNmZmFjIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzJfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjMwMSIgeDI9IjMwMSIgeTE9IjI3MSIgeTI9IjYxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNjM2ZmZTgiLz48c3RvcCBvZmZzZXQ9Ii45OTczIiBzdG9wLWNvbG9yPSIjZjBmZmY0Ii8+PC9saW5lYXJHcmFkaWVudD48Zz48cGF0aCBkPSJtNTA4Ljk5MyAxNTYuOTkxYy0yLjgzMy0zLjc3Mi03LjI3Ni01Ljk5MS0xMS45OTMtNS45OTFoLTEwNy4yNTdjLTcuMTYzLTQyLjUxMS00NC4yMjctNzUtODguNzQzLTc1cy04MS41OCAzMi40ODktODguNzQzIDc1aC05My4yMzVsLTE5LjYtMTM4LjEwN2MtMS4wNDktNy4zOTYtNy4zOC0xMi44OTMtMTQuODUxLTEyLjg5M2gtNjkuNTcxYy04LjI4NCAwLTE1IDYuNzE2LTE1IDE1czYuNzE2IDE1IDE1IDE1aDU2LjU1bDE5LjU5OSAxMzguMTA0di4wMDEuMDAzbDIyLjY0MyAxNTkuNDk5YzIuNDU3IDE3LjE5NyAxMC44MiAzMi45NzggMjMuNTk4IDQ0LjY4NC0xMC4wMDQgOC4yNi0xNi4zOSAyMC43NTMtMTYuMzkgMzQuNzA5IDAgMjAuNzIzIDE0LjA4NSAzOC4yMDkgMzMuMTgxIDQzLjQxNC0yLjA0NSA1LjEzNy0zLjE4MSAxMC43My0zLjE4MSAxNi41ODYgMCAyNC44MTMgMjAuMTg3IDQ1IDQ1IDQ1czQ1LTIwLjE4NyA0NS00NWMwLTUuMjU4LS45MTUtMTAuMzA1LTIuNTgtMTVoMTI1LjE2Yy0xLjY2NSA0LjY5NS0yLjU4IDkuNzQyLTIuNTggMTUgMCAyNC44MTMgMjAuMTg3IDQ1IDQ1IDQ1czQ1LTIwLjE4NyA0NS00NS0yMC4xODctNDUtNDUtNDVoLTI0MGMtOC4yNzEgMC0xNS02LjcyOS0xNS0xNXM2LjcyOS0xNSAxNS0xNWgyMjQuNzQyYzMzLjMwOSAwIDYyLjk2My0yMi4zNjggNzIuMDk4LTU0LjMzOWw0OC41NjctMTY3LjQ4M2MxLjMxMy00LjUzMS40MTktOS40MTYtMi40MTQtMTMuMTg3eiIgZmlsbD0idXJsKCNTVkdJRF8xXykiLz48Zz48Zz48cGF0aCBkPSJtMzAxIDYxYy01Ny44OTcgMC0xMDUgNDcuMTAzLTEwNSAxMDVzNDcuMTAzIDEwNSAxMDUgMTA1IDEwNS00Ny4xMDMgMTA1LTEwNS00Ny4xMDMtMTA1LTEwNS0xMDV6bTQwLjYwNiAxMDAuNjA3LTQ1IDQ1Yy0yLjkyOCAyLjkyOS02Ljc2NyA0LjM5My0xMC42MDYgNC4zOTNzLTcuNjc4LTEuNDY0LTEwLjYwNi00LjM5NGwtMTUtMTVjLTUuODU4LTUuODU4LTUuODU4LTE1LjM1NSAwLTIxLjIxMyA1Ljg1Ny01Ljg1OCAxNS4zNTUtNS44NTggMjEuMjEzIDBsNC4zOTQgNC4zOTMgMzQuMzk0LTM0LjM5M2M1Ljg1Ny01Ljg1OCAxNS4zNTUtNS44NTggMjEuMjEzIDAgNS44NTcgNS44NTkgNS44NTcgMTUuMzU2LS4wMDIgMjEuMjE0eiIgZmlsbD0idXJsKCNTVkdJRF8yXykiLz48L2c+PC9nPjwvZz48L3N2Zz4="
                        />
                      </figure>
                    </Grid>

                    <Grid
                      item
                      xs={6}
                      style={{
                        marginTop: 15,
                        marginBottom: 20,
                      }}
                    >
                      <Grid container spacing={0}>
                        <Grid item sm={6} xs={6}>
                          <h6
                            style={{
                              marginBottom: 25,
                            }}
                          >
                            Order Id :{" "}
                            {/* <span>{eachOrder.Item.items[0].productType}</span> */}
                            <span>
                              {eachOrder.customerDetails.Item.OrderId.substring(
                                0,
                                5
                              )}
                            </span>
                          </h6>
                        </Grid>
                        <Grid itemsm={6} xs={6}>
                          <h6>
                            Distance :{" "}
                            <span>
                              {
                                eachOrder.customerDetails.Item.distanceRange
                                  .value.lowRange
                              }
                              -
                              {
                                eachOrder.customerDetails.Item.distanceRange
                                  .value.highRange
                              }{" "}
                              km
                            </span>
                          </h6>
                        </Grid>
                        <Grid itemsm={12} xs={6}>
                          <h6>
                            Total Weight :{" "}
                            <span>
                              {(eachOrder.customerDetails.Item.items[0]
                                .measurable == true
                                ? Number(
                                    eachOrder.customerDetails.Item.items[0]
                                      .noOfUnits
                                  ) *
                                  Number(
                                    eachOrder.customerDetails.Item.items[0]
                                      .weightPerUnit
                                  )
                                : eachOrder.customerDetails.Item.items[0]
                                    .totalWeight) + " Kgs"}
                            </span>
                          </h6>
                        </Grid>
                        <Grid itemsm={12} xs={6}>
                          <h6>
                            Total Amount :{" "}
                            {eachOrder.customerDetails.Item.estimatedPrice}
                          </h6>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item itemsm={12} xs={3}>
                      <Grid container spacing={0}>
                        <Grid item sm={12} xs={5}></Grid>
                        <Grid item sm={12} xs={6}>
                          {eachOrder.trackingDetails.stages[0].status ==
                          "COMPLETED" ? (
                            eachOrder.trackingDetails.stages[2].status ==
                            "COMPLETED" ? (
                              <Button
                                style={{
                                  maxWidth: "150px",
                                  minWidth: "150px",
                                  maxHeight: "50px",
                                  marginTop: 5,
                                  marginBottom: 7,
                                }}
                                variant="contained"
                                color="default"
                                startIcon={<LocalShippingIcon />}
                                component={Link}
                                // <Track id={serviceOrderId} />
                                to={`/track/${eachOrder.ServiceOrderId}`}
                              >
                                Delivery
                              </Button>
                            ) : (
                              <Button
                                style={{
                                  maxWidth: "150px",
                                  minWidth: "150px",
                                  maxHeight: "50px",
                                  marginTop: 5,
                                  marginBottom: 7,
                                }}
                                variant="contained"
                                color="default"
                                startIcon={<LocalShippingIcon />}
                                component={Link}
                                // <Track id={serviceOrderId} />
                                to={`/track/${eachOrder.ServiceOrderId}`}
                              >
                                Pickup
                              </Button>
                            )
                          ) : (
                            <Button
                              style={{
                                maxWidth: "150px",
                                minWidth: "150px",
                                maxHeight: "50px",
                                marginTop: 5,
                                marginBottom: 7,
                              }}
                              component={Link}
                              to={`assignment/${eachOrder.ServiceOrderId}/${eachOrder.customerOrderId}`}
                              variant="contained"
                              color="default"
                              startIcon={<LocalShippingIcon />}
                              // component={Link}
                              // to="/track"
                            >
                              Assign
                            </Button>
                          )}
                          <Button
                            style={{
                              minWidth: "150px",
                              maxWidth: "150px",
                              maxHeight: "50px",
                              marginTop: 7,
                              marginBottom: 5,
                            }}
                            component={Link}
                            to={`order/${eachOrder.customerOrderId}/${eachOrder.ServiceOrderId}`}
                            variant="contained"
                            color="default"
                            // className={classes.allocationButton}
                            startIcon={<ClassTwoToneIcon />}
                          >
                            Details
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </div>
          ))}
        </section>
      </div>
    );
  }
};

export default MyOrders;
{
  /* <div>
                            <figure>
                                <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMjU2IiB4Mj0iMjU2IiB5MT0iNTEyIiB5Mj0iMCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDBiNTljIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjOWNmZmFjIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzJfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjMwMSIgeDI9IjMwMSIgeTE9IjI3MSIgeTI9IjYxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNjM2ZmZTgiLz48c3RvcCBvZmZzZXQ9Ii45OTczIiBzdG9wLWNvbG9yPSIjZjBmZmY0Ii8+PC9saW5lYXJHcmFkaWVudD48Zz48cGF0aCBkPSJtNTA4Ljk5MyAxNTYuOTkxYy0yLjgzMy0zLjc3Mi03LjI3Ni01Ljk5MS0xMS45OTMtNS45OTFoLTEwNy4yNTdjLTcuMTYzLTQyLjUxMS00NC4yMjctNzUtODguNzQzLTc1cy04MS41OCAzMi40ODktODguNzQzIDc1aC05My4yMzVsLTE5LjYtMTM4LjEwN2MtMS4wNDktNy4zOTYtNy4zOC0xMi44OTMtMTQuODUxLTEyLjg5M2gtNjkuNTcxYy04LjI4NCAwLTE1IDYuNzE2LTE1IDE1czYuNzE2IDE1IDE1IDE1aDU2LjU1bDE5LjU5OSAxMzguMTA0di4wMDEuMDAzbDIyLjY0MyAxNTkuNDk5YzIuNDU3IDE3LjE5NyAxMC44MiAzMi45NzggMjMuNTk4IDQ0LjY4NC0xMC4wMDQgOC4yNi0xNi4zOSAyMC43NTMtMTYuMzkgMzQuNzA5IDAgMjAuNzIzIDE0LjA4NSAzOC4yMDkgMzMuMTgxIDQzLjQxNC0yLjA0NSA1LjEzNy0zLjE4MSAxMC43My0zLjE4MSAxNi41ODYgMCAyNC44MTMgMjAuMTg3IDQ1IDQ1IDQ1czQ1LTIwLjE4NyA0NS00NWMwLTUuMjU4LS45MTUtMTAuMzA1LTIuNTgtMTVoMTI1LjE2Yy0xLjY2NSA0LjY5NS0yLjU4IDkuNzQyLTIuNTggMTUgMCAyNC44MTMgMjAuMTg3IDQ1IDQ1IDQ1czQ1LTIwLjE4NyA0NS00NS0yMC4xODctNDUtNDUtNDVoLTI0MGMtOC4yNzEgMC0xNS02LjcyOS0xNS0xNXM2LjcyOS0xNSAxNS0xNWgyMjQuNzQyYzMzLjMwOSAwIDYyLjk2My0yMi4zNjggNzIuMDk4LTU0LjMzOWw0OC41NjctMTY3LjQ4M2MxLjMxMy00LjUzMS40MTktOS40MTYtMi40MTQtMTMuMTg3eiIgZmlsbD0idXJsKCNTVkdJRF8xXykiLz48Zz48Zz48cGF0aCBkPSJtMzAxIDYxYy01Ny44OTcgMC0xMDUgNDcuMTAzLTEwNSAxMDVzNDcuMTAzIDEwNSAxMDUgMTA1IDEwNS00Ny4xMDMgMTA1LTEwNS00Ny4xMDMtMTA1LTEwNS0xMDV6bTQwLjYwNiAxMDAuNjA3LTQ1IDQ1Yy0yLjkyOCAyLjkyOS02Ljc2NyA0LjM5My0xMC42MDYgNC4zOTNzLTcuNjc4LTEuNDY0LTEwLjYwNi00LjM5NGwtMTUtMTVjLTUuODU4LTUuODU4LTUuODU4LTE1LjM1NSAwLTIxLjIxMyA1Ljg1Ny01Ljg1OCAxNS4zNTUtNS44NTggMjEuMjEzIDBsNC4zOTQgNC4zOTMgMzQuMzk0LTM0LjM5M2M1Ljg1Ny01Ljg1OCAxNS4zNTUtNS44NTggMjEuMjEzIDAgNS44NTcgNS44NTkgNS44NTcgMTUuMzU2LS4wMDIgMjEuMjE0eiIgZmlsbD0idXJsKCNTVkdJRF8yXykiLz48L2c+PC9nPjwvZz48L3N2Zz4=" />
                                <figcaption>
                                    <h6>Order Date <span><TodayIcon/></span></h6>
                                    <h4>20th Dec, 2020</h4>
                                </figcaption>
                            </figure>
                            <div>
                                <Button
                                        component={Link} to="/assignment"
                                        variant="contained"
                                        color="default"
                                        className={classes.allocationButton}
                                        startIcon={<LocalShippingIcon />}>
                                        Assign
                                </Button>
                                <Button
                                        component={Link} to="/details"
                                        variant="contained"
                                        color="default"
                                        className={classes.allocationButton}
                                        startIcon={<ClassTwoToneIcon />}> 
                                        Details
                                </Button>
                            </div>
                        </div> */
}
