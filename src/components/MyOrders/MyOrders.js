import React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import AcceptedOrders from './AcceptedOrders'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Pending" />
        <Tab label="Accepted" />
        <Tab label="Completed" />
        <Tab label="Rejected" />
      </Tabs>
      
        <TabPanel value={value} index={0} dir={theme.direction}>
          Pending Orders
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <AcceptedOrders />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Completed Orders
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          Rejected Orders
        </TabPanel>
    </Paper>
  );
}
