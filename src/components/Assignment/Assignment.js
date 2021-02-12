import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import constants from "../../Constants/constants";
import DeleteIcon from "@material-ui/icons/Delete";
import "./Assignment.css";
import Spinner from "../UI/Spinner";
import Tooltip from "@material-ui/core/Tooltip";
import {
  TextField,
  Grid,
  Card,
  Button,
  IconButton,
  Divider,
} from "@material-ui/core";
// import Select from 'react-select'
import { Multiselect } from "multiselect-react-dropdown";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { API, Auth } from "aws-amplify";
import axios from "axios";
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

const Assignment = (props) => {
  const classes = useStyles();
  // const [truckNumber,setTruckNumber]=useState([]);
  const [trucks, setTrucks] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const {
    match: { params },
  } = props;
  const [capability, setCapability] = useState([]);
  const [loading, setLoading] = useState("true");
  const [capacityRequired, setCapacityRequired] = useState();
  const [capacityAlloted, setCapacityAlloted] = useState(0);
  const capabilityOptions = {
    options: constants.capabilityOptions,
  };
  const [myTrucks, setMyTrucks] = useState([]);
  const [myDrivers, setMyDrivers] = useState([]);

  useEffect(() => {
    // loadCapabilities()
    fetchCapacityRequired();
    loadData();
  }, []);
  useEffect(() => {
    var sum = 0;
    for (var i = 0; i < trucks.length; i++) {
      if (trucks[i].details !== null) sum += Number(trucks[i].details.capacity);
    }
    setCapacityAlloted(sum);
  }, [trucks]);

  function fetchCapacityRequired() {
    const url =
      "https://t2v0d33au7.execute-api.ap-south-1.amazonaws.com/Staging01/customerorder/" +
      params.customerOrderId;
    axios
      .get(url)
      .then((resp) => {
        var weightPerUnit = resp.data.Item.weightPerUnit;
        var noOfUnits = resp.data.Item.noOfUnits;
        console.log(weightPerUnit + "" + noOfUnits);
        setCapacityRequired((noOfUnits * weightPerUnit) / 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function loadData() {
    setLoading("true");
    //fetching truck details
    Auth.currentUserInfo()
      .then((currentUser) => {
        var owner = currentUser.username;
        API.get(
          "GoFlexeOrderPlacement",
          `/capacity?type=owner&ownerId=${owner}&asset=truck`
        )
          .then((resp) => {
            console.log(resp);
            var temp = myTrucks.slice();
            for (var i = 0; i < resp.length; i++) {
              temp.push({
                truckNumber: resp[i].assetNumber,
                capacity:
                  resp[i].capacity === undefined ? 0 : Number(resp[i].capacity),
                capabilities: resp[i].capabilities,
              });
            }
            setMyTrucks(temp);
            console.log(temp);
            //console.log(myTrucks)
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    //fetching driver details
    Auth.currentUserInfo()
      .then((userDetails) => {
        API.get(
          "GoFlexeOrderPlacement",
          `/kyc/info?type=serviceprovider&id=${userDetails.username}`
        )
          .then((resp) => {
            console.log(resp);
            if (resp.length === 0) {
            } else {
              var temp = myDrivers.slice();
              for (var i = 0; i < resp[0].drivers.length; i++) {
                temp.push({
                  name: resp[0].drivers[i].name,
                  phone: resp[0].drivers[i].phone,
                });
              }
              setMyDrivers(temp);
              console.log(temp);
            }
            setLoading("false");
          })
          .catch((err) => {
            console.log(err);
            setLoading("error");
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading("error");
      });
  }

  const submitButtonHandler = () => {
    alert(JSON.stringify(trucks) + JSON.stringify(drivers));
    // const truckNumbersArray=[];
    // for(var i=0;i<numberOfTrucks;i++){
    //     const truck={
    //         truckNumber: truckNumber[i],
    //     }
    //     truckNumbersArray.push(truck);
    // }
    // alert(JSON.stringify(truckNumbersArray));
  };
  const onTruckNumberChanged = (event, value, reason, i) => {
    var items = trucks.slice();
    items[i].details = value;
    if (value !== null)
      for (var j = 0; j < myTrucks.length; j++) {
        if (value.truckNumber === myTrucks[j].truckNumber) {
          items[i].capabilities = myTrucks[j].capabilities;
          break;
        }
      }
    else {
      items[i].capabilities = [];
    }
    setTrucks(items);
    for (i = 0; i < items.length; i++) {
      if (items[i].details !== null)
        console.log(i + items[i].details.truckNumber);
    }
  };
  const onDriverChanged = (event, value, reason, i) => {
    var items = drivers.slice();
    items[i].details = value;
    if (value !== null) {
      for (var j = 0; j < myDrivers.length; j++) {
        if (value.name === myDrivers[j].name) {
          items[i].phone = myDrivers[j].phone;
          break;
        }
      }
    } else {
      items[i].phone = "";
    }
    setDrivers(items);
  };
  const onMultiSelect = (selectedList, selectedItem, i) => {
    var items = trucks.slice();
    items[i].capabilities = selectedList;
    setTrucks(items);
  };
  const onMultiRemove = (selectedList, removedItem, i) => {
    var items = trucks.slice();
    items[i].capabilities = selectedList;
    setTrucks(items);
  };
  // const handleNumberChanged = ( event,idx) => {
  //     var items = trucks.slice()
  //     items[idx].number  = event.target.value;
  //     setTrucks(items);
  // }
  const handleItemDeleted = (i) => {
    var items = trucks.slice();
    items.splice(i, 1);
    setTrucks(items);
    var items1 = drivers.slice();
    items1.splice(i, 1);
    setTrucks(items);
    setDrivers(items1);
    // for( i =0;i<items.length;i++){
    //     if(items[i].details!==null)
    //     console.log(i+items[i].details.truckNumber+items1[i].details.name)
    // }
  };
  const addTruck = () => {
    var items1 = trucks.slice();
    var items2 = drivers.slice();
    items1.push({
      details: null,
      capabilities: [],
    });
    items2.push({
      details: null,
      phone: "",
    });
    setTrucks(items1);
    setDrivers(items2);
  };
  const onPhoneChangeController = (event, i) => {
    var items = drivers.slice();
    items[i].phone = event.target.value;
    setDrivers(items);
  };

  var list = trucks.map((e, i) => (
    <div
      style={
        i % 2 === 1
          ? { backgroundColor: "#f9f9fb" }
          : { backgroundColor: "#fff" }
      }
    >
      <Divider style={{ marginBottom: 30, marginTop: 30 }} />

      <Grid container spacing={3} style={{ marginLeft: 30 }}>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            id={`combo-box-demo${i}`}
            options={myTrucks}
            getOptionLabel={(option) =>
              option.truckNumber + `(${option.capacity}tons)`
            }
            value={trucks[i].details}
            onChange={(event, value, reason) =>
              onTruckNumberChanged(event, value, reason, i)
            }
            getOptionSelected={(option, value) =>
              option.truckNumber === value.truckNumber
            }
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Truck Number" variant="outlined" />
            )}
          />
        </Grid>
        <Tooltip title="Features available in Truck" arrow placement="top">
          <Grid item xs={12} sm={4}>
            <Multiselect
              style={{
                searchBox: { minHeight: "55px" },
                multiselectContainer: { height: "80px" },
              }}
              selectedValues={trucks[i].capabilities} // Preselected value to persist in dropdown
              options={capabilityOptions.options} // Options to display in the dropdown
              onSelect={(list, item) => onMultiSelect(list, item, i)} // Function will trigger on select event
              onRemove={(list, item) => onMultiRemove(list, item, i)} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              placeholder="Capabilities"
            />
          </Grid>
        </Tooltip>
        <Grid item xs={12} sm={2} style={{ marginLeft : 50 }}>
          <IconButton onClick={() => handleItemDeleted(i)}>
            <Tooltip title="Delete">
              <DeleteIcon style={{ fontSize: "30" }} />
            </Tooltip>
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            id={`driversList${i}`}
            options={myDrivers}
            getOptionLabel={(option) => option.name}
            value={drivers[i].details}
            onChange={(event, value, reason) =>
              onDriverChanged(event, value, reason, i)
            }
            getOptionSelected={(option, value) => option.name === value.name}
            style={{ width: 300 }}
            renderInput={(params) => (
              <Tooltip title="Same as on Driving License">
                <TextField {...params} label="Driver Name" variant="outlined" />
              </Tooltip>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Phone"
            value={drivers[i].phone}
            variant="outlined"
            onChange={(event) => onPhoneChangeController(event, i)}
          />
        </Grid>
      </Grid>
    </div>
  ));

  if (loading === true) {
    return (
      <React.Fragment>
        <h1>Loading your truck details</h1>
        <Spinner />
      </React.Fragment>
    );
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardContent style={{ padding: 0 }}>
          <Typography className={classes.title} gutterBottom>
            Truck Assigning Form
          </Typography>

          <div>
            <img
              src="data:image/png;base64,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"
              className="assignImage"
              alt="recipe thumbnail"
            />
          </div>
          <form>
            <Grid
              container
              spacing={3}
              style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  id="datetime-pickup"
                  label={constants.estimatedPickup}
                  type="datetime-local"
                  //   onChange={(event)=>onPickupDateChangeController(event)}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="datetime-delivery"
                  label={constants.estimatedDelivery}
                  //  onChange={(event)=>onDeliveryDateChangeController(event)}
                  type="datetime-local"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              style={{
                fontFamily: "sans-serif",
                fontSize: 16,
                backgroundColor: "#f6f4f4",
                padding: 50,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <Grid item xs={12} sm={4}>
                Total Capacity Required : {capacityRequired} tons
              </Grid>
              <Grid
                style={
                  capacityRequired > capacityAlloted
                    ? { color: "red" }
                    : capacityRequired === capacityAlloted
                    ? { color: "green" }
                    : { color: "#f9a825" }
                }
                item
                xs={12}
                sm={4}
              >
                Capacity Alloted: {capacityAlloted}tons
              </Grid>
              <Grid item xs={12} sm={4}>
                Capacity Left:{" "}
                {Math.max(capacityRequired - capacityAlloted, 0).toFixed(3)}tons
              </Grid>
            </Grid>
            <Button
              style={{
                backgroundColor: "#f9a825",
                marginTop: 20,
                marginLeft: 40,
              }}
              onClick={() => addTruck()}
            >
              Add Truck
            </Button>
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
            color="primary"
            onClick={submitButtonHandler}
          >
            Save
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default Assignment;
