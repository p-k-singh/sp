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

const Track = (props) => {
  const classes = useStyles();

  const [ProductDamaged, setProductDamaged] = React.useState(false);
  const [DeliveryList, setDeliveryList] = React.useState(false);
  const [ShipmentCompleted, setShipmentCompleted] = React.useState(false);
  const [ProductDamagedinTransit, setProductDamagedinTransit] = React.useState(
    false
  );
  const [LeftForPickup, setLeftForPickup] = React.useState(false);
  const [ArrivedAtPickup, setArrivedAtPickup] = React.useState(false);
  const [PickupChecklistPending, setPickupChecklistPending] = React.useState(
    true
  );
  const [
    DeliveryChecklistPending,
    setDeliveryChecklistPending,
  ] = React.useState(true);
  const [LeftForDelivery, setLeftForDelivery] = React.useState(false);
  const [ArrivedAtDrop, setArrivedAtDrop] = React.useState(false);
  const [TrackingData, setTrackingData] = React.useState([]);
  const [Loading, setLoading] = React.useState(false);
  const [NoOfUnits, setNoOfUnits] = React.useState("");
  const [SpecialInstructions, setSpecialInstructions] = React.useState("");
  const [panDoc, setPanDoc] = useState();
  const [currentTask, setCurrentTask] = useState(0);

  const onSpecialInstructionsChangeController = (event) => {
    setSpecialInstructions(event.target.value);
  };
  const onNoOfUnitsChangeController = (event) => {
    setNoOfUnits(event.target.value);
  };
  const onPanProofChange = (event) => {
    setPanDoc(event.target.files[0]);
  };

  useEffect(() => {
    getTrackingId();
  }, []);

  function getTrackingId() {
    API.get(
      "GoFlexeOrderPlacement",
      `/tracking?type=getProcess&orderId=${props.id}`
    )
      .then((resp) => {
        console.log(resp);
        setTrackingData(resp);
      })
      .catch((err) => {
        console.log(err);
        setLoading("false");
      });
  }
  const getTrackingIds = (TrackingData, TaskName) => {
    let details = null;
    TrackingData.stages.forEach((stage) => {
      // console.log(stage);
      stage.tasks.forEach((task) => {
        // alert(task.name + TaskName);
        if (task.name == TaskName) {
          details = {
            stageId: stage.stageId,
            taskId: task.taskId,
          };
        }
      });
    });
    return details;
  };

  function getTrackingTasks(resp) {
    var count = 0;
    var i;
    for (i = 0; i < resp.stages.length; i++) {
      if (resp.stages[i].status === "COMPLETED") {
        count++;
      }
      setCurrentTask(count);
    }
  }
  function getCurrentTask() {
    return [
      LeftForPickupComponent,
      ArrivedAtPickupComponent,
      PickupChecklistComponent,
      DeliveryComponent,
      DeliveryChecklistComponent,
    ];
  }

  const PickupChecklistData = async () => {
    let details = getTrackingIds(TrackingData, "PICKUP_CHECKLIST");
    const data = {
      trackingId: TrackingData.processId,
      stageId: details.stageId,
      taskId: details.taskId,
      custom: {
        data: {},
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
  const DeliveryChecklistData = async () => {
    let details = getTrackingIds(TrackingData, "DELIVERY_CHECKLIST");

    const data = {
      trackingId: TrackingData.processId,
      stageId: details.stageId,
      taskId: details.taskId,
      custom: {
        data: {},
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

  function ApiRequest(payload) {
    API.patch(
      "GoFlexeOrderPlacement",
      `/tracking?type=changeTaskStatus`,
      payload
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  const CompleteLeftforpickup = async () => {
    let details = getTrackingIds(TrackingData, "DRIVER_OTW");
    const data = {
      trackingId: TrackingData.processId,
      stageId: details.stageId,
      taskId: details.taskId,
      status: "NEXT",
    };
    const payload = {
      body: data,
    };
    ApiRequest(payload);
  };

  const CompleteArrivedAtPickup = async () => {
    let details = getTrackingIds(TrackingData, "ARRIVED_AT_PICKUP");
    const data = {
      trackingId: TrackingData.processId,
      stageId: details.stageId,
      taskId: details.taskId,
      status: "NEXT",
    };
    const payload = {
      body: data,
    };
    ApiRequest(payload);
  };
  const CompletePickupChecklist = async () => {
    let details = getTrackingIds(TrackingData, "PICKUP_CHECKLIST");
    const data = {
      trackingId: TrackingData.processId,
      stageId: details.stageId,
      taskId: details.taskId,
      status: "NEXT",
    };
    const payload = {
      body: data,
    };
    ApiRequest(payload);
  };
  const CompleteArrivedAtDrop = async () => {
    let details = getTrackingIds(TrackingData, "ARRIVED_AT_DROP_LOCATION");
    const data = {
      trackingId: TrackingData.processId,
      stageId: details.stageId,
      taskId: details.taskId,
      status: "NEXT",
    };
    const payload = {
      body: data,
    };
    ApiRequest(payload);
  };

  const CompleteDeliveryChecklist = async () => {
    let details = getTrackingIds(TrackingData, "DELIVERY_CHECKLIST");
    const data = {
      trackingId: TrackingData.processId,
      stageId: details.stageId,
      taskId: details.taskId,
      status: "NEXT",
    };
    const payload = {
      body: data,
    };
    ApiRequest(payload);
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
            onClick={() => {
              setPickupChecklistPending(
                PickupChecklistPending == false ? true : false
              );
            }}
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
              // variant="outlined"
              // size="small"
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
                          onChange={(event) => onPanProofChange(event)}
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
          <Button
            onClick={() => {
              setDeliveryList(true);
              setLeftForDelivery(true);
              setPickupChecklistPending(false);
              CompletePickupChecklist();
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
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
  const ArrivedAtPickupComponent = (
    <TableRow>
      <TableCell>
        <Radio
          disabled={ArrivedAtPickup == true ? true : false}
          value="checkedA"
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
  );
  const LeftForPickupComponent = (
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
      <form>
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
        ></Grid>

        <TableContainer component={Paper} fullWidth>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Radio
                    color="primary"
                    disabled={LeftForPickup == true ? true : false}
                    onChange={(e) => {
                      setLeftForPickup(e.target.checked);
                      CompleteLeftforpickup();
                    }}
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
                  Left for Pickup
                </TableCell>
              </TableRow>
              {LeftForPickup == true ? ArrivedAtPickupComponent : <p></p>}
            </TableHead>
          </Table>
        </TableContainer>

        {ArrivedAtPickup == true ? PickupChecklistComponent : <p></p>}

        {LeftForDelivery == true ? (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      value="checkedA"
                      disabled={ArrivedAtDrop == true ? true : false}
                      onChange={(e) => {
                        setArrivedAtDrop(e.target.checked);
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
                    Arrived at Drop Location
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        ) : (
          <p></p>
        )}
        {ArrivedAtDrop == true ? (
          <Accordion expanded={DeliveryChecklistPending}>
            <AccordionSummary
              style={{
                backgroundColor: "rgba(0, 0, 0, .03)",
                borderBottom: "1px solid rgba(0, 0, 0, .125)",
              }}
              expandIcon={
                <ExpandMoreIcon
                  onClick={() => {
                    setDeliveryChecklistPending(
                      DeliveryChecklistPending == false ? true : false
                    );
                  }}
                />
              }
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {/* <Typography
                fullWidth
                className={classes.title}
                gutterBottom
                inline
                variant="body1"
                align="left"
                style={{ paddingTop: 15 }}
              >
                Delivery CheckList{" "}
                {DeliveryChecklistPending == false ? (
                  <Tooltip title="Done">
                    <Done style={{ color: "green" }} />
                  </Tooltip>
                ) : (
                  <Tooltip title="Pending">
                    <WarningIcon style={{ color: "orange" }} />
                  </Tooltip>
                )}
              </Typography> */}
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
                              <input
                                style={{ marginLeft: "15px" }}
                                type="file"
                              />
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
                      </TableHead>
                    </Table>
                  </TableContainer>
                </Grid>
                <Button
                  onClick={() => {
                    setDeliveryChecklistPending(false);
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
        ) : (
          <p></p>
        )}
      </form>
    </div>
  );

  const DeliveryChecklistComponent = (
    <Accordion expanded={DeliveryChecklistPending}>
      <AccordionSummary
        style={{
          backgroundColor: "rgba(0, 0, 0, .03)",
          borderBottom: "1px solid rgba(0, 0, 0, .125)",
        }}
        expandIcon={
          <ExpandMoreIcon
            onClick={() => {
              setDeliveryChecklistPending(
                DeliveryChecklistPending == false ? true : false
              );
            }}
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
            onClick={() => {
              setDeliveryChecklistPending(false);
              setShipmentCompleted(true);
              setDeliveryList(false);
              CompleteDeliveryChecklist();
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
  const DeliveryComponent = (
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
        {LeftForDelivery == true ? (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      value="checkedA"
                      disabled={ArrivedAtDrop == true ? true : false}
                      onChange={(e) => {
                        setArrivedAtDrop(e.target.checked);
                        CompleteArrivedAtDrop();
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
                    Arrived at Drop Location
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        ) : (
          <p></p>
        )}
        {ArrivedAtDrop == true ? DeliveryChecklistComponent : <p></p>}
      </form>
    </div>
  );

  if (DeliveryList === true) {
    return DeliveryComponent;
  } else if (ShipmentCompleted == true) {
    return (
      <div style={{ overflow: "hidden", marginTop: "20px" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: 40,
            height: 50,
            padding: 10,
            paddingLeft: 0,
            paddingBottom: 40,
            fontWeight: 700,
          }}
          fullWidth
        >
          Shipment Delivered
        </h1>
      </div>
    );
  } else {
    return LeftForPickupComponent;
  }
};
export default Track;
