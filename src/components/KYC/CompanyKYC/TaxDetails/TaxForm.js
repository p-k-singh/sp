import React, { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Auth, API } from "aws-amplify";
import axios from "axios";
import Spinner from "../../../UI/Spinner";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import { TextField, Grid, Button, Breadcrumbs } from "@material-ui/core";
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

const CompanyKYC = (props) => {
  const classes = useStyles();
  const [panDoc, setPanDoc] = useState();
  const [gstDoc, setGSTDoc] = useState();
  const [loading, setLoading] = useState(false);
  const [myState, setMyState] = useState({
    pan: "",
    gstin: "",
  });
  const fieldsChange = (event) => {
    setMyState({ ...myState, [event.target.name]: event.target.value });
  };
  const submitKYC = () => {

    if (myState.pan == "") {
      alert("PAN Details cannot be empty");
      return;
    }
    if (myState.gst == "") {
      alert("GSTIN cannot be empty");
      return;
    }

    if (panDoc == null || panDoc == "") {
      alert(" Please upload your PAN Proof");
      return;
    }
    if (gstDoc == null || panDoc == "") {
      alert(" Please upload your GSTIN Proof");
      return;
    }
    setLoading(true);
    var panLink, gstinLink;
    const metaData = {
      contentType: panDoc.type,
    };
    const payload = {
      body: {
        contentType: panDoc.type,
        metaData: metaData,
      },
    };
    var ext = panDoc.name.split(".").pop();
    API.post(
      "GoFlexeOrderPlacement",
      "/kyc/document?type=" + "serviceprovider",
      payload
    )
      .then((initiateResult) => {
        panLink = `uploads/kycdocuments/serviceprovider/${initiateResult.fileId}.${ext}`;
        axios
          .put(initiateResult.s3PutObjectUrl, panDoc, {
            headers: {
              "Content-Type": panDoc.type,
            },
          })
          .then((resp) => {
            const metaData = {
              contentType: gstDoc.type,
            };
            const payload = {
              body: {
                contentType: gstDoc.type,
                metaData: metaData,
              },
            };
            var ext = gstDoc.name.split(".").pop();
            API.post(
              "GoFlexeOrderPlacement",
              "/kyc/document?type=" + "serviceprovider",
              payload
            )
              .then((initiateResult) => {
                gstinLink = `uploads/kycdocuments/serviceprovider/${initiateResult.fileId}.${ext}`;
                axios
                  .put(initiateResult.s3PutObjectUrl, gstDoc, {
                    headers: {
                      "Content-Type": gstDoc.type,
                    },
                  })
                  .then((res) => {
                    Auth.currentUserInfo()
                      .then((userDetails) => {
                        const payload = {
                          body: {
                            id: userDetails.username,
                            type: "serviceprovider",
                            selfInfo: {
                              taxInfo: {
                                pan: myState.pan,
                                gstin: myState.gstin,
                                panLink: panLink,
                                gstinLink: gstinLink,
                              },
                            },
                          },
                        };
                        API.post(
                          "GoFlexeOrderPlacement",
                          "/kyc/info?type=" + "serviceprovider",
                          payload
                        )
                          .then((resp) => {
                            console.log(resp);
                            fun();
                          })
                          .catch((err) => console.log(err));
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };
  const fun = () => {
    //alert(JSON.stringify(props))
    props.loadData();
  };

  const onPanProofChange = (event) => {
    setPanDoc(event.target.files[0]);
  };
  const onGSTINProofChange = (event) => {
    setGSTDoc(event.target.files[0]);
  };
  if (loading === true) {
    return <Spinner />;
  }

  return (
    <div style={{ overflow: "hidden" }}>
      {/* <Typography fullWidth className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                            Pending KYC
                </Typography> */}
      <form>
        {/* <Typography className={classes.formHeadings} >Tax Details</Typography> */}
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
              inputProps={{ maxLength: 10 }}
              name="pan"
              value={myState.pan}
              onChange={(event) => fieldsChange(event)}
              label="Enter PAN"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="text"
              id="gstin"
              name="gstin"
              inputProps={{ maxLength: 15 }}
              value={myState.gstin}
              onChange={(event) => fieldsChange(event)}
              label="GST Number"
              fullWidth
            />
          </Grid>
        </Grid>

        <Typography className={classes.formHeadings}>
          Documents Upload{" "}
          <Tooltip title="Upload PAN and GST copy" placement="top">
            <InfoIcon style={{ color: "lightgrey" }} fontSize="small" />
          </Tooltip>{" "}
        </Typography>
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
        >
          <Grid item xs={12}>
            <label>Pan Proof: </label>
            <input
              style={{ marginLeft: "15px" }}
              type="file"
              onChange={(event) => onPanProofChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <label>GSTIN Proof: </label>
            <input
              style={{ marginLeft: "15px" }}
              type="file"
              onChange={(event) => onGSTINProofChange(event)}
            />
          </Grid>
        </Grid>

        <Button
          onClick={submitKYC}
          className="row"
          variant="contained"
          style={{
            float: "right",
            backgroundColor: "#f9a825",
            marginBottom: "10px",
          }}
        >
          Next
        </Button>
      </form>
    </div>
  );
};
export default CompanyKYC;
