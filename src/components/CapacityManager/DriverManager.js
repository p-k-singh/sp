import Typography from '@material-ui/core/Typography';
import {
    TextField,
    Grid
} from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    Button,
    Divider
  } from '@material-ui/core'
const useStyles = makeStyles({
    root: {
        // minWidth: 275,
    },
    title: {
        fontSize: 20,
        height: 50,
        padding: 10,
        paddingLeft: 55,
        color: 'white'
    },
    formHeadings: {
        margin: 20,
        marginBottom: 0
    },
    formControl: {
        marginTop:'1%'
    },
    container :{
        justifyContent: 'space-between',
        flexDirection: 'column',
        display: 'flex'
    },
    btnHolder: {
        justifyContent: 'flex-end',
        display: 'flex',
        marginRight:'30px',
        marginBottom:'30px'
      }
});

const DriverManager = (props) => {
    const classes = useStyles();  
    const [showForm,setShowForm] = useState(false)
    const [newDriverName,setNewDriverName] = useState('');
    const [newDriverNumber,setNewDriverNumber] = useState('');
    const [drivers,setDrivers] = useState([
        {
            driverName:'Person1',
            phone:'8252782928'
        },
        {
            driverName:'Person2',
            phone:'6350108758'
        },
        {
            driverName:'Person3',
            phone:'6325718429'
        },
        {
            driverName:'Person4',
            phone:'8741795237'
        },
        
    ]);
    const onDriverNameChange = (event) => {
        setNewDriverName(event.target.value)
    }
    const onDriverNumberChange = (event) => {
        setNewDriverNumber(event.target.value)
    }
    const submitDriver = () => {
        if(newDriverName==='' || newDriverNumber==='')
        {
            alert('Please fill required fields')
            return
        }
        setShowForm(false)
        var temp = {
            driverName:newDriverName,
            phone: newDriverNumber
        }
        let a = drivers.slice()
        a.push(temp)
        setDrivers(a)
        alert('Driver details has been submitted, please Click here to fill the KYC form ')
    }
    const addDriverForm = () => {
        return(
            <div style={{overflow:'hidden'}} >
            <Typography fullWidth className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                        Driver Details               
                    </Typography>         
                    <form>
            <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        type="text"
                        id="phone"
                        name="phone"
                        label="Enter Driver Name"
                        value={newDriverName}
                        onChange={(event) => onDriverNameChange(event)}
                        fullWidth                             
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        type="number"
                        id="driverName"
                        name="driverName"
                        label="Enter Driver's Phone Number"
                        value={newDriverNumber}
                        onChange={(event) => onDriverNumberChange(event)}
                        fullWidth          
                    />
                </Grid>
            </Grid>    
            <Button 
                onClick={submitDriver}
                className="row"
                variant='contained' style={{float:'right',backgroundColor:'#f9a825', marginBottom:'10px'}}
        >Submit</Button>
    <Button 
                onClick={toggleForm}
                className="row"
                variant='contained' color='default' style={{float:'right',marginRight:'10px', marginBottom:'10px'}}
        >Cancel</Button>
    </form>

        </div>
        )
       
    }


    const eachUser = (driver,idx) => {
        return(
            <div className="row" style={{marginTop:'15px', fontSize:'19px'}}>
                <div className="col col-xs-6 col-sm-3">
                    {driver.driverName}
                </div>
                <div className="col col-xs-6 col-sm-3">
                    {driver.phone} 
                </div>
                <div className="col col-xs-6 col-sm-3">
                <Link
                   
                ><EditIcon />Edit</Link>
                </div>
                <div className="col col-xs-6 col-sm-3">
                <Link><DeleteIcon />Delete</Link>
                </div>
                
            </div>
        );
    }

    const toggleForm = () => {
        setShowForm(!showForm)
    }
    return (
        <div>
            <div style={{overflow:'hidden'}}>
            <Button 
             onClick={toggleForm}
            className="row"
                variant='contained' style={{backgroundColor:'#f9a825', marginBottom:'10px',float:'right'}}
            >Add New Driver</Button>
            </div>
            <Divider />
             <div style={{marginTop:'30px'}}></div>
             {showForm && 
                addDriverForm() 
            }
            
            {!showForm && drivers.map((driver,idx) => eachUser(driver,idx))}
            <div style={{marginTop:'60px'}}></div>
            {/* {users.map((user,idx) => eachUser1(user,idx))} */}
        </div>
       
    )
}


export default DriverManager;
