/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Auth, API } from "aws-amplify";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@material-ui/core";
import Spinner from "../UI/Spinner";
import EditCapacity from "./EditCapacity";
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});
function Row(props, idx) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return <React.Fragment></React.Fragment>;
}

export default function CollapsibleTable(props) {
  const classes = useRowStyles();
  const [openedPages, setOpenedPages] = useState([]);
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditPage, setShowEditPage] = useState(false);
  const [rows, setRows] = useState([]);
  useEffect(async () => {
    var currentUser = await Auth.currentUserInfo();
    var owner = currentUser.username;
    API.get("GoFlexeOrderPlacement", `/capacity?type=owner&ownerId=${owner}`)
      .then((response) => {
        // Add your code here
        console.log(response);
        setRows(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  }, [showEditPage]);
  const handleOpen = (event, idx) => {
    const selectedIndex = openedPages.indexOf(idx);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(openedPages, idx);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(openedPages.slice(1));
    } else if (selectedIndex === openedPages.length - 1) {
      newSelected = newSelected.concat(openedPages.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        openedPages.slice(0, selectedIndex),
        openedPages.slice(selectedIndex + 1)
      );
    }

    setOpenedPages(newSelected);
  };

  const handleChecked = (event, idx) => {
    const selectedIndex = checkedBoxes.indexOf(idx);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(checkedBoxes, idx);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(checkedBoxes.slice(1));
    } else if (selectedIndex === checkedBoxes.length - 1) {
      newSelected = newSelected.concat(checkedBoxes.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        checkedBoxes.slice(0, selectedIndex),
        checkedBoxes.slice(selectedIndex + 1)
      );
    }

    setCheckedBoxes(newSelected);
  };

  const isOpened = (idx) => openedPages.indexOf(idx) !== -1;
  const isChecked = (idx) => checkedBoxes.indexOf(idx) !== -1;
  if (loading === true) {
    return <Spinner />;
  }
  const onEditButtonClicked = () => {
    setShowEditPage(!showEditPage);
  };
  if (showEditPage === true) {
    return (
      <EditCapacity
        row={rows[checkedBoxes[0]]}
        onEditButtonClicked={onEditButtonClicked}
      />
    );
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        {checkedBoxes.length > 0 && (
          <TableHead>
            <TableRow>
              <TableCell />

              <TableCell />
              <TableCell />
              {checkedBoxes.length === 1 ? (
                <TableCell align="right">
                  <Button
                    onClick={() => onEditButtonClicked()}
                    variant="contained"
                    color="default"
                    className={classes.button}
                    // startIcon={<EditIcon label="Edit" />}
                  >
                    Edit
                  </Button>
                </TableCell>
              ) : (
                <TableCell />
              )}
              {checkedBoxes.length > 0 ? (
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    //startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </TableCell>
              ) : (
                <TableCell />
              )}
            </TableRow>
          </TableHead>
        )}
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Type</TableCell>

            <TableCell align="left">Capacity</TableCell>
            <TableCell align="left">Capability</TableCell>
            {/* <TableCell align="right">Ownership</TableCell>
            <TableCell align="right">Location</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => {
            const isItemOpened = isOpened(idx);
            const labelId = `enhanced-table-checkbox-${idx}`;
            return (
              <React.Fragment>
                <TableRow className={classes.root}>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={(event) => handleOpen(event, idx)}
                    >
                      {isItemOpened ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                    <Checkbox
                      size="small"
                      color="primary"
                      name={idx}
                      checked={isChecked(idx)}
                      onChange={(event) => handleChecked(event, idx)}
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.assetType === "truck" ? "Truck" : "Warehouse"}
                  </TableCell>
                  <TableCell align="left">
                    {row.capacity} Tons
                    {/* {row.unitOfMeasurement} */}
                  </TableCell>
                  <TableCell align="left">{row.capability}</TableCell>
                  {/* <TableCell align="right">{row.ownershipType}</TableCell>
                  <TableCell align="right">{row.location}</TableCell> */}
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse in={isItemOpened} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                          More Details
                        </Typography>
                        <TableRow>
                          <th>Capability: </th>
                          <td> {row.capability}</td>
                        </TableRow>
                        <TableRow>
                          <th>Asset Id: </th>
                          <td> {row.assetId}</td>
                        </TableRow>
                        <TableRow>
                          <th>Available From: </th>
                          <td> {row.availableFromDateTime}(yyyy-mm-dd-Time)</td>
                        </TableRow>
                        <TableRow>
                          <th>Available To: </th>
                          <td> {row.availableToDateTime}(yyyy-mm-dd-Time) </td>
                        </TableRow>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
