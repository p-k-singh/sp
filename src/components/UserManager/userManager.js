// import React, { useState } from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import constants from '../../Constants/constants';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import {Link} from 'react-router-dom'
// import EditIcon from '@material-ui/icons/Edit';
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import DeleteIcon from '@material-ui/icons/Delete';
// import Checkbox from '@material-ui/core/Checkbox';
// import {
//     Button,
//     Card,
//     Grid
//   } from '@material-ui/core'
// const useStyles = makeStyles({
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
//     formHeadings: {
//         margin: 20,
//         marginBottom: 0
//     },
//     formControl: {
//         marginTop:'1%'
//     },
//     container :{
//         justifyContent: 'space-between',
//         flexDirection: 'column',
//         display: 'flex'
//     },
//     btnHolder: {
//         justifyContent: 'flex-end',
//         display: 'flex',
//         marginRight:'30px',
//         marginBottom:'30px'
//       }
// });

// const UserManager = (props) => {
//     const classes = useStyles();  
//     const [addNewUser,setAddNewUser] = useState(false);
//     const [users,setUsers] = useState([
//         {
//             name:'person1',
//             email: 'person1@gmail',
//             phone: '99991',
//             designation:'Admin',
//             department:'dept1',
//             role:'role1',
//             accesses:['read','edit','write'],
//             addedDate:'21-12-20'
//         },
//         {
//             name:'person2',
//             email: 'person2@gmail',
//             phone: '99992',
//             designation:'Executive',
//             department:'dept2',
//             role:'role2',
//             accesses:['read','edit'],
//             addedDate:'22-12-20'
//         },
//         {
//             name:'person3',
//             email: 'person3@gmail',
//             phone: '99993',
//             designation:'Auditor',
//             department:'dept3',
//             role:'role3',
//             accesses:['read','edit','write'],
//             addedDate:'23-12-20'
//         },
//         {
//             name:'person4',
//             email: 'person4@gmail',
//             phone: '99994',
//             designation:'Manager',
//             department:'dept4',
//             role:'role4',
//             accesses:['read','edit','write'],
//             addedDate:'23-12-20'
//         },
//     ]);
    
//     const eachUser = (user,idx) => {
//         return (
//             <Card style={idx%2===0?{backgroundColor:'#e1e0e2'}:{backgroundColor:'#fff'}} className={classes.paper}>
//                 <CardContent>
//                     <h3>{user.designation}</h3>
//                     <div className="row">
//                         <div className="col col-xs-12 col-sm-3">
//                         <tr >
//                                 <th style={{fontSize:'18px'}} scope="row">{constants.usersName+": "}</th>
//                                 <td style={{fontSize:'18px'}}>{user.name}</td>
//                              </tr>
//                         </div>
//                         <div className="col col-xs-12 col-sm-3">
//                         <tr>
//                                 <th style={{fontSize:'18px'}} scope="row">{constants.usersEmail+": "}</th>
//                                 <td style={{fontSize:'18px'}}>{user.email}</td>
//                              </tr>
//                         </div>
//                         <div className="col col-xs-12 col-sm-2">
//                             <Link 
//                             to={`user/${user.userId}`}
//                             ><VisibilityIcon />View</Link>
//                         </div>
//                         <div className="col col-xs-12 col-sm-2">
//                             <Link
//                                 to={`editUser/${user.userId}`}
//                             ><EditIcon />Edit</Link>
//                         </div>
//                         <div className="col col-xs-12 col-sm-2">
//                         <Link><DeleteIcon />Delete</Link>
//                         </div>
                       

//                     </div>
//                 </CardContent>

//             </Card>
//         );
       
//     }
   
     
//     return (
//         <div>
//             <Button 
//              component={Link}
//              to='/addUser'
//             className="row"
//                 variant='contained' style={{backgroundColor:'#66BB6A', marginBottom:'10px'}}
//             >Add New User</Button>
//             {users.map((user,idx) => eachUser(user,idx))}
//         </div>
       
//     )
// }


// export default UserManager;
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

