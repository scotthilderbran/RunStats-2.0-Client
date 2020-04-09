import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { getWeekData } from "../../helpers/analytics";
import { connect } from "react-redux";
import { Card } from "react-bootstrap/";

class WeekAverage extends Component {
  render() {
    const weekAVG = getWeekData(this.props.runs);
    return (
      <div className="mt-3">
        <Line
          data={weekAVG[0]}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    callback: function (value, index, values) {
                      return value + " min/mile";
                    },
                    suggestedMin: 3,
                    suggestedMax: 15,
                  },
                },
              ],
            },
          }}
        />
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>
              Weekly Average pace is {Math.round(weekAVG[1] * 100) / 100}{" "}
              min/mile
            </Card.Title>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  runs: state.run.runs,
});

export default connect(mapStateToProps)(WeekAverage);
