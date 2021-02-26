// import React, { useState } from 'react'
// import {Input,Button} from '@material-ui/core'
// import {Link} from 'react-router-dom'
// import {API} from 'aws-amplify'
// const Home = (props) => {
//     const [id,setId] = useState();

//     const onIdChange =  (event) => {
//         setId(event.target.value)
//      //   url = '/accept-order/'+id
//        // alert(url)
//     }
//     return (
//       <div>
//         <h1>Dashboard Coming Sooon ...</h1>

//         <h4>Enter Order Id</h4>
//         <Input type="text" value={id} onChange={(event) => onIdChange(event)} />
//         <Button variant="contained" component={Link} to={`/accept-order/${id}`}>
//           GO
//         </Button>
//       </div>
//     );
// }
// export default Home

import React, { Component, useEffect, useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { API } from "aws-amplify";
import "./Home.css";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Marker } from "google-maps-react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  TextField,
  Checkbox,
  Grid,
  Card,
  Button,
  IconButton,
  Divider,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { BarChart, Bar } from "recharts";
import { PureComponent } from "react";
import { Sector, Cell } from "recharts";
import { PieChart, Pie } from "recharts";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    borderRadius: 0,
    backgroundColor: "lightgrey",

    boxShadow: "none",
  },
}));

const data = [
  { name: "Amount Recieved", Payment: 24000 },
  { name: "Amount Pending ", Payment: 52000 },
];

const delayData = [
  { name: "Delayed Trucks", Quantity: 12 },
  { name: "Delayed Orders ", Quantity: 52 },
];
const damagedData = [
  { name: "Damaged", products: 14 },
  { name: "Total", products: 52 },
];
const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
  Payment,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {/* {`${(percent * 100).toFixed(0)}%`} */}
      {Payment}
      {/* {name} */}
    </text>
  );
};

