import React, { useContext } from "react";
import { FormContext } from "../FormContext";
import { TextField, Grid, Button } from "@material-ui/core";

const SubmitDocument = ({ field_id, field_label, field_value }) => {
  const { handleChange } = useContext(FormContext);

  return (
    <Grid item sm={12} xs={12}>
      <Grid
        container
        spacing={0}
        style={{
          borderBottom: `1px solid grey`,
        }}
      >
        <Grid item sm={4} xs={12}>
          <label>
            {field_label}
            <span style={{ fontSize: 10 }}></span>{" "}
          </label>
          <p style={{ fontSize: 10 }}></p>
        </Grid>
        <Grid item sm={6} xs={12}>
          <input
            style={{ marginLeft: "15px" }}
            type="file"
            onChange={(event) => handleChange(field_id, event)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SubmitDocument;
