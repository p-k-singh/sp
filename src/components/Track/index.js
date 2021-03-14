import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { API, Auth } from "aws-amplify";
import LeftForPickupComponent from "./LeftForPickup";
import ArrivedAtPickupComponent from "./ArrivedAtPickup";
import DeliveryComponent from "./ArrivedForDelivery";
import Spinner from "../UI/Spinner";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tracking from "./Dynamic Tracking/Tracking"
import DeliveryChecklist from "./DeliveryChecklist";
import PickupChecklist from "./PickupChecklist";
import ArrivedAtDrop from "./ArrivedForDelivery";

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
  const [TrackingData, setTrackingData] = React.useState([]);
  const [Loading, setLoading] = React.useState(false);
  const [count, setCount] = useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const [AllStageNames, setAllStageNames] = React.useState([]);
  const [StageDescription, setStageDescription] = React.useState([]);
  const [CurrentStageName, setCurrentStageName] = React.useState([]);
  const [CurrentStageId, setCurrentStageId] = React.useState("");
  const [Tasks, setTasks] = React.useState([]);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  let params = null;
  if (props.id) {
    params = {
      id: props.id,
    };
  } else {
    console.log(props);
    params = {
      id: props.match.params.id,
    };
  }

  useEffect(() => {
    console.log(props);
    getTrackingData();
  }, []);

  function getTrackingData() {
    setLoading(true);
    API.get(
      "GoFlexeOrderPlacement",
      `/tracking?type=getProcess&orderId=${params.id}`
    )
      .then((resp) => {
        console.log(resp);
        setTrackingData(resp);
        FindStage(resp);
        getAllStageNames(resp);
        getCurrentTrackingStage(resp);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function getCurrentTrackingStage(resp) {
    var count = 0;
    resp.stages.forEach((stage) => {
      if (stage.status == "COMPLETED") {
        count++;
      }
    });
    setActiveStep(count);
  }

  const getAllStageNames = (resp) => {
    var tempAllStageNames = [];
     var tempStageDescription = [];
    var i;
    for (i = 0; i < resp.stages.length; i++) {
      tempAllStageNames.push(resp.stages[i].stageLabel);
      tempStageDescription.push(resp.stages[i].description)
    }
    setAllStageNames(tempAllStageNames);
    setStageDescription(tempStageDescription);
  };

  function FindStage(resp) {
    var temp = 0;
    var i;
    for (i = 0; i < resp.stages.length; i++) {
      if (
        resp.stages[i].status === "INACTIVE" ||
        resp.stages[i].status === "PENDING"
      ) {
        setCurrentStageName(resp.stages[i].stageLabel);
        setCurrentStageId(resp.stages[i].stageId);
        setTasks(resp.stages[i].tasks);
        break;
      }
      temp++;
    }
    setCount(temp);
  }

  const getTrackingIds = (trackingData, TaskName) => {
    let details = null;
    trackingData.stages.forEach((stage) => {
      stage.tasks.forEach((task) => {
        if (task.name == TaskName) {
          details = {
            trackingId: TrackingData.processId,
            stageId: stage.stageId,
            taskId: task.taskId,
          };
        }
      });
    });
    return details;
  };

  function ApiRequest(payload) {
    setLoading(true);
    API.patch(
      "GoFlexeOrderPlacement",
      `/tracking?type=changeTaskStatus`,
      payload
    )
      .then((response) => {
        console.log(response);
        setTrackingData(response);
        FindStage(response);
        getCurrentTrackingStage(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  }

  function BulkUpdateApiRequest(payload) {
    setLoading(true);
    API.patch(
      "GoFlexeOrderPlacement",
      `/tracking?type=bulkUpdateTaskStatus`,
      payload
    )
      .then((response) => {
        console.log(response);
        setTrackingData(response);
        FindStage(response);
        getCurrentTrackingStage(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  }
  

  function getSteps() {
    return AllStageNames;
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return "Waiting for Allocation";
      case 1:
        return (
          <LeftForPickupComponent
            getTrackingIds={getTrackingIds}
            ApiRequest={ApiRequest}
            BulkUpdateApiRequest={BulkUpdateApiRequest}
            TrackingData={TrackingData}
            StageName={CurrentStageName}
            Tasks={Tasks}
            StageId = {CurrentStageId}
          />
        );
      case 2:
        return (
          <ArrivedAtPickupComponent
            getTrackingIds={getTrackingIds}
            ApiRequest={ApiRequest}
            BulkUpdateApiRequest={BulkUpdateApiRequest}
            TrackingData={TrackingData}
            StageName={CurrentStageName}
            Tasks={Tasks}
            StageId={CurrentStageId}
          />
        );
      case 3:
        return (
          <PickupChecklist
            getTrackingIds={getTrackingIds}
            ApiRequest={ApiRequest}
            BulkUpdateApiRequest={BulkUpdateApiRequest}
            TrackingData={TrackingData}
            StageName={CurrentStageName}
            Tasks={Tasks}
            StageId={CurrentStageId}
          />
        );
      case 4:
        return (
          <ArrivedAtDrop
            getTrackingIds={getTrackingIds}
            ApiRequest={ApiRequest}
            BulkUpdateApiRequest={BulkUpdateApiRequest}
            TrackingData={TrackingData}
            StageName={CurrentStageName}
            Tasks={Tasks}
            StageId={CurrentStageId}
          />
        );

      case 5:
        return (
          <DeliveryChecklist
            getTrackingIds={getTrackingIds}
            ApiRequest={ApiRequest}
            BulkUpdateApiRequest={BulkUpdateApiRequest}
            TrackingData={TrackingData}
            StageName={CurrentStageName}
            Tasks={Tasks}
            StageId={CurrentStageId}
          />
        );

      default:
        return "Unknown stepIndex";
    }
  }

  if (Loading === true) {
    return <Spinner />;
  }
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            {/* <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );

  // if (Loading === true) {
  //   return <Spinner />;
  // }
  // if (count == 0) {
  //   return (
  //     <div>
  //       <h1>Waiting for Allocation</h1>
  //     </div>
  //   );
  // }
  // if (count == 1) {
  //   return (
  //     <LeftForPickupComponent
  //       getTrackingIds={getTrackingIds}
  //       ApiRequest={ApiRequest}
  //       TrackingData={TrackingData}
  //     />
  //   );
  // }
  // if (count == 2) {
  //   return (
  //     <ArrivedAtPickupComponent
  //       getTrackingIds={getTrackingIds}
  //       ApiRequest={ApiRequest}
  //       TrackingData={TrackingData}
  //     />
  //   );
  // }
  // if (count == 3) {
  //   return (
  //     <DeliveryComponent
  //       getTrackingIds={getTrackingIds}
  //       ApiRequest={ApiRequest}
  //       TrackingData={TrackingData}
  //     />
  //   );
  // }
  // if (count > 3) {
  //   return <center><h1>Shipment Delivered Successfully</h1></center>;
  // }
  // if (count == 5) {
  //   return <h1>Shipment Delivered Successfully</h1>;
  // }
};
export default Track;
