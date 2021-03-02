/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
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
  IconButton,
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
  const [currentUser, setCurrentUser] = useState(null);
  const [truckNumber, setTruckNumber] = useState();
  const [CostId, setCostId] = useState();
  const [size, setSize] = useState();
  const [unit, setUnit] = useState("tons");
  const [ownership, setOwnership] = useState("self");
  const [location, setLocation] = useState();
  const [capacity, setCapacity] = useState();
  const [price, setPrice] = useState();
  const [distance, setDistance] = useState();
  const [isNew, setIsNew] = useState(false);
  const [ThirtyDaysPricing, setThirtyDaysPricing] = useState();
  const [ImmidiatePricing, setImmidiatePricing] = useState();
  const [pin, setPin] = useState();
  const [capability, setCapability] = useState("");
  const [Features, setFeatures] = useState([]);
  const [Ratecapability, setRatecapability] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [assetActive, setAssetActive] = useState(true);
  const [ExpandDetails, setExpandDetails] = useState(false);
  const [pindata, setpindata] = useState("");
  const [costData, setCostData] = useState([]);
  const [DeliveryPromise, setDeliveryPromise] = useState();
  const [SourceLocation, setSourceLocation] = useState();
  const [DestinationLocation, setDestinationLocation] = useState();
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

  const onLocationChangeController = (event) => {
    setLocation(event.target.value);
  };
  const onImmidiatePricingChangeController = (event) => {
    setImmidiatePricing(event.target.value);
  };
  const onThirtyDaysPricingController = (event) => {
    setThirtyDaysPricing(event.target.value);
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
    var i;
    var j;

    setIsNew(false);
    setPrice("");
    setCostId(null);
    setImmidiatePricing("");
    setThirtyDaysPricing("");
    setSourceLocation("");
    setDestinationLocation("");
    setCapacity(null);
    setDeliveryPromise(null);
    setDistance(null);
    for (i = 0; i < costData.length; i++) {
      if (event.value === costData[i].label) {
        setIsNew(true);
        setPrice(costData[i].value.price);
        setCostId(costData[i].value.costId);
        setImmidiatePricing(
          costData[i].value.additionalDetails[0].immediatePricing
        );
        setThirtyDaysPricing(
          costData[i].value.additionalDetails[0].thirtyDaysPricing
        );
        setSourceLocation(
          costData[i].value.additionalDetails[0].sourceLocation
        );
        setDestinationLocation(
          costData[i].value.additionalDetails[0].destinationLocation
        );
        for (j = 0; j < constants.truckCapacityOptions.length; j++) {
          if (
            constants.truckCapacityOptions[j].value ===
            costData[i].value.capacity
          ) {
            setCapacity(constants.truckCapacityOptions[j]);
          }
        }
        for (j = 0; j < constants.DeliveryCommitmentOptions.length; j++) {
          if (
            constants.DeliveryCommitmentOptions[j].value ==
            costData[i].value.additionalDetails[0].deliveryCommitment
          ) {
            setDeliveryPromise(constants.DeliveryCommitmentOptions[j]);
          }
        }

        for (j = 0; j < constants.DistanceOptions.length; j++) {
          if (
            constants.DistanceOptions[j].value.lowRange ===
            costData[i].value.rangeinkms.lowRange
          ) {
            setDistance(constants.DistanceOptions[j]);
          }
        }
      }
      setRatecapability(event);
    }
  };
  const onCapacityChange = (event) => {
    setCapacity(event);
  };
  const onPriceChange = (event) => {
    setPrice(event.target.value);
  };
  const onDistanceChange = (event) => {
    setDistance(event);
  };

  useEffect(async () => {
    const setUser = async () => {
      var currentUser = await Auth.currentUserInfo();
      var owner = currentUser.username;
      setCurrentUser(owner);
    };
    setUser();
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
        //  alert(JSON.stringify(temp));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  }, []);

  const EditOldPricing = async () => {
    setLoading(true);
    var items = [];

    const data = {
      costId: CostId,
      serviceProviderId: currentUser,
      assetType: type.value,
      capability: capability.value,
      capacity: capacity.value,
      rangeinkms: distance.value,
      price: price,
      additionalDetails: [
        {
          sourceLocation: SourceLocation,
          sourceArea: "",
          sourcePinData: [],
          destinationArea: "",
          destinationPinData: [],
          destinationLocation: DestinationLocation,
          thirtyDaysPricing: ThirtyDaysPricing,
          immediatePricing: ImmidiatePricing,
          deliveryCommitment: DeliveryPromise.value,
        },
      ],
    };
    const payload = {
      body: data,
    };
    items.push(
      API.put("GoFlexeOrderPlacement", `/serviceprovidercost`, payload)
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
    return await Promise.all(items);
  };

  const SubmitNewPricing = async () => {
    setLoading(true);
    var items = [];

    const data = {
      serviceProviderId: currentUser,
      assetType: type.value,
      capability: capability.value,
      capacity: capacity.value,
      rangeinkms: distance.value,
      price: price,
      additionalDetails: [
        {
          sourceLocation: SourceLocation,
          sourceArea: "",
          sourcePinData: [],
          destinationArea: "",
          destinationPinData: [],
          destinationLocation: DestinationLocation,
          thirtyDaysPricing: ThirtyDaysPricing,
          immediatePricing: ImmidiatePricing,
          deliveryCommitment: DeliveryPromise.value,
        },
      ],
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
    return await Promise.all(items);
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
          </Grid>{" "}
          <Grid item xs={12} sm={6}>
            {type.value === "truck" && (
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
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
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
              fullWidth
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
          <Grid item xs={12} sm={6}>
            <Select
              styles={selectStyles}
              className="basic-single"
              classNamePrefix="Capability"
              isSearchable
              name="Capability"
              placeholder="Capability"
              value={Ratecapability}
              onChange={(event) => onRateCapabilityChange(event)}
              options={constants.truckCapabilityOptions}
            />
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
                <TextField
                  size="small"
                  variant="outlined"
                  value={price}
                  label="Price"
                  InputLabelProps={{ shrink: true }}
                  onChange={(event) => onPriceChange(event)}
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
                  value={distance}
                  onChange={(event) => onDistanceChange(event)}
                  options={constants.DistanceOptions}
                />
              </Grid>
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
                              ExpandDetails == true
                                ? setExpandDetails(false)
                                : setExpandDetails(true);
                            }}
                          >
                            {ExpandDetails == true ? (
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
              {ExpandDetails == true ? (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      InputLabelProps={{ shrink: true }}
                      // type="number"
                      id="Source"
                      name="Source"
                      label="Source Location Zip"
                      PinCode
                      value={SourceLocation}
                      size="small"
                      variant="outlined"
                      autoComplete="Pickup postal-code"
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      required
                      fullWidth
                      label="Destination Location Zip"
                      // type="number"
                      value={DestinationLocation}
                      className={classes.textField}
                      variant="outlined"
                      size="small"
                      autoComplete="Pickup postal-code"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      label="30 Days Pricing"
                      //type="number"
                      className={classes.textField}
                      variant="outlined"
                      size="small"
                      value={ThirtyDaysPricing}
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
                      //type="number"
                      value={ImmidiatePricing}
                      className={classes.textField}
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
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
                      value={DeliveryPromise}
                      className="basic-single"
                      classNamePrefix="Delivery Commitment"
                      isSearchable
                      name="Delivery Commitment"
                      placeholder="Delivery Commitment"
                      options={constants.DeliveryCommitmentOptions}
                    />
                  </Grid>
                </Grid>
              ) : (
                <br />
              )}{" "}
            </Grid>
          ) : (
            <br />
          )}
          {renderCapabilityForm()}
        </Grid>{" "}
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 20, paddingBottom: 90 }}
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
          marginBottom: 50,
          marginRight: 30,
        }}
      >
        Submit
      </Button>
    </CardContent>
  );
};
export default AddTocapacity;
