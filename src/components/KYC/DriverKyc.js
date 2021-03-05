import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Spinner from "../UI/Spinner";
import { API, Auth } from "aws-amplify";
import ShowDrivers from "./ShowDrivers";
import Tooltip from "@material-ui/core/Tooltip";
import InputAdornment from "@material-ui/core/InputAdornment";
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
    color: "white",
  },
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
});

const TruckKYC = (props) => {
  const classes = useStyles();
  const [licenceId, setLicenceId] = useState();
  const [phone, setPhone] = useState();
  const [driverName, setDriverName] = useState();
  const [dl, setDl] = useState();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [driverNameValidator, setDriverNameValidator] = useState("");
  const [LicenseIdValidator, setLicenseIdValidator] = useState("");
  const [ContactNoValidator, setContactNoValidator] = useState("");

  const onlicenceIdChange = (event) => {
    setLicenseIdValidator("");
    setLicenceId(event.target.value);
  };
  const onphoneChange = (event) => {
    setContactNoValidator("");
    var count = 0,
      temp = event.target.value;
    while (temp > 0) {
      count++;
      temp = Math.floor(temp / 10);
    }

    if (event.target.value < 0) {
      event.target.value = 0;
    }
    if (count < 10) {
      setContactNoValidator("Phone Number should contain 10 Digits");
    }
    setPhone(event.target.value);
  };
  const onDriverNameChange = (event) => {
    setDriverNameValidator("");
    setDriverName(event.target.value);
  };

  const onDlChange = (event) => {
    setDl(event.target.files[0]);
  };
  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  if (loading === true) {
    return <Spinner />;
  }

  const submitKYCChained = () => {
    if (driverName == "" || driverName == null) {
      setDriverNameValidator("Driver Name cannot be Empty");
      return;
    }
    if (licenceId == "" || licenceId == null) {
      setLicenseIdValidator("License ID cannot be Empty");
      return;
    }
    if (phone == 0 || phone == null) {
      setContactNoValidator("Phone Number cannot be Empty");
      return;
    }
    if (dl == "" || dl == null) {
      alert("Please upload Driving License proof");
      return;
    }

    setLoading(true);
    var tempLink;
    const metaData = {
      contentType: dl.type,
    };
    const payload = {
      body: {
        contentType: dl.type,
        metaData: metaData,
      },
    };
    var ext = dl.name.split(".").pop();
    API.post(
      "GoFlexeOrderPlacement",
      "/kyc/document?type=" + "serviceprovider",
      payload
    )
      .then((initiateResult) => {
        tempLink = `uploads/kycdocuments/serviceprovider/${initiateResult.fileId}.${ext}`;
        axios
          .put(initiateResult.s3PutObjectUrl, dl, {
            headers: {
              "Content-Type": dl.type,
            },
          })
          .then((resp) => {
            console.log(resp);
            Auth.currentUserInfo().then((userDetails) => {
              const payload = {
                body: {
                  id: userDetails.username,
                  type: "serviceprovider",
                  drivers: [
                    {
                      name: driverName,
                      phone: phone,
                      licenceUrl: tempLink,
                      licenceId: licenceId,
                    },
                  ],
                },
              };
              API.post("GoFlexeOrderPlacement", "/kyc/info", payload)
                .then((resp) => console.log(resp))
                .catch((err) => console.log(err));
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
    setLoading(false);
    setShowForm(!showForm);
  };

  const EachKYC = () => {
    return (
      <div style={{ overflow: "hidden" }}>
        <form>
          <Typography className={classes.formHeadings}>
            Driver Details
          </Typography>

          {/*test*/}
          <Grid
            container
            spacing={3}
            style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
          >
            <Grid item xs={12} sm={6}>
              <Tooltip title="Same as on Driving license">
                <TextField
                  required
                  type="text"
                  id="driverName"
                  name="drivername"
                  helperText={driverNameValidator}
                  error={driverNameValidator !== ""}
                  label="Enter Driver Name"
                  fullWidth
                  value={driverName}
                  inputProps={{ maxLength: 30 }}
                  onChange={(event) => onDriverNameChange(event)}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                type="text"
                id="licenceId"
                name="licenceId"
                helperText={LicenseIdValidator}
                error={LicenseIdValidator !== ""}
                inputProps={{ maxLength: 30 }}
                label="Enter Driving Licence Id"
                fullWidth
                value={licenceId}
                onChange={(event) => onlicenceIdChange(event)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                id="phone"
                name="phone"
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
                label="Enter Phone Number"
                fullWidth
                value={phone}
                error={ContactNoValidator !== ""}
                helperText={ContactNoValidator}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  ),
                }}
                onChange={(event) => onphoneChange(event)}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
            <input type="file" onChange={(event) => ondlChange(event,idx)} /> 
            </Grid> */}
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
              <label>Driving Licence : </label>
              <input
                style={{ marginLeft: "15px" }}
                type="file"
                onChange={(event) => onDlChange(event)}
              />
            </Grid>
          </Grid>

          <Button
            onClick={submitKYCChained}
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
  };

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

      {showForm && EachKYC()}
      {!showForm && <ShowDrivers />}
    </React.Fragment>
  );
};
export default TruckKYC;
