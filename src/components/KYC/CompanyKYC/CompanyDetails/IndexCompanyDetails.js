import React,{useEffect, useState} from 'react'
import Spinner from '../../../UI/Spinner'
import {Link} from 'react-router-dom'
import {
    Card,
    CardContent,
    Typography,
    makeStyles,
    Grid,
    Breadcrumbs
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
    }
});
const AccountInfoIndex = (props) => {
    const classes = useStyles()
    const [comDetails,setComDetails] = useState(props.companyDetails)
    
    const fun = (page) => {
        //alert(JSON.stringify(props))
        props.changePage(page)
    }
    
    return(
        <React.Fragment>
                                <table>
                                    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                                        <Grid item xs={12} sm={6} >
                                            <tr>
                                                <th scope="row">Registered Name:</th>
                                                <td>{comDetails.registeredName}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">Registered Address:</th>
                                                <td>{comDetails.registeredAddress}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">Email:</th>
                                                <td>{comDetails.registeredEmail}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">Contact:</th>
                                                <td>{comDetails.registeredContactNo}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th>Registraion Proof:</th>
                                                <td>
                                                <a href={'https://goflexe-kyc.s3.ap-south-1.amazonaws.com/'+comDetails.registrationDocLink} target={'_blank'} >Open</a>
                                                </td>
                                            </tr>
                                        </Grid>
                                    </Grid>
                                </table>
              
        </React.Fragment>
    )
    
}
export default AccountInfoIndex