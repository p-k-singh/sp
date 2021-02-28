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

const TruckCost = (props) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [chosenProducts, setChosenProducts] = useState([
    {
      capability: null,
      capacity: null,
      RangeinKms: null,
      Pricing: null,
      AdditionalDetails: false,
      SourceLocation: "",
      DestinationLocation: "",
      ThirtyDaysPricing: null,
      ImmediatePricing: null,
    },
  ]);

  const [capability, setCapability] = useState([]);
  const [loading, setLoading] = useState(false);

  const capabilityOptions = {
    options: constants.capabilityOptions,
  };
  const [calculating, setCalculating] = useState(false);
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
      RangeinKms: null,
      Pricing: null,
      AdditionalDetails: false,
      SourceLocation: "",
      DestinationLocation: "",
      ThirtyDaysPricing: null,
      ImmediatePricing: null,
    });
    setChosenProducts(items);
  };

  const api_url = "https://api.postalpincode.in/pincode/301411";

  // Defining async function
  async function getapi(url) {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
  }
  getapi(api_url);
  const selectStyles = {
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };
  const onSourceLocationChangeController = (event, i) => {
    var items = chosenProducts.slice();
    items[i].SourceLocation = event.target.value;
    setChosenProducts(items);
  };
  const onDestinationLocationChangeController = (event, i) => {
    var items = chosenProducts.slice();
    items[i].DestinationLocation = event.target.value;
    setChosenProducts(items);
  };
  const onImmediatePricingChangeController = (event, i) => {
    var items = chosenProducts.slice();
    items[i].ImmediatePricing = event.target.value;
    setChosenProducts(items);
  };
  const onThirtyDaysPricingController = (event, i) => {
    var items = chosenProducts.slice();
    items[i].ThirtyDaysPricing = event.target.value;
    setChosenProducts(items);
  };
  const onPricingController = (event, i) => {
    var items = chosenProducts.slice();
    items[i].Pricing = event.target.value;
    setChosenProducts(items);
  };

  const onCapabilitiesChange = (event, i) => {
    var items = chosenProducts.slice();
    items[i].capability = event;
    setChosenProducts(items);
  };
  const onRangeinKmsChange = (event, i) => {
    var items = chosenProducts.slice();
    items[i].RangeinKms = event;
    setChosenProducts(items);
  };
  const onCapacityChange = (event, i) => {
    var items = chosenProducts.slice();
    items[i].capacity = event;
    setChosenProducts(items);
  };
  const calculatePrice = () => {
    setCalculating(true);
    var items = [];
    for (var i = 0; i < chosenProducts.length; i++) {
      items.push({
        length: chosenProducts[i].length,
        width: chosenProducts[i].width,
        height: chosenProducts[i].height,
        weightPerUnit: chosenProducts[i].weightPerUnit,
        noOfUnits: chosenProducts[i].noOfUnits,
        measurable: chosenProducts[i].measurable,
        density: chosenProducts[i].density,
        totalWeight: chosenProducts[i].totalWeight,
      });
    }
    var params = JSON.stringify(items);
    var exactParam = `?items=${params}&useCase=price`;
    setCalculating(false);
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
            value={chosenProducts[i].RangeinKms}
            onChange={(event) => onRangeinKmsChange(event, i)}
            options={constants.RangeOptions}
          />
        </Grid>
        {chosenProducts[i].AdditionalDetails == false ? (
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Pricing"
              type="text"
              className={chosenProducts[i].Pricing}
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
                        items[i].AdditionalDetails = e.target.checked;
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
      {chosenProducts[i].AdditionalDetails == true ? (
        <Grid
          container
          spacing={3}
          style={{ paddingLeft: 40, paddingRight: 40, paddingBottom: 30 }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="text"
              id="Source"
              name="Source"
              label="Source Location"
              fullWidth
              value={chosenProducts[i].SourceLocation}
              onChange={(event) => onSourceLocationChangeController(event, i)}
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
              value={chosenProducts[i].DestinationLocation}
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
              type="text"
              className={classes.textField}
              value={chosenProducts[i].ThirtyDaysPricing}
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
              type="text"
              className={classes.textField}
              value={chosenProducts[i].ImmediatePricing}
              onChange={(event) => onImmediatePricingChangeController(event, i)}
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end">₹</InputAdornment>,
              }}
              size="small"
            />
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
            style={{
              marginTop: 10,
              marginLeft: 20,
            }}
          >
            Submit
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TruckCost;
