import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import Select from "react-select";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Box from "@material-ui/core/Box";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import { ListItem, ListItemText, ListItemIcon, Badge } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  TextField,
  Grid,
  CardContent,
  FormControl,
  InputLabel,
  Button,
  Switch,
  Card,
  Container,
} from "@material-ui/core";
import TodayIcon from "@material-ui/icons/Today";
import InputAdornment from "@material-ui/core/InputAdornment";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Multiselect } from "multiselect-react-dropdown";
import { Auth, API } from "aws-amplify";
import Spinner from "../UI/Spinner";
import List from "@material-ui/core/List";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
const tracking = [
  { key: 1, name: "apple" },
  { key: 2, name: "orange" },
  { key: 3, name: "banana" },
];
const useStyles = makeStyles({
  root: {
    // minWidth: 275,
  },

  title: {
    fontSize: 20,
    height: 50,
    padding: 10,
    paddingLeft: 55,
  },
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
});

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TaskManager = (props) => {
  useEffect(async () => {
    var currentUser = await Auth.currentUserInfo();
    var currentUsername = currentUser.username;
    const client = new W3CWebSocket(
      "wss://kb14hb5n02.execute-api.ap-south-1.amazonaws.com/staging?userName=" +
        currentUsername
    );
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      var orderId = JSON.parse(message.data).orderId;
      setNotifications(orderId);
      setNumberOfNotifications(numberOfNotifications + 1);
      //console.log(message.data.orderId);
      console.log(orderId);
    };
    //console.log(user)
  }, []);
  const classes = useStyles();
  const [numberOfNotifications, setNumberOfNotifications] = useState(0);
  const [notifications, setNotifications] = useState(
    "abf96696-e920-4c59-93f5-8870263ae2bf"
  );
  const [value, setValue] = React.useState(0);
  const [progress, setProgress] = React.useState(10);
  //   React.useEffect(() => {
  //     const timer = setInterval(() => {
  //       setProgress((prevProgress) =>
  //         prevProgress >= 100 ? 10 : prevProgress + 1
  //       );
  //     }, 800);
  //     return () => {
  //       clearInterval(timer);
  //     };
  //   }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const selectStyles = {
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };

  return (
    <CardContent style={{ padding: 0, overflow: "hidden" }}>
      <Typography className={classes.title} gutterBottom>
        Hello, You've got 5 tasks today <TodayIcon />
        {/* <Tooltip title="Specify the Pricing Details for your Assets">
          <InfoIcon style={{ color: "lightgrey", marginLeft: 20 }} />
        </Tooltip> */}
      </Typography>
      <Divider />

      <Typography className={classes.formHeadings}></Typography>
      <div className={classes.root} style={{ marginRight: 100 }}>
        <AppBar position="static">
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab
              className={classes.active_tab}
              //   icon={
              //     <Badge badgeContent={4} color="secondary">
              //       <LocalShippingIcon />
              //     </Badge>
              //   }
              label={
                <Badge badgeContent={4} color="secondary">
                  Tracking
                </Badge>
              }
              {...a11yProps(0)}
            />
            <Tab
              //   icon={
              //     <Badge badgeContent={1} color="secondary">
              //       <ShoppingCartIcon />
              //     </Badge>
              //   }
              label={
                <Badge badgeContent={1} color="secondary">
                  Orders
                </Badge>
              }
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div>
            <List component="nav">
              {/* {tracking.map((f) => ( */}
              <Link to="/Track">
                <Card style={{ padding: 10, marginBottom: 10 }}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>
                        <LocalShippingIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={"Order Id. " + Math.floor(Math.random() * 10000)}
                      secondary="Driver Arrived at Drop Location"
                    />
                  </ListItem>
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={1}></Grid>

                    <Grid item xs={12} sm={10}>
                      <LinearProgressWithLabel value={83} />
                    </Grid>
                  </Grid>
                </Card>
              </Link>
              <Card style={{ padding: 10, marginBottom: 10 }}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>
                      <LocalShippingIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={"Order Id. " + Math.floor(Math.random() * 10000)}
                    secondary="Pickup Completed Successfully"
                  />
                </ListItem>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={1}></Grid>

                  <Grid item xs={12} sm={10}>
                    <LinearProgressWithLabel value={60} />
                  </Grid>
                </Grid>
              </Card>
              <Card style={{ padding: 10, marginBottom: 10 }}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>
                      <LocalShippingIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={"Order Id. " + Math.floor(Math.random() * 10000)}
                    secondary="Delivery Checklist Completed, Waiting for OTP verification"
                  />
                </ListItem>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={1}></Grid>

                  <Grid item xs={12} sm={10}>
                    <LinearProgressWithLabel value={90} />
                  </Grid>
                </Grid>
              </Card>
              <Card style={{ padding: 10, marginBottom: 10 }}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>
                      <LocalShippingIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={"Order Id. " + Math.floor(Math.random() * 10000)}
                    secondary="Driver has left for Pickup"
                  />
                </ListItem>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={1}></Grid>

                  <Grid item xs={12} sm={10}>
                    <LinearProgressWithLabel value={10} />
                  </Grid>
                </Grid>
              </Card>
            </List>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div>
            <List component="nav">
              {/* {tracking.map((f) => ( */}
              <Card style={{ padding: 10, marginBottom: 10 }}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={8}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar>
                          <ShoppingCartIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={"New Order Request"}
                        secondary="Shipment from Etwarpur,Rajasthan to Patna,Bihar"
                      />
                    </ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      style={{
                        maxWidth: "150px",
                        minWidth: "150px",
                        maxHeight: "50px",
                        marginTop: 15,
                        marginBottom: 7,
                      }}
                      component={Link}
                      to={`accept-order/${notifications}`}
                      variant="contained"
                      color="default"
                      startIcon={<LocalShippingIcon />}
                      // component={Link}
                      // to="/track"
                    >
                      Details
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </List>
          </div>
        </TabPanel>
      </div>
    </CardContent>
  );
};
export default TaskManager;
