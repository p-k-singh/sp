import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import Select from "react-select";
import {
  TextField,
  Grid,
  CardContent,
  FormControl,
  InputLabel,
  Button,
  Switch,
  Card,
  Container,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Multiselect } from "multiselect-react-dropdown";
import constants from "../Constants/constants";
import { Auth, API } from "aws-amplify";
import Spinner from "./UI/Spinner";
const useStyles = makeStyles({
  root: {
    // minWidth: 275,
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
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
});
const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);
const CostManager = (props) => {
  const classes = useStyles();

  const [type, setType] = useState("truck");

  const [truckNumber, setTruckNumber] = useState();
  const [RatePerKM, setRatePerKM] = useState();
  const [size, setSize] = useState();
  const [unit, setUnit] = useState("tons");
  const [ownership, setOwnership] = useState("self");
  const [location, setLocation] = useState();
  const [ThirtyDaysPricing, setThirtyDaysPricing] = useState();
  const [ImmediatePricing, setImmediatePricing] = useState();
  const [DeliveryRange, setDeliveryRange] = useState();
  const [pin, setPin] = useState();
  const [capability, setCapability] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [assetActive, setAssetActive] = useState(true);
  const [pindata, setpindata] = useState("");
  /**Validators */
  const [pinValidator, setPinValidator] = useState("");
  const [capacityValidator, setCapacityValidator] = useState("");

  const capabilityOptions = {
    options: constants.capabilityOptions,
  };
  // const api_url = "https://api.postalpincode.in/pincode/301411";

  // // Defining async function
  // async function getapi(url) {
  //   // Storing response

  //   const response = await fetch(url);

  //   // Storing data in form of JSON
  //   var data = await response.json();
  //   console.log(data);
  //   setpindata(data);
  // }
  // // Calling that async function
  // getapi(api_url);
  const selectStyles = {
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };
  const warehouseCapabilityOptions = {
    options: constants.warehouseCapabilityOptions,
  };

  const typeChangeController = (event) => {
    setType(event);
    setCapability([]);
    if (event.value === "truck") {
      setUnit("tons");
    } else {
      setUnit("sqft");
    }
  };
  const handleAssetActive = () => {
    setAssetActive(!assetActive);
  };
  const onTruckNumberChangeController = (event) => {
    setTruckNumber(event.target.value);
  };
  const onSizeChangeController = (event) => {
    if (event.target.value < 0) {
      setCapacityValidator("Capacity cannot be negative");
    } else {
      setCapacityValidator("");
    }
    setSize(event.target.value);
  };
  // const unitChangeController = (event) => {
  //     setUnit(event.target.value)
  // }
  const ownershipChangeController = (event) => {
    setOwnership(event);
  };
  const onLocationChangeController = (event) => {
    setLocation(event.target.value);
  };
  const onImmediatePricingChangeController = (event) => {
    setImmediatePricing(event.target.value);
  };
  const onThirtyDaysPricingController = (event) => {
    setThirtyDaysPricing(event.target.value);
  };
  const onDeliveryRangeChangeController = (event) => {
    setDeliveryRange(event.target.value);
  };
  const onPinChangeController = (event) => {
    var pickupPinCode = parseInt(event.target.value, 10);
    var greater = 999999,
      smaller = 100000;
    var check = 1;
    if (pickupPinCode < smaller || pickupPinCode > greater) {
      setPinValidator("Pincode must be of 6 digits");
      check = 0;
    }
    if (pickupPinCode < 0) {
      setPinValidator("Pincode Cannot be negative");
      check = 0;
    }
    if (check === 1) {
      setPinValidator("");
    }
    setPin(event.target.value);
  };
  const onAvailableFromChangeController = (event) => {
    setAvailableFrom(event.target.value);
  };
  const onAvailableToChangeController = (event) => {
    setAvailableTo(event.target.value);
  };
  const onCapabilitiesChange = (event) => {
    //alert(event)
    setCapability(event);
  };
  const onRatePerKMChangeController = (event) => {
    setRatePerKM(event.target.value);
  };
  const submitCapacity = async () => {
    if (type.value == null || type.value == "") {
      alert("Please select Asset type.");
      return;
    }
    if (capacityValidator !== "") {
      alert(capacityValidator);
      return;
    }
    if (size == null || size == 0) {
      alert("Capacity cannot be blank.");
      return;
    }
    if (
      (type.value === "truck" && truckNumber == "") ||
      (type.value === "truck" && truckNumber == null)
    ) {
      alert("Truck Number cannot be empty.");
      return;
    }
    if (capability == null || capability == "") {
      alert("Please select capabilities of the selected Asset.");
      return;
    }
    if (
      availableTo == null ||
      availableTo == "" ||
      availableFrom == null ||
      availableFrom == ""
    ) {
      alert("Availability Dates cannot be empty");
      return;
    }
    if (ownership.value == null || ownership.value == "") {
      alert("Ownership cannot be empty");
      return;
    }
    if (pinValidator !== "") {
      alert(pinValidator);
      return;
    }
    if (location == null || location == "") {
      alert("Base Location cannot be blank");
      return;
    }
    if (pin == null || pin == 0) {
      alert("Pin cannot be Empty");
      return;
    }
    setLoading(true);
    var currentUser = await Auth.currentUserInfo();
    var owner = currentUser.username;
    const data = {
      owner: owner,
      type: type.value,
      assetNumber: truckNumber,
      capacity: size,
      unit: unit,
      capabilities: capability,
      availableFromDateTime: availableFrom,
      availableToDateTime: availableTo,
      ownershipType: ownership.value,
      location: location,
      active: assetActive,
      pincode: pin,
      ThirtyDaysPricing: ThirtyDaysPricing,
      ImmediatePricing: ImmediatePricing,
      DeliveryRange: DeliveryRange,
      RatePerKM: RatePerKM,
    };
    const payload = {
      body: data,
    };
    API.post("GoFlexeOrderPlacement", `/capacity`, payload)
      .then((response) => {
        // Add your code here
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
    console.log(data);
    setLoading(false);
    props.changeDisplaySetting("storage");
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
  return (
    <CardContent style={{ padding: 0, overflow: "hidden" }}>
      <Typography className={classes.title} gutterBottom>
        Cost Manager
        <Tooltip title="Specify the Pricing Details for your Assets">
          <InfoIcon style={{ color: "lightgrey", marginLeft: 20 }} />
        </Tooltip>
      </Typography>
      <form>
        <Typography className={classes.formHeadings}>Basic Details</Typography>

        <Grid
          container
          spacing={3}
          style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 20 }}
        >
          <Grid item xs={12} sm={6}>
            <Select
              styles={selectStyles}
              className="basic-single"
              classNamePrefix="Type"
              isSearchable
              name="type"
              placeholder="Type"
              value={type}
              onChange={(event) => typeChangeController(event)}
              options={constants.CapacityType}
            />
          </Grid>
          {type.value === "truck" && (
            <Grid item xs={12} sm={6}>
              <TextField
                required
                type="text"
                name="truckNumber"
                label="Capacity"
                fullWidth
                value={truckNumber}
                onChange={(event) => onTruckNumberChangeController(event)}
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Ton</InputAdornment>
                  ),
                }}
                autoComplete="shipping address-line1"
              />
            </Grid>
          )}
          {type.value === "warehouse" && (
            <Grid item xs={12} sm={6}>
              <TextField
                required
                type="number"
                error={capacityValidator !== ""}
                helperText={capacityValidator === "" ? " " : capacityValidator}
                id="size"
                name="size"
                label="Capacity"
                fullWidth
                value={size}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">sqft</InputAdornment>
                  ),
                }}
                onChange={(event) => onSizeChangeController(event)}
                variant="outlined"
                size="small"
                autoComplete="shipping address-line1"
              />
            </Grid>
          )}

          <Tooltip title="Features available in selected Asset" arrow>
            <Grid item xs={12} sm={12}>
              <Select
                isMulti
                styles={selectStyles}
                name="capabilities"
                value={capability}
                options={
                  type.value === "truck"
                    ? constants.truckCapabilityOptions
                    : constants.WarehouseCapabilityOptions
                }
                placeholder="Capabilities(Select multiple)"
                className="basic-multi-select"
                onChange={(event) => onCapabilitiesChange(event)}
                classNamePrefix="select"
              />
            </Grid>
          </Tooltip>
          {renderCapabilityForm()}
        </Grid>

        <Typography className={classes.formHeadings}>
          Pricing Details
        </Typography>
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 20, paddingBottom: 30 }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="30 Days Pricing"
              type="text"
              className={classes.textField}
              onChange={(event) => onThirtyDaysPricingController(event)}
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
              type="text"
              className={classes.textField}
              onChange={(event) => onImmediatePricingChangeController(event)}
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end">₹</InputAdornment>,
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Delivery Range"
              type="text"
              className={classes.textField}
              onChange={(event) => onDeliveryRangeChangeController(event)}
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Km</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="text"
              id="RatePerKM"
              name="RatePerKM"
              label="Rate / Km"
              fullWidth
              value={RatePerKM}
              onChange={(event) => onRatePerKMChangeController(event)}
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>

        <Typography className={classes.formHeadings}>
          Route Management
        </Typography>
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 20, paddingBottom: 30 }}
        >
          <Grid item xs={12} sm={6}>
            <Tooltip title="Preferred route for Shipping the Asset">
              <TextField
                required
                type="text"
                id="location"
                name="location"
                label="Preffered Route"
                fullWidth
                value={location}
                onChange={(event) => onLocationChangeController(event)}
                variant="outlined"
                size="small"
                autoComplete="shipping address-line1"
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="number"
              error={pinValidator !== ""}
              helperText={pinValidator === "" ? " " : pinValidator}
              id="pin"
              name="pin"
              label="Pin Code"
              fullWidth
              value={pin}
              onChange={(event) => onPinChangeController(event)}
              variant="outlined"
              size="small"
              autoComplete="shipping address-line1"
            />
          </Grid>
        </Grid>
      </form>
      <Button
        variant="contained"
        onClick={submitCapacity}
        style={{
          float: "right",
          backgroundColor: "#f9a825",
          marginBottom: "20px",
          marginRight: 50,
        }}
      >
        Submit
      </Button>
    </CardContent>
  );
};
export default CostManager;