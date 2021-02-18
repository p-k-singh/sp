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
import { API } from "aws-amplify";
import "./Home.css";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
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
import { BarChart, Bar } from "recharts";
import { PureComponent } from "react";
import { Sector, Cell } from "recharts";
import { PieChart, Pie } from "recharts";

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
  { name: "Free", Trucks: 24 },
  { name: "Alloted ", Trucks: 52 },
  { name: "In Transit", Trucks: 16 },
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
      {name}
    </text>
  );
};

class Home extends Component {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/30763kr7/";
  render() {
    return (
      <div>
        {/* <div className="widgetWrap">
          <div className="widgetValue">
            <div className="Value">Hello Gaurav</div>
          </div>
        </div> */}
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
            <Grid container spacing={3} style={{ marginTop: 10 }}>
              <Grid item sm={0.5}></Grid>{" "}
              <Grid item sm={2}>
                <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <div class="circle" style={{ background: "#062B79" }}>
                    <h3 style={{ padding: 20, fontSize: 50 }}>20</h3>
                  </div>
                  <div
                    style={{
                      padding: 5,
                      paddingTop: 10,
                      paddingBottom: 0,
                      textAlign: "center",
                      fontWeight: 700,
                    }}
                  >
                    Total Orders fullfilled
                  </div>
                </CardContent>
              </Grid>{" "}
              <Grid item sm={1}></Grid>
              <Grid item sm={2}>
                <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <div class="circle" style={{ background: "green" }}>
                    <h3 style={{ padding: 20, fontSize: 50 }}>12</h3>
                  </div>
                  <div
                    style={{
                      padding: 5,
                      paddingTop: 10,
                      paddingBottom: 0,
                      textAlign: "center",
                      fontWeight: 700,
                    }}
                  >
                    Total orders to be fulfiled
                  </div>
                </CardContent>
              </Grid>{" "}
              <Grid item sm={1}></Grid>
              <Grid item sm={2}>
                <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <div class="circle" style={{ background: "orange" }}>
                    <h3 style={{ padding: 20, fontSize: 50 }}>8</h3>
                  </div>
                  <div
                    style={{
                      padding: 5,
                      paddingTop: 10,
                      paddingBottom: 0,
                      textAlign: "center",
                      fontWeight: 700,
                    }}
                  >
                    Upcoming pickup
                  </div>
                </CardContent>
              </Grid>{" "}
              <Grid item sm={1}></Grid>
              <Grid item sm={2}>
                <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <div class="circle" style={{ background: "#C57A7A" }}>
                    <h3 style={{ padding: 20, fontSize: 50 }}>5</h3>
                  </div>
                  <div
                    style={{
                      padding: 5,
                      paddingTop: 10,
                      paddingBottom: 0,
                      textAlign: "center",
                      fontWeight: 700,
                    }}
                  >
                    Orders in Transit
                  </div>
                </CardContent>
              </Grid>
              <Grid item sm={1}></Grid>
            </Grid>
          </Card>
        </div>
        <div>
          <Grid container spacing={3} style={{ paddingTop: 10 }}>
            <Grid item xs={12} sm={8}>
              <div>
                <Card Style={{ marginBottom: 20 }}>
                  <CardContent>
                    <div
                      style={{
                        padding: 5,
                        paddingTop: 10,
                        paddingBottom: 20,
                        textAlign: "center",
                        fontWeight: 700,
                      }}
                    >
                      Asset Dashboard
                    </div>

                    <BarChart
                      width={550}
                      height={190}
                      data={data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />

                      <YAxis dataKey="Trucks" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Trucks" fill="#82ca9d" />
                    </BarChart>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <div
                    style={{
                      padding: 5,
                      paddingTop: 10,
                      paddingBottom: 10,
                      textAlign: "center",
                      fontWeight: 700,
                    }}
                  >
                    Trucks
                  </div>
                  <div>
                    <PieChart width={300} height={200}>
                      <Pie
                        isAnimationActive={false}
                        dataKey="Trucks"
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
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={3} style={{ paddingTop: 10 }}>
            <Grid
              item
              xs={12}
              sm={4}
              style={{
                paddingTop: 10,
                paddingBottom: 0,
                textAlign: "center",
                fontWeight: 700,
              }}
            >
              <Card
              // style={{
              //   borderRadius: 0,
              //   backgroundColor: "lightgrey",
              //   boxShadow: "none",
              // }}
              >
                <CardContent
                  style={{
                    padding: 10,
                    borderBottom: `1px solid lightgrey`,
                  }}
                >
                  Total amount to be recieved
                </CardContent>
                <div class="paymentText" style={{ padding: 40 }}>
                  Rs. 2773
                </div>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              style={{
                paddingTop: 10,
                paddingBottom: 0,
                textAlign: "center",
                fontWeight: 700,
              }}
            >
              <Card>
                <CardContent
                  style={{
                    padding: 10,
                    borderBottom: `1px solid lightgrey`,
                  }}
                >
                  {" "}
                  Amount Recieved
                </CardContent>
                <div class="paymentText" style={{ padding: 40 }}>
                  Rs. 2773
                </div>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              style={{
                paddingTop: 10,
                paddingBottom: 0,
                textAlign: "center",
                fontWeight: 700,
              }}
            >
              <Card>
                <CardContent
                  style={{
                    padding: 10,
                    borderBottom: `1px solid lightgrey`,
                  }}
                >
                  Amount Pending
                </CardContent>
                <div class="paymentText" style={{ padding: 40 }}>
                  Rs. 2773
                </div>
              </Card>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={3} style={{ paddingTop: 20 }}>
            <Grid
              item
              xs={12}
              sm={4}
              style={{
                paddingTop: 10,
                paddingBottom: 0,
                textAlign: "center",
                fontWeight: 700,
              }}
            >
              <Card>
                <CardContent
                  style={{
                    padding: 10,
                    borderBottom: `1px solid lightgrey`,
                  }}
                >
                  Total Revenue
                </CardContent>
                <div class="paymentText" style={{ padding: 30 }}>
                  Rs. 2773
                </div>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              sm={2}
              style={{
                paddingTop: 10,
                paddingBottom: 0,
                textAlign: "center",
                fontWeight: 700,
              }}
            >
              <Card>
                <CardContent
                  style={{
                    padding: 10,
                    borderBottom: `1px solid lightgrey`,
                  }}
                >
                  {" "}
                  Weekly{" "}
                </CardContent>
                <div class="paymentText" style={{ padding: 30 }}>
                  Rs. 2773
                </div>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              sm={2}
              style={{
                paddingTop: 10,
                paddingBottom: 0,
                textAlign: "center",
                fontWeight: 700,
              }}
            >
              <Card>
                <CardContent
                  style={{
                    padding: 10,
                    borderBottom: `1px solid lightgrey`,
                  }}
                >
                  Monthly
                </CardContent>
                <div class="paymentText" style={{ padding: 30 }}>
                  Rs. 2773
                </div>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              sm={2}
              style={{
                paddingTop: 10,
                paddingBottom: 0,
                textAlign: "center",
                fontWeight: 700,
              }}
            >
              <Card>
                <CardContent
                  style={{
                    padding: 10,
                    borderBottom: `1px solid lightgrey`,
                  }}
                >
                  Quarterly
                </CardContent>
                <div class="paymentText" style={{ padding: 30 }}>
                  Rs. 2773
                </div>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              sm={2}
              style={{
                paddingTop: 10,
                paddingBottom: 0,
                textAlign: "center",
                fontWeight: 700,
              }}
            >
              <Card>
                <CardContent
                  style={{
                    padding: 10,
                    borderBottom: `1px solid lightgrey`,
                  }}
                >
                  Yearly
                </CardContent>
                <div class="paymentText" style={{ padding: 30 }}>
                  Rs. 2773
                </div>
              </Card>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={3} style={{ paddingTop: 20 }}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <div
                    style={{
                      padding: 5,
                      paddingTop: 10,
                      paddingBottom: 10,
                      textAlign: "center",
                      fontWeight: 700,
                    }}
                  >
                    Total Products vs Damaged Products
                  </div>
                  <div>
                    <PieChart width={300} height={200}>
                      <Pie
                        isAnimationActive={false}
                        dataKey="products"
                        data={damagedData}
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
                  </div>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={8}>
              <div>
                <Card Style={{ marginBottom: 20 }}>
                  <CardContent>
                    <div
                      style={{
                        padding: 5,
                        paddingTop: 10,
                        paddingBottom: 20,
                        textAlign: "center",
                        fontWeight: 700,
                      }}
                    >
                      Asset Dashboard
                    </div>

                    <BarChart
                      width={550}
                      height={190}
                      data={delayData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />

                      <YAxis dataKey="Quantity" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Quantity" fill="#df4759" />
                    </BarChart>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Home;
