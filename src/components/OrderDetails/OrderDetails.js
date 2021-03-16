import React, { useState, useEffect } from "react";
import axios from "axios";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import constants from "../../Constants/constants";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card } from "@material-ui/core";
import Spinner from "../UI/Spinner"

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
  },
  title: {
    fontSize: 20,
    height: 50,
    padding: 10,
    paddingLeft: 55,
    color: "white",
  },
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
  formControl: {
    marginTop: "1%",
  },
});
const OrderDetails = (props) => {
  const classes = useStyles();
  const [allDetails, setAllDetails] = useState(null);
  useEffect(() => {
    const url =
      "https://t2v0d33au7.execute-api.ap-south-1.amazonaws.com/Staging01/customerorder/" +
      props.id;
    console.log(url);
    axios
      .get(url)
      .then((resp) => {
        console.log(resp);
        setAllDetails(resp.data.Item);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  if (allDetails === null) {
    return <Spinner />;
  }
  if (allDetails === null) return <Spinner />;
  else if (allDetails.items === undefined) {
    return (
      <div>
       
        <Card>
          <table>
            <Grid
              container
              spacing={3}
              style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
            >
              <Grid item xs={12} sm={6}>
                <tr>
                  <th scope="row">{constants.pickupAddress + " : "}</th>
                  <td>
                    {allDetails.fromAddress},{allDetails.fromPin}
                  </td>
                </tr>
              </Grid>
              <Grid item xs={12} sm={6}>
                <tr>
                  <th scope="row">{constants.destinationAddress + " : "}</th>
                  <td>
                    {allDetails.toAddress},{allDetails.toPin}
                  </td>
                </tr>
              </Grid>
              <Grid item xs={12} sm={6}>
                <tr>
                  <th scope="row">{constants.noOfUnits + " : "}</th>
                  <td> {allDetails.noOfUnits}</td>
                </tr>
              </Grid>
              <Grid item xs={12} sm={6}>
                <tr>
                  <th scope="row">{constants.weightPerUnit + " : "}</th>
                  <td> {allDetails.weightPerUnit} Kg</td>
                </tr>
              </Grid>
              <Grid item xs={12} sm={6}>
                <tr>
                  <th scope="row">{constants.DimensionPerUnit + " : "}</th>
                  <td>
                    {allDetails.height} x {allDetails.width} x {allDetails.breadth}{" "}
                    {allDetails.unit || allDetails.unit.label}
                  </td>
                </tr>
              </Grid>
            </Grid>
          </table>
        </Card>
      </div>
    );
  } else if (allDetails.items.length == 1) {
    return (
      <div>
       
        <Card>

          <table>
            <Grid
              container
              spacing={3}
              style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
            >
              <Grid item xs={12} sm={12}>
                <tr>
                  <th scope="row">{constants.pickupAddress + " : "}</th>
                  <td>
                    {allDetails.fromAddress},{allDetails.fromPin}
                  </td>
                </tr>
              </Grid>

              <Grid item xs={12} sm={12}>
                <tr>
                  <th scope="row">{constants.destinationAddress + " : "}</th>
                  <td>
                    {allDetails.toAddress},{allDetails.toPin}
                  </td>
                </tr>
              </Grid>
            </Grid>
          </table>
          {allDetails.items.map((each, index) => (
            <div>
              <Typography
                className={classes.title}
                style={{ color: "black", backgroundColor: "lightgrey" }}
              >
                Product Details
              </Typography>
              <table>
                <Grid
                  container
                  spacing={3}
                  style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
                >
                  <Grid item xs={12} sm={6}>
                    <tr>
                      <th scope="row">{"Product Name : "}</th>
                      <td>{each.productName}</td>
                    </tr>
                  </Grid>
                  {each.measurable == true ? (
                    <Grid item xs={12} sm={6}>
                      <tr>
                        <th scope="row">{"No. of Units : "}</th>
                        <td>{each.noOfUnits}</td>
                      </tr>
                    </Grid>
                  ) : (
                    <p></p>
                  )}
                  {each.measurable == true ? (
                    <Grid item xs={12} sm={6}>
                      <tr>
                        <th scope="row">{"Weight per Unit : "}</th>
                        <td>{each.weightPerUnit} Kg</td>
                      </tr>
                    </Grid>
                  ) : (
                    <p></p>
                  )}
                  {each.measurable == false ? (
                    <Grid item xs={12} sm={6}>
                      <tr>
                        <th scope="row">{"Total Weight : "}</th>
                        <td>{each.totalWeight} Kg</td>
                      </tr>
                    </Grid>
                  ) : (
                    <p></p>
                  )}
                  <Grid item xs={12} sm={6}>
                    <tr>
                      <th scope="row">{"Product Type : "}</th>
                      <td>{each.productType.label || each.productType}</td>
                    </tr>
                  </Grid>
                  {each.measurable == true ? (
                    <Grid item xs={12} sm={6}>
                      <tr>
                        <th scope="row">{"Dimensions : "}</th>
                        <td>
                          {each.height} x {each.length} x {each.width}{" "}
                          {each.unit.label || each.unit}
                        </td>
                      </tr>
                    </Grid>
                  ) : (
                    <p></p>
                  )}

                  <Grid item xs={12} sm={6}>
                    <tr>
                      <th scope="row">{"Category: "}</th>
                      <td>
                        {each.categories.map((unit) => unit.label + ",")}{" "}
                      </td>
                    </tr>
                  </Grid>
                </Grid>
              </table>
            </div>
          ))}
        </Card>
      </div>
    );
  } else if (allDetails.items.length > 1) {
    return (
      <div>
       
        <Card>

          <table>
            <Grid
              container
              spacing={3}
              style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
            >
              <Grid item xs={12} sm={12}>
                <tr>
                  <th scope="row">{constants.pickupAddress + " : "}</th>
                  <td>
                    {allDetails.fromAddress},{allDetails.fromPin}
                  </td>
                </tr>
              </Grid>

              <Grid item xs={12} sm={12}>
                <tr>
                  <th scope="row">{constants.destinationAddress + " : "}</th>
                  <td>
                    {allDetails.toAddress},{allDetails.toPin}
                  </td>
                </tr>
              </Grid>
            </Grid>
          </table>
          {allDetails.items.map((each, index) => (
            <div>
              <Typography
                className={classes.title}
                style={{ color: "black", backgroundColor: "lightgrey" }}
              >
                Product No. {index + 1}
              </Typography>
              <table>
                <Grid
                  container
                  spacing={3}
                  style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
                >
                  <Grid item xs={12} sm={6}>
                    <tr>
                      <th scope="row">{"Product Name : "}</th>
                      <td>{each.productName}</td>
                    </tr>
                  </Grid>
                  {each.measurable == true ? (
                    <Grid item xs={12} sm={6}>
                      <tr>
                        <th scope="row">{"No. of Units : "}</th>
                        <td>{each.noOfUnits}</td>
                      </tr>
                    </Grid>
                  ) : (
                    <p></p>
                  )}
                  {each.measurable == true ? (
                    <Grid item xs={12} sm={6}>
                      <tr>
                        <th scope="row">{"Weight per Unit : "}</th>
                        <td>{each.weightPerUnit} Kg</td>
                      </tr>
                    </Grid>
                  ) : (
                    <p></p>
                  )}
                  {each.measurable == false ? (
                    <Grid item xs={12} sm={6}>
                      <tr>
                        <th scope="row">{"Total Weight : "}</th>
                        <td>{each.totalWeight} Kg</td>
                      </tr>
                    </Grid>
                  ) : (
                    <p></p>
                  )}
                  <Grid item xs={12} sm={6}>
                    <tr>
                      <th scope="row">{"Product Type : "}</th>
                      <td>{each.productType.label || each.productType}</td>
                    </tr>
                  </Grid>
                  {each.measurable == true ? (
                    <Grid item xs={12} sm={6}>
                      <tr>
                        <th scope="row">{"Dimensions : "}</th>
                        <td>
                          {each.height} x {each.length} x {each.width}{" "}
                          {each.unit.label || each.unit}
                        </td>
                      </tr>
                    </Grid>
                  ) : (
                    <p></p>
                  )}

                  <Grid item xs={12} sm={6}>
                    <tr>
                      <th scope="row">{"Category: "}</th>
                      <td>
                        {each.categories.map((unit) => unit.label + ",")}{" "}
                      </td>
                    </tr>
                  </Grid>
                </Grid>
              </table>
            </div>
          ))}
        </Card>
      </div>
    );
  }
};;
export default OrderDetails;
