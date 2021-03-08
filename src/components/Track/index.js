import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { API, Auth } from "aws-amplify";
import LeftForPickupComponent from "./LeftForPickup";
import ArrivedAtPickupComponent from "./ArrivedAtPickup";
import DeliveryComponent from "./ArrivedForDelivery";
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

const Track = (props) => {
  const classes = useStyles();
  const [TrackingData, setTrackingData] = React.useState([]);
  const [Loading, setLoading] = React.useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    getTrackingData();
  }, []);

  function getTrackingData() {
    setLoading(true);
    API.get(
      "GoFlexeOrderPlacement",
      `/tracking?type=getProcess&orderId=${props.id}`
    )
      .then((resp) => {
        console.log(resp);
        setTrackingData(resp);
        setLoading(false);
        FindStage(resp);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function FindStage(resp) {
    var temp = 0;
    var i;
    for (i = 0; i < resp.stages.length; i++) {
      if (
        resp.stages[i].status === "INACTIVE" ||
        resp.stages[i].status === "PENDING"
      ) {
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
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  }

  if (Loading === true) {
    return <Spinner />;
  }
  if (count == 0) {
    return (
      <div>
        <h1>Waiting for Allocation</h1>
      </div>
    );
  }
  if (count == 1) {
    return (
      <LeftForPickupComponent
        getTrackingIds={getTrackingIds}
        ApiRequest={ApiRequest}
        TrackingData={TrackingData}
      />
    );
  }
  if (count == 2) {
    return (
      <ArrivedAtPickupComponent
        getTrackingIds={getTrackingIds}
        ApiRequest={ApiRequest}
        TrackingData={TrackingData}
      />
    );
  }
  if (count == 3) {
    return (
      <DeliveryComponent
        getTrackingIds={getTrackingIds}
        ApiRequest={ApiRequest}
        TrackingData={TrackingData}
      />
    );
  }
  if (count == 4) {
    return <h1>Shipment Delivered Waiting For Customer Feedback</h1>;
  }
  if (count == 5) {
    return <h1>Shipment Delivered Successfully</h1>;
  }
};
export default Track;
