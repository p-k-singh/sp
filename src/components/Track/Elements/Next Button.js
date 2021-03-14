import React, { useContext } from "react";
import { FormContext } from "../FormContext";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Grid, Button } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";

const NextButton = ({ field_id, field_label, field_value }) => {
  const { handleSubmit } = useContext(FormContext);

  return (
      <Button
        onClick={handleSubmit}
        className="row"
        variant="contained"
        style={{
          float: "right",
          backgroundColor: "#f9a825",
          marginBottom: "10px",
          margin: 20,
        }}
      >
        {field_label}
      </Button>
  );
};

export default NextButton;
