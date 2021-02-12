import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { TextField, Grid, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";

import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";

import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 20,
    height: 50,
    padding: 10,
    paddingLeft: 55,
    borderBottomStyle:'solid',
    borderWidth:"1px",
    
  },
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
});

const Track = (props) => {
  const classes = useStyles();

  return (
    <div style={{ overflow: "hidden", marginTop: "20px" }}>
      <Typography
        fullWidth
        className={classes.title}
        gutterBottom
       
      >
        Tracking Details
      </Typography>
      <form>
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
        ></Grid>

        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
        >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    {" "}
                    <Checkbox
                      size="small"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    Same Number of units as Mentioned
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    {" "}
                    <Checkbox
                      size="small"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    Shipment has same weight as Mentioned
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Grid>
        <Typography className={classes.formHeadings}>
          <h5> Documents Upload</h5>
        </Typography>
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 30, paddingBottom: 30 }}
        >
          <Grid item xs={12}>
            <label>Signed Document by Driver/executive: </label>
            <input style={{ marginLeft: "15px" }} type="file" />
          </Grid>
          <Grid item xs={12}>
            <label>Signed Document by Customer: </label>
            <input style={{ marginLeft: "15px" }} type="file" />
          </Grid>
        </Grid>

        <Button
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
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
        ></Grid>
      </form>
      <Typography
        fullWidth
        className={classes.title}
        gutterBottom
        
      >
        Status
      </Typography>
      <form>
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
        ></Grid>

        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
        >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    {" "}
                    <Checkbox
                      size="small"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </TableCell>
                  <TableCell align="left">Pickup Done</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
          {/* <Grid item xs={12} sm={6}>
            {" "}
            <Checkbox
              size="small"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </Grid> */}

          <Grid
            container
            spacing={3}
            style={{ padding: 50, paddingTop: 30, paddingBottom: 30 }}
          ></Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="text"
              label="Number of Trucks"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm ={6}>
            <TextField
            id="datetime-local"
            label="Available To"
            type="datetime-local"
            className={classes.textField}
           // onChange={(event)=>onAvailableToChangeController(event)}
            InputLabelProps={{
            shrink: true,
            }}
            />
        </Grid>
        </Grid>

        <Button
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
export default Track;