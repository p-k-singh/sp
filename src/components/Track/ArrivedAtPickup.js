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
import Spinner from "../UI/Spinner";

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

const ArrivedAtPickupComponent = (props) => {
  const classes = useStyles();
  const [ProductDamaged, setProductDamaged] = React.useState(false);
  const [ProductsPackedProperly, setProductsPackedProperly] = React.useState(
    false
  );
  const [ArrivedAtPickup, setArrivedAtPickup] = React.useState(false);
  const [PickupChecklistPending, setPickupChecklistPending] = React.useState(
    true
  );
  const [Loading, setLoading] = React.useState(false);
  const [NoOfUnits, setNoOfUnits] = React.useState("");
  const [NoOfDamagedProducts, setNoOfDamagedProducts] = React.useState("");
  const [SpecialInstructions, setSpecialInstructions] = React.useState("");
  const onSpecialInstructionsChangeController = (event) => {
    setSpecialInstructions(event.target.value);
  };
  const onNoOfUnitsChangeController = (event) => {
    setNoOfUnits(event.target.value);
  };
  const onNoOfDamagedProductsChangeController = (event) => {
    setNoOfDamagedProducts(event.target.value);
  };

  useEffect(() => {
    getTaskProgress();
  }, []);

  const SendPickupChecklistData = async () => {
    setLoading(true);
    let details = props.getTrackingIds(props.TrackingData, "PICKUP_CHECKLIST");
    const data = {
      trackingId: props.TrackingData.processId,
      stageId: details.stageId,
      taskId: details.taskId,
      custom: {
        data: {
          noOfUnits: NoOfUnits,
          specialInstructions: SpecialInstructions,
          productDamaged: ProductDamaged,
          productsPackedProperly: ProductsPackedProperly,
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
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  };
  const CompleteArrivedAtPickup = async () => {
    let details = props.getTrackingIds(props.TrackingData, "ARRIVED_AT_PICKUP");
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
  const CompletePickupChecklist = async () => {
    setLoading(true);
    let details = props.getTrackingIds(props.TrackingData, "PICKUP_CHECKLIST");
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
    setLoading(false);
  };

  const getTaskProgress = () => {
    props.TrackingData.stages.forEach((stage) => {
      stage.tasks.forEach((task) => {
        if (task.name == "ARRIVED_AT_PICKUP" && task.status == "COMPLETED") {
          setArrivedAtPickup(true);
          return;
        }
      });
    });
  };

  const PickupChecklistComponent = (
    <Accordion expanded={PickupChecklistPending}>
      <AccordionSummary
        style={{
          backgroundColor: "rgba(0, 0, 0, .03)",
          borderBottom: "1px solid rgba(0, 0, 0, .125)",
        }}
        expandIcon={
          <ExpandMoreIcon
          // onClick={() => {
          //   setPickupChecklistPending(
          //     PickupChecklistPending == false ? true : false
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
                  {PickupChecklistPending == false ? (
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
                  Pickup CheckList
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
            <TextField
              type="number"
              required
              label="Number of Units"
              fullWidth
              value={NoOfUnits}
              onChange={(event) => onNoOfUnitsChangeController(event)}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              // variant="outlined"
              // size="small"
              type="text"
              value={SpecialInstructions}
              onChange={(event) => onSpecialInstructionsChangeController(event)}
              label="Special Instructions"
              fullWidth
            />
          </Grid>
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
                          setProductsPackedProperly(e.target.checked);
                        }}
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
                      Products Packed Properly
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>
          {ProductDamaged == true ? <Grid item sm={6} xs={12}></Grid> : <p></p>}
          <Grid item sm={6} xs={12}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Checkbox
                        onChange={(e) => {
                          setProductDamaged(e.target.checked);
                        }}
                        size="small"
                        color="primary"
                        inputProps={{
                          "aria-label": "secondary checkbox",
                        }}
                      />
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        paddingRight: 130,
                      }}
                    >
                      Product Damaged
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>
          {ProductDamaged == true ? (
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
                  {ProductDamaged == true ? (
                    <TableRow>
                      <TableCell>
                        <label>Upload Photo of Damaged Product: </label>
                      </TableCell>{" "}
                      <TableCell>
                        <input
                          style={{ marginLeft: "15px" }}
                          type="file"
                          //onChange={(event) => onPanProofChange(event)}
                        />
                      </TableCell>
                    </TableRow>
                  ) : (
                    <p></p>
                  )}
                  <TableRow>
                    <TableCell>
                      <label>Upload Photo of Loaded Truck: </label>
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
                      <label>Source Copy: </label>
                      <p style={{ fontSize: 10 }}>
                        signed by drop location and return to source for
                        records.
                      </p>
                    </TableCell>{" "}
                    <TableCell>
                      <input style={{ marginLeft: "15px" }} type="file" />
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>
          {Loading == true ? (
            <Spinner />
          ) : (
            <Button
              onClick={() => {
                CompletePickupChecklist();
                SendPickupChecklistData();
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
              Pickup Completed
            </Button>
          )}
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
        Pickup in Progress
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Radio
                  disabled={ArrivedAtPickup == true ? true : false}
                  value="checkedA"
                  checked={ArrivedAtPickup == true ? true : false}
                  onChange={(e) => {
                    setArrivedAtPickup(e.target.checked);
                    CompleteArrivedAtPickup();
                  }}
                  size="small"
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
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
                Arrived at Pickup Location
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>{" "}
      {PickupChecklistComponent}
    </div>
  );
};
export default ArrivedAtPickupComponent;
