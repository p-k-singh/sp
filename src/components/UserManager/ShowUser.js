import React, { useEffect, useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import constants from '../../Constants/constants';
import Spinner from '../UI/Spinner';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {Link} from 'react-router-dom';
import {
    Card,
    Grid,
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
const ShowUser = (props) => {
    const classes = useStyles();  
    const [loading,setLoading] = useState(true);
    const [user,setUser] = useState();
    
    useEffect(() => {
        setUser({
            name:'person1',
            email: 'person1@gmail',
            phone: '99991',
            designation:'Admin',
            department:'dept1',
            role:'role1',
            accesses:['read','edit','write'],
            addedDate:'21-12-20'
        });
        setLoading(false);
    },[]);

    if(loading===true){
        return (
            <div style={{marginTop:"100px"}}>
            <Spinner/>
             </div>
        );
    }
     return(
        <div>
            <Breadcrumbs style={{marginBottom:'10px'}} aria-label="breadcrumb">
            <Link color="inherit" to='/userManager'>
                User-Manager
            </Link>
            <Typography color="textPrimary">View User</Typography>
            </Breadcrumbs>
            <Card className={classes.paper} style={{marginBottom:'30px'}}>
            <CardContent style={{ padding: 0,marginTop:10 }}>
                                <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                                   {user.designation}
                                </Typography>
                                <table>
                                    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                                        
                                        <Grid item xs={12} sm={6} >
                                            <tr>
                                                <th scope="row">{constants.usersName+": "}</th>
                                                <td>{user.name}</td>
                                            </tr>
                                        </Grid>
                                        
                                        
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.usersEmail+": "}</th>
                                                <td>{user.email}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.usersPhone+": "}</th>
                                                <td>{user.phone}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.usersDesignation+": "}</th>
                                                <td>{user.designation}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.usersDepartment+": "}</th>
                                                <td>{user.department}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.usersRole+": "}</th>
                                                <td>{user.role} </td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.usersAccesses+": "}</th>
                                               
                                                
                                                <td>{user.accesses.map(access => (access.toLocaleUpperCase()+" "))}
                                                </td> 
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.usersAddedDate+": "}</th>
                                               <td>{user.addedDate}  
                                                </td> 
                                            </tr>
                                        </Grid>
                          
                                    </Grid>
                                </table>
                                </CardContent>
                            </Card>
                </div>
        );
}
export default ShowUser;