import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import constants from "../../Constants/constants";
import DeleteIcon from "@material-ui/icons/Delete";
import "./Assignment.css";
import Spinner from "../UI/Spinner";
import Tooltip from "@material-ui/core/Tooltip";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  TextField,
  Grid,
  Card,
  Button,
  IconButton,
  InputLabel,
  FormControl,
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
  const [chosenTrucks, setChosenTrucks] = useState([]);
  const [chosenDrivers, setChosenDrivers] = useState([]);
  const {
    match: { params },
  } = props;
  const [capability, setCapability] = useState([null]);
  const [loading, setLoading] = useState("true");
  const [capacityRequired, setCapacityRequired] = useState();
  const [capacityAlloted, setCapacityAlloted] = useState(0);
  const capabilityOptions = {
    options: constants.capabilityOptions,
  };
  const [myTrucks, setMyTrucks] = useState([]);
  const [myDrivers, setMyDrivers] = useState([]);

  const selectStyles = {
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };

  useEffect(() => {
    // loadCapabilities()
    fetchCapacityRequired();
    loadData();
  }, []);
  useEffect(() => {
    var sum = 0;
    
    for (var i = 0; i < chosenTrucks.length; i++) {
      if (chosenTrucks[i] !== null) sum += Number(chosenTrucks[i].value.capacity);
    }
    setCapacityAlloted(sum);
  }, [chosenTrucks]);

  function fetchCapacityRequired() {
    const url =
      "https://t2v0d33au7.execute-api.ap-south-1.amazonaws.com/Staging01/customerorder/" +
      params.customerOrderId;
    axios
      .get(url)
      .then((resp) => {
        var weightPerUnit = resp.data.Item.weightPerUnit;
        var noOfUnits = resp.data.Item.noOfUnits;
        console.log(resp);
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
            var temp = []
            for (var i = 0; i < resp.length; i++) {
              temp.push({
                label:resp[i].assetNumber+'('+resp[i].capacity+' tons)',
                value:resp[i],
                isNew:false
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
                  label:resp[0].drivers[i].name,
                  value:resp[0].drivers[i].name,
                  phone: Number(resp[0].drivers[i].phone),
                  isNew:false,
                  licenseId:resp[0].drivers[i].licenseId
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
  // function loadData() {
  //   setLoading("true");
  //   //fetching truck details
  //   Auth.currentUserInfo()
  //     .then((currentUser) => {
  //       var owner = currentUser.username;
  //       API.get(
  //         "GoFlexeOrderPlacement",
  //         `/capacity?type=owner&ownerId=${owner}&asset=truck`
  //       )
  //         .then((resp) => {
  //           console.log(resp);
  //           var temp = myTrucks.slice();
  //           for (var i = 0; i < resp.length; i++) {
  //             temp.push({
  //               truckNumber: resp[i].assetNumber,
  //               capacity:
  //                 resp[i].capacity === undefined ? 0 : Number(resp[i].capacity),
  //               capabilities: resp[i].capabilities,
  //             });
  //           }
  //           setMyTrucks(temp);
  //           console.log(temp);
  //           //console.log(myTrucks)
  //         })
  //         .catch((err) => console.log(err));
  //     })
  //     .catch((err) => console.log(err));
  //   //fetching driver details
  //   Auth.currentUserInfo()
  //     .then((userDetails) => {
  //       API.get(
  //         "GoFlexeOrderPlacement",
  //         `/kyc/info?type=serviceprovider&id=${userDetails.username}`
  //       )
  //         .then((resp) => {
  //           console.log(resp);
  //           if (resp.length === 0) {
  //           } else {
  //             var temp = myDrivers.slice();
  //             for (var i = 0; i < resp[0].chosenDrivers.length; i++) {
  //               temp.push({
  //                 name: resp[0].chosenDrivers[i].name,
  //                 phone: resp[0].chosenDrivers[i].phone,
  //               });
  //             }
  //             setMyDrivers(temp);
  //             console.log(temp);
  //           }
  //           setLoading("false");
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           setLoading("error");
  //         });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading("error");
  //     });
  // }

  const submitButtonHandler = () => {
    //alert(JSON.stringify(chosenTrucks) + JSON.stringify(chosenDrivers));
    // const truckNumbersArray=[];
    // for(var i=0;i<numberOfTrucks;i++){
    //     const truck={
    //         truckNumber: truckNumber[i],
    //     }
    //     truckNumbersArray.push(truck);
    // }
    // alert(JSON.stringify(truckNumbersArray));
  };
  const onTruckNumberChanged = (newValue,i) => {
    var items = chosenTrucks.slice();
    if (newValue === null) {
      items[i] = null;
    } else {
      if (newValue.__isNew__ === true) {
        var temp = {
          value: {
            capacity:0,
            capabilities:[],
            assetNumber:'',
            location:'',
            ownershipType:'self',
          },
          isNew: true,
          label: newValue.label,
        };
        items[i] = temp;
      } else {
        var temp = {
          value: newValue.value,
          isNew: false,
          label: newValue.label,
        };
        items[i] = temp;
      }
    }
    setChosenTrucks(items);
  };
  const onDriverChanged = (newValue, i) => {
    var items = chosenDrivers.slice();
    if (newValue === null) {
      items[i] = null;
    } else {
      if (newValue.__isNew__ === true) {
        var temp = {
          value: newValue.label,
          isNew: true,
          label: newValue.label,
          phone:null,
          licenseId:'none'
        };
        items[i] = temp;
      } else {
        var temp = {
          value: newValue.label,
          isNew: false,
          label: newValue.label,
          phone:newValue.phone,
          licenseId:newValue.licenseId
        };
        items[i] = temp;
      }
    }
    setChosenDrivers(items);
    // var items = chosenDrivers.slice();
    // items[i].details = value;
    // if (value !== null) {
    //   for (var j = 0; j < myDrivers.length; j++) {
    //     if (value.name === myDrivers[j].name) {
    //       items[i].phone = myDrivers[j].phone;
    //       break;
    //     }
    //   }
    // } else {
    //   items[i].phone = "";
    // }
    // setChosenDrivers(items);
  };
  // const onMultiSelect = (selectedList, selectedItem, i) => {
  //   var items = chosenTrucks.slice();
  //   items[i].capabilities = selectedList;
  //   setChosenTrucks(items);
  // };
  // const onMultiRemove = (selectedList, removedItem, i) => {
  //   var items = chosenTrucks.slice();
  //   items[i].capabilities = selectedList;
  //   setChosenTrucks(items);
  // };
  // const handleNumberChanged = ( event,idx) => {
  //     var items = chosenTrucks.slice()
  //     items[idx].number  = event.target.value;
  //     setChosenTrucks(items);
  // }
  const handleItemDeleted = (i) => {
    var items = chosenTrucks.slice();
    items.splice(i, 1);
    setChosenTrucks(items);
    var items1 = chosenDrivers.slice();
    items1.splice(i, 1);
    //setChosenTrucks(items);
    setChosenDrivers(items1);
    // for( i =0;i<items.length;i++){
    //     if(items[i].details!==null)
    //     console.log(i+items[i].details.truckNumber+items1[i].details.name)
    // }
  };
  const addTruck = () => {
    var items1 = chosenTrucks.slice();
    var items2 = chosenDrivers.slice();
    items1.push(null);
    items2.push(null);
    setChosenTrucks(items1);
    setChosenDrivers(items2);
  };
  const onPhoneChangeController = (event, i) => {
    var items = chosenDrivers.slice();
    items[i].phone = event.target.value;
    setChosenDrivers(items);
  };
  const onCapabilityChange = (event,i) => {
    var items = chosenTrucks.slice()
    items[i].value.capabilities=event
    setChosenTrucks(items)
  }

  var list = chosenTrucks.map((e, i) => (
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
        <CreatableSelect
            isClearable
            value={chosenTrucks[i]}
            onChange={(newValue) => onTruckNumberChanged(newValue, i)}
            options={myTrucks}
            placeholder="Truck Number"
            styles={selectStyles}
          />
          {/* <Autocomplete
            id={`combo-box-demo${i}`}
            options={myTrucks}
            getOptionLabel={(option) =>
              option.truckNumber + `(${option.capacity}tons)`
            }
            value={chosenTrucks[i].details}
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
          /> */}
        </Grid>
        <Tooltip title="Features available in Truck" arrow placement="top">
          <Grid item xs={12} sm={4}>
          <Select
            isMulti
            styles={selectStyles}
            name="categories"
            value={chosenTrucks[i]===null?null:chosenTrucks[i].value.capabilities}
            options={constants.truckCapabilityOptions}
            placeholder="Category(Select Multiple)"
            isDisabled={chosenTrucks[i] === null || !chosenTrucks[i].isNew}
            className="basic-multi-select"
            onChange={(event) => onCapabilityChange(event, i)}
            classNamePrefix="select"
          />
            {/* <Multiselect
              style={{
                searchBox: { minHeight: "55px" },
                multiselectContainer: { height: "80px" },
              }}
              selectedValues={chosenTrucks[i].capabilities} // Preselected value to persist in dropdown
              options={capabilityOptions.options} // Options to display in the dropdown
              onSelect={(list, item) => onMultiSelect(list, item, i)} // Function will trigger on select event
              onRemove={(list, item) => onMultiRemove(list, item, i)} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              placeholder="Capabilities"
            /> */}
          </Grid>
        </Tooltip>
        <Grid item xs={12} sm={2} style={{ marginLeft : 50 }}>
          <IconButton onClick={() => handleItemDeleted(i)}>
            <Tooltip title="Delete">
              <DeleteIcon style={{ fontSize: "30" }} />
            </Tooltip>
          </IconButton>
        </Grid>
        </Grid>
        {chosenTrucks[i]!==null && chosenTrucks[i].isNew && 
        <Grid container spacing={3} style={{ marginLeft: 30 }}>
            <Grid item xs={12} sm={4}>
               <TextField
              required
              type="number"
              //error={capacityValidator !== ""}
              //helperText={capacityValidator === "" ? " " : capacityValidator}
              id="size"
              name="size"
              label="Capacity(in tons)"
              fullWidth
              //value={size}
              //onChange={(event) => onSizeChangeController(event)}
              variant='outlined'
                size='small'
              autoComplete="shipping address-line1"
            />
            </Grid>
            <Grid item xs={12} sm={4}>
            <Tooltip title="Home Loaction of the Asset">
              <TextField
                required
                type="text"
                id="location"
                name="location"
                label="Base Location"
                fullWidth
                //value={location}
                //onChange={(event) => onLocationChangeController(event)}
                variant='outlined'
                size='small'
                autoComplete="shipping address-line1"
              />
            </Tooltip>
          </Grid>
       
        <Grid item xs={12} sm={4}>
        <FormControl
          
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
        //value={ownership}
        //onChange={(event) => ownershipChangeController(event)}
        options={constants.ownerShip}
      />
          </Tooltip>
        </FormControl>
      </Grid>
        </Grid>
    }

<Grid container spacing={3} style={{ marginLeft: 30 }}>
        <Grid item xs={12} sm={4}>
        <CreatableSelect
            isClearable
            value={chosenDrivers[i]}
            onChange={(newValue) => onDriverChanged(newValue, i)}
            options={myDrivers}
            placeholder="Driver Name"
            styles={selectStyles}
          />

          {/* <Autocomplete
            id={`driversList${i}`}
            options={myDrivers}
            getOptionLabel={(option) => option.name}
            value={chosenDrivers[i].details}
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
          /> */}
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="number"
            id="outlined-basic"
            label="Phone"
            value={chosenDrivers[i]===null?'':chosenDrivers[i].phone}
            variant="outlined"
            disabled={chosenDrivers[i]===null}
            size='small'
            InputLabelProps={{ shrink: true }} 
            onChange={(event) => onPhoneChangeController(event, i)}
          />
        </Grid>
        {chosenDrivers[i]!==null && chosenDrivers[i].isNew && 
        <Grid item xs={12} sm={3}>
        <TextField
        required
        type="text"
        id="licenseId"
        name="licenseId"
        label="License Id"
        fullWidth
        //value={location}
        //onChange={(event) => onLocationChangeController(event)}
        variant='outlined'
        size='small'
        autoComplete="shipping address-line1"
      />
      </Grid>
        }
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
