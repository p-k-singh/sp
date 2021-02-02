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
    const [accDetails,setAccDetails] = useState()
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        var temp = {
            accountHolderName:'Prashant Kumar Singh',
            accountNumber:'918252782928',
            ifscCode:'ABCD1234'
        }
        setAccDetails(temp);
        setLoading(false)
    },[])
    const fun = (page) => {
        //alert(JSON.stringify(props))
        props.changePage(page)
    }
    if(loading===true){
        return(
            <Spinner />
        )
    }
    return(
        <React.Fragment>
            {/* <Breadcrumbs style={{marginBottom:'10px'}} aria-label="breadcrumb">
        <Link color="inherit" onClick={() => fun('')}>
            KYC
        </Link>
            <Typography color="textPrimary">Account Details</Typography>
    </Breadcrumbs> */}
        <Card className={classes.root}>
            <CardContent style={{ padding: 0,marginTop:10 }}>
                                {/* <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                                    Account Details
                                </Typography> */}
                                <table>
                                    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                                        <Grid item xs={12} sm={6} >
                                            <tr>
                                                <th scope="row">Account Holder Name:</th>
                                                <td>{accDetails.accountHolderName}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">Account Number:</th>
                                                <td>{accDetails.accountNumber}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">IFSC Code:</th>
                                                <td>{accDetails.ifscCode}</td>
                                            </tr>
                                        </Grid>
                                       

                                    </Grid>
                                </table>
                </CardContent>
            </Card>
        </React.Fragment>
    )
    
}
export default AccountInfoIndex