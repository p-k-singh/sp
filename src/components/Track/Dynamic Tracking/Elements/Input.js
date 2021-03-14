import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { FormContext } from "../FormContext";

const Input = ({ field_id, field_label, field_placeholder, field_value }) => {
  const { handleChange } = useContext(FormContext);
  return (
    <div>
      <TextField
        id="standard-password-input"
        label={field_label}
        type="text"
        value={field_value}
        onChange={(event) => handleChange(field_id, event)}
      />
    </div>
  );
};

export default Input;
