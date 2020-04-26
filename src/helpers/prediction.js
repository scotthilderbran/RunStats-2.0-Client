import { monthDiff } from "../helpers/monthDiff";
let moment = require("moment"); //Used to get current date to group time periods of past runs
moment().format();

/**
 * prediction.js generates race time predictions for selected distances
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
 * getPrediction takes in runs, scale, interval, format, and goal distance and returns a predicted time value for runner
 */
export const getPrediction = (runs, scale, interval, format, goal) => {
  if (goal === 0 || goal === null) {
    //If no goal return ""
    return "";
  }
  let monthdiff;
  let scaleArr;
  if (scale === 120) {
    //If scale === 120, function needs to return all timespan prediciton
    let sortedDate = runs.sort(function (a, b) {
      //Sort all runs by time to determine timespan needed to calculate
      let dateA = new Date(a.date),
        dateB = new Date(b.date);
      return dateA - dateB;
    });
    monthdiff = monthDiff(
      //Find difference in months
      sortedDate[0].date,
      sortedDate[sortedDate.length - 1].date
    );
    scaleArr = getDates(monthdiff, interval, format); //Get scale array for all time prediction
  } else {
    scaleArr = getDates(scale, interval, format); //Get scale array
  }
  let out = 0;
  let overallCount = 0;
  for (let i = 0; i < scale + 1; i++) {
    //Loop through all times in scale array and calculate prediction
    let currRuns;
    let timePrediction = 0;
    let counter = 0;
    if (scale === 11 || scale === 120) {
      currRuns = runs.filter((run) => {
        return run.date.substring(0, 7) === scaleArr[i];
      });
    } else {
      currRuns = runs.filter((run) => {
        return run.date.substring(5, 11) === scaleArr[i];
      });
    }
    if (currRuns.length !== 0) {
      for (let j = 0; j < currRuns.length; j++) {
        timePrediction +=
          currRuns[j].time * Math.pow(goal / currRuns[j].distance, 1.06); //Login to predict runner performance
        counter++;
      }
      out += timePrediction / counter; //Average out predictions per timespan.
      overallCount++;
    }
  }
  if (overallCount === 0) {
    return "Not enough data in selected timespan";
  }
  out = out / overallCount; //Averages out all predictions
  out = out.toFixed(2);
  let hour = Math.floor(out / 60);
  let min = out % 60;
  let sec = (min % 1).toFixed(2) * 60;

  return hour + " hr " + Math.floor(min) + " min " + sec.toFixed(1) + " sec"; // returns time prediction
};
