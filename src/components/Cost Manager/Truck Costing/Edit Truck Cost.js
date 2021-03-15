import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import Tooltip from "@material-ui/core/Tooltip";
import { Redirect, withRouter } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InfoIcon from "@material-ui/icons/Info";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import "../../Globalcss/globalcss.css";
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Button,
  Select as MaterialSelect,
  Switch,
  Card,
  Container,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Multiselect } from "multiselect-react-dropdown";
import constants from "../../../Constants/constants";
import { Auth, API } from "aws-amplify";
import Spinner from "../../UI/Spinner";
import PropTypes from "prop-types";
import {
  Checkbox,
  IconButton,
  Divider,
  FormControlLabel,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";


const useStyles = makeStyles({
  title: {
    fontSize: 20,
    height: 50,
    padding: 10,
    paddingLeft: 55,
    borderBottomStyle: "solid",
    borderWidth: "1px",
  },
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
  formControl: {
    marginTop: "1%",
    width: "50%",
  },
});

const EditTruckCost = (props) => {
    useEffect(() => {
     for (var i = 0; i < constants.DistanceOptions.length; i++) {
       if (
         props.row.rangeinkms.lowRange ===
           constants.DistanceOptions[i].value.lowRange &&
         props.row.rangeinkms
           .highRange === constants.DistanceOptions[i].value.highRange
       ) {
         setRangeinKms(constants.DistanceOptions[i]);
       }
     }

     if(props.row.additionalDetails.routeDetails[0].sourceLocation !== null && props.row.additionalDetails.routeDetails[0].sourceLocation !== "" ){
       setDetails(true)
     }




    }, []);
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(null);
  const [ additionalDetails, setAdditionalDetails] = useState(props.row.additionalDetails.routeDetails);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(false);
  const [pricing, setPricing] = useState(props.row.additionalDetails.price);
  const [rangeinKms, setRangeinKms] = useState("");
  const [capacity, setCapacity] = useState(
    constants.truckCapacityMap[props.row.capacity]
  );
  const [capability, setCapability] = useState(
    constants.truckCapabilityMap[props.row.capability]
  );

  const onsourceAreaChangeController = (event, i) => {
    var items = additionalDetails.slice();
   additionalDetails[i].sourceArea = event.target.value;
    setAdditionalDetails(items);
  };

  const onDestinationAreaChangeController = (event, i) => {
    var items = additionalDetails.slice();
   additionalDetails[i].destinationArea = event.target.value;
    setAdditionalDetails(items);
  };
  const handleRouteDeleted = (i) => {
    var items = additionalDetails.slice();
   items.splice(i, 1);
    setAdditionalDetails(items);
  };

  const addroute = () => {
    var items = additionalDetails.slice();

   items.push({
      sourceLocation: "",
      sourceZipValidator: "",
      sourceArea: "",
      sourcePinData: [],
      destinationZipValidator: "",
      destinationArea: "",
      destinationPinData: [],
      destinationLocation: "",
      thirtyDaysPricing: null,
      immediatePricing: null,
      deliveryCommitment: 0,
      deliveryCommitmentname: "",
    });
    setAdditionalDetails(items);
  };

  const selectStyles = {
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };
  const onsourceLocationChangeController = (event, i) => {
    var sourcePinCode = parseInt(event.target.value, 10);
    var items = additionalDetails.slice();
    if (sourcePinCode < 0) {
     additionalDetails[i].sourceZipValidator =
        "Cannot be a negative value";
      setAdditionalDetails(items);
      return;
    } else {
     additionalDetails[i].sourceZipValidator = "";
      // setAdditionalDetails(items);
    }
    var count = 0,
      temp = sourcePinCode;
    while (temp > 0) {
      count++;
      temp = Math.floor(temp / 10);
    }
   additionalDetails[i].sourceLocation = event.target.value;

    if (count === 6) {
      const api_url = "https://api.postalpincode.in/pincode/" + sourcePinCode;
      fetch(api_url)
        .then((response) => {
          response.json().then((data) => {
            if (data !== null && data[0].PostOffice !== null) {
             additionalDetails[i].sourcePinData = data[0].PostOffice;
             additionalDetails[i].sourceArea =
                data[0].PostOffice[0].Name;
            }
            setAdditionalDetails(items);
          });
        })
        .catch((err) => {
          console.log(err);
          setAdditionalDetails(items);
        });
    } else {
     additionalDetails[i].sourceZipValidator =
        "Pin must be of 6 digits";
      setAdditionalDetails(items);
    }
  };
  const onDestinationLocationChangeController = (event, i) => {
    var destinationPinCode = parseInt(event.target.value, 10);
    var items = additionalDetails.slice();
    if (destinationPinCode < 0) {
     additionalDetails[i].destinationZipValidator =
        "Cannot be a negative value";

      return;
    } else {
     additionalDetails[i].destinationZipValidator = "";
    }
    var count = 0,
      temp = destinationPinCode;
    while (temp > 0) {
      count++;
      temp = Math.floor(temp / 10);
    }
   additionalDetails[i].destinationLocation = event.target.value;

    if (count === 6) {
      const api_url =
        "https://api.postalpincode.in/pincode/" + destinationPinCode;
      fetch(api_url)
        .then((response) => {
          response.json().then((data) => {
            if (data !== null && data[0].PostOffice !== null) {
             additionalDetails[i].destinationPinData =
                data[0].PostOffice;
            }
            setAdditionalDetails(items);
          });
        })
        .catch((err) => {
          console.log(err);
          setAdditionalDetails(items);
        });
    } else {
     additionalDetails[i].destinationZipValidator =
        "Pin must be of 6 digits";
      setAdditionalDetails(items);
    }
  };
  const onImmediatePricingChangeController = (event, i) => {
    var items = additionalDetails.slice();
   additionalDetails[i].immediatePricing = event.target.value;
    setAdditionalDetails(items);
  };
  const onThirtyDaysPricingController = (event, i) => {
    var items = additionalDetails.slice();
   additionalDetails[i].thirtyDaysPricing = event.target.value;
    setAdditionalDetails(items);
  };
  const onPricingController = (event) => {
  setPricing(event.target.value)
  };

  const onCapabilitiesChange = (event) => {
  setCapability(event)
  };
  const onRangeinKmsChange = (event) => {
   setRangeinKms(event)
  };
  const onDeliveryCommitmentChange = (event, i) => {
    var items = additionalDetails.slice();
   additionalDetails[i].deliveryCommitment = event;
   additionalDetails[i].deliveryCommitmentname = event;
    setAdditionalDetails(items);
  };

  const onCapacityChange = (event) => {
   setCapacity(event)
  };
  useEffect(() => {
    const setUser = async () => {
      var currentUser = await Auth.currentUserInfo();
      var owner = currentUser.username;
      setCurrentUser(owner);
    };
    setUser();
  }, []);


  const setCapabilityKeyValues = (event) => {
    setCapability(event);
  };
  if (loading === true) {
    return <Spinner />;
  }

  if (loading === true) {
    return (
      <React.Fragment>
        <h1>Submitting Cost Details</h1>
        <Spinner />
      </React.Fragment>
    );
  }
  return (
    <div>
      <Card className={classes.root}>
        <CardContent style={{ padding: 0 }}>
          <Typography fullWidth className={classes.title} gutterBottom>
            Edit Cost Details{" "}
          </Typography>
          <form>
            <Grid
              container
              spacing={3}
              style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
            ></Grid>
            <div>
              <Grid
                container
                spacing={3}
                style={{ paddingLeft: 40, paddingRight: 40 }}
              >
                <Grid item xs={12} sm={4}>
                  <Select
                    styles={selectStyles}
                    className="basic-single"
                    classNamePrefix="Capability"
                    isSearchable
                    name="Capability"
                    placeholder="Capability"
                    value={capability}
                    onChange={(event) => onCapabilitiesChange(event)}
                    options={constants.truckCapabilityOptions}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Select
                    styles={selectStyles}
                    className="basic-single"
                    classNamePrefix="Capacity"
                    isSearchable
                    name="Capacity"
                    placeholder="Capacity"
                    value={capacity}
                    onChange={(event) => onCapacityChange(event)}
                    options={constants.truckCapacityOptions}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Select
                    styles={selectStyles}
                    className="basic-single"
                    classNamePrefix="Distance"
                    isSearchable
                    name="Distance"
                    placeholder="Distance"
                    value={rangeinKms}
                    onChange={(event) => onRangeinKmsChange(event)}
                    options={constants.DistanceOptions}
                  />
                </Grid>{" "}
                <Grid item xs={12} sm={6}>
                  {details == false ? (
                    <TextField
                      fullWidth
                      label="Pricing"
                      type="number"
                      value={pricing}
                      onChange={(event) => onPricingController(event)}
                      variant="outlined"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">₹</InputAdornment>
                        ),
                      }}
                      helperText="*Immidiate Pricing Inclusive of GST Per Trip"
                    />
                  ) : (
                    <p></p>
                  )}
                </Grid>
                <Grid item xs={12} sm={2}></Grid>
                <Grid item>
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            style={{
                              padding: 0,
                              margin: 0,
                              borderBottom: "none",
                            }}
                          >
                            Add Route (Optional)
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{
                              padding: 0,
                              margin: 0,
                              borderBottom: "none",
                            }}
                          >
                            <IconButton
                              style={{ padding: 0, margin: 0, outline: "none" }}
                              aria-label="expand row"
                              size="small"
                              onClick={() => {
                                details == true
                                  ? setDetails(false)
                                  : setDetails(true);
                              }}
                            >
                              {details == true ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )}
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item sm={5} xs={12}></Grid>
              </Grid>
              {details == true ? (
                <div>
                  {additionalDetails.map((Details, i) => (
                    <Grid
                      container
                      spacing={3}
                      style={{
                        paddingLeft: 40,
                        paddingRight: 40,
                        paddingBottom: 40,
                      }}
                    >
                      <Grid item xs={12} sm={10}></Grid>
                      <Grid item>
                        {i == 0 ? (
                          ""
                        ) : (
                          <IconButton onClick={() => handleRouteDeleted(i)}>
                            <DeleteIcon style={{ fontSize: "30" }} />
                          </IconButton>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          required
                          InputLabelProps={{ shrink: true }}
                          type="number"
                          id="Source"
                          name="Source"
                          label="Source Location Zip"
                          PinCode
                          value={Details.sourceLocation}
                          onChange={(event) =>
                            onsourceLocationChangeController(event,i)
                          }
                          size="small"
                          variant="outlined"
                          autoComplete="Pickup postal-code"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                       
                          <MaterialSelect
                            autoWidth={true}
                            size="small"
                            native
                            onChange={(event) =>
                              onsourceAreaChangeController(event, i)
                            }
                            value={additionalDetails[i].sourceArea}
                          >
                            {/* {additionalDetails[i].sourcePinData.map((d) => (
                              <option>{d.Name}</option>
                            ))} */}
                          </MaterialSelect>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          required
                          fullWidth
                          label="Destination Location Zip"
                          type="number"
                          className={classes.textField}
                          value={Details.destinationLocation}
                          onChange={(event) =>
                            onDestinationLocationChangeController(event,i)
                          }
                          variant="outlined"
                          size="small"
                          autoComplete="Pickup postal-code"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                            <MaterialSelect
                              autoWidth={true}
                              fullWidth
                              size="small"
                              native
                              onChange={(event) =>
                                onDestinationAreaChangeController(event, i)
                              }
                              value={additionalDetails[i].destinationArea}
                            >
                              {/* {additionalDetails[i].destinationPinData.map(
                                (d) => (
                                  <option>{d.Name}</option>
                                )
                              )} */}
                            </MaterialSelect>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="30 Days Pricing"
                          type="number"
                          className={classes.textField}
                          helperText={"*Inclusive of GST Per Trip"}
                          value={Details.thirtyDaysPricing}
                          onChange={(event) =>
                            onThirtyDaysPricingController(event,i)
                          }
                          variant="outlined"
                          size="small"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">₹</InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Immediate Payment Pricing"
                          type="number"
                          helperText={"*Inclusive of GST Per Trip"}
                          className={classes.textField}
                          value={Details.immediatePricing}
                          onChange={(event) =>
                            onImmediatePricingChangeController(event, i)
                          }
                          variant="outlined"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">₹</InputAdornment>
                            ),
                          }}
                          size="small"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Select
                          styles={selectStyles}
                          className="basic-single"
                          classNamePrefix="Delivery Commitment"
                          isSearchable
                          name="Delivery Commitment"
                          placeholder="Delivery Commitment"
                          value={Details.deliveryCommitmentname}
                          onChange={(event) =>
                            onDeliveryCommitmentChange(event, i)
                          }
                          options={constants.DeliveryCommitmentOptions}
                        />
                      </Grid>
                      <Divider />
                    </Grid>
                  ))}

                  <IconButton
                    style={{ padding: 0, marginLeft: 40, outline: "none" }}
                    aria-label="expand row"
                    size="small"
                    onClick={() => addroute()}
                  >
                    Add Another Route <AddCircleIcon />
                  </IconButton>
                </div>
              ) : (
                <p></p>
              )}
            </div>
          </form>
        </CardContent>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            margin: 20,
          }}
        >
          <Button
            variant="contained"
            className="AllButtons"
            // onClick={EditPricing}
            style={{
              marginTop: 50,
              marginLeft: 20,
              marginBottom: 50,
            }}
          >
            Submit
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EditTruckCost;
