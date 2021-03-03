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

const AddTruckCost = (props) => {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(null);

  const [sourcePinCodes, setSourcePinCodes] = useState([
    {
      sourceLocation: [
        {
          pin: "",
        },
      ],
    },
  ]);
  const [destinationPinCodes, setDestinationPinCodes] = useState([
    {
      destinationLocation: [
        {
          pin: "",
        },
      ],
    },
  ]);

  const [chosenProducts, setChosenProducts] = useState([
    {
      capability: null,
      capacity: null,
      rangeinKms: null,
      pricing: null,
      details: false,
      additionalDetails: [
        {
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
        },
      ],
    },
  ]);
  const [capability, setCapability] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [sourcePinCodes]);
  useEffect(() => {}, [destinationPinCodes]);

  const onsourceAreaChangeController = (event, i, j) => {
    var items = chosenProducts.slice();
    items[i].additionalDetails[j].sourceArea = event.target.value;
    setChosenProducts(items);
  };

  const onDestinationAreaChangeController = (event, i, j) => {
    var items = chosenProducts.slice();
    items[i].additionalDetails[j].destinationArea = event.target.value;
    setChosenProducts(items);
  };
  const handleItemDeleted = (i) => {
    var items = chosenProducts.slice();
    items.splice(i, 1);
    setChosenProducts(items);
  };
  const handleRouteDeleted = (i, j) => {
    var items = chosenProducts.slice();
    items[i].additionalDetails.splice(j, 1);
    setChosenProducts(items);
  };

  const addproduct = () => {
    var items = chosenProducts.slice();

    var spins = sourcePinCodes.slice();
    spins.push({
      sourceLocation: [
        {
          pin: "",
        },
      ],
    });
    setDestinationPinCodes(spins);
    var dpins = destinationPinCodes.slice();
    dpins.push({
      destinationLocation: [
        {
          pin: "",
        },
      ],
    });
    setDestinationPinCodes(dpins);

    items.push({
      capability: null,
      capacity: null,
      rangeinKms: null,
      pricing: null,
      details: false,
      additionalDetails: [
        {
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
        },
      ],
    });
    setChosenProducts(items);
  };
  const addroute = (i) => {
    var items = chosenProducts.slice();

    var spins = sourcePinCodes.slice();
    spins[i].sourceLocation.push({
      pin: "",
    });
    setSourcePinCodes(spins);
    var dpins = destinationPinCodes.slice();
    dpins[i].destinationLocation.push({
      pin: "",
    });
    setDestinationPinCodes(dpins);

    items[i].additionalDetails.push({
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
    setChosenProducts(items);
  };

  const selectStyles = {
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };
  const onsourceLocationChangeController = (event, i, j) => {
    var pins = sourcePinCodes.slice();
    pins[i].sourceLocation[j].pin = event.target.value;
    setSourcePinCodes(pins);

    var sourcePinCode = parseInt(event.target.value, 10);
    var items = chosenProducts.slice();
    if (sourcePinCode < 0) {
      items[i].additionalDetails[j].sourceZipValidator =
        "Cannot be a negative value";
      setChosenProducts(items);
      return;
    } else {
      items[i].additionalDetails[j].sourceZipValidator = "";
      // setChosenProducts(items);
    }
    var count = 0,
      temp = sourcePinCode;
    while (temp > 0) {
      count++;
      temp = Math.floor(temp / 10);
    }
    items[i].additionalDetails[j].sourceLocation = event.target.value;

    if (count === 6) {
      const api_url = "https://api.postalpincode.in/pincode/" + sourcePinCode;
      fetch(api_url)
        .then((response) => {
          response.json().then((data) => {
            if (data !== null && data[0].PostOffice !== null) {
              items[i].additionalDetails[j].sourcePinData = data[0].PostOffice;
            }
            setChosenProducts(items);
          });
        })
        .catch((err) => {
          console.log(err);
          setChosenProducts(items);
        });
    } else {
      items[i].additionalDetails[j].sourceZipValidator =
        "Pin must be of 6 digits";
      setChosenProducts(items);
    }
  };
  const onDestinationLocationChangeController = (event, i, j) => {
    var pins = destinationPinCodes.slice();
    pins[i].destinationLocation[j].pin = event.target.value;
    setDestinationPinCodes(pins);

    var destinationPinCode = parseInt(event.target.value, 10);
    var items = chosenProducts.slice();
    if (destinationPinCode < 0) {
      items[i].additionalDetails[j].destinationZipValidator =
        "Cannot be a negative value";

      return;
    } else {
      items[i].additionalDetails[j].destinationZipValidator = "";
    }
    var count = 0,
      temp = destinationPinCode;
    while (temp > 0) {
      count++;
      temp = Math.floor(temp / 10);
    }
    items[i].additionalDetails[j].destinationLocation = event.target.value;

    if (count === 6) {
      const api_url =
        "https://api.postalpincode.in/pincode/" + destinationPinCode;
      fetch(api_url)
        .then((response) => {
          response.json().then((data) => {
            if (data !== null && data[0].PostOffice !== null) {
              items[i].additionalDetails[j].destinationPinData =
                data[0].PostOffice;
            }
            setChosenProducts(items);
          });
        })
        .catch((err) => {
          console.log(err);
          setChosenProducts(items);
        });
    } else {
      items[i].additionalDetails[j].destinationZipValidator =
        "Pin must be of 6 digits";
      setChosenProducts(items);
    }
  };
  const onImmediatePricingChangeController = (event, i, j) => {
    var items = chosenProducts.slice();
    items[i].additionalDetails[j].immediatePricing = event.target.value;
    setChosenProducts(items);
  };
  const onThirtyDaysPricingController = (event, i, j) => {
    var items = chosenProducts.slice();
    items[i].additionalDetails[j].thirtyDaysPricing = event.target.value;
    setChosenProducts(items);
  };
  const onPricingController = (event, i) => {
    var items = chosenProducts.slice();
    items[i].pricing = event.target.value;
    setChosenProducts(items);
  };

  const onCapabilitiesChange = (event, i) => {
    var items = chosenProducts.slice();
    items[i].capability = event;
    setChosenProducts(items);
  };
  const onRangeinKmsChange = (event, i) => {
    var items = chosenProducts.slice();
    items[i].rangeinKms = event;
    setChosenProducts(items);
  };
  const onDeliveryCommitmentChange = (event, i, j) => {
    var items = chosenProducts.slice();
    items[i].additionalDetails[j].deliveryCommitmentname = event;
    items[i].additionalDetails[j].deliveryCommitment = event.value;
    setChosenProducts(items);
  };

  const onCapacityChange = (event, i) => {
    var items = chosenProducts.slice();
    items[i].capacity = event;
    setChosenProducts(items);
  };
  useEffect(() => {
    const setUser = async () => {
      var currentUser = await Auth.currentUserInfo();
      var owner = currentUser.username;
      setCurrentUser(owner);
    };
    setUser();
  }, []);

  const SubmitPricing = async () => {
    setLoading(true);
    var items = [];
    for (var i = 0; i < chosenProducts.length; i++) {
      const data = {
        serviceProviderId: currentUser,
        assetType: "truck",
        capability: chosenProducts[i].capability.value,
        capacity: chosenProducts[i].capacity.value,
        rangeinkms: chosenProducts[i].rangeinKms.value,
        price:
          chosenProducts[i].details !== true ? chosenProducts[i].pricing : null,
        additionalDetails: chosenProducts[i].additionalDetails,
      };
      const payload = {
        body: data,
      };
      items.push(
        API.post("GoFlexeOrderPlacement", `/serviceprovidercost`, payload)
          .then((response) => {
            console.log(response);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error.response);
            setLoading(false);
          })
      );
      setLoading(false);
      props.toggleForm();
    }
    return await Promise.all(items);
  };
  const setCapabilityKeyValues = (event, idx) => {
    var items = capability.slice();
    items[idx].data = event.target.value;
    setCapability(items);
  };

  const renderCapabilityForm = () => {
    return (
      <Container style={{ marginTop: 20 }}>
        <Grid
          container
          spacing={3}
          style={{ paddingLeft: 50, paddingRight: 50, paddingBottom: 10 }}
        >
          {capability.map((row, idx) => (
            <Grid item xs={12} sm={4}>
              <TextField
                value={row.data}
                id={row.label}
                name={row.value}
                onChange={(event) => setCapabilityKeyValues(event, idx)}
                label={row.label}
                helperText={row.unit}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={4}></Grid>
        </Grid>
      </Container>
      // </Card>
    );
  };
  if (loading === true) {
    return <Spinner />;
  }

  var list = chosenProducts.map((e, i) => (
    <div>
      {i !== 0 && <Divider style={{ marginBottom: 30, marginTop: 30 }} />}
      <Grid
        container
        direction="row"
        alignItems="center"
        style={{ paddingBottom: 20 }}
      >
        {/* <Grid item>
          <h5>Costing {i + 1} Information</h5>
        </Grid> */}
        <Grid item xs={12} sm={10}></Grid>
        <Grid item>
          {i == 0 ? (
            ""
          ) : (
            <IconButton onClick={() => handleItemDeleted(i)}>
              <DeleteIcon style={{ fontSize: "30" }} />
            </IconButton>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ paddingLeft: 40, paddingRight: 40 }}>
        <Grid item xs={12} sm={4}>
          <Select
            styles={selectStyles}
            className="basic-single"
            classNamePrefix="Capability"
            isSearchable
            name="Capability"
            placeholder="Capability"
            value={chosenProducts[i].capability}
            onChange={(event) => onCapabilitiesChange(event, i)}
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
            value={chosenProducts[i].capacity}
            onChange={(event) => onCapacityChange(event, i)}
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
            value={chosenProducts[i].rangeinKms}
            onChange={(event) => onRangeinKmsChange(event, i)}
            options={constants.DistanceOptions}
          />
        </Grid>{" "}
        <Grid item xs={12} sm={6}>
          {chosenProducts[i].details == false ? (
            <TextField
              fullWidth
              label="Pricing"
              type="number"
              value={chosenProducts[i].pricing}
              onChange={(event) => onPricingController(event, i)}
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">₹</InputAdornment>,
              }}
              helperText="Specify Immidiate Pricing Inclusive of GST Per Trip"
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
                    style={{ padding: 0, margin: 0, borderBottom: "none" }}
                  >
                    Add Route (Optional)
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ padding: 0, margin: 0, borderBottom: "none" }}
                  >
                    <IconButton
                      style={{ padding: 0, margin: 0, outline: "none" }}
                      aria-label="expand row"
                      size="small"
                      onClick={(e) => {
                        var items = chosenProducts.slice();
                        chosenProducts[i].details == true
                          ? (items[i].details = false)
                          : (items[i].details = true);
                        setChosenProducts(items);
                      }}
                    >
                      {chosenProducts[i].details == true ? (
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
      {chosenProducts[i].details == true ? (
        <div>
          {e.additionalDetails.map((e, j) => (
            <Grid
              container
              spacing={3}
              style={{ paddingLeft: 40, paddingRight: 40, paddingBottom: 40 }}
            >
              <Grid item xs={12} sm={10}></Grid>
              <Grid item>
                {j == 0 ? (
                  ""
                ) : (
                  <IconButton onClick={() => handleRouteDeleted(i, j)}>
                    <DeleteIcon style={{ fontSize: "30" }} />
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  InputLabelProps={{ shrink: true }}
                  error={
                    chosenProducts[i].additionalDetails[j]
                      .sourceZipValidator !== ""
                  }
                  helperText={
                    chosenProducts[i].additionalDetails[j]
                      .sourceZipValidator === ""
                      ? chosenProducts[i].additionalDetails[j].sourcePinData ==
                        ""
                        ? ""
                        : chosenProducts[i].additionalDetails[j]
                            .sourcePinData[0].District +
                          ", " +
                          chosenProducts[i].additionalDetails[j]
                            .sourcePinData[0].State
                      : chosenProducts[i].additionalDetails[j]
                          .sourceZipValidator
                  }
                  type="number"
                  id="Source"
                  name="Source"
                  label="Source Location Zip"
                  PinCode
                  // value={chosenProducts[i].additionalDetails[j].sourceLocation}
                  value={sourcePinCodes[i].sourceLocation[j].pin}
                  onChange={(event) =>
                    onsourceLocationChangeController(event, i, j)
                  }
                  size="small"
                  variant="outlined"
                  autoComplete="Pickup postal-code"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                {chosenProducts[i].additionalDetails[j].sourcePinData.length !==
                0 ? (
                  <MaterialSelect
                    autoWidth={true}
                    size="small"
                    native
                    onChange={(event) =>
                      onsourceAreaChangeController(event, i, j)
                    }
                    value={chosenProducts[i].additionalDetails[j].sourceArea}
                  >
                    {chosenProducts[i].additionalDetails[j].sourcePinData.map(
                      (d) => (
                        <option>{d.Name}</option>
                      )
                    )}
                  </MaterialSelect>
                ) : (
                  <p></p>
                )}{" "}
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  required
                  error={
                    chosenProducts[i].additionalDetails[j]
                      .destinationZipValidator !== ""
                  }
                  helperText={
                    chosenProducts[i].additionalDetails[j]
                      .destinationZipValidator === ""
                      ? chosenProducts[i].additionalDetails[j]
                          .destinationPinData == ""
                        ? ""
                        : chosenProducts[i].additionalDetails[j]
                            .destinationPinData[0].District +
                          ", " +
                          chosenProducts[i].additionalDetails[j]
                            .destinationPinData[0].State
                      : chosenProducts[i].additionalDetails[j]
                          .destinationZipValidator
                  }
                  fullWidth
                  label="Destination Location Zip"
                  type="number"
                  className={classes.textField}
                  value={destinationPinCodes[i].destinationLocation[j].pin}
                  onChange={(event) =>
                    onDestinationLocationChangeController(event, i, j)
                  }
                  variant="outlined"
                  size="small"
                  autoComplete="Pickup postal-code"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                {chosenProducts[i].additionalDetails[j].destinationPinData
                  .length !== 0 ? (
                  <MaterialSelect
                    autoWidth={true}
                    fullWidth
                    size="small"
                    native
                    onChange={(event) =>
                      onDestinationAreaChangeController(event, i, j)
                    }
                    value={
                      chosenProducts[i].additionalDetails[j].destinationArea
                    }
                  >
                    {chosenProducts[i].additionalDetails[
                      j
                    ].destinationPinData.map((d) => (
                      <option>{d.Name}</option>
                    ))}
                  </MaterialSelect>
                ) : (
                  <p></p>
                )}{" "}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="30 Days Pricing"
                  type="number"
                  className={classes.textField}
                  value={
                    chosenProducts[i].additionalDetails[j].thirtyDaysPricing
                  }
                  onChange={(event) =>
                    onThirtyDaysPricingController(event, i, j)
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
                  className={classes.textField}
                  value={
                    chosenProducts[i].additionalDetails[j].immediatePricing
                  }
                  onChange={(event) =>
                    onImmediatePricingChangeController(event, i, j)
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
                  value={
                    chosenProducts[i].additionalDetails[j]
                      .deliveryCommitmentname
                  }
                  onChange={(event) => onDeliveryCommitmentChange(event, i, j)}
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
            onClick={() => addroute(i)}
          >
            Add Another Route <AddCircleIcon />
          </IconButton>
        </div>
      ) : (
        <p></p>
      )}

      {/* {renderCapabilityForm()} */}
    </div>
  ));

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
            Cost Details{" "}
          </Typography>
          <form>
            <Grid
              container
              spacing={3}
              style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
            ></Grid>
            {list}
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
          {" "}
          <Button
            variant="contained"
            style={{
              marginTop: 50,
              marginLeft: 50,
            }}
            onClick={() => addproduct()}
          >
            Add More
          </Button>
          <Button
            variant="contained"
            className="AllButtons"
            onClick={SubmitPricing}
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

export default AddTruckCost;
