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
  const [loading, setLoading] = useState("true");
  const [capacityRequired, setCapacityRequired] = useState();
  const [capacityAlloted, setCapacityAlloted] = useState(0);
  const [allotedDrivers, setAllotedDrivers] = useState();
  const [allotedTrucks, setAllotedTrucks] = useState(null);
  const [myTrucks, setMyTrucks] = useState([]);
  const [myDrivers, setMyDrivers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [estimatedPickupDate, setEstimatedPickupDate] = useState("");
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");
  const [desiredDeliveryDate, setDesiredDeliveryDate] = useState("");
  const [desiredPickupDate, setDesiredPickupDate] = useState("");
  const [CustomerDetails, setCustomerDetails] = useState("");
  const [TrackingId, setTrackingId] = useState("");
  const [TaskId, setTaskId] = useState("");
  const [StageId, setStageId] = useState("");
  const [Allocated, setAllocated] = useState(false);
  const [AllocatedLoading, setAllocatedLoading] = useState(false);
  const [stageCount, setStageCount] = useState(0);

  var count = 0;
  const selectStyles = {
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };

  useEffect( () => {
    const setUser = async () => {
      var currentUser = await Auth.currentUserInfo();
      var owner = currentUser.username;
      setCurrentUser(owner);
    };
   
    setUser();
   fetchCapacityRequired();
   getTrackingId();

  }, []);

  const getAllocationDetails = (resp) => {
    resp.stages.forEach((stage) => {
      stage.tasks.forEach((task) => {
        if (task.name == "ASSET_ALLOCATION" && task.status == "COMPLETED") {
          setStageCount(1);
          return;
        }
      });
    });
  };

  useEffect(() => {
    var sum = 0;

    for (var i = 0; i < chosenTrucks.length; i++) {
      if (chosenTrucks[i] !== null)
        sum += Number(chosenTrucks[i].value.capacity);
    }
    setCapacityAlloted(sum);
  }, [chosenTrucks]);

  function fetchCapacityRequired() {
    setLoading("true");
    const url =
      "https://t2v0d33au7.execute-api.ap-south-1.amazonaws.com/Staging01/customerorder/" +
      params.customerOrderId;
    axios
      .get(url)
      .then((resp) => {
        var sum = 0;
        console.log(resp);
        setDesiredDeliveryDate(resp.data.Item.deliveryDate);
        setDesiredPickupDate(resp.data.Item.pickupdate);
        loadData(resp.data.Item.pickupdate);
        resp.data.Item.items.map((item) => {
          if (item.measurable === true) {
            sum += item.noOfUnits * item.weightPerUnit;
          } else {
            sum += item.totalWeight;
          }
        });

        console.log(resp);

        setCapacityRequired(sum / 1000);
        API.get(
          "GoFlexeOrderPlacement",
          "/kyc/info?type=customer&id=ff7675f7-ac42-43f7-91e3-599624f1661a"
        )
          .then((resp) => {
            console.log(resp);
            if (resp.length === 0) {
              setCustomerDetails(null);
            } else {
              if (resp[0].companyInfo !== undefined) {
                setCustomerDetails(resp[0].companyInfo);
              }
            }
            setLoading("false");
          })
          .catch((err) => {
            console.log(err);
            setLoading("false");
          })
          .catch((err) => {
            console.log(err);
            setLoading("false");
          });
      })

      .catch((err) => {
        console.log(err);
      });
  }

  function loadData(desiredDate) {
    setLoading("true");
    Auth.currentUserInfo()
      .then((currentUser) => {
        var owner = currentUser.username;
        API.get(
          "GoFlexeOrderPlacement",
          `/capacity?type=owner&ownerId=${owner}&asset=truck`
        )
        .then((resp) => {
            console.log(resp);
            var temp = [];
            var pickupParts = desiredDate.substring(0, 10).split("-");
            var ComparePickup = new Date(
              pickupParts[0],
              pickupParts[1] - 1,
              pickupParts[2]
            );
            alert(ComparePickup)

            for (var i = 0; i < resp.length; i++) {
              var isValid = false;
              var toparts = resp[i].availableToDateTime
                .substring(0, 10)
                .split("-");

              var availableTo = new Date(
                toparts[0],
                toparts[1] - 1,
                toparts[2]
              );

              var fromparts = resp[i].availableFromDateTime
                .substring(0, 10)
                .split("-");

              var availablefrom = new Date(
                fromparts[0],
                fromparts[1] - 1,
                fromparts[2]
              );

              if (
                ComparePickup <= availableTo &&
                ComparePickup >= availablefrom
              ) {
                isValid = true;
              }

              if (isValid === true) {
                temp.push({
                  label:
                    resp[i].assetNumber + "(" + resp[i].capacity + " tons)",
                  value: resp[i],
                  isNew: false,
                });
              }
              // temp.push({
              //   label: resp[i].assetNumber + "(" + resp[i].capacity + " tons)",
              //   value: resp[i],
              //   isNew: false,
              // });
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
                  label: resp[0].drivers[i].name,
                  value: resp[0].drivers[i].name,
                  phone: Number(resp[0].drivers[i].phone),
                  isNew: false,
                  licenceId: resp[0].drivers[i].licenceId,
                  licenceUrl: resp[0].drivers[i].licenceUrl,
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
  // function getCustomerDetails(userDetails) {
  //   setLoading("true");
  //   API.get(
  //     "GoFlexeOrderPlacement",
  //     `/kyc/info?type=customer&id=${CustomerEmail}`
  //   )
  //     .then((resp) => {
  //       console.log(resp);
  //       if (resp.length === 0) {
  //         setCustomerDetails(null);
  //       } else {
  //         if (resp[0].companyInfo !== undefined) {
  //           setCustomerDetails(resp[0].companyInfo);
  //         }
  //       }
  //       setLoading("false");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading("false");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading("false");
  //     });
  // }
  function getTrackingId() {
    setLoading("true");
    API.get(
      "GoFlexeOrderPlacement",
      `/tracking?type=getProcess&orderId=${params.id}`
    )
      .then((resp) => {
        console.log(resp);
        getAllocationDetails(resp);
        setTrackingId(resp.processId);
        setTaskId(resp.stages[0].tasks[0].taskId);
        setStageId(resp.stages[0].stageId);
      })
      .catch((err) => {
        console.log(err);
        setLoading("false");
      });
  }
  const trackingAssetAllocation = async () => {
    setAllocatedLoading(true);
    const data = {
      trackingId: TrackingId,
      stageId: StageId,
      taskId: TaskId,
      custom: {
        data: {
          allotedDrivers: chosenDrivers,
          allotedTrucks: chosenTrucks,
          pickupDate:estimatedPickupDate,
          deliveryDate:estimatedDeliveryDate
        },
        attachments: {},
      },
    };
    const payload = {
      body: data,
    };

    API.patch(
      "GoFlexeOrderPlacement",
      `/tracking?type=updateCustomFields`,
      payload
    )
      .then((response) => {
        console.log(response);
        setAllocatedLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setAllocatedLoading(false);
      });
  };
  const changeTaskStatus = async () => {
    setAllocatedLoading(true);
    const data = {
      trackingId: TrackingId,
      stageId: StageId,
      taskId: TaskId,
      status: "NEXT",
    };
    const payload = {
      body: data,
    };

    API.patch(
      "GoFlexeOrderPlacement",
      `/tracking?type=changeTaskStatus`,
      payload
    )
      .then((response) => {
        console.log(response);
        setAllocated(true);
        setAllocatedLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        alert("An error occoured, Please try again");
        setAllocatedLoading(false);
      });
  };

  const onPickupDateChangeController = (event) => {
    var pickupDate = event.target.value;
    setEstimatedPickupDate(pickupDate);
  };

  const onDeliveryDateChangeController = (event) => {
    var deliveryDate = event.target.value;
    setEstimatedDeliveryDate(deliveryDate);
  };

  const submitNewTrucks = async () => {
    var today = new Date();
    var thisYearDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var nextYearDate =
      today.getFullYear() +
      1 +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let promiseList = [];
    for (var i = 0; i < chosenTrucks.length; i++) {
      if (chosenTrucks[i] === null) {
        alert(`Please Choose a truck number for  truck ${i + 1}`);
        return new Promise((resolve) => {
          return resolve(`Please Choose a truck number for  truck ${i + 1}`);
        });
      }
      if (chosenTrucks[i].isNew === true) {
        const data = {
          owner: currentUser,
          type: "truck",
          assetNumber: chosenTrucks[i].label,
          capacity: chosenTrucks[i].value.capacity,
          unit: "tons",
          capabilities: chosenTrucks[i].value.capabilities,
          availableFromDateTime: thisYearDate,
          availableToDateTime: nextYearDate,
          ownershipType:
            chosenTrucks[i].value.ownershipType === null
              ? "self"
              : chosenTrucks[i].value.ownershipType.value,
          location: chosenTrucks[i].value.location,
          active: true,
          pincode: "-",
        };
        const payload = {
          body: data,
        };

        promiseList.push(
          API.post("GoFlexeOrderPlacement", `/capacity`, payload)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error.response);
            })
        );
      }
    }
    return await Promise.all(promiseList);
  };
  const submitNewDrivers = async () => {
    let promiseList = [];
    var items = [];
    for (var i = 0; i < chosenDrivers.length; i++) {
      if (chosenDrivers[i] === null) {
        alert(`Please Choose  Driver  ${i + 1}`);
        return `Please Choose  Driver  ${i + 1}`;
      }
      items.push({
        name: chosenDrivers[i].label,
        phone: chosenDrivers[i].phone,
        licenceUrl: chosenDrivers[i].licenceUrl,
        licenceId: chosenDrivers[i].licenceId,
      });
      if (chosenDrivers[i].isNew === true) {
        const payload = {
          body: {
            id: currentUser,
            type: "serviceprovider",
            drivers: [
              {
                name: chosenDrivers[i].label,
                phone: chosenDrivers[i].phone,
                licenceUrl: "none",
                licenceId: chosenDrivers[i].licenceId,
              },
            ],
          },
        };
        promiseList.push(
          API.post("GoFlexeOrderPlacement", "/kyc/info", payload)
            .then((resp) => console.log(resp))
            .catch((err) => console.log(err))
        );
      }
    }
    setAllotedDrivers(items);
    return await Promise.all(promiseList);
  };
  useEffect(() => {
    if (count === 0 && allotedTrucks !== null) {
      count += 1;
      console.log(allotedTrucks);
      console.log(allotedDrivers);

      const payload = {
        body: {
          username: currentUser,
          serviceOrderId: params.id,
          drivers: allotedDrivers,
          trucks: allotedTrucks,
          estimatedPickupDate: estimatedPickupDate,
          estimatedDeliveryDate: estimatedDeliveryDate,
        },
      };
      API.post("GoFlexeOrderPlacement", `/serviceorder`, payload)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }, [allotedTrucks]);

  const includeAllTrucks = async () => {
    var temp = [];
    try {
      const resp = await API.get(
        "GoFlexeOrderPlacement",
        `/capacity?type=owner&ownerId=${currentUser}&asset=truck`
      );

      console.log(resp);

      for (var j = 0; j < chosenTrucks.length; j++) {
        //alert(chosenTrucks[j].value.assetNumber)
        for (var k = 0; k < resp.length; k++) {
          if (chosenTrucks[j].value.assetNumber === resp[k].assetNumber) {
            temp.push({
              assetId: resp[k].assetId,
              assetNumber: resp[k].assetNumber,
              capacityUsed: resp[k].capacity,
              ownerId: currentUser,
            });
          }
        }
        console.log(temp);
        setAllotedTrucks(temp);
      }
    } catch (err) {
      alert("An error occured,Try again later");
    }
  };

  // const includeAllDrivers = async () => {
  //     API.get(
  //       "GoFlexeOrderPlacement",
  //       `/kyc/info?type=serviceprovider&id=${currentUser}`
  //     )
  //       .then((resp) => {
  //         console.log(resp);
  //         if (resp.length === 0) {
  //         } else {
  //           var temp = []
  //           for(var j=0;j<chosenDrivers.length;j++){
  //           //alert(chosenTrucks[j].value.assetNumber)
  //           for(var k=0;k<resp[0].drivers.length;k++){
  //             //alert(chosenDrivers[j].licenceId+resp[0].drivers[k].licenceId)
  //             if(chosenDrivers[j].licenceId===resp[0].drivers[k].licenceId){
  //             temp.push(resp[0].drivers[k])
  //           }
  //         }
  //       }
  //      // setMyTrucks(temp);
  //       console.log(temp);
  //       }

  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //       return Promise.resolve('done')
  // }

  const submitButtonHandler = async () => {
    setLoading("uploading");
    await submitNewTrucks();
    await submitNewDrivers();
    await includeAllTrucks();
    

    await trackingAssetAllocation();
    await changeTaskStatus();
    getTrackingId();

    //  submitNewDrivers();
    //console.log(allotedDrivers)
    // try{
    //   await submitNewTrucks()
    //   await includeAllTrucks()
    //   console.log(allotedTrucks)
    // }
    // catch(err){
    //   console.log(err)
    //   alert('An error occured. Try again later')
    // }
    setLoading("false");
  };
  const onTruckNumberChanged = (newValue, i) => {
    var items = chosenTrucks.slice();
    if (newValue === null) {
      items[i] = null;
    } else {
      if (newValue.__isNew__ === true) {
        var temp = {
          value: {
            capacity: 0,
            capabilities: [],
            features : [],
            assetNumber: newValue.label,
            location: "",
            ownershipType: null,
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
          phone: null,
          licenceId: "",
          licenceUrl: "none",
        };
        items[i] = temp;
      } else {
        var temp = {
          value: newValue.label,
          isNew: false,
          label: newValue.label,
          phone: newValue.phone,
          licenceId: newValue.licenceId,
          licenceUrl: newValue.licenceUrl,
        };
        //alert(newValue.licenceId)
        items[i] = temp;
      }
    }
    setChosenDrivers(items);
  };
  const handleItemDeleted = (i) => {
    var items = chosenTrucks.slice();
    items.splice(i, 1);
    setChosenTrucks(items);
    var items1 = chosenDrivers.slice();
    items1.splice(i, 1);
    setChosenDrivers(items1);
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
  const onCapabilityChange = (event, i) => {
    var items = chosenTrucks.slice();
    items[i].value.capabilities = event;
    setChosenTrucks(items);
  };
  const onCapacityChangeController = (event, i) => {
    var items = chosenTrucks.slice();
    items[i].value.capacity = event;
    setChosenTrucks(items);
  };
  const onFeaturesChange = (event, i) => {
    var items = chosenTrucks.slice();
    items[i].value.features = event;
    setChosenTrucks(items);
  }
  const onLicenseIdChangeController = (event, i) => {
    var items = chosenDrivers.slice();
    items[i].licenceId = event.target.value;
    setChosenDrivers(items);
  };

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
          <Tooltip
            title="Only available trucks on Pickup date are shown"
            placement="top"
          >
            <CreatableSelect
              isClearable
              value={chosenTrucks[i]}
              onChange={(newValue) => onTruckNumberChanged(newValue, i)}
              options={myTrucks}
              placeholder="Truck Number"
              styles={selectStyles}
            />
          </Tooltip>
        </Grid>

        <Grid item xs={12} sm={4}>
          {chosenTrucks[i] !== null && chosenTrucks[i].isNew ? (
            <Select
              styles={selectStyles}
              className="basic-single"
              classNamePrefix="Capability"
              isSearchable
              name="Capability"
              placeholder="Capability"
              value={chosenTrucks[i].value.capabilities}
              onChange={(event) => onCapabilityChange(event, i)}
              options={constants.truckCapabilityOptions}
            />
          ) : (
            <TextField
              disabled={chosenTrucks[i] === null || !chosenTrucks[i].isNew}
              label="Capability"
              fullWidth
              value={
                chosenTrucks[i] === null
                  ? null
                  : chosenTrucks[i].value.capabilities
              }
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              size="small"
              autoComplete="shipping address-line1"
            />
          )}
        </Grid>

        <Grid item xs={12} sm={2} style={{ marginLeft: 50 }}>
          <IconButton onClick={() => handleItemDeleted(i)}>
            <Tooltip title="Delete">
              <DeleteIcon style={{ fontSize: "30" }} />
            </Tooltip>
          </IconButton>
        </Grid>
      </Grid>
      {chosenTrucks[i] !== null && chosenTrucks[i].isNew && (
        <Grid container spacing={3} style={{ marginLeft: 30 }}>
          <Grid item xs={12} sm={4}>
            <Select
              styles={selectStyles}
              className="basic-single"
              classNamePrefix="Capacity"
              isSearchable
              name="Capacity"
              placeholder="Capacity"
              value={chosenTrucks[i].value.capacity}
              onChange={(event) => onCapacityChangeController(event, i)}
              options={constants.truckCapacityOptions}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select
              isMulti
              styles={selectStyles}
              name="Features"
              value={chosenTrucks[i].value.features}
              options={constants.truckFeatures}
              placeholder="Features(Select multiple)"
              className="basic-multi-select"
              onChange={(event) => onFeaturesChange(event, i)}
              classNamePrefix="select"
            />
          </Grid>

          <Grid item xs={12} sm={4}></Grid>
        </Grid>
      )}

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
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="number"
            id="outlined-basic"
            label="Phone"
            value={chosenDrivers[i] === null ? "" : chosenDrivers[i].phone}
            variant="outlined"
            disabled={chosenDrivers[i] === null}
            size="small"
            InputLabelProps={{ shrink: true }}
            onChange={(event) => onPhoneChangeController(event, i)}
          />
        </Grid>
        {chosenDrivers[i] !== null && chosenDrivers[i].isNew && (
          <Grid item xs={12} sm={3}>
            <TextField
              required
              type="text"
              id="licenceId"
              name="licenceId"
              label="License Id"
              fullWidth
              value={chosenDrivers[i].licenceId}
              onChange={(event) => onLicenseIdChangeController(event, i)}
              variant="outlined"
              size="small"
              autoComplete="shipping address-line1"
            />
          </Grid>
        )}
      </Grid>
    </div>
  ));

  if (loading === "true") {
    return (
      <React.Fragment>
        <h1>Loading your truck details</h1>
        <Spinner />
      </React.Fragment>
    );
  }
  if (loading === "uploading") {
    return <Spinner />;
  }
  if (stageCount == 1) {
    return (
      <center>
        <h3>Truck Alloted Successfully</h3>
      </center>
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
                  onChange={(event) => onPickupDateChangeController(event)}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <p>Desired Pickup: {desiredPickupDate}</p>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="datetime-delivery"
                  label={constants.estimatedDelivery}
                  onChange={(event) => onDeliveryDateChangeController(event)}
                  type="datetime-local"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <p>Desired Delivery: {desiredDeliveryDate}</p>
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
                Capacity Left: {(capacityRequired - capacityAlloted).toFixed(3)}
                tons
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
            marginTop: 50,
            margin: 30,
            marginBottom: 100,
          }}
        >
          {AllocatedLoading == true ? (
            <Spinner />
          ) : Allocated == true ? (
            <p>Truck Allocated successfully</p>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={submitButtonHandler}
            >
              Save
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
export default Assignment;
