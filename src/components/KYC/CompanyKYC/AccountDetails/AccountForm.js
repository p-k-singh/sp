import React, { useEffect, useState } from "react";
import Spinner from "../../../UI/Spinner";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Auth, API } from "aws-amplify";
import axios from "axios";
import { Link } from "react-router-dom";
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

const AccountInfoForm = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [IfscValidator, setIfscValidator] = useState("");
  const [AccountNameValidator, setAccountNameValidator] = useState("");
  const [AccountNoValidator, setAccountNoValidator] = useState("");
  const [myState, setMyState] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
  });
  const submitKYC = () => {
    if (
      AccountNameValidator !== "" ||
      IfscValidator !== "" ||
      AccountNoValidator !== ""
    ) {
      return;
    }
    if (myState.accountHolderName == "") {
      setAccountNameValidator("Account Holder's Name cannot be empty");
      return;
    }
    if (myState.accountNumber == "") {
      setAccountNoValidator("Account Number cannot be empty");
      return;
    }
    if (myState.ifscCode == "") {
      setIfscValidator("IFS code cannot be empty");
      return;
    }

    setSubmit(true);
    Auth.currentUserInfo()
      .then((userDetails) => {
        const payload = {
          body: {
            id: userDetails.username,
            type: "serviceprovider",
            selfInfo: {
              accountInfo: {
                accountHolderName: myState.accountHolderName,
                accountNumber: myState.accountNumber,
                ifscCode: myState.ifscCode,
              },
            },
          },
        };
        API.post(
          "GoFlexeOrderPlacement",
          "/kyc/info?type=" + "serviceprovider",
          payload
        )
          .then((resp) => console.log(resp))
          .catch((err) => {
            console.log(err);
            setSubmit(false);
          });

        fun();
      })
      .catch((err) => {
        console.log(err);
        setSubmit(false);
      });
  };
  const fun = () => {
    //alert(JSON.stringify(props))
    props.loadData();
  };
  const fieldsChange = (event) => {
    setIfscValidator("");
    setAccountNameValidator("");
    setAccountNoValidator("");
    if (event.target.name == "ifscCode" && event.target.value.length < 11) {
      setIfscValidator("IFS Code should be of 11 Digits");
    }

    setMyState({ ...myState, [event.target.name]: event.target.value });
  };
  if (loading === true) {
    return <Spinner />;
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <form>
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              id="accountHolderName"
              name="accountHolderName"
              helperText={AccountNameValidator}
              error={AccountNameValidator !== ""}
              value={myState.accountHolderName}
              onChange={(event) => fieldsChange(event)}
              label="Account Holder's Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              helperText={AccountNoValidator}
              error={AccountNoValidator !== ""}
              id="accountNumber"
              name="accountNumber"
              label="Account Number"
              value={myState.accountNumber}
              inputProps={{ maxLength: 18 }}
              onChange={(event) => fieldsChange(event)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              id="ifscCode"
              name="ifscCode"
              value={myState.ifscCode}
              error={IfscValidator !== ""}
              helperText={IfscValidator}
              inputProps={{ maxLength: 11 }}
              onChange={(event) => fieldsChange(event)}
              label="IFSC Code"
              fullWidth
            />
          </Grid>
        </Grid>
        {submit == true ? (
          <Spinner />
        ) : (
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
            Submit KYC
          </Button>
        )}
      </form>
    </div>
  );
};
export default AccountInfoForm;
