/**
 * montDiff function to return the total amount of months between to dates
 * Used in determining all timespan averages and all timespan predictions
 */

export const monthDiff = (date1, date2) => {
  let d1 = new Date(date1);
  let d2 = new Date(date2);
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() + 1;
  months += d2.getMonth();
  return months <= 0 ? 0 : months + 1;
};
