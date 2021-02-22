import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [whichButton,setWhichButton] = useState('signup');
  return (
    <div className={classes.root}>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            GoFlexe
          </Typography>
          <Button
            component={Link}
            to='/login'
          style={{
              backgroundColor: "#21b6ae",
          }} variant='contained' color="primary">Login</Button>
          <Button
            component={Link}
            to='/signup'
          style={{
              backgroundColor: "#ffd71b",
              marginLeft:'10px'
          }} variant='contained' color="secondary">Signup</Button>
        </Toolbar>
      </AppBar>
      
    </div>
  );
}
