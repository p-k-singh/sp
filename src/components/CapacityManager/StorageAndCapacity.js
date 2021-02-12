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
import {
  TextField,
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
    // minWidth: 275,
  },
  title: {
    fontSize: 20,
    height: 50,
    padding: 10,
    paddingLeft: 55,
    borderBottomStyle:'solid',
    borderWidth:"1px",
    borderRadius:'5px'
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

const StorageAndCapacity = () => {
  const [trucksCapacity, setTrucksCapacity] = useState(0);
  const [storageCapacity, setStorageCapacity] = useState(0);

  const [display, setDisplay] = useState("");

  useEffect(() => {
    setTrucksCapacity(600);
    setStorageCapacity(250);
  }, []);

  const changeDisplaySetting = (disp) => {
    if (display === disp) {
      setDisplay("");
    } else setDisplay(disp);
  };
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <CardContent style={{ padding: 0 }}>
          <Typography className={classes.title} gutterBottom>
            Capacity Manager
            <Tooltip title="Add and Manage all Assets">
              <InfoIcon style={{ color: "lightgrey", marginLeft: 20 }} />
            </Tooltip>
          </Typography>

          <div className="col " style={{ fontSize: "20px" }}>
            <div className="row">
              <tr
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  marginLeft: "20px",
                }}
              >
                <th scope="row">Total Truck capacity: </th>
                <td>{trucksCapacity} tons</td>
              </tr>
            </div>
            <div className="row">
              <tr
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  marginLeft: "20px",
                }}
              >
                <th scope="row">Total Storage capacity: </th>

                <td>{storageCapacity} tons</td>
              </tr>
            </div>
            {display === "storage" && (
              <Button
                onClick={() => changeDisplaySetting("")}
                variant="contained"
                style={{ backgroundColor: "default", marginBottom: "20px" }}
              >
                Hide Details
              </Button>
            )}
            {display !== "storage" && (
              <Button
                onClick={() => changeDisplaySetting("storage")}
                variant="contained"
                style={{ backgroundColor: "default", marginBottom: "20px" }}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default StorageAndCapacity;