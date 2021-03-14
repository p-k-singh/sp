import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
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
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import GroupIcon from "@material-ui/icons/Group";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BatteryFullIcon from "@material-ui/icons/BatteryFull";
import PersonIcon from "@material-ui/icons/Person";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { useAppContext } from "../libs/contextLibs";
import { ListItem, ListItemText, ListItemIcon, Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Help from "@material-ui/icons/Help";
import { Auth } from "aws-amplify";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  linkDefault: {
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
      color: "inherit",
      textDecoration: "none",
    },
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(0),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const list = [
    { title: "Dashboard", to: "/", icon: <DashboardIcon /> },
    {
      title: "My WorkList",
      to: "/TaskManager",
      icon: (
        // <Badge badgeContent={5} color="secondary">
        <AssignmentIcon />
        // </Badge>
      ),
    },
    { title: "My Orders", to: "/my-orders", icon: <AddShoppingCartIcon /> },
    {
      title: "Availability Manager",
      to: "/capacity",
      icon: <BatteryFullIcon />,
    },
    { title: "Cost Manager", to: "/CostManager", icon: <MonetizationOnIcon /> },
    { title: "User Manager", to: "/userManager", icon: <GroupIcon /> },
    { title: "KYC", to: "/kyc", icon: <FileCopyIcon /> },
    { title: "Help", to: "/help", icon: <Help /> },
  ];
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNotification, setAnchorElNotification] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const [numberOfNotifications, setNumberOfNotifications] = useState(0);
  const [notifications, setNotifications] = useState(
    "cfb86978-9ea3-427b-9bd4-da518f708cf1"
  );
  const { userHasAuthenticated } = useAppContext();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setMenuOpen(!menuOpen);
    setAnchorEl(event.currentTarget);
  };
  const handleNotificationMenu = (event) => {
    setNotificationMenuOpen(!notificationMenuOpen);
    setAnchorElNotification(event.currentTarget);
  };

  const handleClose = () => {
    setMenuOpen(!menuOpen);
    setAnchorEl(null);
  };
  const handleNotificationClose = () => {
    setNotificationMenuOpen(!notificationMenuOpen);
    setAnchorElNotification(null);
  };

  const handleLogout = () => {
    handleClose();
    try {
      Auth.signOut({ global: true });
      userHasAuthenticated(false);
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    //async function checkUse
    var currentUser = await Auth.currentUserInfo();
    var currentUsername = currentUser.username;
    setUsername(currentUsername);
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
      console.log(orderId);
    };
    //console.log(user)
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          {/* <MenuItem> */}

          {/* </MenuItem> */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <Link
              to="/"
              variant="h6"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              GoFlexe
            </Link>
          </Typography>

          <IconButton
            aria-label="show 17 new notifications"
            color="inherit"
            aria-haspopup="true"
            onClick={handleNotificationMenu}
            color="inherit"
          >
            {numberOfNotifications === 0 ? (
              <NotificationsIcon style={{ width: "30", height: "30" }} />
            ) : (
              <Badge badgeContent={numberOfNotifications} color="secondary">
                <NotificationsIcon style={{ width: "30", height: "30" }} />
              </Badge>
            )}
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNotification}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            style={{ marginTop: "50px", maxWidth: 1200 }}
            open={notificationMenuOpen}
            onClose={handleNotificationClose}
          >
            <List component="nav">
              {numberOfNotifications === 0 ? (
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={"No Pending Notifications"}
                    />
                  </ListItem>
            
              ) : (
                <Link to={"/accept-order/" + notifications}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>
                        <ShoppingCartIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={"New Order Request"}
                      secondary="Tap to see Details"
                    />
                  </ListItem>
                </Link>
              )}

              {/* <Divider />
              <Link to="/Track">
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>
                      <AssignmentTurnedInIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={"Shipment from Haryana to Rajasthan"}
                    secondary="Shipment Delivered Successfully"
                  />
                </ListItem>
              </Link>
              <Divider />
              <Link to="/Track">
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>
                      <LocalShippingIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={"Shipment from Bhopal to Indore"}
                    secondary="Pickup Completed Successfully"
                  />
                </ListItem>
              </Link>
              <Divider />
              <Link to="/Track">
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>
                      <LocalShippingIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={"Shipment from Hyderabad to Banglore"}
                    secondary="Driver Arrived at Drop Location"
                  />
                </ListItem>
              </Link>
              <Divider /> */}
            </List>
          </Menu>

          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle style={{ width: "35", height: "35" }} />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            style={{ marginTop: "50px", maxWidth: "1400px" }}
            open={menuOpen}
            onClose={handleClose}
          >
            <Button
              component={Link}
              to="/profile"
              fullWidth
              onClick={handleClose}
              variant="text"
            >
              My Profile
            </Button>
            <Divider />
            <Button onClick={handleLogout} fullWidth>
              Logout
            </Button>
            <Divider />
            <Button onClick={handleLogout} fullWidth>
              Change Password
            </Button>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {list.map((item, pos) => (
            <Link
              key={pos}
              to={{ pathname: item.to }}
              className={classes.linkDefault}
            >
              <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
