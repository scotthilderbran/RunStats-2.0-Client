let moment = require("moment");
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
export const getGraphData = (runs, scale, interval, format) => {
  let out = []; //output array 0 index is data for graph, 1 index is average pace over selected interval
  let overallMin = 0;
  let overallDist = 0;
  let runAverages = [];
  let scaleArr = getDates(scale, interval, format);
  for (let i = 0; i < scale + 1; i++) {
    let currRuns;
    if (scale === 11) {
      console.log("curr scalearr");
      console.log(scaleArr[i]);
      currRuns = runs.filter((run) => {
        return run.date.substring(0, 7) === scaleArr[i];
      });
    } else {
      currRuns = runs.filter((run) => {
        return run.date.substring(5, 11) === scaleArr[i];
      });
    }
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
