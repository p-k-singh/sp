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

const DeliveryComponent = (props) => {
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

  const [Loading, setLoading] = React.useState(false);
  const [NoOfUnits, setNoOfUnits] = React.useState("");
  const [SpecialInstructions, setSpecialInstructions] = React.useState("");
  const [panDoc, setPanDoc] = useState();
  const [count, setCount] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);
  const [NoOfDamagedProducts, setNoOfDamagedProducts] = React.useState("");
  const onNoOfDamagedProductsChangeController = (event) => {
    setNoOfDamagedProducts(event.target.value);
  };

  useEffect(() => {
    getTaskProgress();
  }, []);

  const SendDeliveryChecklistData = async () => {
    let details = props.getTrackingIds(
      props.TrackingData,
      "DELIVERY_CHECKLIST"
    );

    const data = {
      trackingId: props.TrackingData.processId,
      stageId: details.stageId,
      taskId: details.taskId,
      custom: {
        data: {
          productDamagedinTransit: ProductDamagedinTransit,
          productPilferageinTransit: ProductPilferageinTransit,
          noOfDamagedProducts: NoOfDamagedProducts,
        },
        attachments: {},
      },
    };
    const payload = {
      body: data,
    };

    API.patch(
      "GoFlexeOrderPlacement",
      `/tracking?type=updateCustomFields`,
      payload
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

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

  const CompleteDeliveryChecklist = async () => {
    let details = props.getTrackingIds(
      props.TrackingData,
      "DELIVERY_CHECKLIST"
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

  const DeliveryChecklistComponent = (
    <Accordion expanded={DeliveryChecklistPending}>
      <AccordionSummary
        style={{
          backgroundColor: "rgba(0, 0, 0, .03)",
          borderBottom: "1px solid rgba(0, 0, 0, .125)",
        }}
        expandIcon={
          <ExpandMoreIcon
          // onClick={() => {
          //   setDeliveryChecklistPending(
          //     DeliveryChecklistPending == false ? true : false
          //   );
          // }}
          />
        }
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ borderBottom: "none" }}>
                  {DeliveryChecklistPending == false ? (
                    <Tooltip title="Done">
                      <Done style={{ color: "green" }} />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Pending">
                      <WarningIcon style={{ color: "orange" }} />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    borderBottom: "none",
                    fontSize: 20,
                    height: 50,
                    padding: 10,
                  }}
                >
                  Delivery CheckList
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
        >
          <Grid item sm={6} xs={12}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Checkbox
                        size="small"
                        color="primary"
                        onChange={(e) => {
                          setProductPilferageinTransit(e.target.checked);
                        }}
                        inputProps={{
                          "aria-label": "secondary checkbox",
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      Product Pilferage inTransit
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item sm={6} xs={12}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Checkbox
                        onChange={(e) => {
                          setProductDamagedinTransit(e.target.checked);
                        }}
                        size="small"
                        color="primary"
                        inputProps={{
                          "aria-label": "secondary checkbox",
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      Product Damaged in Transit
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>
          {ProductDamagedinTransit == true ? (
            <Grid item sm={6} xs={12}>
              <TextField
                type="number"
                required
                value={NoOfDamagedProducts}
                onChange={(event) =>
                  onNoOfDamagedProductsChangeController(event)
                }
                label="Number of Damaged Products"
                fullWidth
              />
            </Grid>
          ) : (
            <p></p>
          )}
          <Grid item xs={12}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  {ProductDamagedinTransit == true ? (
                    <TableRow>
                      <TableCell>
                        <label>Upload Photo of Damaged Product: </label>
                      </TableCell>{" "}
                      <TableCell>
                        <input style={{ marginLeft: "15px" }} type="file" />
                      </TableCell>
                    </TableRow>
                  ) : (
                    <p></p>
                  )}
                  <TableRow>
                    <TableCell>
                      <label>Upload Photo of UnLoaded Truck: </label>
                    </TableCell>{" "}
                    <TableCell>
                      <input style={{ marginLeft: "15px" }} type="file" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <label>Signed Document by Driver/executive: </label>
                    </TableCell>{" "}
                    <TableCell>
                      <input style={{ marginLeft: "15px" }} type="file" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <label>Signed Document by Customer: </label>
                    </TableCell>{" "}
                    <TableCell>
                      <input style={{ marginLeft: "15px" }} type="file" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <label>
                        {" "}
                        Consignors copy:{" "}
                        <span style={{ fontSize: 10 }}>
                          {" "}
                          (*Given to drop location.)
                        </span>{" "}
                      </label>
                      <p style={{ fontSize: 10 }}></p>
                    </TableCell>{" "}
                    <TableCell>
                      <input style={{ marginLeft: "15px" }} type="file" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <label>
                        Account Copy:
                        <span style={{ fontSize: 10 }}>
                          {" "}
                          (*Given to transporter for their records.)
                        </span>{" "}
                      </label>
                    </TableCell>{" "}
                    <TableCell>
                      <input style={{ marginLeft: "15px" }} type="file" />
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>
          <Button
            onClick={async () => {
              setDeliveryChecklistPending(false);
              setShipmentCompleted(true);
              setDeliveryList(false);
              await CompleteDeliveryChecklist();
              await SendDeliveryChecklistData();
            }}
            className="row"
            variant="contained"
            style={{
              float: "right",
              backgroundColor: "#f9a825",
              marginBottom: "10px",
              margin: 20,
            }}
          >
            Shipment Delivered
          </Button>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );

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
        Delivery in Progress
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
                  Arrived at Drop Location
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        {DeliveryChecklistComponent}
      </form>
    </div>
  );
};
export default DeliveryComponent;
