const currday = function (amount) {
  let today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //As January is 0.
  var yyyy = today.getFullYear();

  dd -= amount;
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return yyyy + "-" + mm + "-" + dd;
};

const getWeekScale = () => {
  let weekScale = [];
  var today = new Date();
  let tracker = 6;
  for (let i = 0; i < 7; i++) {
    //populate weekScale array
    weekScale[i] = today.getMonth() + 1 + "-" + (today.getDate() - tracker);
    tracker--;
  }
  return weekScale;
};

export const getWeekData = (runs) => {
  let out = [];
  console.log("in Analytics rn");
  console.log(runs);
  let overallMin = 0;
  let overallDist = 0;
  let runAverages = [];
  let tracker = 6;
  for (let i = 0; i < 7; i++) {
    console.log(currday(tracker));
    let currRuns = runs.filter((run) => {
      return run.date === currday(tracker);
    });
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
    tracker--;
  }
  out[1] = overallMin / overallDist;
  out[0] = {
    labels: getWeekScale(),
    datasets: [
      {
        label: "Average Mile Pace",
        data: runAverages,
        fill: false,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        spanGaps: true,
      },
    ],
  };
  return out;
};
