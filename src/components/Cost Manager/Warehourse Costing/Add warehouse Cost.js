import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
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
  const [currentUser, setCurrentUser] = useState(null);
  

   const onAreaChangeController = (event, i) => {
     var items = chosenProducts.slice();
     items[i].locationArea = event;
     setChosenProducts(items);
   };

 const onLocationChangeController = (event, i, j) => {
   var PinCode = parseInt(event.target.value, 10);
   var items = chosenProducts.slice();
   if (PinCode < 0) {
     items[i].ZipValidator =
       "Cannot be a negative value";
     setChosenProducts(items);
     return;
   } else {
     items[i].ZipValidator = "";
   }
   var count = 0,
     temp = PinCode;
   while (temp > 0) {
     count++;
     temp = Math.floor(temp / 10);
   }
   items[i].location = event.target.value;

   if (count === 6) {
     const api_url = "https://api.postalpincode.in/pincode/" + PinCode;
     fetch(api_url)
       .then((response) => {
         response.json().then((data) => {
           if (data !== null && data[0].PostOffice !== null) {
             items[i].pinData = data[0].PostOffice;
           }
           setChosenProducts(items);
         });
       })
       .catch((err) => {
         console.log(err);
         setChosenProducts(items);
       });
   } else {
     items[i].ZipValidator =
       "Pin must be of 6 digits";
     setChosenProducts(items);
   }
 };


  const [chosenProducts, setChosenProducts] = useState([
    {
      features: [],
      capacity: null,
      pricing: null,
      location: "",
      details: false,
      ZipValidator: "",
      locationArea :"",
      pinData: [],
    },
  ]);

  const [capability, setCapability] = useState([]);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleItemDeleted = (i) => {
    var items = chosenProducts.slice();
    items.splice(i, 1);
    setChosenProducts(items);
  };
  const addproduct = () => {
    var items = chosenProducts.slice();
    items.push({
      features: [],
      capacity: null,
      pricing: null,
      location: "",
      details: false,
      ZipValidator:"",
      locationArea:"",
      pinData: [],
    });
    setChosenProducts(items);
  };
  const selectStyles = {
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };
 
  const onPricingController = (event, i) => {
    var items = chosenProducts.slice();
    items[i].pricing = event.target.value;
    setChosenProducts(items);
  };

  const onFeaturesChange = (event,i) => {
    var items = chosenProducts.slice();
     items[i].features = event;
     setChosenProducts(items);
  };
  const onCapacityChange = (event, i) => {
    var items = chosenProducts.slice();
    items[i].capacity = event.target.value;
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
        assetType: "warehouse",
        capacity: chosenProducts[i].capacity,
        price:chosenProducts[i].pricing,
        features: chosenProducts[i].features,
        locationArea: chosenProducts[i].locationArea,
        Location: chosenProducts[i].location,
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
        <Grid item xs={12} sm={3}>
          <TextField
            required
            error={chosenProducts[i].ZipValidator !== ""}
            helperText={
              chosenProducts[i].ZipValidator === ""
                ? chosenProducts[i].pinData == ""
                  ? ""
                  : chosenProducts[i].pinData[0].District +
                    ", " +
                    chosenProducts[i].pinData[0].State
                : chosenProducts[i].ZipValidator
            }
            type="number"
            id="PinCode
              name="
            PinCode
            variant="outlined"
            size="small"
            label="Location Zip Code"
            fullWidth
            value={chosenProducts[i].location}
            onChange={(event) => onLocationChangeController(event, i)}
            autoComplete="Pickup postal-code"
          />
        </Grid>
        {chosenProducts[i].pinData.length !== 0 ? (
          <Grid item xs={12} sm={3}>
            <MaterialSelect
              autoWidth={true}
              fullWidth
              native
              onChange={(event) => onAreaChangeController(event)}
              value={chosenProducts[i].locationArea}
              inputProps={{
                name: "age",
                id: "age-native-simple",
              }}
            >
              {chosenProducts[i].pinData.map((d) => (
                <option>{d.Name}</option>
              ))}
            </MaterialSelect>
          </Grid>
        ) : (
          <p></p>
        )}

        <Grid item xs={12} sm={3}>
          <TextField
            type="text"
            id="Capacity"
            name="Capacity"
            label="Capacity"
            fullWidth
            value={chosenProducts[i].capacity}
            onChange={(event) => onCapacityChange(event, i)}
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">Sqft</InputAdornment>
              ),
            }}
            autoComplete="shipping address-line1"
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Pricing"
            type="number"
            helperText={"Inclusive of GST"}
            value={chosenProducts[i].pricing}
            onChange={(event) => onPricingController(event, i)}
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">₹</InputAdornment>,
            }}
          />
        </Grid>

        <Grid item>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ padding: 0, margin: 0, borderBottom: "none" }}
                  >
                    Add Addititonal Details (Optional)
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
        <Grid
          container
          spacing={3}
          style={{ paddingLeft: 40, paddingRight: 40, paddingBottom: 30 }}
        >
          <Grid item xs={12} sm={12}>
            <Tooltip title="Features available in selected Asset" arrow>
              <Select
                isMulti
                styles={selectStyles}
                name="Features"
                value={chosenProducts[i].features}
                options={constants.WarehouseCapabilityOptions}
                placeholder="Features(Select multiple)"
                className="basic-multi-select"
                onChange={(event) => onFeaturesChange(event, i)}
                classNamePrefix="select"
              />
            </Tooltip>
          </Grid>
          {chosenProducts[i].features.map((row, idx) => (
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
        </Grid>
      ) : (
        <p></p>
      )}
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
            style={{
              marginTop: 10,
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
