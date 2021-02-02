import React, { useState } from 'react'
import {Input,Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {API} from 'aws-amplify'
const Home = (props) => {
    const [id,setId] = useState();
    
    const onIdChange =  (event) => {
        setId(event.target.value)
     //   url = '/accept-order/'+id
       // alert(url)
    }
    return (
        <div>
            <h1>Dashboard Coming Sooon ...</h1> 
            <Input type="text" value={id} onChange={(event) => onIdChange(event)} />
            <Button
            variant="contained"
                component={Link}
                to={`/accept-order/${id}`}
            >GO</Button>
        </div>
    )
}
export default Home
