import React, { Fragment } from "react";
import { Bar, Radar } from "react-chartjs-2";
import { Row, Col } from "reactstrap";

const setting = {
  labels: ["POSITIVE", "NEGATIVE", "NEUTRAL"],
  datasets: [
    {
      label: "Sentiment",
      backgroundColor: [
        "rgba(75, 192, 192, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(75, 192, 192, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      data: [0, 0, 0],
    },
  ],
};

const DataChart = (props) => {
  props.data
    ? (setting.datasets[0].data = [
        props.data.POSITIVE,
        props.data.NEGATIVE,
        props.data.NEUTRAL,
      ])
    : (setting.datasets[0].data = [0, 0, 0]);

  return (
    <div>
    <h5>
      {props.tag.toUpperCase()} Sentiment Distribution
    </h5>
    <hr/>
    <Row className="mt-5">
      <Col xs="12" sm="6">
      <Radar
        data={setting}
        options={{
          title: {
            display: false,
            text: `#${props.tag} Sentiment Distribution`,
            fontSize: 20,
          },
          legend: {
            display: false,
            position: "top",
          },
        }}
        />
      </Col>
      <Col xs="12" sm="6">
      <Bar
        data={setting}
        options={{
          title: {
            display: false,
            text: `#${props.tag} Sentiment Distribution`,
            fontSize: 20,
          },
          legend: {
            display: false,
            position: "top",
          },
          scales: {
            yAxes: [{
              ticks: {
                reverse: false,
                min: 0,
                stepSize: 1
              },
            }]
          }
        }
        }
      />
      </Col>
    </Row>
    </div>
  );
};

export default DataChart;
