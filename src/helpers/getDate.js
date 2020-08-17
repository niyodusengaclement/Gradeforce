export const getDateAndTime = (val) => {
  const date = new Date(val);
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}

export const DateCalculator = (date1, date2) => {
  const dt1 = new Date(date1);
  const dt2 = new Date(date2);
  // return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
  return dt2-dt1;
}

export const dueDateCalculator = (endDate) => {
  const dt1 = new Date().setTime(new Date());
  const diff = endDate - dt1;
  return diff;
}