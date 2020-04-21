function getDay(dateData = "", format = "") {
  let curretDate = "";
  if (dateData) {
    curretDate = new Date(dateData);
  } else {
    curretDate = new Date();
  }
  let year = curretDate.getFullYear();
  let month = curretDate.getMonth() + 1;
  if (month < 10) month = "0" + month;
  let date = curretDate.getDate();
  if (date < 10) date = "0" + date;
  let hours = curretDate.getHours();
  if (hours < 10) hours = "0" + hours;
  let miutes = curretDate.getMinutes();
  if (miutes < 10) miutes = "0" + miutes;
  let seconds = curretDate.getSeconds();
  if (seconds < 10) seconds = "0" + seconds;
  // let milliseconds = curretDate.getMilliseconds();
  if (format && format == "yyyy-MM-dd") {
    return `${year}-${month}-${date}`;
  }
  return `${year}-${month}-${date} ${hours}:${miutes}:${seconds}`;
}
const datejs = {
  //获取当天日期，type为空时，返回年月日，为end时，返回年月日时分秒
  today(type = "") {
    let date = getDay("", "yyyy-MM-dd");
    if (!type) {
      return date;
    } else if (type == "end") {
      return `${date} 23:59:59`;
    } else {
      return `${date} 00:00:00`;
    }
  },
  checkDate(days, startDate, endDate = "") {
    if (endDate) {
      let startDateData = new Date(startDate).getTime();
      let endDateData = new Date(endDate).getTime();
      if (endDateData > startDateData + 24 * 60 * 60 * 1000 * days) {
        return getDay(startDateData + 24 * 60 * 60 * 1000 * days);
      } else {
        return endDate;
      }
    } else {
      let startDateData = new Date(startDate);
      let endDateData = startDateData.setTime(
        startDateData.getTime() + 24 * 60 * 60 * 1000 * days
      );
      return getDay(endDateData);
    }
  }
};

export default datejs;
