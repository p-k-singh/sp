import React, { useContext } from "react";
import { FormContext } from "../FormContext";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Checkbox as MaterialCheckbox} from "@material-ui/core";
import { Grid, Button } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";


const Checkbox = ({ field_id, field_label, field_value }) => {
  const { handleChange } = useContext(FormContext);

  return (
    <Grid item sm={6} xs={12}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <MaterialCheckbox
                  size="small"
                  color="primary"
                  checked={field_value}
                  onChange={(event) => handleChange(field_id, event)}
                  inputProps={{
                    "aria-label": "secondary checkbox",
                  }}
                />
              </TableCell>
              <TableCell
                align="left"
                style={{
                  paddingRight: 100,
                }}
              >
                {field_label}
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default Checkbox;
