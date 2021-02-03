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
const TaxInfoIndex = (props) => {
    const classes = useStyles()
    const [taxDetails,setTaxDetails] = useState(props.taxDetails)
    
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
                                                <th scope="row">PAN:</th>
                                                <td>{taxDetails.pan}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={7}>
                                            <tr>
                                                <th scope="row">GSTIN:</th>
                                                <td>{taxDetails.gstin}</td>
                                            </tr>
                                        </Grid>
                                        
                                    </Grid>
                                </table>
              
        </React.Fragment>
    )
    
}
export default TaxInfoIndex