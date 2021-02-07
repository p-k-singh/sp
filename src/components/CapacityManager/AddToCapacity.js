import React,{useState} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {
    TextField,
    Grid,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    Button,
    Switch,
    Card,
    Container
  } from '@material-ui/core'
  import Typography from '@material-ui/core/Typography';
  import { makeStyles,withStyles } from '@material-ui/core/styles';
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
  const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);
const AddTocapacity = (props) => {
    const classes = useStyles()
    
    const [type,setType] = useState('truck')
    const [truckNumber,setTruckNumber] = useState()
    const [size,setSize] = useState()
    const [unit,setUnit] = useState('tons')
    const [ownership,setOwnership] = useState('self')
    const [location,setLocation] = useState()
    const [pin,setPin] = useState()
    const [capability,setCapability] = useState([])
    const [loading,setLoading] = useState(false)
    const [availableFrom,setAvailableFrom] = useState('')
    const [availableTo,setAvailableTo] = useState('')
    const [assetActive,setAssetActive] = useState(true)
    const capabilityOptions = {
        options:constants.capabilityOptions
    }
    const warehouseCapabilityOptions = {
        options:constants.warehouseCapabilityOptions
    }

    const typeChangeController = (event) => {
        setType(event.target.value)
        setCapability([])
        if(event.target.value==='truck'){
            setUnit('tons')
        }
        else{
            setUnit('sqft')
        }
    }
    const handleAssetActive = () => {
        setAssetActive(!assetActive)
    }
    const onTruckNumberChangeController = (event) => {
        setTruckNumber(event.target.value)
    }
    const onSizeChangeController = (event) => {
        setSize(event.target.value)
    }
    // const unitChangeController = (event) => {
    //     setUnit(event.target.value)
    // }
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
            assetNumber:truckNumber,
            capacity:size,
            unit:unit,
            capabilities:capability,
            availableFromDateTime: availableFrom,
            availableToDateTime: availableTo,
            ownershipType: ownership,
            location:location,
            active:assetActive,
            pincode:pin

        }
        const payload = {
            body: data
        }
        API
        .post("GoFlexeOrderPlacement", `/capacity`, payload)
        .then(response => {
            // Add your code here
            console.log(response);
            setLoading(false)
        })
        .catch(error => {
            console.log(error.response);
            setLoading(false)
        });
       console.log(data)
        setLoading(false)
        props.changeDisplaySetting('storage')
       
    }
    const renderCapabilityForm = () => {
        return(
            // <Card variant='outlined' style={{minWidth:'90000'}} >  
            <Container style={{marginTop:20}}>
              <Grid container spacing={3} style={{ paddingLeft: 50,paddingRight:50,paddingBottom:50 }}>
                {capability.map((row)=>(
                    <Grid item xs={12} sm={4} >
                        {/* <th >Name</th>
                        <td>                  */}
                        <TextField
                        id={row.name}
                        label={row.name}
                        helperText={row.unit}
                        />
                        {/* <Input defaultValue="Disabled" variant='outlined' inputProps={{ 'aria-label': 'description' }} />  */}
                        {/* </td> */}
                    </Grid>
                    // <TableRow>
                        
                        

                    //     {/* <Input defaultValue="Disabled" variant='outlined' inputProps={{ 'aria-label': 'description' }} /> */}
                    // </TableRow>
                    
                ))}
                <Grid item xs={12} sm={4} ></Grid>
            </Grid>
            </Container>
            // </Card>

        )
    //     return(
    //         <TableContainer width={'50%'} component={Paper} >
    //   <Table className={classes.table} size="small" aria-label="a dense table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Dessert (100g serving)</TableCell>
    //         <TableCell >Calories</TableCell>
           
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {capability.map((row) => (
    //         <TableRow key={row.name}>
    //           <TableCell >{"rowName"} </TableCell>
    //           <TableCell >{'absdds'}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
    //         // <form className={classes.root} noValidate autoComplete="off">
    //         // <Input defaultValue="Hello world" inputProps={{ 'aria-label': 'description' }} />
    //         // {/* <Input placeholder="Placeholder" inputProps={{ 'aria-label': 'description' }} /> */}
    //         // {/* <Input defaultValue="Disabled" disabled inputProps={{ 'aria-label': 'description' }} />
    //         // <Input defaultValue="Error" error inputProps={{ 'aria-label': 'description' }} /> */}
    //         // </form>
    //     )
    }
    if(loading===true){
        return(
            <Spinner />
        )
    }
    return (
        <CardContent style={{ padding: 0,overflow:'hidden' }}>
      
      <form>
        <Typography className={classes.formHeadings} >Basic Details</Typography>

        <Grid container spacing={3} style={{ paddingLeft: 50,paddingRight:50, paddingTop: 20  }}>
                        <Grid item xs={12} sm={6}>
                            <FormControl  style={{minWidth: 400}} className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">Type</InputLabel>
                                <Select
                                    native
                                    //value="inches"
                                     onChange={typeChangeController}
                                    inputProps={{
                                        name: 'age',
                                        id: 'age-native-simple',
                                    }}
                                >
                                    {constants.capacityType.map((d) => <option value={d.value}>{d.name}</option>)}
                                </Select>
                            </FormControl>
                        </Grid>
                {type==='truck' && 
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
                }
                  {/* <Grid item xs={12} sm={6}></Grid> */}
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
                    <TextField
                    disabled
                      
                      type='text'
                      id="unit"
                      name="unit"
                      label="Unit"
                      fullWidth
                      value={unit}
                    //    onChange={(event)=>onSizeChangeController(event)}
                      autoComplete="shipping address-line1"
                    />
                        </Grid>
                <Grid item xs={12} sm={12}>
                <Multiselect
                    style={{borderLeft:'0px'}}
                    options={type==='truck'?capabilityOptions.options:warehouseCapabilityOptions.options} // Options to display in the dropdown
                    onSelect={onMultiSelect} // Function will trigger on select event
                    selectedValues={capability}
                    onRemove={onMultiRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    placeholder="Capabilities"
                    />
                </Grid>
                {renderCapabilityForm()}
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
                      label="Base Location"
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
        <Grid container spacing={3} style={{ padding: 50, paddingTop: 20 ,paddingBottom: 30 }}>
        <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Inactive</Grid>
          <Grid item>
            <AntSwitch checked={assetActive} onChange={handleAssetActive} name="checkedC" />
          </Grid>
          <Grid item>Active</Grid>
        </Grid>
      </Typography>
      </Grid>
      </form>
      <Button variant='contained' onClick={submitCapacity} style={{float:'right',backgroundColor:'#f9a825',marginBottom:'20px'}}>Submit</Button>
    </CardContent>
    );
}
export default AddTocapacity