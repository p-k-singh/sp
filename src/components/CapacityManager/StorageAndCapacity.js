// import React, { useEffect, useState } from 'react'
// import {TextField,
//     Button,
//     Card,
//     CardContent,
//     Typography
// } from '@material-ui/core'
// import AddIcon from '@material-ui/icons/Add';
// import ShowTruckDetails from './ShowTruckDetails';
// import AddToCapacity from './AddToCapacity'
// import { makeStyles } from '@material-ui/core/styles';
// import AddTocapacity from './AddToCapacity';
// const useStyles = makeStyles((theme) => ({
//     root: {
//         // minWidth: 275,
//     },
//     title: {
//         fontSize: 20,
//         height: 50,
//         padding: 10,
//         paddingLeft: 55,
//         color: 'white'
//     },
//     allocationButton:{
//         animationName: '$blinker',
//         animationDuration: '0.7s',
//         animationTimingFunction: 'linear',
//         animationIterationCount:'infinite',
//         marginLeft: theme.spacing(1),
//         marginRight: theme.spacing(2)
//     },
//     formHeadings: {
//         margin: 20,
//         marginBottom: 0
//     },
//     formControl: {
//         marginTop:'1%'
//     }
// }));

// const StorageAndCapacity = () => {
//     const [trucksCapacity,setTrucksCapacity] = useState(0)
//     const [storageCapacity,setStorageCapacity] = useState(0)

//     const [display,setDisplay] = useState('')

//     useEffect(()=>{
//         setTrucksCapacity(600)
//         setStorageCapacity(250)
//     },[])

//    const changeDisplaySetting = (disp) => {
//        if(display===disp){
//            setDisplay('')
//        }
//        else
//        setDisplay(disp)
//    }
//    const classes=useStyles()
//     return(
//         <div>
//             <Card className={classes.root}>
//                 <CardContent style={{ padding: 0 }}>
//                 <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
//                         Capacity Manager
//                 </Typography>
//                 <div className="col " style={{fontSize:'20px'}}>
//                 <div className="row" >
//                 <tr style={{marginTop:'20px',marginBottom:'20px',marginLeft:'20px'}}>
//                     <th scope="row">Total Truck capacity: </th>
//                         <td>{trucksCapacity} tons
//                         </td>
//                 </tr>
//                 </div>
//                 <div className="row">
//                 <tr style={{marginTop:'20px',marginBottom:'20px',marginLeft:'20px'}}>
//                     <th scope="row">Total Storage capacity: </th>

//                         <td>{storageCapacity} tons
//                         </td>
//                 </tr>
//                 </div>
//                 {display==='storage' && <Button onClick={()=>changeDisplaySetting('')} variant='contained' style={{backgroundColor:'#f9a825',marginBottom:'20px'}} >Hide Details</Button>}
//                         {display!=='storage' && <Button onClick={()=>changeDisplaySetting('storage')} variant='contained' style={{backgroundColor:'#f9a825',marginBottom:'20px'}} >Show Details</Button>}
//                         <Button
//                                  style={{marginBottom:'20px'}}
//                                     variant="contained"
//                                     color="default"
//                                     onClick={()=>changeDisplaySetting('addForm')}
//                                     className={classes.allocationButton}
//                                     startIcon={<AddIcon />}>
//                                     Add Truck/Storage
//                             </Button>
//                     {display==='addForm' && <AddToCapacity changeDisplaySetting={changeDisplaySetting} /> }
//                     {display==='storage' && <ShowTruckDetails changeDisplaySetting={changeDisplaySetting} /> }
//             </div>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }
// export default StorageAndCapacity
import React, { useEffect, useState } from "react";
import InfoIcon from "@material-ui/icons/Info";
import EditIcon from "@material-ui/icons/Edit";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

