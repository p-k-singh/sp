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

const ArrivedAtPickupComponent = (props) => {

   const [elements, setElements] = useState(null);
   useEffect(() => {
     setElements(props.Tasks);
   }, []);
   const { taskType, page_label } = elements ?? {};

   const handleSubmit = (id, event) => {
     console.log(elements);
   };

   const handleChange = (id, event) => {
     var newElements = elements.slice();
     newElements.forEach((field) => {
       const { taskType, taskId } = field;
       if (id == taskId) {
         switch (taskType) {
           case "checkbox":
             field["field_value"] = event.target.checked;
             break;
           case "input-attachment":
             field["field_value"] = event.target.files[0];
             break;
           default:
             field["field_value"] = event.target.value;
             break;
         }
       }
     });
     //  console.log(newElements);
     setElements(newElements);
     console.log(elements);
   };





  const classes = useStyles();
  const [ArrivedAtPickup, setArrivedAtPickup] = React.useState(false);

  useEffect(() => {
    getTaskProgress();
  }, []);


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
        {props.StageName}
      </Typography>
      <FormContext.Provider value={{ handleChange, handleSubmit }}>
        <div className="App container">
          <form>
            {" "}
           
              {elements
                ? elements.map((field, i) => (
                    <center>
                      <Element key={i} field={field} />
                    </center>
                  ))
                : null}
            
          </form>
        </div>
      </FormContext.Provider>
      {/* <TableContainer>
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
                {props.Tasks[0].taskLabel}
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>{" "}
    </div> */}
     </div>
  );
};
export default ArrivedAtPickupComponent;
