/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
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
  Checkbox,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Multiselect } from "multiselect-react-dropdown";
import constants from "../../Constants/constants";
import { Auth, API } from "aws-amplify";
import Spinner from "../UI/Spinner";
import CostManager from "../Cost Manager/Cost Manager";
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
const AddTocapacity = (props) => {
  const classes = useStyles();

  const [type, setType] = useState("truck");

  const [truckNumber, setTruckNumber] = useState();
  const [RatePerKM, setRatePerKM] = useState();
  const [size, setSize] = useState();
  const [unit, setUnit] = useState("tons");
  const [ownership, setOwnership] = useState("self");
  const [location, setLocation] = useState();
  const [ThirtyDaysPricing, setThirtyDaysPricing] = useState();
  const [ImmidiatePricing, setImmidiatePricing] = useState();
  const [DeliveryRange, setDeliveryRange] = useState();
  const [pin, setPin] = useState();
  const [capability, setCapability] = useState("");
  const [Features, setFeatures] = useState([]);
  const [Ratecapability, setRatecapability] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [assetActive, setAssetActive] = useState(true);
  const [pindata, setpindata] = useState("");
  const [costData, setCostData] = useState([]);
  const [costRange, setcostRange] = useState();
  const [costPrice, setcostPrice] = useState();
  const [costCapacity, setcostCapacity] = useState();
  /**Validators */
  const [pinValidator, setPinValidator] = useState("");
  const [capacityValidator, setCapacityValidator] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const capabilityOptions = {
    options: constants.capabilityOptions,
  };

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
  const onImmidiatePricingChangeController = (event) => {
    setImmidiatePricing(event.target.value);
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
    setCapability(event);
  };
  const onFeaturesChange = (event) => {
    setFeatures(event);
  };
  const onRateCapabilityChange = (event) => {
    if (
      event.value.rangeinkms.lowRange == 0 &&
      event.value.rangeinkms.highRange == 200
    ) {
      setcostRange("0 - 200 Kms");
    }
    if (
      event.value.rangeinkms.lowRange == 200 &&
      event.value.rangeinkms.highRange == 400
    ) {
      setcostRange("200 - 400 Kms");
    }
    if (
      event.value.rangeinkms.lowRange == 400 &&
      event.value.rangeinkms.highRange == 800
    ) {
      setcostRange("400 - 800 Kms");
    }
    if (
      event.value.rangeinkms.lowRange == 800 &&
      event.value.rangeinkms.highRange == 2000
    ) {
      setcostRange("800+ Kms");
    }
    if (
      event.value.capacity.lowCapacity == 0 &&
      event.value.capacity.highCapacity == 2
    ) {
      setcostCapacity("0 - 2 Tons");
    }
    if (
      event.value.capacity.lowCapacity == 2 &&
      event.value.capacity.highCapacity == 4
    ) {
      setcostCapacity("2 - 4 Tons");
    }
    if (
      event.value.capacity.lowCapacity == 4 &&
      event.value.capacity.highCapacity == 8
    ) {
      setcostCapacity("4 - 8 Tons");
    }
    if (
      event.value.capacity.lowCapacity == 8 &&
      event.value.capacity.highCapacity == 14
    ) {
      setcostCapacity("8 - 14 Tons");
    }
    if (
      event.value.capacity.lowCapacity == 14 &&
      event.value.capacity.highCapacity == 20
    ) {
      setcostCapacity("14 - 20 Tons");
    }
    if (
      event.value.capacity.lowCapacity == 20 &&
      event.value.capacity.highCapacity == 26
    ) {
      setcostCapacity("20 - 26 Tons");
    }
    if (
      event.value.capacity.lowCapacity == 26 &&
      event.value.capacity.highCapacity == 100
    ) {
      setcostCapacity("26+ Tons");
    }
    if (event.value.price == null || event.value.price == "") {
      setcostPrice(event.value.additionalDetails.immediatePricing);
    } else {
      setcostPrice(event.value.price);
    }

    setRatecapability(event);
  };
  const onRatePerKMChangeController = (event) => {
    setRatePerKM(event.target.value);
  };

  useEffect(async () => {
    var currentUser = await Auth.currentUserInfo();
    var owner = currentUser.username;
    API.get(
      "GoFlexeOrderPlacement",
      `/serviceprovidercost?type=serviceProviderId&serviceProviderId=${owner}`
    )
      .then((resp) => {
        console.log(resp);

        var temp = costData.slice();
        for (var i = 0; i < resp.length; i++) {
          temp.push({
            label: resp[i].capability,
            value: resp[i],
          });
        }
        setCostData(temp);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  }, []);

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
      // ThirtyDaysPricing: ThirtyDaysPricing,
      // ImmidiatePricing: ImmidiatePricing,
      // DeliveryRange: DeliveryRange,
      // RatePerKM: RatePerKM,
    };
    const payload = {
      body: data,
    };
    API.post("GoFlexeOrderPlacement", `/capacity`, payload)
      .then((response) => {
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
  const setFeaturesKeyValues = (event, idx) => {
    var items = Features.slice();
    items[idx].data = event.target.value;
    setFeatures(items);
  };

  const renderCapabilityForm = () => {
    return (
      <Container style={{ marginTop: 20 }}>
        <Grid
          container
          spacing={3}
          style={{ paddingLeft: 50, paddingRight: 50, paddingBottom: 50 }}
        >
          {Features.map((row, idx) => (
            <Grid item xs={12} sm={4}>
              <TextField
                value={row.data}
                id={row.label}
                name={row.value}
                onChange={(event) => setFeaturesKeyValues(event, idx)}
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
            {/* <FormControl
              style={{ minWidth: 400 }}
              className={classes.formControl}
            >
              <InputLabel htmlFor="age-native-simple">Type</InputLabel>
              <Select
                native
                //value="inches"
                onChange={typeChangeController}
                inputProps={{
                  name: "age",
                  id: "age-native-simple",
                }}
              >
                {constants.CapacityType.map((d) => (
                  <option value={d.value}>{d.label}</option>
                ))}
              </Select>
            </FormControl> */}
          </Grid>
          {type.value === "truck" && (
            <Grid item xs={12} sm={6}>
              <TextField
                required
                type="text"
                id="truckNumber"
                name="truckNumber"
                label="Truck Number"
                fullWidth
                value={truckNumber}
                onChange={(event) => onTruckNumberChangeController(event)}
                variant="outlined"
                size="small"
                autoComplete="shipping address-line1"
              />
            </Grid>
          )}
          {type.value !== "truck" && <Grid item xs={12} sm={6}></Grid>}
          {/* <Grid item xs={12} sm={6}></Grid> */}
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
              onChange={(event) => onSizeChangeController(event)}
              variant="outlined"
              size="small"
              autoComplete="shipping address-line1"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              type="text"
              id="unit"
              name="unit"
              label="Unit"
              fullWidth
              value={unit}
              variant="outlined"
              size="small"
              autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip
              title="Only Capabilities with Costing information filled are shown."
              arrow
              placement="top"
            >
              <Select
                styles={selectStyles}
                className="basic-single"
                classNamePrefix="Capability"
                isSearchable
                name="Capability"
                placeholder="Capability"
                value={Ratecapability}
                onChange={(event) => onRateCapabilityChange(event)}
                options={costData}
              />
            </Tooltip>
          </Grid>
          <Tooltip title="Features available in selected Asset" arrow>
            <Grid item xs={12} sm={6}>
              <Select
                isMulti
                styles={selectStyles}
                name="Features"
                value={Features}
                options={
                  type.value === "truck"
                    ? constants.truckFeatures
                    : constants.WarehouseCapabilityOptions
                }
                placeholder="Features(Select multiple)"
                className="basic-multi-select"
                onChange={(event) => onFeaturesChange(event)}
                classNamePrefix="select"
              />
            </Grid>
          </Tooltip>

          {Ratecapability.length !== 0 ? (
            <Grid container spacing={3} style={{ padding: 50 }}>
              <Grid item xs={12} sm={4}>
                <TextField disabled={true} value={costPrice} label="Price" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  disabled={true}
                  value={costRange}
                  label="Range in Kms"
                />
                {/* <Select
                  styles={selectStyles}
                  className="basic-single"
                  classNamePrefix="Capacity"
                  isSearchable
                  name="Capacity"
                  placeholder="Capacity"
                  value={costCapacity}
                  // onChange={(event) => onCapacityChange(event, i)}
                  options={constants.CapacityOptions} */}
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  disabled={true}
                  value={costCapacity}
                  label="Capacity"
                />
                {/* <Select
                  styles={selectStyles}
                  className="basic-single"
                  classNamePrefix="Range"
                  isSearchable
                  name="Range"
                  placeholder="Range"
                  value={costPrice}
                  // onChange={(event) => onRangeinKmsChange(event, i)}
                  options={constants.RangeOptions}
                /> */}
              </Grid>
            </Grid>
          ) : (
            <br />
          )}

          <Grid item xs={12} sm={12}>
            {/* <Checkbox
              onChange={(e) => {
                setFillCost(e);
              }}
              size="small"
              color="primary"
              inputProps={{
                "aria-label": "secondary checkbox",
              }}
            /> */}
            <Link to="/CostManager">
              <p>Fill new Cost information</p>
            </Link>
          </Grid>

          {renderCapabilityForm()}
        </Grid>

        <Typography className={classes.formHeadings}>
          Availability Details
          <Tooltip
            title="Specify the Period of asset availability"
            placement="right"
          >
            <InfoIcon
              style={{ color: "lightgrey", marginLeft: 10 }}
              fontSize="small"
            />
          </Tooltip>
        </Typography>

        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 20, paddingBottom: 30 }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              id="datetime-local"
              label="Available From"
              type="datetime-local"
              className={classes.textField}
              onChange={(event) => onAvailableFromChangeController(event)}
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="datetime-local"
              label="Available To"
              type="datetime-local"
              className={classes.textField}
              onChange={(event) => onAvailableToChangeController(event)}
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>

        <Typography className={classes.formHeadings}>
          Additional Details
        </Typography>
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 20, paddingBottom: 30 }}
        >
          <Grid item xs={12} sm={6}>
            <FormControl
              style={{ minWidth: 400 }}
              className={classes.formControl}
            >
              <InputLabel htmlFor="age-native-simple">Ownership</InputLabel>
              <Tooltip title="Whether the asset is owned or outsourced to another company">
                <Select
                  styles={selectStyles}
                  className="basic-single"
                  classNamePrefix="ownership"
                  isSearchable
                  name="ownership"
                  placeholder="Ownership"
                  value={ownership}
                  onChange={(event) => ownershipChangeController(event)}
                  options={constants.ownerShip}
                />
                {/* <Select
                  native
                  value={ownership}
                  onChange={ownershipChangeController}
                  inputProps={{
                    name: "age",
                    id: "age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={"self"}>Self</option>
                  <option value={"outsourced"}>Outsourced</option>
                </Select> */}
              </Tooltip>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip title="Home Loaction of the Asset">
              <TextField
                required
                type="text"
                id="location"
                name="location"
                label="Base Location"
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
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 20, paddingBottom: 30 }}
        >
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Tooltip
                title="Asset is available for service or not"
                placement="left"
              >
                <InfoIcon
                  style={{ color: "lightgrey", marginLeft: 10 }}
                  fontSize="small"
                />
              </Tooltip>
              <Grid item>Active</Grid>
              <Grid item>
                <AntSwitch
                  checked={assetActive}
                  onChange={handleAssetActive}
                  name="checkedC"
                />
              </Grid>
            </Grid>
          </Typography>
        </Grid>
      </form>
      <Button
        variant="contained"
        onClick={submitCapacity}
        style={{
          float: "right",
          backgroundColor: "#f9a825",
          marginBottom: "20px",
          marginRight: 30,
        }}
      >
        Submit
      </Button>
    </CardContent>
  );
};
export default AddTocapacity;
