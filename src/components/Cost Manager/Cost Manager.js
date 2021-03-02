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
import constants from "../../Constants/constants";
import { Auth, API } from "aws-amplify";
import Spinner from "../UI/Spinner";
import PropTypes from "prop-types";
import {
  Checkbox,
  Select as MaterialSelect,
  IconButton,
  Divider,
  FormControlLabel,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import TruckCost from "./Truck Costing/Truck Cost";
import WarehouseCost from "./Warehourse Costing/Warehouse Cost";

// import Autocomplete from "@material-ui/lab/Autocomplete";
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CostManager = (props) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
  const [user, setUser] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const [chosenProducts, setChosenProducts] = useState([null]);
  const [calculating, setCalculating] = useState(false);

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    Auth.currentUserInfo()
      .then((user) => {
        setUser(user);
        API.get(
          "GoFlexeOrderPlacement",
          `/inventory?type=owner&ownerId=${user.username}`
        )
          .then((response) => {
            // Add your code here
            //setAllProducts(response)

            var items = allProducts.slice();
            //console.log(Array.isArray(response))
            for (var i = 0; i < response.length; i++) {
              items.push({
                label: response[i].productName,
                value: response[i],
                isNew: false,
              });
            }
            setAllProducts(items);
            console.log(items);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {}, []);
  const emptyPinValidator = (string) => {
    if (string === "" || string == null) {
      return false;
    }
    return true;
  };

  const handleItemDeleted = (i) => {
    var items = chosenProducts.slice();
    items.splice(i, 1);
    setChosenProducts(items);
  };
  const addproduct = () => {
    var items = chosenProducts.slice();
    items.push(null);
    setChosenProducts(items);
  };

  // const handleChange = (newValue, i) => {
  //   //console.log(newValue)
  //   var items = chosenProducts.slice();
  //   if (newValue === null) {
  //     items[i] = null;
  //   } else {
  //     if (newValue.__isNew__ === true) {
  //       var temp = {
  //         value: {
  //           productName: newValue.value,
  //           productType: null,
  //           categories: null,
  //           measurable: true,
  //           length: null,
  //           width: null,
  //           height: null,
  //           weightPerUnit: null,
  //           density: null,
  //           unit: null,
  //           location: "",
  //           pincode: "",
  //           productId: "",
  //         },
  //         isNew: true,
  //         label: newValue.label,
  //         noOfUnits: 0,
  //         totalWeight: 0,
  //       };
  //       items[i] = temp;
  //     } else {
  //       var temp = {
  //         value: newValue.value,
  //         isNew: false,
  //         label: newValue.label,
  //         noOfUnits: 0,
  //         totalWeight: 0,
  //       };
  //       items[i] = temp;
  //     }
  //   }
  //   setChosenProducts(items);
  //   console.log(items);
  //   // console.log(newValue)
  // };
  //   const onquantityChangeController = (event, i) => {
  //     var items = products.slice();
  //     items[i].quantity = event.target.value;
  //     setproducts(items);
  //   };
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

  var list = chosenProducts.map((e, i) => (
    <div>
      {i !== 0 && <Divider style={{ marginBottom: 30, marginTop: 30 }} />}

      <Grid
        container
        direction="row"
        alignItems="center"
        style={{ padding: 30 }}
      >
        <Grid item>
          <h5>Asset {i + 1} Information</h5>
        </Grid>
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
      <Grid
        container
        spacing={3}
        style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 20 }}
      >
        <Grid item xs={12} sm={3}>
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
          <Grid item xs={12} sm={3}>
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
          <Grid item xs={12} sm={3}>
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
          <Grid item xs={12} sm={6}>
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
      <Grid
        container
        spacing={3}
        style={{ padding: 50, paddingTop: 20, paddingBottom: 30 }}
      >
        <Grid item xs={12} sm={3}>
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
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Immediate"
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
        <Grid item xs={12} sm={3}>
          <TextField
            required
            type="text"
            id="location"
            name="location"
            label="Destination Pin"
            fullWidth
            value={location}
            onChange={(event) => onLocationChangeController(event)}
            variant="outlined"
            size="small"
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Delivery Range"
            type="text"
            className={classes.textField}
            onChange={(event) => onDeliveryRangeChangeController(event)}
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">Km</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <TextField
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
            /> */}
        </Grid>
      </Grid>

      {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            type="text"
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
        </Grid> */}
    </div>
  ));

  if (loading === true) {
    return (
      <React.Fragment>
        <h1>Loading your product details</h1>
        <Spinner />
      </React.Fragment>
    );
  }
  if (redirect) {
    return <Redirect to="/ordersRedir" />;
  }
  if (calculating === true) {
    return (
      <div class="jumbotron text-center">
        <p class="lead">
          <strong>Calculating estimated cost</strong>
        </p>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Truck Costing" {...a11yProps(0)} />
          <Tab label="Warehouse Costing" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TruckCost />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WarehouseCost />
      </TabPanel>
    </div>
    // <div>
    //   <Card className={classes.root}>
    //     <CardContent style={{ padding: 0 }}>
    //       <Typography fullWidth className={classes.title} gutterBottom>
    //         Cost Manager
    //       </Typography>
    //       <form>
    //         <Grid
    //           container
    //           spacing={3}
    //           style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
    //         ></Grid>
    //         {list}
    //         <Button
    //           className="AllButtons"
    //           style={{
    //             marginLeft: 50,
    //           }}
    //           onClick={() => addproduct()}
    //         >
    //           Add New Asset
    //         </Button>
    //       </form>
    //     </CardContent>
    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "row",
    //         justifyContent: "flex-end",
    //         margin: 20,
    //       }}
    //     >
    //       <Button
    //         variant="contained"
    //         className="AllButtons"
    //         style={{
    //           marginTop: 10,
    //           marginLeft: 20,
    //         }}
    //       >
    //         Submit
    //       </Button>
    //     </div>
    //   </Card>
    // </div>
  );
};

export default CostManager;