import {
  TextField,
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ShowTruckDetails from "./ShowTruckDetails";
import AddToCapacity from "./AddToCapacity";
import { makeStyles } from "@material-ui/core/styles";
import AddTocapacity from "./AddToCapacity";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 700,
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  textfield: {
    width: "60%",
  },

  title: {
    fontSize: 20,
    height: 50,
    padding: 10,
    paddingLeft: 55,
    borderBottomStyle: "solid",
    borderWidth: "1px",
    borderRadius: "5px",
  },
  allocationButton: {
    animationName: "$blinker",
    animationDuration: "0.7s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
  formControl: {
    marginTop: "1%",
  },
}));
const StorageAndCapacity = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [trucksCapacity, setTrucksCapacity] = useState(0);
  const [storageCapacity, setStorageCapacity] = useState(0);

  const [display, setDisplay] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const ontrucksCapacitySubmitController = () => {
    setExpanded(false);
  };
  const ontrucksCapacityChangeController = (event) => {
    var temptrucksCapacity = event.target.value;
    setTrucksCapacity(temptrucksCapacity);
  };
  const onstorageCapacitySubmitController = () => {
    setExpanded(false);
  };
  const onstorageCapacityChangeController = (event) => {
    var tempstorageCapacity = event.target.value;
    setStorageCapacity(tempstorageCapacity);
  };

  useEffect(() => {
    setTrucksCapacity(0);
    setStorageCapacity(0);
  }, []);

  const changeDisplaySetting = (disp) => {
    if (display === disp) {
      setDisplay("");
    } else setDisplay(disp);
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardContent style={{ padding: 0 }}>
          <Typography className={classes.title} gutterBottom>
            Availability Manager
            <Tooltip title="Add and Manage all Assets">
              <InfoIcon style={{ color: "lightgrey", marginLeft: 20 }} />
            </Tooltip>
          </Typography>
          <div>
            <Grid container style={{ paddingTop: 30, paddingBottom: 30 }}>
              <Grid item xs={12} sm={8}>
                <Accordion
                  style={{ boxShadow: "none" }}
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    expandIcon={<EditIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className={classes.heading}>
                      Total Trucks capacity:{" "}
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                      {" "}
                      {trucksCapacity} tons
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      className={classes.textfield}
                      xs={12}
                      sm={6}
                      value={props.name}
                      autoComplete="given-name"
                      onChange={(event) =>
                        ontrucksCapacityChangeController(event)
                      }
                    />
                    <Button
                      onClick={ontrucksCapacitySubmitController}
                      color="secondary"
                    >
                      Change
                    </Button>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid container style={{ paddingTop: 10, paddingBottom: 30 }}>
              <Grid item xs={12} sm={8}>
                <Accordion
                  style={{ boxShadow: "none" }}
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                >
                  <AccordionSummary
                    expandIcon={<EditIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                  >
                    <Typography className={classes.heading}>
                      Total Storage capacity:
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                      {storageCapacity} tons
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      className={classes.textfield}
                      xs={12}
                      sm={6}
                      value={props.name}
                      autoComplete="given-name"
                      onChange={(event) =>
                        onstorageCapacityChangeController(event)
                      }
                    />
                    <Button
                      onClick={onstorageCapacitySubmitController}
                      color="secondary"
                    >
                      Change
                    </Button>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </div>
          {display === "storage" && (
            <Button
              onClick={() => changeDisplaySetting("")}
              variant="contained"
              style={{
                backgroundColor: "default",
                marginBottom: "20px",
                marginLeft: 20,
              }}
            >
              Hide Details
            </Button>
          )}
          {display !== "storage" && (
            <Button
              onClick={() => changeDisplaySetting("storage")}
              variant="contained"
              style={{
                backgroundColor: "default",
                marginBottom: "20px",
                marginLeft: 20,
              }}
            >
              Show Details
            </Button>
          )}
          <Button
            style={{ backgroundColor: "#f9a825", marginBottom: "20px" }}
            variant="contained"
            onClick={() => changeDisplaySetting("addForm")}
            className={classes.allocationButton}
            startIcon={<AddIcon />}
          >
            Add Asset
          </Button>
          {display === "addForm" && (
            <AddToCapacity changeDisplaySetting={changeDisplaySetting} />
          )}
          {display === "storage" && (
            <ShowTruckDetails changeDisplaySetting={changeDisplaySetting} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StorageAndCapacity;
