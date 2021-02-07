import React, { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { Auth, API } from "aws-amplify";

import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import {Button} from "@material-ui/core";
import { IconButton } from "@material-ui/core";
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

//type   3   15	ton	self/outsorced	loc.	Capability	dateTime(from and to)
// const rows = [
//     {
//         driverName:'Persona1',
//         driverPhone:8252782927,
//         licenceId:'KHOPS5817Q'
//     },
//     {
//         driverName:'Persona2',
//         driverPhone:6350108758,
//         licenceId:'KHGJFN85Q'
//     },
//     {
//         driverName:'Persona3',
//         driverPhone:784152953,
//         licenceId:'KWGR2817Q'
//     },
//     {
//         driverName:'Persona4',
//         driverPhone:7413698521,
//         licenceId:'WBFJF147Q'
//     },

// ];

export default function CollapsibleTable(props) {
  const classes = useRowStyles();
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [loading, setLoading] = useState("true");
  const [rows, setRows] = useState();

  function loadData() {
    setLoading("true");
    Auth.currentUserInfo()
      .then((userDetails) => {
        API.get(
          "GoFlexeOrderPlacement",
          `/kyc/info?type=serviceprovider&id=${userDetails.username}`
        )
          .then((resp) => {
            console.log(resp);
            if (resp.length === 0) {
              setRows([]);
            } else {
              setRows(resp[0].drivers);
            }
            setLoading("false");
          })
          .catch((err) => {
            console.log(err);
            setLoading("error");
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading("error");
      });
  }
  useEffect(() => {
    loadData();
  }, []);

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

  if (loading === "error") {
    return (
      <div>
        <h1>An error occured, Please try later</h1>
      </div>
    );
  }
  if (loading === "true") {
    return <Spinner />;
  }
  if (rows.length === 0) {
    return <div style={{ textAlign: "center" }}>No Driver Added</div>;
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
                <TableCell >
                  <Button
                    
                    variant="contained"
                    color="default"
                    className={classes.button}
                   // startIcon={<EditIcon label="Edit" />}
                  >
                    Edit
                  </Button>{" "}
                </TableCell>
              ) : (
                <TableCell />
              )}
              {checkedBoxes.length > 0 ? (
                <TableCell >
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
            <TableCell>
              <IconButton onClick={() => loadData()}>
                <RefreshIcon label="Edit" color="primary" />{" "}
              </IconButton>
            </TableCell>
            <TableCell>Driver Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Licence Id</TableCell>
            <TableCell>Licence</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => {
            return (
              <React.Fragment>
                <TableRow className={classes.root}>
                  <TableCell>
                    <Checkbox
                      size="small"
                      color="primary"
                      name={idx}
                      onChange={(event) => handleChecked(event, idx)}
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.licenceId}</TableCell>
                  <TableCell>
                  <a href={'https://goflexe-kyc.s3.ap-south-1.amazonaws.com/'+row.licenceUrl} target={'_blank'} >Open</a>
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