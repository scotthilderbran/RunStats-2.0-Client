var moment = require("moment");
moment().format();

//Get data for past week Analytics
function getDates(scale, interval, format) {
  console.log("in getDates function");
  var start = moment().subtract(scale, interval);
  var end = moment();
  console.log(start);
  console.log(end);
  var days = [];
  var day = start;

  while (day <= end) {
    days.push(day.format(format));
    day = day.clone().add(1, interval);
  }
  console.log("This is days return:");
  console.log(days);
  return days;
}

//Get data for past week Analytics

export const getGraphData = (runs, scale, interval, format) => {
  //Take in run array, time scale(length) of averages need, interval of averages, and format of averages
  let out = [];
  console.log("in getMonthData rn");
  let overallMin = 0;
  let overallDist = 0;
  let runAverages = [];
  let scaleArr = getDates(scale, interval, format);
  console.log("Scale Arr");
  console.log(scaleArr);
  console.log(runs[0].date.substring(5, 11));
  for (let i = 0; i < scale + 1; i++) {
    let currRuns;
    if (scale === 11) {
      console.log("curr scalearr");
      console.log(scaleArr[i]);
      currRuns = runs.filter((run) => {
        return run.date.substring(0, 7) === scaleArr[i];
      });
      console.log("Curr Runs");
      console.log(currRuns);
    } else {
      currRuns = runs.filter((run) => {
        return run.date.substring(5, 11) === scaleArr[i];
      });
    }
    console.log("Curr Runs: ");
    console.log(currRuns);
    let minTotal = 0;
    let distTotal = 0;
    let average = 0;
    for (let j = 0; j < currRuns.length; j++) {
      minTotal += Number(currRuns[j].time);
      distTotal += Number(currRuns[j].distance);
    }
    if (minTotal != 0) {
      overallMin += minTotal;
      overallDist += distTotal;
      average = minTotal / distTotal;
      runAverages[i] = Math.round(average * 100) / 100;
    }
  }
  out[1] = overallMin / overallDist;
  out[0] = {
    labels: getDates(scale, interval, format),
    datasets: [
      {
        label: "Average Mile Pace",
        data: runAverages,
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
