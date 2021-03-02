import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DeleteIcon from "@material-ui/icons/Delete";
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
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Button,
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
  Select as MaterialSelect,
  IconButton,
  Divider,
  FormControlLabel,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";

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

const AddWarehouseCost = (props) => {
  const classes = useStyles();
  const [deliveryCommitment, setdeliveryCommitment] = React.useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const handleSliderChange = (event, newValue, i) => {
    var items = chosenProducts.slice();
    items[i].additionalDetails.deliveryCommitment = newValue;
    setChosenProducts(items);
    setdeliveryCommitment(newValue);
  };

  const handleInputChange = (event, i) => {
    setdeliveryCommitment(
      event.target.value === "" ? "" : Number(event.target.value)
    );
    // var items = chosenProducts.slice();
    // items[i].deliveryCommitment = event.target.value;
    // setChosenProducts(items);
    // alert(event.target.value);
  };

  const handleBlur = () => {
    if (deliveryCommitment < 0) {
      setdeliveryCommitment(0);
    } else if (deliveryCommitment > 100) {
      setdeliveryCommitment(100);
    }
  };

  const [chosenProducts, setChosenProducts] = useState([
    {
      capability: null,
      capacity: null,
      rangeinKms: null,
      pricing: null,
      details: false,
      additionalDetails: {
        sourceLocation: "",
        destinationLocation: "",
        thirtyDaysPricing: null,
        immediatePricing: null,
        deliveryCommitment: 0,
      },
    },
  ]);

  const [capability, setCapability] = useState([]);
  const [loading, setLoading] = useState(false);

  const capabilityOptions = {
    options: constants.capabilityOptions,
  };
  const [redirect, setRedirect] = useState(false);

  const handleItemDeleted = (i) => {
    var items = chosenProducts.slice();
    items.splice(i, 1);
    setChosenProducts(items);
  };
  const addproduct = () => {
    var items = chosenProducts.slice();
    items.push({
      capability: null,
      capacity: null,
      rangeinKms: null,
      pricing: null,
      details: false,
      additionalDetails: {
        sourceLocation: "",
        destinationLocation: "",
        thirtyDaysPricing: null,
        immediatePricing: null,
        deliveryCommitment: 0,
      },
    });
    setChosenProducts(items);
  };
  const selectStyles = {
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };
  const onsourceLocationChangeController = (event, i) => {
    var items = chosenProducts.slice();
    items[i].additionalDetails.sourceLocation = event.target.value;
    setChosenProducts(items);
  };
  const onDestinationLocationChangeController = (event, i) => {
    var items = chosenProducts.slice();
    items[i].additionalDetails.destinationLocation = event.target.value;
    setChosenProducts(items);
  };
  const onImmediatePricingChangeController = (event, i) => {
    var items = chosenProducts.slice();
    items[i].additionalDetails.immediatePricing = event.target.value;
    setChosenProducts(items);
  };
  const onThirtyDaysPricingController = (event, i) => {
    var items = chosenProducts.slice();
    items[i].additionalDetails.thirtyDaysPricing = event.target.value;
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
        sourceLocation: chosenProducts[i].additionalDetails.sourceLocation,
        destinationLocation:
          chosenProducts[i].additionalDetails.destinationLocation,
        thirtyDaysPricing:
          chosenProducts[i].additionalDetails.thirtyDaysPricing,
        immediatePricing: chosenProducts[i].additionalDetails.immediatePricing,
        deliveryCommitment:
          chosenProducts[i].additionalDetails.deliveryCommitment,
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
        {/* <Grid item>
          {i == 0 ? (
            ""
          ) : (
            <IconButton onClick={() => handleItemDeleted(i)}>
              <DeleteIcon style={{ fontSize: "30" }} />
            </IconButton>
          )}
        </Grid> */}
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
        <Grid item xs={12} sm={3}>
          <Select
            styles={selectStyles}
            className="basic-single"
            classNamePrefix="Capacity"
            isSearchable
            name="Capacity"
            placeholder="Capacity"
            value={chosenProducts[i].capacity}
            onChange={(event) => onCapacityChange(event, i)}
            options={constants.CapacityOptions}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Select
            styles={selectStyles}
            className="basic-single"
            classNamePrefix="Range"
            isSearchable
            name="Range"
            placeholder="Range"
            value={chosenProducts[i].rangeinKms}
            onChange={(event) => onRangeinKmsChange(event, i)}
            options={constants.RangeOptions}
          />
        </Grid>
        {chosenProducts[i].details == false ? (
          <Grid item xs={12} sm={2}>
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
            />
          </Grid>
        ) : (
          <p></p>
        )}
        <Grid item sm={4} xs={12}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ borderBottom: "none" }}>
                    <Checkbox
                      onChange={(e) => {
                        var items = chosenProducts.slice();
                        items[i].details = e.target.checked;
                        setChosenProducts(items);
                      }}
                      size="small"
                      color="primary"
                      inputProps={{
                        "aria-label": "secondary checkbox",
                      }}
                    />
                  </TableCell>
                  <TableCell align="left" style={{ borderBottom: "none" }}>
                    Fill Additional Details
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item sm={5} xs={12}></Grid>
        <Grid item sm={3} xs={12}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ borderBottom: "none" }}>
                    {i == 0 ? (
                      ""
                    ) : (
                      <IconButton onClick={() => handleItemDeleted(i)}>
                        <DeleteIcon style={{ fontSize: "30" }} />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      {chosenProducts[i].details == true ? (
        <Grid
          container
          spacing={3}
          style={{ paddingLeft: 40, paddingRight: 40, paddingBottom: 30 }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              id="Source"
              name="Source"
              label="Source Location"
              fullWidth
              value={chosenProducts[i].additionalDetails.sourceLocation}
              onChange={(event) => onsourceLocationChangeController(event, i)}
              variant="outlined"
              size="small"
              autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Destination Location"
              type="text"
              className={classes.textField}
              value={chosenProducts[i].additionalDetails.destinationLocation}
              onChange={(event) =>
                onDestinationLocationChangeController(event, i)
              }
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="30 Days Pricing"
              type="number"
              className={classes.textField}
              value={chosenProducts[i].additionalDetails.thirtyDaysPricing}
              onChange={(event) => onThirtyDaysPricingController(event, i)}
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">₹</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Immediate Payment Pricing"
              type="number"
              className={classes.textField}
              value={chosenProducts[i].additionalDetails.immediatePricing}
              onChange={(event) => onImmediatePricingChangeController(event, i)}
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end">₹</InputAdornment>,
              }}
              size="small"
            />
          </Grid>
          <Grid
            container
            spacing={2}
            style={{ paddingLeft: 40, paddingRight: 40, padding: 30 }}
            alignItems="center"
          >
            <Grid item>Delivery Commitment:</Grid>
            <Grid item xs style={{ marginTop: 5 }}>
              <Slider
                value={
                  typeof chosenProducts[i].additionalDetails
                    .deliveryCommitment === "number"
                    ? chosenProducts[i].additionalDetails.deliveryCommitment
                    : 1
                }
                onChange={(event, newValue) =>
                  handleSliderChange(event, newValue, i)
                }
                defaultValue={6}
                valueLabelDisplay="auto"
                aria-labelledby="input-slider"
                max={30}
              />
            </Grid>
            <Grid item>
              <Input
                className={classes.input}
                value={chosenProducts[i].additionalDetails.deliveryCommitment}
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: 10,
                  min: 0,
                  max: 100,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Grid>
            <Grid item>Days</Grid>
          </Grid>
        </Grid>
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
  if (redirect) {
    return <Redirect to="/ordersRedir" />;
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
            <Button
              variant="contained"
              className="AllButtons"
              style={{
                marginTop: 10,
                marginLeft: 50,
              }}
              onClick={() => addproduct()}
            >
              Add More
            </Button>
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
            onClick={SubmitPricing}
            style={{
              marginTop: 10,
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

export default AddWarehouseCost;
