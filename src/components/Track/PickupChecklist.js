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
import Element from "./Element";
import { FormContext } from "./FormContext";

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

const PickupChecklist = (props) => {

     const [elements, setElements] = useState(null);
     useEffect(() => {
       setElements(props.Tasks);
     }, []);
     const { taskType, page_label } = elements ?? {};
     const handleSubmit = (event) => {
       event.preventDefault();
       console.log(elements);
     };
     const handleChange = (id, event) => {
       const newElements = { ...elements };
       newElements.forEach((field) => {
         const { taskType, number } = field;
         if (id === number ) {
           switch (taskType) {
             case "checkbox":
               field["field_value"] = event.target.checked;
               break;

             default:
               field["field_value"] = event.target.value;
               break;
           }
         }
         setElements(newElements);
       });
       console.log(elements);
     };








  const classes = useStyles();
  const [ProductDamaged, setProductDamaged] = React.useState(false);
  const [ProductsPackedProperly, setProductsPackedProperly] = React.useState(
    false
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
    console.log(props.Tasks)
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

  const CompletePickupChecklist = async () => {
    setLoading(true);
    let details = props.getTrackingIds(props.TrackingData, "NUMBER_OF_UNIT");
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
          marginBottom: 30,
          fontWeight: 700,
        }}
        fullWidth
      >
        {props.StageName}
      </Typography>

      <FormContext.Provider value={{ handleChange }}>
        <div className="App container">
          <form>
            {" "}
            <Grid
              container
              spacing={3}
              style={{ paddingTop: 10, paddingBottom: 30 }}
            >
              {elements
                ? elements.map((field, i) => <Element key={i} field={field} />)
                : null}
            </Grid>
          </form>
        </div>
      </FormContext.Provider>

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
              onChange={(event) => onNoOfDamagedProductsChangeController(event)}
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
                      signed by drop location and return to source for records.
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
            onClick={async () => {
              await SendPickupChecklistData();
              await CompletePickupChecklist();
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
    </div>
  );
};
export default PickupChecklist;
