import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
// https://raw.githubusercontent.com/gauravmehta13/DevsEra-App/master/Logo_gooflexe%20(1).png

export default function ButtonAppBar() {
  const classes = useStyles();
  const [whichButton, setWhichButton] = useState("signup");
  return (
    <div className={classes.root}>
      <AppBar position="absolute">
        <Toolbar>
          <img
            style={{ padding: 5 }}
            src="https://raw.githubusercontent.com/gauravmehta13/DevsEra-App/master/Logo_gooflexe%20(1).png"
            alt="GoFlexe"
            height="70"
            width="200"
          />
          <Typography variant="h6" className={classes.title}>
            {""}
          </Typography>
          <Button
            component={Link}
            to="/login"
            style={{
              backgroundColor: "#21b6ae",
            }}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/signup"
            style={{
              backgroundColor: "#ffd71b",
              marginLeft: "10px",
            }}
            variant="contained"
            color="secondary"
          >
            Signup
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
