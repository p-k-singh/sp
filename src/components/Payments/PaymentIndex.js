import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Upload from "./Upload/Upload";
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
const PaymentIndex = () => {
  const classes = useStyles();
  const [paymentOption, setPaymentOption] = useState("fullPayment");
  const [paymentRatio, setPaymentRatio] = useState("50-50");
  const [paymentMode, setPaymentMode] = useState("accountTransfer");
  const handlePaymentOptionChange = (event) => {
    setPaymentOption(event.target.value);
  };
  const handleRatioChange = (event) => {
    setPaymentRatio(event.target.value);
  };
  const handlePaymentMode = (event) => {
    setPaymentMode(event.target.value);
    // alert(event.target.value)
  };

  const fullPayToAccountDashboard = (
    <React.Fragment>
      <Card style={{ padding: 5 }}>
        <Typography style={{ fontSize: 20, marginBottom: 20 }}>
          Total Amount to be recieved: 10,000 INR
        </Typography>
        {/* <HelpIcon /> */}
        <Typography style={{ fontSize: 18, marginBottom: 8 }}>
          Account Details -
        </Typography>
        <div className="row" style={{ fontSize: 16, marginBottom: 20 }}>
          <div className="col col-xs-12 col-sm-12" style={{ marginBottom: 6 }}>
            Account Number: 7814289632
          </div>
          <div className="col col-xs-12 col-sm-12" style={{ marginBottom: 6 }}>
            Account Holder Name: GoFlexe Ltd.
          </div>
          <div className="col col-xs-12 col-sm-12">IFSC Code: BNK0123456</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            margin: 20,
          }}
        >
          <Button
            className="AllButtons"
            variant="contained"
            // style={{backgroundColor:'#FF8C00'}}
          >
            Submit
          </Button>
        </div>
        <Divider style={{ marginBottom: 20 }} />
        <p>
          Note:Please submit the amount in the following account and paste the
          Reference Id of the transaction in the textbox given above
        </p>
      </Card>
    </React.Fragment>
  );

  const cashPayment = (
    <React.Fragment>
      <Card>
        <Typography style={{ fontSize: 20, marginBottom: 20 }}>
          Total Amount to be recieved: 10,000 INR
        </Typography>
        {/* <HelpIcon /> */}
        <Typography style={{ marginBottom: 10 }}>
          Please provide the name and contact details of the payer
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
              Name:
            </p>
          </div>
          <div>
            <TextField
              variant="outlined"
              id="standard-size-small"
              size="small"
            />
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
            </p>
          </div>
          <div>
            <TextField
              variant="outlined"
              id="standard-size-small"
              size="small"
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            margin: 20,
          }}
        >
          <Button variant="contained" style={{ backgroundColor: "#FF8C00" }}>
            Submit
          </Button>
        </div>

        <Divider style={{ marginBottom: 20 }} />
        <p>
          Note:Please hand over the cash to the delivery personnel at the time
          of delivery
        </p>
      </Card>
    </React.Fragment>
  );

  const OthersPayment = (
    <React.Fragment>
      <Card>
        <Typography style={{ fontSize: 20, marginBottom: 20 }}>
          Total Amount to be recieved: 10,000 INR
        </Typography>
        {/* <HelpIcon /> */}
        <Upload />

        <Divider style={{ marginBottom: 20, marginTop: 20 }} />
        <p>
          Note:Please upload a picture / screenshot of payment via UPI or
          Cheque.
        </p>
      </Card>
    </React.Fragment>
  );

  const content = (
    <Card className={classes.root}>
      <CardContent style={{ padding: 0 }}>
        <Typography className={classes.title} gutterBottom>
          Payment
        </Typography>
        <form>
          <FormControl component="fieldset">
            <RadioGroup
              row
              style={{ width: "auto" }}
              aria-label="position"
              name="position"
              onChange={(event) => handlePaymentOptionChange(event)}
              value={paymentOption}
            >
              <FormLabel component="legend">
                Choose your payment option:
              </FormLabel>
              <Grid
                container
                spacing={0}
                style={{ padding: 20, paddingBottom: 30 }}
              >
                <Grid item xs={12} sm={3}>
                  <FormControlLabel
                    value="fullPayment"
                    control={<Radio color="primary" />}
                    label="Full Payment"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControlLabel
                    value="partialPayment"
                    control={<Radio color="primary" />}
                    label="Partial Payment"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControlLabel
                    value="CreditBased"
                    control={<Radio color="primary" />}
                    label="Credit Based"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControlLabel
                    value="Subscription"
                    control={<Radio color="primary" />}
                    label="Subscription"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>

          {/* <Grid container spacing={3} style={{ padding: 50, paddingTop: 20 ,paddingBottom: 30 }}>
            <Grid item style={{backgroundColor:'red'}} xs={12} sm={5}>
            
            </Grid>
          
            <Grid item xs={12} style={{backgroundColor:'yellow'}} sm={6}>
                
                </Grid>
            </Grid> */}
          <Divider style={{ marginBottom: 20 }} />
          {paymentOption === "CreditBased" && (
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
                value={paymentRatio}
                onChange={handleRatioChange}
                //   value={age}
                //   onChange={handleChange}
              >
                <MenuItem value="7 Days">7 Days</MenuItem>
                <MenuItem value="30 Days">30 Days</MenuItem>
                <MenuItem value="45 Days">45 Days</MenuItem>
              </Select>
              {paymentRatio === "45 Days" && (
                <FormHelperText>Pay the total amount in 45 Days</FormHelperText>
              )}
              {paymentRatio === "30 Days" && (
                <FormHelperText>Pay the total amount in 30 Days</FormHelperText>
              )}
              {paymentRatio === "7 Days" && (
                <FormHelperText>Pay the total amount in 7 Days</FormHelperText>
              )}
            </FormControl>
          )}
          {paymentOption === "Subscription" && (
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
                value={paymentRatio}
                onChange={handleRatioChange}
                //   value={age}
                //   onChange={handleChange}
              >
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
              </Select>
              {paymentRatio === "Monthly" && (
                <FormHelperText>Pay each Month</FormHelperText>
              )}
              {paymentRatio === "Weekly" && (
                <FormHelperText>Pay each Week</FormHelperText>
              )}
            </FormControl>
          )}
          {paymentOption === "partialPayment" && (
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
                value={paymentRatio}
                onChange={handleRatioChange}
                //   value={age}
                //   onChange={handleChange}
              >
                <MenuItem value="10%">10%</MenuItem>
                <MenuItem value="30%">30%</MenuItem>
                <MenuItem value="50%">50%</MenuItem>
              </Select>
              {paymentRatio === "50%" && (
                <FormHelperText>
                  Pay 50% now and 50%
                  <br /> at time of delivery
                </FormHelperText>
              )}
              {paymentRatio === "30%" && (
                <FormHelperText>
                  Pay 30% now and 70%
                  <br /> at time of delivery
                </FormHelperText>
              )}
              {paymentRatio === "10%" && (
                <FormHelperText>
                  Pay 10% now and 90%
                  <br /> at time of delivery
                </FormHelperText>
              )}
            </FormControl>
          )}
          <Grid
            container
            spacing={3}
            style={{ padding: 50, paddingTop: 20, paddingBottom: 30 }}
          >
            <Grid item xs={12} sm={4}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Choose your payment mode
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={paymentMode}
                  onChange={handlePaymentMode}
                >
                  <FormControlLabel
                    value="accountTransfer"
                    control={<Radio color="primary" />}
                    label="Account Transfer"
                  />
                  <FormControlLabel
                    value="cash"
                    control={<Radio color="primary" />}
                    label="Cash"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              {paymentMode === "accountTransfer" && fullPayToAccountDashboard}
              {paymentMode === "cash" && cashPayment}
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

  return <div>{content}</div>;
};
export default PaymentIndex;
