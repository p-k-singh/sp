import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { TextField, Grid, Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Table from "@material-ui/core/Table";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Done from "@material-ui/icons/Done";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import WarningIcon from "@material-ui/icons/Warning";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { API, Auth } from "aws-amplify";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 20,
    height: 50,
    padding: 10,
    paddingLeft: 55,
  },
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
});

const ArrivedAtDrop = (props) => {
  const classes = useStyles();
  const [DeliveryList, setDeliveryList] = React.useState(false);
  const [ShipmentCompleted, setShipmentCompleted] = React.useState(false);
  const [ProductDamagedinTransit, setProductDamagedinTransit] = React.useState(
    false
  );
  const [
    ProductPilferageinTransit,
    setProductPilferageinTransit,
  ] = React.useState(false);

  const [
    DeliveryChecklistPending,
    setDeliveryChecklistPending,
  ] = React.useState(true);
  const [LeftForDelivery, setLeftForDelivery] = React.useState(false);
  const [ArrivedAtDrop, setArrivedAtDrop] = React.useState(false);
  const [NoOfDamagedProducts, setNoOfDamagedProducts] = React.useState("");
  const onNoOfDamagedProductsChangeController = (event) => {
    setNoOfDamagedProducts(event.target.value);
  };

  useEffect(() => {
    getTaskProgress();
  }, []);


  const CompleteArrivedAtDrop = async () => {
    let details = props.getTrackingIds(
      props.TrackingData,
      "ARRIVED_AT_DROP_LOCATION"
    );
    const data = {
      trackingId: props.TrackingData.processId,
      stageId: details.stageId,
      taskId: details.taskId,
      status: "NEXT",
    };
    const payload = {
      body: data,
    };
    props.ApiRequest(payload);
  };

  const getTaskProgress = () => {
    props.TrackingData.stages.forEach((stage) => {
      stage.tasks.forEach((task) => {
        if (
          task.name == "ARRIVED_AT_DROP_LOCATION" &&
          task.status == "COMPLETED"
        ) {
          setArrivedAtDrop(true);
          return;
        }
      });
    });
  };

  return (
    <div style={{ overflow: "hidden", marginTop: "20px" }}>
      <Typography
        style={{
          borderBottom: `1px solid black`,
          fontSize: 20,
          height: 50,
          padding: 10,
          paddingLeft: 30,
          fontWeight: 700,
        }}
        fullWidth
      >
        {props.Tasks[0].taskLabel}
      </Typography>

      <form>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Radio
                    value="checkedA"
                    disabled={ArrivedAtDrop == true ? true : false}
                    checked={ArrivedAtDrop == true ? true : false}
                    onChange={(e) => {
                      setArrivedAtDrop(e.target.checked);
                      CompleteArrivedAtDrop();
                    }}
                    size="small"
                    color="primary"
                    inputProps={{ "aria-label": "secondary Radio" }}
                  />
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontSize: 20,
                    height: 50,
                    padding: 10,
                  }}
                >
                  {props.Tasks[0].taskLabel}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </form>
    </div>
  );
};
export default ArrivedAtDrop;
