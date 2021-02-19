import React, { Component, useEffect, useState } from "react";
import { API } from "aws-amplify";
import "./Home.css";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
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
import { BarChart, Bar } from "recharts";
import { PureComponent } from "react";
import { Sector, Cell } from "recharts";
import { PieChart, Pie } from "recharts";

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

function KYC() {
  return (
    <div className="KYC container">
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
      </div>
    </div>
  );
}

export default KYC;
