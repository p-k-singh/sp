import React,{useEffect, useState} from 'react'
import {
    TextField,
    Grid,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    Button,
    Divider
  } from '@material-ui/core'
  import Typography from '@material-ui/core/Typography';
  import { makeStyles } from '@material-ui/core/styles';
  import { Multiselect } from 'multiselect-react-dropdown';
  import constants from '../../Constants/constants'
  import {Auth,API} from 'aws-amplify'
  import Spinner from '../UI/Spinner'
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
    }
  });
const AddTocapacity = (props) => {
    const classes = useStyles()
    
    const [type,setType] = useState(props.row.type)
    const [truckNumber,setTruckNumber] = useState(props.row.truckNumber)
    const [size,setSize] = useState(props.row)
    const [unit,setUnit] = useState(props.row.unit)
    const [ownership,setOwnership] = useState(props.row.ownership)
    const [location,setLocation] = useState(props.row.location)
    const [pin,setPin] = useState(props.row.pincode)
    const [capability,setCapability] = useState([])
    const [loading,setLoading] = useState(false)
    const [availableFrom,setAvailableFrom] = useState(props.row.availableFromDateTime)
    const [availableTo,setAvailableTo] = useState(props.row.availableToDateTime)
    const capabilityOptions = {
        options:constants.capabilityOptions
    }
   
    

    const typeChangeController = (event) => {
        setType(event.target.value)
    }
    const onTruckNumberChangeController = (event) => {
        setTruckNumber(event.target.value)
    }
    const onSizeChangeController = (event) => {
        setSize(event.target.value)
    }
    const unitChangeController = (event) => {
        setUnit(event.target.value)
    }
    const ownershipChangeController = (event) => {
        setOwnership(event.target.value)
    }
    const onLocationChangeController = (event) => {
        setLocation(event.target.value)
    }
    const onPinChangeController = (event) => {
        setPin(event.target.value)
    }
    const onMultiSelect = (selectedList, selectedItem) => {
        // selectedList.map((select) => alert(select.name))
        setCapability(selectedList)
    }
    const onMultiRemove = (selectedList, removedItem) => {
        // alert(selectedList)
        setCapability(selectedList)
    }
    const onAvailableFromChangeController = (event) => {
        setAvailableFrom(event.target.value)
    }
    const onAvailableToChangeController = (event) => {
        setAvailableTo(event.target.value)
    }
    const submitCapacity = async () => {
        setLoading(true)
        var currentUser = await Auth.currentUserInfo()
        var owner=currentUser.username
        const data={
            owner:owner,
            type:type,
            truckNumber:truckNumber,
            capacity:size,
            unit:unit,
            capabilities:capability,
            availableFromDateTime: availableFrom,
            availableToDateTime: availableTo,
            ownershipType: ownership,
            location:location,
            pincode:pin,
            assetId: props.row.assetId

        }
        const payload = {
            body: data
        }
        API
        .put("GoFlexeOrderPlacement", `/capacity?type=owner`, payload)
        .then(response => {
            // Add your code here
            console.log(response);
            setLoading(false)
        })
        .catch(error => {
            console.log(error.response);
            alert('An error occured.Please try again later')
            setLoading(false)
        });
       console.log(data)
        setLoading(false)
       props.onEditButtonClicked()
    }
    if(loading===true){
        return(
            <Spinner />
        )
    }
    return (
        <CardContent style={{ padding: 0,overflow:'hidden' }}>
      <Divider />
      <form>
        <Typography className={classes.formHeadings} >Edit Details</Typography>

        <Grid container spacing={3} style={{ paddingLeft: 50,paddingRight:50, paddingTop: 20  }}>
                        
                {/* {type==='truck' && 
                    <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      type='text'
                      id="truckNumber"
                      name="truckNumber"
                      label="Truck Number"
                      fullWidth
                      value={truckNumber}
                       onChange={(event)=>onTruckNumberChangeController(event)}
                      autoComplete="shipping address-line1"
                    />
                  </Grid>
                }
                {type!=='truck' &&
                    <Grid item xs={12} sm={6}></Grid>
                } */}
              
                <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      type='number'
                      id="size"
                      name="size"
                      label="Capacity"
                      fullWidth
                      value={size}
                       onChange={(event)=>onSizeChangeController(event)}
                      autoComplete="shipping address-line1"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                            <FormControl  style={{minWidth: 400}} className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">Unit</InputLabel>
                                <Select
                                    native
                                    value={unit}
                                    onChange={unitChangeController}
                                    inputProps={{
                                        name: 'age',
                                        id: 'age-native-simple',
                                    }}
                                >
                                    {constants.capacityUnits.map((d) => <option value={d.value}>{d.name}</option>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                <Multiselect
               
                style={{borderLeft:'0px',overflow:'hidden', multiselectContainer:{height:'75px'} }}
                    options={capabilityOptions.options} // Options to display in the dropdown
                    onSelect={onMultiSelect} // Function will trigger on select event
                    onRemove={onMultiRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    placeholder="Capabilities"
                    />

                </Grid>
        </Grid>
        <Typography className={classes.formHeadings} >Availability Details</Typography>
        <Grid container spacing={3} style={{ padding: 50, paddingTop: 20 ,paddingBottom: 30 }}>
        <Grid item xs={12} sm ={6}>
            <TextField
            id="datetime-local"
            label="Available From"
            type="datetime-local"
            className={classes.textField}
            onChange={(event)=>onAvailableFromChangeController(event)}
            InputLabelProps={{
            shrink: true,
            }}
            />
        </Grid>
        <Grid item xs={12} sm ={6}>
            <TextField
            id="datetime-local"
            label="Available To"
            type="datetime-local"
            className={classes.textField}
            onChange={(event)=>onAvailableToChangeController(event)}
            InputLabelProps={{
            shrink: true,
            }}
            />
        </Grid>
        </Grid>
        <Typography className={classes.formHeadings} >Other Details</Typography>
        <Grid container spacing={3} style={{ padding: 50, paddingTop: 20 ,paddingBottom: 30 }}>

        <Grid item xs={12} sm={6}>
                            <FormControl  style={{minWidth: 400}} className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">Ownership</InputLabel>
                                <Select
                                    native
                                    value={ownership}
                                    onChange={ownershipChangeController}
                                    inputProps={{
                                        name: 'age',
                                        id: 'age-native-simple',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={"self"}>Self</option>
                                    <option value={"outsourced"}>Outsourced</option>
                                </Select>
                            </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      type='text'
                      id="location"
                      name="location"
                      label="Location"
                      fullWidth
                      value={location}
                       onChange={(event)=>onLocationChangeController(event)}
                      autoComplete="shipping address-line1"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      type='number'
                      id="pin"
                      name="pin"
                      label="Pin Code"
                      fullWidth
                      value={pin}
                       onChange={(event)=>onPinChangeController(event)}
                      autoComplete="shipping address-line1"
                    />
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
                
        </Grid>
       
      </form>
      <Button variant='contained' onClick={submitCapacity} style={{float:'right',backgroundColor:'#f9a825',marginBottom:'20px'}}>Submit</Button>
      <Button variant='contained' color='default' onClick={()=>props.onEditButtonClicked()} style={{float:'right',marginBottom:'20px',marginRight:'10px'}}>Cancel</Button>
    
    </CardContent>
    );
}
export default AddTocapacity