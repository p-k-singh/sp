import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Multiselect } from "multiselect-react-dropdown";
import constants from "../../Constants/constants";
import { Auth, API } from "aws-amplify";
import axios from "axios";
import Spinner from "../UI/Spinner";
import ShowTrucks from "./ShowTrucks";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import { TextField, Grid, Button } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 20,
    height: 50,
    padding: 10,
    paddingLeft: 55,
    color: "black",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "5px",
  },
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
});

const TruckKYC = (props) => {
  const classes = useStyles();
  const [chassisNumber, setChassisNumber] = useState();
  const [engineNumber, setEngineNumber] = useState();
  const [permitId, setPermitId] = useState();
  const [truckNumber, setTruckNumber] = useState();
  const [capacity, setCapacity] = useState();
  const [rcDoc, setRcDoc] = useState([]);
  const [permitDoc, setPermitDoc] = useState();
  const [statesOfPermit, setStatesOfPermit] = useState([]);
  const [isAllIndiaPermit, setIsAllIndiaPermit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const capabilityOptions = {
    options: constants.permitStates,
  };
  const handleShowForm = () => {
    setShowForm(!showForm);
  };
  const onChassisNumberChange = (event) => {
    setChassisNumber(event.target.value);
  };
  const onEngineNumberChange = (event) => {
    setEngineNumber(event.target.value);
  };
  const onPermitIdChange = (event) => {
    setPermitId(event.target.value);
  };
  const onRcDocChange = (event) => {
    setRcDoc(event.target.files[0]);
    // var tempFile = event.target.files[0]
    // alert(tempFile.name.split('.').pop())
  };
  const onTruckNumberChange = (event) => {
    setTruckNumber(event.target.value);
  };
  const onTruckCapacityChange = (event) => {
    if (event.target.value < 0) {
      event.target.value = 0;
    }
    setCapacity(event.target.value);
  };

  const onPermitDocChange = (event) => {
    setPermitDoc(event.target.files[0]);
  };
  const onMultiSelect = (selectedList, selectedItem) => {
    if (selectedItem.id === "AI") {
      setIsAllIndiaPermit(true);
    }
    if (isAllIndiaPermit !== true) {
      setStatesOfPermit(selectedList);
    }
  };
  const onMultiRemove = (selectedList, removedItem) => {
    // alert(selectedList)
    if (removedItem.id === "AI") {
      setIsAllIndiaPermit(false);
    }
    if (isAllIndiaPermit !== true) {
      setStatesOfPermit(selectedList);
    }
  };

  const submitKYCChained = () => {
    if (truckNumber == "" || truckNumber == null) {
      alert("Truck Number cannot be blank");
      return;
    }
    if (capacity == 0 || capacity == null) {
      alert("Truck Capacity cannot be empty");
      return;
    }
    if (permitId == "" || permitId == null) {
      alert("Please enter the Permit Id");
      return;
    }
    if (chassisNumber == "" || chassisNumber == null) {
      alert("Chasis Number cannot be blank");
      return;
    }
    if (rcDoc == "" || rcDoc == null) {
      alert("Please Upload RC proof");
      return;
    }
    if (permitDoc == "" || permitDoc == null) {
      alert("Please Upload Permit proof");
      return;
    }

    setLoading(true);
    var tempRCLink;
    var tempPermitLink;
    const metaData = {
      contentType: rcDoc.type,
    };
    const payload = {
      body: {
        contentType: rcDoc.type,
        metaData: metaData,
      },
    };
    var ext = rcDoc.name.split(".").pop();
    API.post(
      "GoFlexeOrderPlacement",
      "/kyc/document?type=" + "serviceprovider",
      payload
    )
      .then((initiateResult) => {
        tempRCLink = `uploads/kycdocuments/serviceprovider/${initiateResult.fileId}.${ext}`;
        axios
          .put(initiateResult.s3PutObjectUrl, rcDoc, {
            headers: {
              "Content-Type": rcDoc.type,
            },
          })
          .then((resp) => {
            console.log(resp);
            const metaData = {
              contentType: permitDoc.type,
            };
            const payload = {
              body: {
                contentType: permitDoc.type,
                metaData: metaData,
              },
            };
            var ext = permitDoc.name.split(".").pop();
            API.post(
              "GoFlexeOrderPlacement",
              "/kyc/document?type=" + "serviceprovider",
              payload
            )
              .then((initiateResult) => {
                tempPermitLink = `uploads/kycdocuments/serviceprovider/${initiateResult.fileId}.${ext}`;
                axios
                  .put(initiateResult.s3PutObjectUrl, permitDoc, {
                    headers: {
                      "Content-Type": permitDoc.type,
                    },
                  })
                  .then((resp) => {
                    console.log(resp);
                    Auth.currentUserInfo()
                      .then((userDetails) => {
                        var states;
                        if (isAllIndiaPermit === true) {
                          states = [{ name: "All India Permit", id: "AI" }];
                        } else {
                          states = statesOfPermit;
                        }
                        const payload = {
                          body: {
                            id: userDetails.username,
                            type: "serviceprovider",
                            trucks: [
                              {
                                truckNumber: truckNumber,
                                chassisNumber: chassisNumber,
                                engineNumber: engineNumber,
                                capacity: capacity,
                                permitId: permitId,
                                rcLink: tempRCLink,
                                permitLink: tempPermitLink,
                                statesOfPermit: states,
                              },
                            ],
                          },
                        };
                        API.post(
                          "GoFlexeOrderPlacement",
                          "/kyc/info?type=" + "serviceprovider",
                          payload
                        )
                          .then((resp) => console.log(resp))
                          .catch((err) => console.log(err));
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => {
                    console.log(err);
                    //setUploadsDone(false)
                  });
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            console.log(err);
            //setUploadsDone(false)
          });
      })
      .catch((err) => console.log(err));
    setLoading(false);
    setShowForm(!showForm);
  };

  const eachKYC = (
    <div style={{ overflow: "hidden", marginTop: "20px" }}>
      {/* <Typography fullWidth className={classes.title} gutterBottom style={{backgroundColor:'#f0f0f0' }}>
                             KYC
                        </Typography> */}
      <form>
        <Typography className={classes.formHeadings}>Truck Details</Typography>

        {/*test*/}
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="text"
              id="truckNumber"
              name="truckNumber"
              inputProps={{ maxLength: 20 }}
              label="Enter Truck Number"
              fullWidth
              value={truckNumber}
              onChange={(event) => onTruckNumberChange(event)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip title="Carrying Capacity in Tons">
              <TextField
                required
                type="number"
                id="capacity"
                name="capacity"
                inputProps={{ maxLength: 5 }}
                label="Enter Capacity"
                fullWidth
                value={capacity}
                onChange={(event) => onTruckCapacityChange(event)}
              />
            </Tooltip>
          </Grid>
        </Grid>
        <Typography className={classes.formHeadings}>RC Details</Typography>
        {/*test*/}
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
        >
          <Grid item xs={12} sm={6}>
            <Tooltip title="Can be found on the dashboard, driver's side door and on the registration certificate.">
              <TextField
                required
                type="text"
                id="chassisNumber"
                name="chassisNumber"
                inputProps={{ maxLength: 17 }}
                label="Enter Chassis Number"
                fullWidth
                value={chassisNumber}
                onChange={(event) => onChassisNumberChange(event)}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip title="Can be found on the body of the truck's engine. ">
              <TextField
                type="text"
                id="engineNumber"
                name="engineNumber"
                
                label="Enter Engine Number"
                fullWidth
                value={engineNumber}
                onChange={(event) => onEngineNumberChange(event)}
              />
            </Tooltip>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
                    <input type="file" onChange={(event) => onRcChange(event,idx)} /> 
                    </Grid> */}
        </Grid>

        <Typography className={classes.formHeadings}>
          Permit Details
          <Tooltip title="Specify state permits of tuck">
            <InfoIcon
              style={{ color: "lightgrey", marginLeft: 10 }}
              fontSize="small"
            />
          </Tooltip>
        </Typography>
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
        >
          <Grid item xs={12} sm={6} style={{ marginTop: "10px" }}>
            <Multiselect
              style={{
                borderLeft: "0px",
                overflow: "hidden",
                multiselectContainer: { height: "75px" },
              }}
              options={capabilityOptions.options} // Options to display in the dropdown
              onSelect={onMultiSelect} // Function will trigger on select event
              onRemove={onMultiRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              placeholder="Permit Status"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip title="Document number / Recipt number">
              <TextField
                type="text"
                id="permitId"
                name="permitId"
                label="Enter Permit Id"
                fullWidth
                value={permitId}
                onChange={(event) => onPermitIdChange(event)}
              />
            </Tooltip>
          </Grid>
        </Grid>
        <Typography className={classes.formHeadings}>
          Documents Upload
        </Typography>
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
        >
          <Grid item xs={12}>
            <label>RC Proof: </label>
            <input
              style={{ marginLeft: "15px" }}
              type="file"
              onChange={(event) => onRcDocChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <label>Permit Proof: </label>
            <input
              style={{ marginLeft: "15px" }}
              type="file"
              onChange={(event) => onPermitDocChange(event)}
            />
          </Grid>
        </Grid>

        <Button
          onClick={() => submitKYCChained()}
          className="row"
          variant="contained"
          style={{
            float: "right",
            backgroundColor: "#f9a825",
            marginBottom: "10px",
          }}
        >
          Submit KYC
        </Button>
      </form>
    </div>
  );

  if (loading === true) {
    return <Spinner />;
  }
  return (
    <React.Fragment>
      {!showForm && (
        <Button
          onClick={handleShowForm}
          className="row"
          variant="contained"
          style={{ backgroundColor: "#f9a825", marginBottom: "10px" }}
        >
          Add{" "}
        </Button>
      )}
      {showForm && (
        <Button
          onClick={handleShowForm}
          className="row"
          variant="contained"
          style={{ marginBottom: "10px" }}
        >
          Back
        </Button>
      )}

      {showForm && eachKYC}
      {!showForm && <ShowTrucks />}
    </React.Fragment>
  );
};
export default TruckKYC;