const UserManager = (props) => {
    const classes = useStyles();  
    const [users,setUsers] = useState([
        {
            name:'person1',
            email: 'person1@gmail',
            phone: '99991',
            designation:'Admin',
            department:'dept1',
            role:'role1',
            accesses:['read','edit','write'],
            addedDate:'21-12-20'
        },
        {
            name:'person2',
            email: 'person2@gmail',
            phone: '99992',
            designation:'Executive',
            department:'dept2',
            role:'role2',
            accesses:['read','edit'],
            addedDate:'22-12-20'
        },
        {
            name:'person3',
            email: 'person3@gmail',
            phone: '99993',
            designation:'Auditor',
            department:'dept3',
            role:'role3',
            accesses:['read','edit','write'],
            addedDate:'23-12-20'
        },
        {
            name:'person4',
            email: 'person4@gmail',
            phone: '99994',
            designation:'Manager',
            department:'dept4',
            role:'role4',
            accesses:['read','edit','write'],
            addedDate:'23-12-20'
        },
    ]);
    
    const eachUser = (user,idx) => {
        return(
            <div className="row" style={{marginTop:'15px', fontSize:'19px'}}>
                <div className="col col-xs-6 col-sm-3">
                    {user.name}
                </div>
                <div className="col col-xs-6 col-sm-3">
                    {user.email}
                </div>
                <div className="col col-xs-6 col-sm-2">
                    {user.role}
                </div>
                <div className="col col-xs-6 col-sm-2">
                <Link
                    to={`editUser/${user.userId}`}
                ><EditIcon />Edit</Link>
                </div>
                <div className="col col-xs-6 col-sm-2">
                <Link><DeleteIcon />Delete</Link>
                </div>
                
            </div>
        );
    }

    // const eachUser1 = (user,idx) => {
    //     return (
    //         <Card style={idx%2===0?{backgroundColor:'#e1e0e2'}:{backgroundColor:'#fff'}} className={classes.paper}>
    //             <CardContent>
    //                 <h3>{user.designation}</h3>
    //                 <div className="row">
    //                     <div className="col col-xs-12 col-sm-3">
    //                     <tr>
    //                             <th style={{fontSize:'18px'}} scope="row">{constants.usersName+": "}</th>
    //                             <td style={{fontSize:'18px'}}>{user.name}</td>
    //                          </tr>
    //                     </div>
    //                     <div className="col col-xs-12 col-sm-3">
    //                     <tr>
    //                             <th style={{fontSize:'18px'}} scope="row">{constants.usersEmail+": "}</th>
    //                             <td style={{fontSize:'18px'}}>{user.email}</td>
    //                          </tr>
    //                     </div>
    //                     <div className="col col-xs-12 col-sm-2">
    //                         <Link 
    //                         to={`user/${user.userId}`}
    //                         ><VisibilityIcon />View</Link>
    //                     </div>
    //                     <div className="col col-xs-12 col-sm-2">
    //                         <Link
    //                             to={`editUser/${user.userId}`}
    //                         ><EditIcon />Edit</Link>
    //                     </div>
    //                     <div className="col col-xs-12 col-sm-2">
    //                     <Link><DeleteIcon />Delete</Link>
    //                     </div>
                       

    //                 </div>
    //             </CardContent>

    //         </Card>
    //     );
       
    // }
   
     
    return (
        <div>
            <Button 
             component={Link}
             to='/addUser'
            className="row"
                variant='contained' style={{backgroundColor:'#f9a825', marginBottom:'10px'}}
            >Add New User</Button>
            <Button 
             component={Link}
             to='/modifyRoleAccesses'
            className="row"
                variant='contained' style={{backgroundColor:'#f9a825', marginBottom:'10px',float:'right'}}
            >Modify Role Accesses</Button>
            <Divider />
             <div style={{marginTop:'30px'}}></div>
            {users.map((user,idx) => eachUser(user,idx))}
            <div style={{marginTop:'60px'}}></div>
            {/* {users.map((user,idx) => eachUser1(user,idx))} */}
        </div>
       
    )
}


export default UserManager;
