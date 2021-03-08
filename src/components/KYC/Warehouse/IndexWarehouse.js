import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Multiselect } from "multiselect-react-dropdown";
import constants from "../../../Constants/constants";
import { Auth, API } from "aws-amplify";
import axios from "axios";
import Spinner from "../../UI/Spinner";
import ShowTrucks from "./ShowWarehouse";
import { TextField, Grid, Button } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
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
  const [pan, setPan] = useState();
  const [gstin, setGstin] = useState();

  const [propertyName, setPropertyName] = useState();
  const [capacity, setCapacity] = useState();
  const [panDoc, setPanDoc] = useState();
  const [gstinDoc, setGstinDoc] = useState();
  const [registrationDoc, setRegistrationDoc] = useState();
  const [statesOfPermit, setStatesOfPermit] = useState([]);
  const [isAllIndiaPermit, setIsAllIndiaPermit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [PropertyNameValidator, setPropertyNameValidator] = useState("");
  const [CapacityValidator, setCapacityValidator] = useState("");
  const [PanNoValidator, setPanNoValidator] = useState("");
  const [GSTINValidator, setGSTINValidator] = useState("");

  const capabilityOptions = {
    options: constants.permitStates,
  };
  const handleShowForm = () => {
    setShowForm(!showForm);
  };
  const onPanChange = (event) => {
    setPanNoValidator("");
    if (event.target.value.length < 10) {
      setPanNoValidator("PAN Number should be of 10 Digits");
    }
    setPan(event.target.value);
  };
  const onGstinChange = (event) => {
    setGSTINValidator("");
    if (event.target.value.length < 15) {
      setGSTINValidator("Gst Number should be of 15 Digits");
    }
    setGstin(event.target.value);
  };

  const onPanDocChange = (event) => {
    setPanDoc(event.target.files[0]);
  };
  const onPropertyNameChange = (event) => {
    setPropertyNameValidator("");
    setPropertyName(event.target.value);
  };
  const onWarehouseCapacityChange = (event) => {
    setCapacityValidator("");
    if (event.target.value < 0) {
      event.target.value = 0;
    }
    setCapacity(event.target.value);
  };

  const onGstDocChange = (event) => {
    setGstinDoc(event.target.files[0]);
  };
  const onRegistrationDocChange = (event) => {
    setRegistrationDoc(event.target.files[0]);
  };

  const submitKYCChained = () => {
    if (
      PropertyNameValidator !== "" ||
      CapacityValidator !== "" ||
      PanNoValidator !== "" ||
      GSTINValidator !== ""
    ) {
    }

    if (propertyName == null || propertyName == "") {
      setPropertyNameValidator("Property Name cannot be empty.");
      return;
    }
    if (capacity == null || capacity == 0) {
      setCapacityValidator("Capacity cannot be empty.");
      return;
    }
    if (pan == null || pan == "") {
      setPanNoValidator("PAN Number cannot be empty.");
      return;
    }
    if (gstin == null || gstin == "") {
      setGSTINValidator("GSTIN cannot be empty.");
      return;
    }
    if (panDoc == null || panDoc == "") {
      alert("Please upload PAN Proof.");
      return;
    }
    if (gstinDoc == null || gstinDoc == "") {
      alert("Please upload GSTIN Proof.");
      return;
    }
    if (registrationDoc == null || registrationDoc == "") {
      alert("Please upload Registration Document.");
      return;
    }

    setLoading(true);
    var tempRCLink;
    var tempPermitLink;
    const metaData = {
      contentType: panDoc.type,
    };
    const payload = {
      body: {
        contentType: panDoc.type,
        metaData: metaData,
      },
    };
    API.post(
      "GoFlexeOrderPlacement",
      "/kyc/document?type=" + "serviceprovider",
      payload
    )
      .then((initiateResult) => {
        tempRCLink = `uploads/kycdocuments/serviceprovider/${initiateResult.fileId}.${panDoc.type}`;
        axios
          .put(initiateResult.s3PutObjectUrl, panDoc, {
            headers: {
              "Content-Type": panDoc.type,
            },
          })
          .then((resp) => {
            console.log(resp);
            const metaData = {
              contentType: gstinDoc.type,
            };
            const payload = {
              body: {
                contentType: gstinDoc.type,
                metaData: metaData,
              },
            };
            API.post(
              "GoFlexeOrderPlacement",
              "/kyc/document?type=" + "serviceprovider",
              payload
            )
              .then((initiateResult) => {
                tempPermitLink = `uploads/kycdocuments/serviceprovider/${initiateResult.fileId}.${gstinDoc.type}`;
                axios
                  .put(initiateResult.s3PutObjectUrl, gstinDoc, {
                    headers: {
                      "Content-Type": gstinDoc.type,
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
                                propertyName: propertyName,
                                pan: pan,

                                capacity: capacity,

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
      <form>
        <Typography className={classes.formHeadings}>
          Property Details
        </Typography>

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
              id="propertyName"
              name="propertyName"
              helperText={PropertyNameValidator}
              error={PropertyNameValidator !== ""}
              label="Enter Property Name"
              fullWidth
              value={propertyName}
              onChange={(event) => onPropertyNameChange(event)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="number"
              id="capacity"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 5);
              }}
              name="capacity"
              helperText={CapacityValidator}
              error={CapacityValidator !== ""}
              label="Enter Capacity(in sqft.)"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Sqft.</InputAdornment>
                ),
              }}
              fullWidth
              value={capacity}
              onChange={(event) => onWarehouseCapacityChange(event)}
            />
          </Grid>
        </Grid>
        <Typography className={classes.formHeadings}>Tax Details</Typography>
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
              id="pan"
              name="pan"
              helperText={PanNoValidator}
              error={PanNoValidator !== ""}
              label="Enter PAN No."
              fullWidth
              inputProps={{ maxLength: 10 }}
              value={pan}
              onChange={(event) => onPanChange(event)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              id="gstin"
              name="gstin"
              helperText={GSTINValidator}
              error={GSTINValidator !== ""}
              label="Enter GSTIN"
              inputProps={{ maxLength: 15 }}
              fullWidth
              value={gstin}
              onChange={(event) => onGstinChange(event)}
            />
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
            <label>Pan Card : </label>
            <input
              style={{ marginLeft: "15px" }}
              type="file"
              onChange={(event) => onPanDocChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <label>GSTIN : </label>
            <input
              style={{ marginLeft: "15px" }}
              type="file"
              onChange={(event) => onGstDocChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <label>Registration Certificate: </label>
            <input
              style={{ marginLeft: "15px" }}
              type="file"
              onChange={(event) => onRegistrationDocChange(event)}
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
