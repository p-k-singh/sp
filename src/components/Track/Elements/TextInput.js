import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { FormContext } from "../FormContext";
import { Grid, Button } from "@material-ui/core";

const TextInput = ({ field_id, field_label, field_placeholder, field_value }) => {
  const { handleChange } = useContext(FormContext);
  return (
   
      <Grid item sm={6} xs={12}>
        <TextField
          fullWidth
          id="standard-password-input"
          label={field_label}
          type="text"
          value={field_value}
          onChange={(event) => handleChange(field_id, event)}
        />
      </Grid>
   
  );
};

export default TextInput;
