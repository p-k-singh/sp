import React, { useEffect, useState } from "react";
import Spinner from "../../UI/Spinner";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Button,
  Switch,
  Card,
  Container,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Tooltip from "@material-ui/core/Tooltip";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Auth, API } from "aws-amplify";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import EditIcon from "@material-ui/icons/Edit";
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

export default function WarehouseCostDetails(props) {
  const classes = useRowStyles();
  const [openedPages, setOpenedPages] = useState([]);
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [toEdit, setToEdit] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(async () => {
  //   setLoading(true)
  //   var currentUser = await Auth.currentUserInfo();
  //   var owner = currentUser.username;
  //   API.get(
  //     "GoFlexeOrderPlacement",
  //     `/serviceprovidercost?type=serviceProviderId&serviceProviderId=${owner}`
  //   )
  //     .then((response) => {
  //       console.log(response);
  //       setRows(response);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //       setLoading(false);
  //     });
  // }, []);

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

  const showEditPage = () => {
    setToEdit(!toEdit);
    props.editButtonClicked();
  };

  //   if (toEdit === true) {
  //     return (
  //       <EditForm row={rows[checkedBoxes[0]]} editButtonClicked={showEditPage} />
  //     );
  //   }
  if (loading === true) {
    return <Spinner />;
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
                  <IconButton onClick={() => showEditPage()}>
                    <Tooltip title="Edit">
                      <EditIcon label="Edit" color="primary" />
                    </Tooltip>
                  </IconButton>
                </TableCell>
              ) : (
                <TableCell />
              )}
              {checkedBoxes.length > 0 ? (
                <TableCell align="right">
                  <IconButton>
                    <Tooltip title="Delete">
                      <DeleteIcon color="secondary" />
                    </Tooltip>
                  </IconButton>
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
            <TableCell>Location</TableCell>
            <TableCell>Capacity</TableCell>

            <TableCell>Pricing</TableCell>
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
                      checked={isChecked(idx)}
                      name={idx}
                      onChange={(event) => handleChecked(event, idx)}
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.capability}
                  </TableCell>
                  <TableCell>
                    {row.capacity.lowCapacity}-{row.capacity.highCapacity} Tons
                  </TableCell>
                  <TableCell>
                    {row.rangeinkms.lowRange}-{row.rangeinkms.highRange} kms
                  </TableCell>
                  <TableCell>
                    ₹{" "}
                    {row.price == null
                      ? row.additionalDetails.immediatePricing
                      : row.price}{" "}
                  </TableCell>
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
                        <Grid container spacing={0} style={{ padding: 0 }}>
                          <Grid item xs={12} sm={6}>
                            <TableRow>
                              <TableCell
                                component="th"
                                scope="row"
                                style={{ borderBottom: "none" }}
                              >
                                Source Location :
                              </TableCell>
                              <TableCell style={{ borderBottom: "none" }}>
                                {row.additionalDetails.sourceLocation}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                component="th"
                                scope="row"
                                style={{ borderBottom: "none" }}
                              >
                                Immediate Pricing :
                              </TableCell>
                              <TableCell style={{ borderBottom: "none" }}>
                                ₹ {row.additionalDetails.immediatePricing}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                component="th"
                                scope="row"
                                style={{ borderBottom: "none" }}
                              >
                                Delivery Commitment :
                              </TableCell>
                              <TableCell style={{ borderBottom: "none" }}>
                                {row.additionalDetails.deliveryCommitment} Days
                              </TableCell>
                            </TableRow>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TableRow>
                              <TableCell
                                component="th"
                                scope="row"
                                style={{ borderBottom: "none" }}
                              >
                                Destination Location :
                              </TableCell>
                              <TableCell style={{ borderBottom: "none" }}>
                                {row.additionalDetails.destinationLocation}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                component="th"
                                scope="row"
                                style={{ borderBottom: "none" }}
                              >
                                30 Days Pricing :
                              </TableCell>
                              <TableCell style={{ borderBottom: "none" }}>
                                ₹ {row.additionalDetails.thirtyDaysPricing}
                              </TableCell>
                            </TableRow>
                          </Grid>
                        </Grid>
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
