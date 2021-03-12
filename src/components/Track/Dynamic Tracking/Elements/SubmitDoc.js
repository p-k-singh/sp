import React, { useContext } from "react";
import { FormContext } from "../FormContext";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";

const SubmitDocument = ({ field_id, field_label, field_value }) => {
  const { handleChange } = useContext(FormContext);

  return (
    <div>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <label>
                  {field_label}
                  <span style={{ fontSize: 10 }}></span>{" "}
                </label>
                <p style={{ fontSize: 10 }}></p>
              </TableCell>{" "}
              <TableCell>
                <input
                  style={{ marginLeft: "15px" }}
                  type="file"
                  onChange={(event) => handleChange(field_id, event)}
                />
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SubmitDocument;
