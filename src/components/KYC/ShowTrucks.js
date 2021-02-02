import React, { useState,useEffect } from 'react';
import Spinner from '../UI/Spinner'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Auth,API} from 'aws-amplify'
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import RefreshIcon from '@material-ui/icons/Refresh';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});
function Row(props,idx) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  

  return (
    <React.Fragment>
      
    </React.Fragment>
  );
}


export default function CollapsibleTable(props) {
  const classes = useRowStyles();
  const [openedPages,setOpenedPages] = useState([])
  const [checkedBoxes,setCheckedBoxes] = useState([])
  const [loading,setLoading] = useState('true')
  const [rows,setRows] = useState()



  function loadData(){
    setLoading('true')
    Auth.currentUserInfo()
    .then((userDetails)=>{
      API.get("GoFlexeOrderPlacement",`/kyc/info?type=serviceprovider&id=${userDetails.username}`)
      .then(resp=> {
        console.log(resp)
        if(resp.length===0){
          setRows([])
        }
        else{
          setRows(resp[0].trucks)
        }
        setLoading('false')
      })
      .catch(err => {
        console.log(err)
        setLoading('error')
      })
    })
    .catch(err => {
      console.log(err)
      setLoading('error')
    })
  }
  useEffect(()=>{
    loadData()
  },[])
  const handleOpen = (event, idx) => {
    const selectedIndex = openedPages.indexOf(idx);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(openedPages, idx);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(openedPages.slice(1));
    } else if (selectedIndex === openedPages.length - 1) {
      newSelected = newSelected.concat(openedPages.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        openedPages.slice(0, selectedIndex),
        openedPages.slice(selectedIndex + 1),
      );
    }

    setOpenedPages(newSelected);
  };

  const handleChecked = (event, idx) => {
    const selectedIndex = checkedBoxes.indexOf(idx);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(checkedBoxes, idx);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(checkedBoxes.slice(1));
    } else if (selectedIndex === checkedBoxes.length - 1) {
      newSelected = newSelected.concat(checkedBoxes.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        checkedBoxes.slice(0, selectedIndex),
        checkedBoxes.slice(selectedIndex + 1),
      );
    }

    setCheckedBoxes(newSelected);
  };

  const isOpened = (idx) => openedPages.indexOf(idx) !== -1;
  const isChecked = (idx) => checkedBoxes.indexOf(idx)!==-1;
  
  if(loading==='error'){
    return(
      <div>
        <h1>An error occured, Please try later</h1>
      </div>
    )
  }
  if(loading==='true'){
    return(
      <Spinner />
    )
  }
  if(rows.length===0){
    return(
      <div style={{textAlign:'center'}}>No Trucks Added</div>
    )
  }
 
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        {checkedBoxes.length>0 && <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            {checkedBoxes.length===1 ? <TableCell align="right"><EditIcon label='Edit' color='primary' />  </TableCell> : <TableCell /> }
            {checkedBoxes.length>0 ? <TableCell align="right"><DeleteIcon color='secondary' /></TableCell> : <TableCell />}
          </TableRow>
        </TableHead>}
        <TableHead>
          <TableRow>
          <TableCell><IconButton onClick={()=>loadData()}><RefreshIcon label='Edit' color='primary' /> </IconButton></TableCell>
            <TableCell>Truck Number</TableCell>
            <TableCell align="right">Permit Id</TableCell>
            <TableCell align="right">Chassis Number</TableCell>
            <TableCell align="right">Engine Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,idx) => {
            const isItemOpened = isOpened(idx);
            const labelId = `enhanced-table-checkbox-${idx}`;
            return(
            <React.Fragment>
            <TableRow className={classes.root}>
            <TableCell>
              <IconButton aria-label="expand row" size="small" onClick={(event) => handleOpen(event,idx)}>
                {isItemOpened ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            <Checkbox
            size='small'
            color="primary"
            name={idx}
            onChange={(event) => handleChecked(event,idx)}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
            </TableCell>
            <TableCell component="th" scope="row">
              {row.truckNumber}
            </TableCell>
            <TableCell align="right">{row.permitId}</TableCell>
            <TableCell align="right">{row.chassisNumber}</TableCell>
            <TableCell align="right">{row.engineNumber}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={isItemOpened} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Typography variant="h6" gutterBottom component="div">
                      More Details
                  </Typography>
                  <TableRow>
                  <th>Permit States: </th>
                   <td> {row.statesOfPermit.map((permitState) => permitState.name+' .')}</td>
                   </TableRow>
                   
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
          </React.Fragment>
            )
          }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
