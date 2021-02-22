import { Input, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { API } from "aws-amplify";
import React, { Component, useEffect, useState } from "react";

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
  IconButton,
  Divider,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { BarChart, Bar } from "recharts";
import { PureComponent } from "react";
import { Sector, Cell } from "recharts";
import { PieChart, Pie } from "recharts";
const monthlydata = [
  {
    name: "Jan",
    Revenue: 4000,
  },
  {
    name: "Feb",
    Revenue: 3000,
  },
  {
    name: "March",
    Revenue: 2000,
  },
  {
    name: "April",
    Revenue: 2700,
  },
  {
    name: "May",
    Revenue: 1800,
  },
  {
    name: "June",
    Revenue: 2300,
  },
  {
    name: "July",
    Revenue: 3400,
  },
];
const weeklydata = [
  {
    name: "Monday",
    Revenue: 200,
  },
  {
    name: "Tuesday",
    Revenue: 390,
  },
  {
    name: "Thursday",
    Revenue: 290,
  },
  {
    name: "Friday",
    Revenue: 207,
  },
  {
    name: "Saturday",
    Revenue: 120,
  },
  {
    name: "Sunday",
    Revenue: 230,
  },
];
const yearlydata = [
  {
    name: "2019",
    Revenue: 15000,
  },
  {
    name: "2020",
    Revenue: 30000,
  },
  {
    name: "2021",
    Revenue: 50000,
  },
];

const Revenue = (props) => {
  const [id, setId] = useState();

  const onIdChange = (event) => {
    setId(event.target.value);
    //   url = '/accept-order/'+id
    // alert(url)
  };
  return (
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
            Weekly Revenue
          </Typography>
          <BarChart
            width={900}
            height={300}
            data={weeklydata}
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
            <Bar dataKey="Revenue" fill="#95e1d3" />
            <Tooltip />
            <Legend />
          </BarChart>
          <div
            style={{
              marginTop: 20,
              marginBottom: 15,
            }}
          ></div>
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
            Monthly Revenue
          </Typography>
          <BarChart
            width={900}
            height={300}
            data={monthlydata}
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
            <Bar dataKey="Revenue" fill="#a7c5eb" />
            <Tooltip />
            <Legend />
          </BarChart>
          <div
            style={{
              marginTop: 20,
              marginBottom: 15,
            }}
          ></div>
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
            Yearly Revenue
          </Typography>
          <BarChart
            width={900}
            height={300}
            data={yearlydata}
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
            <Bar dataKey="Revenue" fill="#413c69" />
            <Tooltip />
            <Legend />
          </BarChart>
          <div
            style={{
              marginTop: 20,
              marginBottom: 15,
            }}
          ></div>
        </Card>
      </div>
    </div>
  );
};
export default Revenue;
