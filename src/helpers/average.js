import { monthDiff } from "../helpers/monthDiff";
let moment = require("moment"); //Used to get current date to group time periods of past runs
moment().format();

/**
 * average.js finds average pace of timespan and outputs graph data json for graph
 */

const getDates = (scale, interval, format) => {
  //Get dates function, returns array of dates between the range (scale), in the selected format (mm/dd) for week and month, yyyy/mm for year
  let start = moment().subtract(scale, interval);
  let end = moment();
  let days = [];
  let day = start;

  while (day <= end) {
    days.push(day.format(format));
    day = day.clone().add(1, interval);
  }
  return days;
};

/**
 * getGraphData returns graph data and averages within timespan
 * Function first finds a scale array which is the date values within the timespan.
 * The scale array is used to both filter only runs in the selected timespan and also generate x values for graph
 */

export const getGraphData = (runs, scale, interval, format) => {
  let out = []; //output array, 0 index is data for graph, 1 index is average pace over selected interval
  let overallMin = 0;
  let overallDist = 0;
  let runAverages = [];
  let monthdiff;
  let scaleArr;
  if (scale === 120) {
    //If scale is 120, function needs to return all average
    let sortedDate = runs.sort(function (a, b) {
      //Sorts runs by date
      var dateA = new Date(a.date),
        dateB = new Date(b.date);
      return dateA - dateB;
    });
    monthdiff = monthDiff(
      //Finds difference in months between earliest and latest dates
      sortedDate[0].date,
      sortedDate[sortedDate.length - 1].date
    );
    scaleArr = getDates(monthdiff, interval, format); //Gets scale array of all runs earliest to latest
  } else {
    scaleArr = getDates(scale, interval, format); //If not returning all averages, get scale array with origin parameters
  }
  for (let i = 0; i < scale + 1; i++) {
    //Loop to iterate through each time in scale array and find average pace
    let currRuns;
    if (scale === 11 || scale === 120) {
      //If scale is year or all time, filter date using yyyy-mm format
      currRuns = runs.filter((run) => {
        return run.date.substring(0, 7) === scaleArr[i];
      });
    } else {
      currRuns = runs.filter((run) => {
        //Otherwise filter using mm-dd
        return run.date.substring(5, 11) === scaleArr[i];
      });
    }
    let minTotal = 0;
    let distTotal = 0;
    let average = 0;
    for (let j = 0; j < currRuns.length; j++) {
      //Find minute total and distance total for current scale array date
      minTotal += Number(currRuns[j].time);
      distTotal += Number(currRuns[j].distance);
    }
    if (minTotal !== 0) {
      overallMin += minTotal;
      overallDist += distTotal;
      average = minTotal / distTotal;
      runAverages[i] = Math.round(average * 100) / 100; //Populate array runAverages for graph data values
    }
  }
  out[1] = overallMin / overallDist; //Pace average
  out[0] = {
    // object of graph data
    labels: scaleArr,
    datasets: [
      {
        label: "Average Mile Pace",
        data: runAverages, //runAverages array
        fill: false,
        backgroundColor: [
          "rgba(52, 58, 64, 1)",
          "rgba(52, 58, 64, 1)",
          "rgba(52, 58, 64, 1)",
          "rgba(52, 58, 64, 1)",
          "rgba(52, 58, 64, 1)",
          "rgba(52, 58, 64, 1)",
          "rgba(52, 58, 64, 1)",
        ],
        borderColor: ["rgba(52, 58, 64, 1)"],
        pointBackgroundColor: [
          "rgba(52, 58, 64, 1)",
          "rgba(52, 58, 64, 1)",
          "rgba(52, 58, 64, 1)",
          "rgba(52, 58, 64, 1)",
          "rgba(52, 58, 64, 1)",
          "rgba(52, 58, 64, 1)",
          "rgba(52, 58, 64, 1)",
        ],
        borderWidth: 2,
        spanGaps: true,
      },
    ],
  };
  return out;
};