const Home = (props) => {
  const [value, setValue] = React.useState(3.5);
  const [stores, setStores] = React.useState([
    { lat: 47.49855629475769, lng: -122.14184416996333 },
    { latitude: 47.359423, longitude: -122.021071 },
    { latitude: 47.2052192687988, longitude: -121.988426208496 },
    { latitude: 47.6307081, longitude: -122.1434325 },
    { latitude: 47.3084488, longitude: -122.2140121 },
    { latitude: 47.5524695, longitude: -122.0425407 },
  ]);

  const displayMarkers = () => {
    return stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude,
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  return (
    <div>
      <div>
        <Card style={{ marginBottom: 10 }}>
          <div>
            <Typography
              style={{
                borderBottom: `1px solid black`,
                fontSize: 20,
                height: 50,
                padding: 10,
                paddingLeft: 30,
                fontWeight: 700,
              }}
              fullWidth
            >
              Shipment details
            </Typography>
          </div>
          <Grid container spacing={0}>
            <Grid item sm={12} xs={12}>
              <Grid container spacing={3} style={{ marginTop: 10 }}>
                <Grid item sm={0.5}></Grid>{" "}
                <Grid item sm={2}>
                  <Button component={Link} to={`kpi`}>
                    <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
                      <div
                        class="circle"
                        style={{ background: "#062B79", margin: 10 }}
                      >
                        <h3
                          style={{
                            padding: 20,
                            paddingBottom: 23,
                            paddingTop: 23,
                            fontSize: 50,
                          }}
                        >
                          3.5
                        </h3>
                      </div>
                      <div
                        style={{
                          padding: 5,
                          paddingTop: 0,
                          paddingBottom: 0,
                          textAlign: "center",
                          fontWeight: 700,
                        }}
                      >
                        Performance Rating
                        <div>
                          <Rating
                            style={{
                              fontSize: 10,
                              padding: 0,
                            }}
                            size="small"
                            name="rating"
                            precision={0.5}
                            value={value}
                            readOnly
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Button>
                </Grid>{" "}
                <Grid item sm={1}></Grid>
                <Grid item sm={2}>
                  <Button component={Link} to={"my-orders"}>
                    <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
                      <div class="circle" style={{ background: "green" }}>
                        <h3 style={{ padding: 20, fontSize: 50 }}>12</h3>
                      </div>
                      <div
                        style={{
                          padding: 17,
                          paddingTop: 10,
                          paddingBottom: 0,
                          textAlign: "center",
                          fontWeight: 700,
                        }}
                      >
                        Orders fulfilled
                      </div>
                    </CardContent>
                  </Button>
                </Grid>{" "}
                <Grid item sm={1}></Grid>
                <Grid item sm={2}>
                  <Button component={Link} to={"my-orders"}>
                    <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
                      <div class="circle" style={{ background: "orange" }}>
                        <h3 style={{ padding: 20, fontSize: 50 }}>8</h3>
                      </div>
                      <div
                        style={{
                          padding: 15,
                          paddingTop: 10,
                          paddingBottom: 0,
                          textAlign: "center",
                          fontWeight: 700,
                        }}
                      >
                        Upcoming pickup
                      </div>
                    </CardContent>
                  </Button>
                </Grid>{" "}
                <Grid item sm={1}></Grid>
                <Grid item sm={2}>
                  <Button component={Link} to={"my-orders"}>
                    <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
                      <div class="circle" style={{ background: "#C57A7A" }}>
                        <h3 style={{ padding: 20, fontSize: 50 }}>5</h3>
                      </div>
                      <div
                        style={{
                          padding: 23,
                          paddingTop: 10,
                          paddingBottom: 0,
                          textAlign: "center",
                          fontWeight: 700,
                        }}
                      >
                        In Transit
                      </div>
                    </CardContent>
                  </Button>
                </Grid>
                <Grid item sm={1}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </div>
      <div>
        <Grid container spacing={3} style={{ paddingTop: 10 }}>
          <Grid item xs={12} sm={6}>
            <div>
              <Link to="/Revenue">
                <Card Style={{ marginBottom: 20 }}>
                  <CardContent>
                    <div
                      style={{
                        padding: 5,
                        paddingTop: 10,
                        paddingBottom: 10,
                        textAlign: "center",
                        fontWeight: 700,

                        borderBottom: `1px solid lightgrey`,
                      }}
                    >
                      Total Revenue
                    </div>

                    <div style={{ height: 200 }}>
                      <Grid container>
                        <Grid
                          item
                          xs={6}
                          style={{
                            marginTop: 20,

                            padding: 10,
                          }}
                        >
                          <img
                            style={{
                              height: 150,
                              width: 150,
                              padding: 10,
                            }}
                            alt="truck"
                            src="data:image/png;base64,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"
                          />
                        </Grid>

                        <Grid
                          item
                          xs={6}
                          style={{
                            marginTop: 90,
                            marginBottom: 20,
                          }}
                        >
                          <h6
                            style={{
                              marginBottom: 25,
                              marginLeft: 20,
                              textAlign: "center",
                              fontWeight: 700,
                              fontSize: 30,
                            }}
                          >
                            ₹ 9,56,789
                          </h6>
                        </Grid>
                      </Grid>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <div
                  style={{
                    padding: 5,
                    paddingTop: 10,
                    paddingBottom: 10,
                    textAlign: "center",
                    fontWeight: 700,
                    borderBottom: `1px solid lightgrey`,
                  }}
                >
                  Payments
                </div>

                <div>
                  <Grid container>
                    <Grid item xs={12} sm={7}>
                      <PieChart width={300} height={200}>
                        <Pie
                          isAnimationActive={false}
                          dataKey="Payment"
                          data={data}
                          cx={135}
                          cy={100}
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                        >
                          {data.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </Grid>
                    <Grid item xs={12} sm={1} style={{ marginTop: 75 }}>
                      <div
                        style={{
                          background: "#FF8042",
                          width: 10,
                          marginBottom: 35,
                          height: 10,
                        }}
                      ></div>
                      <div
                        style={{
                          background: "#0088FE",
                          width: 10,

                          height: 10,
                        }}
                      ></div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      style={{ marginTop: 70, fontWeight: 600, fontSize: 12 }}
                    >
                      <div style={{ marginBottom: 30 }}>Amount Recieved</div>
                      <div>Amount Pending</div>
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div>
        {/* <Card style={{ marginBottom: 20, marginTop: 20 }}>
          <Grid container spacing={3} style={{ marginTop: 10 }}>
            <Grid item sm={12}>
              <div>
                <Typography
                  style={{
                    borderBottom: `1 px solid black`,
                    fontSize: 20,
                    height: 50,
                    padding: 10,
                    paddingLeft: 30,
                    fontWeight: 700,
                  }}
                  fullWidth
                >
                  Asset Dashboard
                </Typography>
              </div>
              <Map
                google={props.google}
                zoom={8}
                style={{ height: 800, width: 950 }}
                initialCenter={{ lat: 47.444, lng: -122.176 }}
              >
                {displayMarkers()}
              </Map>
            </Grid>
          </Grid>
        </Card> */}
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  // apiKey: "AIzaSyA4sApR940lanPlHAQ2DPfawJAqB2QfCaE",
  apiKey: "AIzaSyCw1Cu5QmZqsFLWq-D7m12E3Qqjjj13xWY",
})(Home);
