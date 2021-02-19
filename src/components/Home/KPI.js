import React, { Component, useEffect, useState } from "react";
import { API } from "aws-amplify";
import "./Home.css";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ReactSpeedometer from "react-d3-speedometer";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LineChart, Line } from "recharts";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
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

import { PureComponent } from "react";
import { Sector } from "recharts";
import { PieChart, Pie } from "recharts";
const data = [
  {
    name: "Jan",
    Missed_Opportunities: 40,
    Accepted_Opportunities: 24,
    amt: 24,
  },
  {
    name: "Feb",
    Missed_Opportunities: 30,
    Accepted_Opportunities: 13,
    amt: 22,
  },
  {
    name: "March",
    Missed_Opportunities: 20,
    Accepted_Opportunities: 98,
    amt: 22,
  },
  {
    name: "April",
    Missed_Opportunities: 27,
    Accepted_Opportunities: 39,
    amt: 20,
  },
  {
    name: "May",
    Missed_Opportunities: 18,
    Accepted_Opportunities: 48,
    amt: 2181,
  },
  {
    name: "June",
    Missed_Opportunities: 23,
    Accepted_Opportunities: 38,
    amt: 25,
  },
  {
    name: "July",
    Missed_Opportunities: 34,
    Accepted_Opportunities: 43,
    amt: 21,
  },
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

      {name}
    </text>
  );
};
const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function KYC() {
  const [Deliveryvalue, setDeliveryValue] = React.useState(3.5);
  const [Pickupvalue, setPickupValue] = React.useState(4.5);
  const [hover, setHover] = React.useState(-1);
  return (
    <div className="KYC container">
      <div>
        <div>
          <Card style={{ marginBottom: 20 }}>
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
              Ontime Delivery
            </Typography>

            <div>
              <Grid
                container
                spacing={3}
                style={{ marginTop: 10, paddingLeft: 30 }}
              >
                <Grid
                  item
                  sm={4}
                  style={{
                    marginTop: 6,
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  Ontime Delivery
                </Grid>
                {/* <Box
                align="left"
                component="fieldset"
                mb={3}
                borderColor="transparent"
              > */}
                <Grid item sm={4}>
                  <Rating
                    value={Deliveryvalue}
                    name="rating"
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setDeliveryValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    onClick={setDeliveryValue}
                  />
                </Grid>
                {/* <Grid item sm={2}>
                  {" "}
                  {value !== null && (
                    <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
                  )}
                </Grid> */}
              </Grid>
            </div>
            <div>
              <Grid
                container
                spacing={3}
                style={{ marginTop: 10, paddingLeft: 30 }}
              >
                <Grid
                  item
                  sm={4}
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  Ontime Pickup
                </Grid>
                {/* <Box
                align="left"
                component="fieldset"
                mb={3}
                borderColor="transparent"
              > */}
                <Grid item sm={4}>
                  <Rating
                    value={Pickupvalue}
                    name="rating"
                    precision={0.5}
                    onChange={(event, ewValue) => {
                      setPickupValue(ewValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    onClick={setPickupValue}
                  />
                </Grid>
                {/* <Grid item sm={2}>
                  {" "}
                  {value !== null && (
                    <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
                  )}
                </Grid> */}
              </Grid>
            </div>
          </Card>
        </div>
        <div>
          <Card style={{ marginBottom: 20 }}>
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
              Quality
            </Typography>

            <div style={{ height: 250 }}>
              <Grid
                container
                spacing={3}
                style={{ marginTop: 10, paddingLeft: 30 }}
              >
                <Grid
                  item
                  sm={6}
                  style={{
                    paddingLeft: 50,
                    marginTop: 6,
                    marginBottom: 10,
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  <div style={{ height: 200 }}>
                    <ReactSpeedometer
                      maxValue={10}
                      value={7.5}
                      needleColor="red"
                      startColor="green"
                      segments={5}
                      endColor="blue"
                      textColor="grey"
                    />
                  </div>
                  <div style={{ paddingLeft: 120 }}>Damage</div>
                </Grid>
                {/* <Box
                align="left"
                component="fieldset"
                mb={3}
                borderColor="transparent"
              > */}
                <Grid
                  item
                  sm={6}
                  style={{
                    paddingLeft: 50,
                    marginTop: 6,
                    marginBottom: 10,
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  <div style={{ height: 200 }}>
                    <ReactSpeedometer
                      maxValue={10}
                      value={9}
                      needleColor="red"
                      startColor="green"
                      segments={5}
                      endColor="blue"
                      textColor="grey"
                    />
                  </div>
                  <div style={{ paddingLeft: 120 }}>Pilferage</div>
                </Grid>
              </Grid>
            </div>
          </Card>
        </div>
        <div>
          <Card style={{ marginBottom: 10 }}>
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
              Opportunities
            </Typography>
            <BarChart
              width={900}
              height={300}
              data={data}
              margin={{
                top: 50,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="Accepted_Opportunities"
                stackId="a"
                fill="#8884d8"
              />
              <Bar dataKey="Missed_Opportunities" stackId="a" fill="#82ca9d" />
            </BarChart>
            <div
              style={{
                marginTop: 20,
                marginBottom: 15,
                borderTop: `1px solid lightgrey`,
              }}
            >
              <Grid
                container
                spacing={3}
                style={{ marginTop: 10, paddingLeft: 30 }}
              >
                <Grid
                  item
                  sm={4}
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  Customer Feedback
                </Grid>
                {/* <Box
                align="left"
                component="fieldset"
                mb={3}
                borderColor="transparent"
              > */}
                <Grid item sm={4}>
                  <Rating
                    value={Pickupvalue}
                    name="rating"
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setPickupValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    onClick={setPickupValue}
                  />
                </Grid>
              </Grid>
            </div>
          </Card>
        </div>
      </div>
      {/* <div>
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
                    fontSize: 12,
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
                      {damagedData.map((entry, index) => (
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
                    Delay
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
      </div> */}
    </div>
  );
}

export default KYC;
