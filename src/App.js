import { Switch, Route,Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import './App.css'
import Navigation from './components/Navigation'
import Home from './components/Home'
import MyProfile from './components/Profile/MyProfile'
import OrderDetail from './components/OrderDetail'
import Details from './components/Details'
import StorageAndCapacity from './components/CapacityManager/StorageAndCapacity'
import AcceptanceForm from './components/AcceptanceForm'
import MyOrders from './components/MyOrders/MyOrders'
import AllocationForm from './components/Allocation/AllocationForm'
import AssignmentForm from './components/Assignment/Assignment'
import Track from './components/Track/Track'
import Help from './components/Help/Help'


import UserManager from './components/UserManager/userManager'
import AddUser from './components/UserManager/AddUser'
import ModifyRoleAccess from './components/UserManager/ModifyRoleAccess'

import Welcome from './components/Auth/Welcome/welcomePage';
import SignUp from './components/Auth/SignUp/signupform.js'
import Login from './components/Auth/Login/loginform'
import ResetPassword from './components/Auth/ResetPassword/ResetPassword'

import KYC from './components/KYC/Kyc'

import { Auth ,API} from "aws-amplify";
import { useEffect, useState } from 'react';
import Spinner from './components/UI/Spinner';

import { AppContext } from './libs/contextLibs'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },

}));

function App() {
  const classes = useStyles();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating,setIsAuthenticating] = useState(true);
  const [data, setData] = useState([]);
  //const [data, setData] = useState([]);
  const callAPIGateway = async () => {
    try{
    const customerEmail = "prashantkumarsingh9423@gmail.com"
    const result = await API.get("GoFlexeOrderPlacement", `/customerorder/customer/${customerEmail}`)
    console.log(result);
    setData(result);
    console.log("Set data ato : ", result)
    const credentials = await Auth.currentCredentials();
    console.log(Auth.essentialCredentials(credentials))}
    catch(e){
      console.log("PKSINGH"+e)
    }
  }
      useEffect(() => {
        callAPIGateway()
      },[])
      useEffect(() => {
        onLoad();
      }, []);
      
      async function onLoad() {
        try {
          await Auth.currentSession();
          userHasAuthenticated(true);
        }
        catch(e) {
          if (e !== 'No current user') {
            alert(e);
          }
        }
      
        setIsAuthenticating(false);
      }
      if(isAuthenticating){
        return(
          <Spinner />
        );
      }
    if(!isAuthenticated){
      return (
        <div className={classes.root}>
            <Welcome />
            <main
          className={classes.content}
        >
          <div className={classes.toolbar} />
          <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
            <Switch>
            
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path='/resetPassword' component={ResetPassword} />
            <Redirect to='/signup' />
           
          </Switch>
          </AppContext.Provider>
          </main>
        </div>
      );
    }

  return (
    <div className={classes.root}>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
      <Navigation />
      </AppContext.Provider>
      <main
        className={classes.content}
      >
        <div className={classes.toolbar} />
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Switch>
          {/* Home page (DashBoard Content) */}
          <Route exact path="/" component={Home} />
         
          <Route exact path="/accept-order" component={AcceptanceForm} />
          <Route path='/allocation/:id' render={(props) => {
                    return ( <AllocationForm {...props } /> )
                }} />
          <Route path='/assignment/:id/:customerOrderId' render={(props) => {
                    return ( <AssignmentForm {...props } /> )
                }} />
          <Route exact path="/track" component={Track} />
          <Route exact path="/details" component={Details} />
          <Route exact path="/profile" component={MyProfile} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/userManager" component={UserManager} />
          <Route exact path="/addUser" component={AddUser} />
          <Route exact path='/modifyRoleAccesses' component={ModifyRoleAccess} />
          <Route exact path="/kyc" component={KYC} />
          <Route path='/accept-order/:id' render={(props) => {
                    return ( <AcceptanceForm {...props } /> )
                }} />
          <Route path='/order/:id' render={(props) => {
                    return ( <OrderDetail {...props } /> )
                }} />
          <Route path='/capacity' component={StorageAndCapacity}/>
          <Route path='/my-orders' component={MyOrders}/>
          <Redirect to='/' />
        </Switch>
        </AppContext.Provider>
      </main>
    </div>
  );
}

export default App;
