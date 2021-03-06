import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Button,
  Select as MaterialSelect,
  Switch,
  Card,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    fontSize: 20,
    height: 50,
    padding: 10,
    paddingLeft: 55,
    borderBottomStyle: "solid",
    borderWidth: "1px",
  },
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
  formControl: {
    marginTop: "1%",
    width: "50%",
  },
});

const help = (props) => {
  return (
    <div>
      <div style={{ paddingBottom: 30 }}>
        <h3
          fullWidth
          styles={{
            fontSize: 20,
            height: 50,
            padding: 10,
            paddingBottom: 50,
            paddingLeft: 55,
            borderBottomStyle: "solid",
            borderWidth: "1px",
          }}
          gutterBottom
        >
          Help Videos
        </h3>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5} style={{ paddingLeft: 30 }}>
          <div>
            <iframe
              title="Website Walkthrough"
              width="400"
              height="200"
              src="https://www.youtube.com/embed/GoAzStiokY8"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div>
            <center>
              <h5>Website Walkthrough</h5>
            </center>
          </div>
        </Grid>
        <Grid item xs={12} sm={1}></Grid>

        <Grid item xs={12} sm={5}>
          <iframe
            title="One time KYC and Inventory Setup"
            width="400"
            height="200"
            src="https://www.youtube.com/embed/Ngk1ai2zWdc"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <div>
            <center>
              <h5>KYC and Inventory Setup</h5>
            </center>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default help;
