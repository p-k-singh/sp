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
        <h1>Dashboard Coming Sooon ...</h1>

        <h4>Enter Order Id</h4>
        <Input type="text" value={id} onChange={(event) => onIdChange(event)} />
        <Button variant="contained" component={Link} to={`/accept-order/${id}`}>
          GO
        </Button>
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
    </div>
  );
};
export default Revenue;
