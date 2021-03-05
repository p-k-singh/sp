import React, { useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Upload from "./Upload/Upload";
import InfoIcon from "@material-ui/icons/Info";
import { Link } from "react-router-dom";
import { Auth, API } from "aws-amplify";
import Spinner from "../UI/Spinner";
import {
  Select,
  InputLabel,
  MenuItem,
  Grid,
  Card,
  FormHelperText,
  Divider,
  TextField,
  Button,
} from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    height: 50,
    padding: 10,
    paddingLeft: 55,
    //color: 'white',
    borderBottomStyle: "solid",
    borderWidth: "1px",
  },
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
  formControl: {
    //margin: theme.spacing(1),
    minWidth: 120,
  },
});

const PaymentIndex = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (props.id) {
      var param = `?orderId=${props.id}`;
      API.get("GoFlexeOrderPlacement", `/customer-payments` + param)
        .then((resp) => {
          console.log(resp);
          setData({
            paymentId: resp.paymentId,
            paymentMode: resp.paymentMode,
            paymentOption:
              resp.paymentOption === undefined ? null : resp.paymentOption,
            totalAmount: resp.totalAmount,
            paymentModeDetails: resp.paymentModeDetails,
          });

          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, []);

  if (loading === true) {
    return <Spinner />;
  }
  if (data !== null) {
    return <ShowPaymentDetails data={data} />;
  } else {
    return <h1>Payment not completed</h1>;
  }
};
export default PaymentIndex;

const ShowPaymentDetails = (props) => {
  useEffect(() => {
    console.log(props.data);
  }, []);

  const classes = useStyles();
  const [data, setData] = useState(null);

  const PaidfullPayToAccountDashboard = (
    <React.Fragment>
      <Card style={{ padding: 10 }}>
        <Typography style={{ fontSize: 20, marginBottom: 20 }}>
          Total Amount paid: {data !== null ? data.totalAmount : "x"} INR
        </Typography>
        {/* <HelpIcon /> */}
        <Typography style={{ fontSize: 18, marginBottom: 8 }}>
          Account Details -
        </Typography>
        <div className="row" style={{ fontSize: 16, marginBottom: 20 }}>
          <div className="col col-xs-12 col-sm-6" style={{ marginBottom: 6 }}>
            Account No: 7814289632{" "}
            <Tooltip
              title="Beneficiary’s account number, make the payment to this account."
              placement="top-start"
            >
              <InfoIcon style={{ color: "lightgrey" }} fontSize="small" />
            </Tooltip>
          </div>
          <div className="col col-xs-12 col-sm-8" style={{ paddingBottom: 10 }}>
            Account Holder's Name: GoFlexe Ltd.{" "}
            <Tooltip
              title="Beneficiary’s account name, make the payment to this account."
              placement="top-start"
            >
              <InfoIcon style={{ color: "lightgrey" }} fontSize="small" />
            </Tooltip>
          </div>

          <div className="col col-xs-12 col-sm-6">Bank Name: Yes Bank</div>
          <div className="col col-xs-12 col-sm-6">
            IFSC: BNK0123456{" "}
            <Tooltip
              title="IFSC is short for Indian Financial System Code, represented by an 11 digit character."
              placement="top-start"
            >
              <InfoIcon style={{ color: "lightgrey" }} fontSize="small" />
            </Tooltip>
          </div>
        </div>
        <div className="row">
          <div>
            <p
              style={{
                marginLeft: 20,
                marginRight: 8,
                marginTop: 8,
                fontSize: 18,
              }}
            >
              Reference Id:{" "}
              {props.data.paymentMode == "accountTransfer"
                ? props.data.paymentModeDetails.referenceId
                : ""}
            </p>
          </div>
        </div>

        <Divider style={{ marginBottom: 20 }} />
        {/* <p>
          Note:Please submit the amount in the following account and paste the
          Reference Id of the transaction in the textbox given above
        </p> */}
      </Card>
    </React.Fragment>
  );

  const PaidcashPayment = (
    <React.Fragment>
      <Card style={{ padding: 10 }}>
        <Typography style={{ fontSize: 20, marginBottom: 20 }}>
          Total Amount paid: {props.data.totalAmount} INR
        </Typography>
        {/* <HelpIcon /> */}
        <Typography style={{ marginBottom: 10 }}>
          Name and contact details of the payer
        </Typography>
        <div className="row">
          <div>
            <p
              style={{
                marginLeft: 20,
                marginRight: 8,
                marginTop: 8,
                fontSize: 18,
              }}
            >
              Name:{" "}
              {props.data !== null && props.data.paymentMode == "cash"
                ? props.data.paymentModeDetails.nameOfPayer
                : ""}
            </p>
          </div>
        </div>
        <div className="row">
          <div>
            <p
              style={{
                marginLeft: 20,
                marginRight: 8,
                marginTop: 8,
                fontSize: 18,
              }}
            >
              Phone:
              {props.data.paymentMode == "cash"
                ? props.data.paymentModeDetails.phoneOfPayer
                : ""}
            </p>
          </div>
        </div>

        <Divider style={{ marginBottom: 20 }} />
      </Card>
    </React.Fragment>
  );

  const PaidOthersPayment = (
    <React.Fragment>
      <Card style={{ padding: 10 }}>
        <Typography style={{ fontSize: 20, marginBottom: 20 }}>
          Total Amount paid: {props.data.totalAmount} INR
        </Typography>
        {/* <HelpIcon /> */}
        Proof of Payment :
        <a
          href={
            props.data !== null && props.data.paymentMode == "others"
              ? props.data.paymentModeDetails.chequeLink
              : ""
          }
        >
          Check here
        </a>
        <Divider style={{ marginBottom: 20, marginTop: 50 }} />
      </Card>
    </React.Fragment>
  );

  const Paidcontent = (
    <Card className={classes.root}>
      <CardContent style={{ padding: 0 }}>
        <Typography className={classes.title} gutterBottom>
          Payment details
        </Typography>
        <Grid container spacing={0} style={{ paddingLeft: 30 }}>
          <Grid item xs={12} sm={6}>
            <form style={{ padding: 10 }}>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  style={{ width: "auto" }}
                  aria-label="position"
                  name="position"
                  value="ImmediatePayment"
                >
                  <FormLabel component="legend">
                    Selected payment Promise:
                  </FormLabel>
                  <Grid
                    container
                    spacing={0}
                    style={{ padding: 20, paddingLeft: 0, paddingBottom: 30 }}
                  >
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        value="ImmediatePayment"
                        control={<Radio color="primary" />}
                        label="Immediate Payment"
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        value="30DaysCycle"
                        control={<Radio color="primary" />}
                        label="30 Days Cycle"
                      />
                    </Grid> */}
                  </Grid>
                </RadioGroup>
              </FormControl>
            </form>
          </Grid>
          <Grid item sm={6} style={{ padding: 10 }}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                style={{ width: "auto" }}
                aria-label="position"
                name="position"
                value={props.data.paymentOption}
              >
                <FormLabel component="legend">
                  Selected payment option:
                </FormLabel>
                <Grid
                  container
                  spacing={0}
                  style={{ padding: 20, paddingBottom: 30 }}
                >
                  {props.data.paymentOption == "fullPayment" ? (
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        value="fullPayment"
                        control={<Radio color="primary" />}
                        label="Full Payment"
                      />
                    </Grid>
                  ) : (
                    <p></p>
                  )}
                  {props.data.paymentOption == "partialPayment" ? (
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        value="partialPayment"
                        control={<Radio color="primary" />}
                        label="Partial Payment"
                      />
                    </Grid>
                  ) : (
                    <p></p>
                  )}
                  {props.data.paymentOption == "CreditBased" ? (
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        value="CreditBased"
                        control={<Radio color="primary" />}
                        label="Credit Based"
                      />
                    </Grid>
                  ) : (
                    <p></p>
                  )}
                  {props.data.paymentOption == "Subscription" ? (
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        value="Subscription"
                        control={<Radio color="primary" />}
                        label="Subscription"
                      />
                    </Grid>
                  ) : (
                    <p></p>
                  )}
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={0} style={{ paddingLeft: 30 }}>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Selected payment mode</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={props.data.paymentMode}
              >
                {props.data.paymentMode == "accountTransfer" ? (
                  <FormControlLabel
                    value="accountTransfer"
                    control={<Radio color="primary" />}
                    label="Account Transfer"
                  />
                ) : (
                  <p></p>
                )}
                {props.data.paymentMode == "cash" ? (
                  <FormControlLabel
                    value="cash"
                    control={<Radio color="primary" />}
                    label="Cash"
                  />
                ) : (
                  <p></p>
                )}
                {props.data.paymentMode == "Others" ? (
                  <FormControlLabel
                    value="Others"
                    control={<Radio color="primary" />}
                    label="Others"
                  />
                ) : (
                  <p></p>
                )}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            {" "}
            {props.data.paymentOption === "CreditBased" && (
              <FormControl
                style={{ marginLeft: 50 }}
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-label">
                  Payment Delay
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={props.data.paymentModeDetails.paymentDelay}

                  //   value={age}
                  //   onChange={handleChange}
                >
                  {props.data.paymentModeDetails.paymentDelay == "7 Days" ? (
                    <MenuItem value="7 Days">7 Days</MenuItem>
                  ) : (
                    ""
                  )}
                  {props.data.paymentModeDetails.paymentDelay == "30 Days" ? (
                    <MenuItem value="30 Days">30 Days</MenuItem>
                  ) : (
                    ""
                  )}
                  {props.data.paymentModeDetails.paymentDelay == "45 Days" ? (
                    <MenuItem value="45 Days">45 Days</MenuItem>
                  ) : (
                    ""
                  )}
                </Select>
                {props.data.paymentModeDetails.paymentDelay === "45 Days" && (
                  <FormHelperText>
                    Pay the total amount in 45 Days
                  </FormHelperText>
                )}
                {props.data.paymentModeDetails.paymentDelay === "30 Days" && (
                  <FormHelperText>
                    Pay the total amount in 30 Days
                  </FormHelperText>
                )}
                {props.data.paymentModeDetails.paymentDelay === "7 Days" && (
                  <FormHelperText>
                    Pay the total amount in 7 Days
                  </FormHelperText>
                )}
              </FormControl>
            )}
            {props.data.paymentOption == "Subscription" ? (
              <FormControl
                style={{ marginLeft: 50 }}
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-label">
                  Payment Cycle
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={props.data.paymentModeDetails.paymentCycle}

                  //   value={age}
                  //   onChange={handleChange}
                >
                  {props.data.paymentModeDetails.paymentCycle == "Monthly" ? (
                    <MenuItem value="Monthly">Monthly</MenuItem>
                  ) : (
                    ""
                  )}
                  {props.data.paymentModeDetails.paymentCycle == "Weekly" ? (
                    <MenuItem value="Weekly">Weekly</MenuItem>
                  ) : (
                    ""
                  )}
                </Select>
                {props.data.paymentModeDetails.paymentCycle === "Monthly" && (
                  <FormHelperText>Pay each Month</FormHelperText>
                )}
                {props.data.paymentModeDetails.paymentCycle === "Weekly" && (
                  <FormHelperText>Pay each Week</FormHelperText>
                )}
              </FormControl>
            ) : (
              ""
            )}
            {props.data.paymentOption == "partialPayment" && (
              <FormControl
                style={{ marginLeft: 50 }}
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-label">
                  Payment Ratio
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={props.data.paymentModeDetails.paymentRatio}
                >
                  {props.data.paymentModeDetails.paymentRatio == "10%" ? (
                    <MenuItem value="10%">10%</MenuItem>
                  ) : (
                    ""
                  )}
                  {props.data.paymentModeDetails.paymentRatio == "30%" ? (
                    <MenuItem value="30%">30%</MenuItem>
                  ) : (
                    ""
                  )}
                  {props.data.paymentModeDetails.paymentRatio == "50%" ? (
                    <MenuItem value="50%">50%</MenuItem>
                  ) : (
                    ""
                  )}
                </Select>
                {props.data.paymentModeDetails.paymentRatio === "50%" && (
                  <FormHelperText>
                    Pay 50% now and 50%
                    <br /> at time of delivery
                  </FormHelperText>
                )}
                {props.data.paymentModeDetails.paymentRatio === "30%" && (
                  <FormHelperText>
                    Pay 30% now and 70%
                    <br /> at time of delivery
                  </FormHelperText>
                )}
                {props.data.paymentModeDetails.paymentRatio === "10%" && (
                  <FormHelperText>
                    Pay 10% now and 90%
                    <br /> at time of delivery
                  </FormHelperText>
                )}
              </FormControl>
            )}
          </Grid>
        </Grid>
        <form style={{ padding: 10 }}>
          <Divider style={{ marginBottom: 5 }} />

          <Grid
            container
            spacing={3}
            style={{ padding: 50, paddingTop: 20, paddingBottom: 30 }}
          >
            <Grid item xs={12} sm={12}>
              {props.data.paymentMode === "accountTransfer" &&
                PaidfullPayToAccountDashboard}
              {props.data.paymentMode === "cash" && PaidcashPayment}
              {props.data.paymentMode === "Others" && PaidOthersPayment}
            </Grid>
          </Grid>
        </form>
      </CardContent>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          margin: 20,
        }}
      ></div>
    </Card>
  );

  return <div>{Paidcontent}</div>;
};
