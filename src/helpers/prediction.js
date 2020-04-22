/* Logic to predict users run performance based on historic running performance*/
import { monthDiff } from "../helpers/monthDiff";
let moment = require("moment"); //Used to get current date to group time periods of past runs
moment().format();

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

//Take in run array, time scale(length) of averages need, interval of averages, and format of averages
export const getPrediction = (runs, scale, interval, format, goal) => {
  if (goal === 0 || goal === null) {
    return "";
  }
  let monthdiff;
  let scaleArr;
  if (scale === 120) {
    let sortedDate = runs.sort(function (a, b) {
      var dateA = new Date(a.date),
        dateB = new Date(b.date);
      return dateA - dateB;
    });
    monthdiff = monthDiff(
      sortedDate[0].date,
      sortedDate[sortedDate.length - 1].date
    );
    scaleArr = getDates(monthdiff, interval, format);
  } else {
    scaleArr = getDates(scale, interval, format);
  }
  let out = 0;
  let overallCount = 0;
  for (let i = 0; i < scale + 1; i++) {
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
          currRuns[j].time * Math.pow(goal / currRuns[j].distance, 1.06);
        counter++;
      }
      out += timePrediction / counter;
      overallCount++;
    }
  }
  if (overallCount === 0) {
    return "Not enough data in selected timespan";
  }
  out = out / overallCount;
  out = out.toFixed(2);
  let hour = Math.floor(out / 60);
  let min = out % 60;
  let sec = (min % 1).toFixed(2) * 60;

  return hour + " hr " + Math.floor(min) + " min " + sec.toFixed(1) + " sec"; // returns time prediction
};
