import React, {useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import './MyOrders.css'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TodayIcon from '@material-ui/icons/Today';
import Typography from '@material-ui/core/Typography';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ClassTwoToneIcon from '@material-ui/icons/ClassTwoTone';
import {API, Auth} from 'aws-amplify'
import Spinner from '../UI/Spinner'
const useStyles = makeStyles((theme) => ({
    '@keyframes blinker': {
        from: {opacity: 1},
        to: {opacity: 0.2 , color:'#3f51b5',fontWeight:'400'}
    },
    button: {
        marginBottom: theme.spacing(1),
    },
    allocationButton:{
        animationName: '$blinker',
        animationDuration: '0.7s',
        animationTimingFunction: 'linear',
        animationIterationCount:'infinite',
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(2)
    },
    title: {
        fontSize: 20,
        height: 50,
        padding: 10,
        paddingLeft: 55,
        borderBottomStyle:'solid',
    borderWidth:"1px",
    borderRadius:'5px',
        
    },
  }));
  

const MyOrders=()=>{
    const classes=useStyles();
    const [activeOrders,setActiveOrders] = useState('hello');
    useEffect( ()=>{
        async function  putValues(){
            var currentUser = await Auth.currentUserInfo()
            var currentUsername=currentUser.username
            //currentUser.username
            var temp = await API.get("GoFlexeOrderPlacement",`/serviceorder?username=${currentUsername}`);
            console.log(temp)
            setActiveOrders(temp);
        }
        putValues()
        
    },[]);
    if(activeOrders==='hello'){
        return(
            <Spinner />
        )
    }
    
    return(
                <div>
                    {/* <Typography className={classes.title} gutterBottom style={{}}>
                                    My Active Orders
                    </Typography>   */}

                   <section className="root">
                        {
                            activeOrders.map((eachOrder) => (
                                <div>
                            <figure>
                                <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMjU2IiB4Mj0iMjU2IiB5MT0iNTEyIiB5Mj0iMCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDBiNTljIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjOWNmZmFjIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzJfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjMwMSIgeDI9IjMwMSIgeTE9IjI3MSIgeTI9IjYxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNjM2ZmZTgiLz48c3RvcCBvZmZzZXQ9Ii45OTczIiBzdG9wLWNvbG9yPSIjZjBmZmY0Ii8+PC9saW5lYXJHcmFkaWVudD48Zz48cGF0aCBkPSJtNTA4Ljk5MyAxNTYuOTkxYy0yLjgzMy0zLjc3Mi03LjI3Ni01Ljk5MS0xMS45OTMtNS45OTFoLTEwNy4yNTdjLTcuMTYzLTQyLjUxMS00NC4yMjctNzUtODguNzQzLTc1cy04MS41OCAzMi40ODktODguNzQzIDc1aC05My4yMzVsLTE5LjYtMTM4LjEwN2MtMS4wNDktNy4zOTYtNy4zOC0xMi44OTMtMTQuODUxLTEyLjg5M2gtNjkuNTcxYy04LjI4NCAwLTE1IDYuNzE2LTE1IDE1czYuNzE2IDE1IDE1IDE1aDU2LjU1bDE5LjU5OSAxMzguMTA0di4wMDEuMDAzbDIyLjY0MyAxNTkuNDk5YzIuNDU3IDE3LjE5NyAxMC44MiAzMi45NzggMjMuNTk4IDQ0LjY4NC0xMC4wMDQgOC4yNi0xNi4zOSAyMC43NTMtMTYuMzkgMzQuNzA5IDAgMjAuNzIzIDE0LjA4NSAzOC4yMDkgMzMuMTgxIDQzLjQxNC0yLjA0NSA1LjEzNy0zLjE4MSAxMC43My0zLjE4MSAxNi41ODYgMCAyNC44MTMgMjAuMTg3IDQ1IDQ1IDQ1czQ1LTIwLjE4NyA0NS00NWMwLTUuMjU4LS45MTUtMTAuMzA1LTIuNTgtMTVoMTI1LjE2Yy0xLjY2NSA0LjY5NS0yLjU4IDkuNzQyLTIuNTggMTUgMCAyNC44MTMgMjAuMTg3IDQ1IDQ1IDQ1czQ1LTIwLjE4NyA0NS00NS0yMC4xODctNDUtNDUtNDVoLTI0MGMtOC4yNzEgMC0xNS02LjcyOS0xNS0xNXM2LjcyOS0xNSAxNS0xNWgyMjQuNzQyYzMzLjMwOSAwIDYyLjk2My0yMi4zNjggNzIuMDk4LTU0LjMzOWw0OC41NjctMTY3LjQ4M2MxLjMxMy00LjUzMS40MTktOS40MTYtMi40MTQtMTMuMTg3eiIgZmlsbD0idXJsKCNTVkdJRF8xXykiLz48Zz48Zz48cGF0aCBkPSJtMzAxIDYxYy01Ny44OTcgMC0xMDUgNDcuMTAzLTEwNSAxMDVzNDcuMTAzIDEwNSAxMDUgMTA1IDEwNS00Ny4xMDMgMTA1LTEwNS00Ny4xMDMtMTA1LTEwNS0xMDV6bTQwLjYwNiAxMDAuNjA3LTQ1IDQ1Yy0yLjkyOCAyLjkyOS02Ljc2NyA0LjM5My0xMC42MDYgNC4zOTNzLTcuNjc4LTEuNDY0LTEwLjYwNi00LjM5NGwtMTUtMTVjLTUuODU4LTUuODU4LTUuODU4LTE1LjM1NSAwLTIxLjIxMyA1Ljg1Ny01Ljg1OCAxNS4zNTUtNS44NTggMjEuMjEzIDBsNC4zOTQgNC4zOTMgMzQuMzk0LTM0LjM5M2M1Ljg1Ny01Ljg1OCAxNS4zNTUtNS44NTggMjEuMjEzIDAgNS44NTcgNS44NTkgNS44NTcgMTUuMzU2LS4wMDIgMjEuMjE0eiIgZmlsbD0idXJsKCNTVkdJRF8yXykiLz48L2c+PC9nPjwvZz48L3N2Zz4=" />
                                {/* <figcaption>
                                    <h6>Order Id <span><TodayIcon/></span></h6>
                                    <h4>{eachOrder.ServiceOrderId}</h4>
                                    
                                </figcaption> */}
                                <figcaption>
                                    <h6>Display Id <span><TodayIcon/></span></h6>
                                   
                                    <h4>{eachOrder.displayId}</h4>
                                </figcaption>
                            </figure>
                            <div>
                                 
                                    <Button
                                    component={Link} to={`assignment/${eachOrder.ServiceOrderId}/${eachOrder.customerOrderId}`}
                                    variant="contained"
                                    color="default"
                                    className={classes.allocationButton}
                                    startIcon={<LocalShippingIcon />}>
                                    assign
                                    </Button>
                                
                             
                                    {/* <Button
                                    component={Link} to={`allocation/${eachOrder.ServiceOrderId}`}
                                    variant="contained"
                                    color="default"
                                    className={classes.allocationButton}
                                    startIcon={<LocalShippingIcon />}>
                                    allocate
                                    </Button>
                                */}
                               
                                    <Button
                                    component={Link} to="/track"
                                    variant="contained"
                                    color="default"
                                    className={classes.allocationButton}
                                    startIcon={<LocalShippingIcon />}>
                                    track
                                    </Button>
                               
                                
                                <Button
                                        component={Link} to={`order/${eachOrder.customerOrderId}`}
                                        variant="contained"
                                        color="default"
                                        className={classes.allocationButton}
                                        startIcon={<ClassTwoToneIcon />}> 
                                        Details
                                </Button>
                            </div>
                            <Divider/>
                        </div>
                            ))
                        }
                       
                    </section>
                </div>
    )
}



export default MyOrders
{/* <div>
                            <figure>
                                <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMjU2IiB4Mj0iMjU2IiB5MT0iNTEyIiB5Mj0iMCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDBiNTljIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjOWNmZmFjIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzJfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjMwMSIgeDI9IjMwMSIgeTE9IjI3MSIgeTI9IjYxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNjM2ZmZTgiLz48c3RvcCBvZmZzZXQ9Ii45OTczIiBzdG9wLWNvbG9yPSIjZjBmZmY0Ii8+PC9saW5lYXJHcmFkaWVudD48Zz48cGF0aCBkPSJtNTA4Ljk5MyAxNTYuOTkxYy0yLjgzMy0zLjc3Mi03LjI3Ni01Ljk5MS0xMS45OTMtNS45OTFoLTEwNy4yNTdjLTcuMTYzLTQyLjUxMS00NC4yMjctNzUtODguNzQzLTc1cy04MS41OCAzMi40ODktODguNzQzIDc1aC05My4yMzVsLTE5LjYtMTM4LjEwN2MtMS4wNDktNy4zOTYtNy4zOC0xMi44OTMtMTQuODUxLTEyLjg5M2gtNjkuNTcxYy04LjI4NCAwLTE1IDYuNzE2LTE1IDE1czYuNzE2IDE1IDE1IDE1aDU2LjU1bDE5LjU5OSAxMzguMTA0di4wMDEuMDAzbDIyLjY0MyAxNTkuNDk5YzIuNDU3IDE3LjE5NyAxMC44MiAzMi45NzggMjMuNTk4IDQ0LjY4NC0xMC4wMDQgOC4yNi0xNi4zOSAyMC43NTMtMTYuMzkgMzQuNzA5IDAgMjAuNzIzIDE0LjA4NSAzOC4yMDkgMzMuMTgxIDQzLjQxNC0yLjA0NSA1LjEzNy0zLjE4MSAxMC43My0zLjE4MSAxNi41ODYgMCAyNC44MTMgMjAuMTg3IDQ1IDQ1IDQ1czQ1LTIwLjE4NyA0NS00NWMwLTUuMjU4LS45MTUtMTAuMzA1LTIuNTgtMTVoMTI1LjE2Yy0xLjY2NSA0LjY5NS0yLjU4IDkuNzQyLTIuNTggMTUgMCAyNC44MTMgMjAuMTg3IDQ1IDQ1IDQ1czQ1LTIwLjE4NyA0NS00NS0yMC4xODctNDUtNDUtNDVoLTI0MGMtOC4yNzEgMC0xNS02LjcyOS0xNS0xNXM2LjcyOS0xNSAxNS0xNWgyMjQuNzQyYzMzLjMwOSAwIDYyLjk2My0yMi4zNjggNzIuMDk4LTU0LjMzOWw0OC41NjctMTY3LjQ4M2MxLjMxMy00LjUzMS40MTktOS40MTYtMi40MTQtMTMuMTg3eiIgZmlsbD0idXJsKCNTVkdJRF8xXykiLz48Zz48Zz48cGF0aCBkPSJtMzAxIDYxYy01Ny44OTcgMC0xMDUgNDcuMTAzLTEwNSAxMDVzNDcuMTAzIDEwNSAxMDUgMTA1IDEwNS00Ny4xMDMgMTA1LTEwNS00Ny4xMDMtMTA1LTEwNS0xMDV6bTQwLjYwNiAxMDAuNjA3LTQ1IDQ1Yy0yLjkyOCAyLjkyOS02Ljc2NyA0LjM5My0xMC42MDYgNC4zOTNzLTcuNjc4LTEuNDY0LTEwLjYwNi00LjM5NGwtMTUtMTVjLTUuODU4LTUuODU4LTUuODU4LTE1LjM1NSAwLTIxLjIxMyA1Ljg1Ny01Ljg1OCAxNS4zNTUtNS44NTggMjEuMjEzIDBsNC4zOTQgNC4zOTMgMzQuMzk0LTM0LjM5M2M1Ljg1Ny01Ljg1OCAxNS4zNTUtNS44NTggMjEuMjEzIDAgNS44NTcgNS44NTkgNS44NTcgMTUuMzU2LS4wMDIgMjEuMjE0eiIgZmlsbD0idXJsKCNTVkdJRF8yXykiLz48L2c+PC9nPjwvZz48L3N2Zz4=" />
                                <figcaption>
                                    <h6>Order Date <span><TodayIcon/></span></h6>
                                    <h4>20th Dec, 2020</h4>
                                </figcaption>
                            </figure>
                            <div>
                                <Button
                                        component={Link} to="/assignment"
                                        variant="contained"
                                        color="default"
                                        className={classes.allocationButton}
                                        startIcon={<LocalShippingIcon />}>
                                        Assign
                                </Button>
                                <Button
                                        component={Link} to="/details"
                                        variant="contained"
                                        color="default"
                                        className={classes.allocationButton}
                                        startIcon={<ClassTwoToneIcon />}> 
                                        Details
                                </Button>
                            </div>
                        </div> */}