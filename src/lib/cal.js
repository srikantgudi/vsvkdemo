import moment from "moment-timezone";
export const weekDayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
export const monthNames = ['January','February','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
export const getRad = (n, ang) => ((n * ang - 90) * Math.PI) / 180;
export const getAng = (n) => 360 / n;
export const getNumDays = (m,y) => {
  const startdt = moment([y,m,1]).startOf('month');
  const enddt = moment([y,m,1]).endOf('month');
  return {weekday: startdt.weekday(), numdays: enddt.date()}
}
export const calcDays = (m,y) => {
  let days = [];
  const dates = getNumDays(m,y)
  for (let w=0; w < dates.weekday; w++) {
    days = [...days, '*']
  }
  for (let d=1; d <= dates.numdays; d++) {
    days = [...days, d]
  }
  return days;
}
export const getWeekAng = (d) => d * getAng(7) - 90
export const getDayAng = (dt) => {
  console.log('get-day-ang: dt: ', dt.format('DD-MMM-YYYY'));
  const ndays = getNumDays(dt.month(), dt.year()).numdays;
  return dt.date() * getAng(ndays) - 90;
}