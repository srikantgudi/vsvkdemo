import moment from "moment-timezone";

export const localTime = () => moment();
export const zoneTime = (z) => moment().tz(z);
export const getPoints = (radius, n = 12) => {
  const ang = 360 / n;
  let arry = [];
  for (let h=0; h < n; h++) {
    const rad = (h * ang - 90) * Math.PI / 180;
    arry = [
      ...arry,
      {
        val: h,
        x: Math.cos(rad) * radius,
        y: Math.sin(rad) * radius,
      }
    ]
  }
  return arry;
}
export const marks = (radius, n = 12) => {
  
}