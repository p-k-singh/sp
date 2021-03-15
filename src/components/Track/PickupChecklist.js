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
    
    
     const handleSubmit = (id, event) => {
       CompletePickupChecklist()
     };

     const handleChange = (Id, event) => {
       var newElements = elements.slice() 
       newElements.forEach((field) => {
         const { type, id } = field.show_fields[0];
         if (Id == id ) {
           switch (type) {
             case "checkbox":
              field.read_fields[0]["value"] = event.target.checked;
               break;
             case "input-attachment":
              field.read_fields[0]["value"] = event.target.files[0];
               break;
             default:
               field.read_fields[0]["value"] = event.target.value;
               break;
           }
         }
       });
      //  console.log(newElements);
       setElements(newElements);
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

  const SendPickupChecklistData = () => {
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
    let resTasks = [];
    props.TrackingData.stages.forEach((stage) => {
      if (stage.stageId === props.StageId) {
        stage.tasks.forEach((task) => {
          const resTask = {
            taskId: task.taskId,
            status: "NEXT",
          };
          resTasks.push(resTask);
        });
      }
    });

    const data = {
      trackingId: props.TrackingData.processId,
      stageId: props.StageId,
      tasks: resTasks,
    };
    const payload = {
      body: data,
    };
    props.BulkUpdateApiRequest(payload);
    setLoading(false);
  };

  // const CompletePickupChecklist = async () => {
  //   setLoading(true);
  //   let details = props.getTrackingIds(props.TrackingData, "NUMBER_OF_UNIT");
  //   const data = {
  //     trackingId: props.TrackingData.processId,
  //     stageId: details.stageId,
  //     taskId: details.taskId,
  //     status: "NEXT",
  //   };
  //   const payload = {
  //     body: data,
  //   };
  //   props.BulkUpdateApiRequest(payload);
  //   setLoading(false);
  // };

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

      <FormContext.Provider value={{ handleChange, handleSubmit }}>
        <div className="App container">
          <form>
            {" "}
            <Grid
              container
              spacing={3}
              style={{ paddingTop: 10, paddingBottom: 30 }}
            >
              {elements
                ? elements.map((field, i) => (
                    <Element
                      key={field.show_fields[0].id}
                      field={field.show_fields[0]}
                    />
                  ))
                : null}
            </Grid>
          </form>
        </div>
      </FormContext.Provider>
    </div>
  );
};
export default PickupChecklist;
