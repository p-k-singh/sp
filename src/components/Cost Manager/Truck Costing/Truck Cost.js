import Typography from "@material-ui/core/Typography";

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, Divider } from "@material-ui/core";
import AddTruckCost from "./Add Truck Cost";
import ShowTruckCost from "./Show Trucks Cost";

const useStyles = makeStyles({
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
  formControl: {
    marginTop: "1%",
  },
  container: {
    justifyContent: "space-between",
    flexDirection: "column",
    display: "flex",
  },
  btnHolder: {
    justifyContent: "flex-end",
    display: "flex",
    marginRight: "30px",
    marginBottom: "30px",
  },
});

const TruckCost = (props) => {
  const classes = useStyles();
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const editButtonClicked = () => {
    setEditForm(!editForm);
    // alert(rows[checkedBoxes[0]].productId)
  };
  return (
    <div>
      <div style={{ overflow: "hidden" }}>
        {!editForm && (
          <Button
            onClick={toggleForm}
            className="row AllButtons"
            variant="contained"
            style={{ marginBottom: "10px", float: "right" }}
          >
            {showForm === true ? "Cost Details" : "Add Cost Details"}
          </Button>
        )}
      </div>

      {!showForm && !editForm && (
        <Typography fullWidth className="TypographyTitle" gutterBottom>
          Your Added Cost Details
        </Typography>
      )}
      <div style={{ marginTop: "30px" }}></div>
      {showForm && <AddTruckCost toggleForm={toggleForm} />}

      {!showForm && <ShowTruckCost editButtonClicked={editButtonClicked} />}
      <div style={{ marginTop: "60px" }}></div>
    </div>
  );
};

export default TruckCost;
