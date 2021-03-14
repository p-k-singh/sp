import React, { useContext } from "react";
import { FormContext } from "../FormContext";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Checkbox as MaterialCheckbox} from "@material-ui/core";


const Checkbox = ({ field_id, field_label, field_value }) => {
  const { handleChange } = useContext(FormContext);

  return (
    <div>
      <FormControlLabel
        control={
          <MaterialCheckbox
           checked={field_value}
        onChange={(event) => handleChange(field_id, event)}
            name="checkedB"
            color="primary"
          />
        }
        label= {field_label}
      />
    </div>
  );
};

export default Checkbox;
