import jwt_decode from 'jwt-decode';
import moment from 'moment';

export const checkStorage = () => {
  return (localStorage.getItem('currentUser') !== undefined && localStorage.getItem('currentUser') !== null) ? true : false;
};
export const getToken = () => {
  return (checkStorage()) ? localStorage.getItem('currentUser') : false
};
export const getInfo = () => {
  return (checkStorage()) ? jwt_decode(localStorage.getItem('currentUser')) : false
};
export const getId = () => {
  if (checkStorage()) {
    return getInfo().data._id
  }
}
export const getFullName = () => {
  if (checkStorage()) {
    return getInfo().data.FullName
  }
}
export const dateFormat = (date) => {
  let displayDate = new Date(date)
  displayDate = displayDate.toString().split(' ')
  return `${displayDate[2]} ${displayDate[1]} ${displayDate[3]}`
}
export const DayIs = (date) => {
  let displayDate = new Date(date)
  console.log(displayDate,date);
  displayDate = displayDate.toString().split(' ')
  switch (displayDate[0]) {
    case "Sat":
      displayDate = "السبت";
      break;
    case "Sun":
      displayDate = "الأحد";
      break;
    case "Mon":
      displayDate = "الاثنين";
      break;
    case "Tue":
      displayDate = "الثلاثاء";
      break;
    case "Wed":
      displayDate = "الأربعاء";
      break;
    case "Thu":
      displayDate = "الخميس";
      break;
    case "Fri":
      displayDate = "الجمعة";
      break;
    default:displayDate = 	displayDate[0]
  }
  return `${displayDate}`
}
export const timeFormat = (date) => {
  let displayDate = new Date(date)
  displayDate = displayDate.toString().split(' ')
  displayDate = displayDate[4].split(':')
  return displayDate[0] + ':' + displayDate[1]
}
export const getHoursDiff = (startDate, endDate) => {
  console.log(startDate, endDate);
  const msInHour = 1000 * 60 * 60;
  return Math.round(Math.abs(endDate - startDate) / msInHour);
}
export const examDuration = (from, to) => {
  const hours = (new Date(to).getHours() - new Date(from).getHours());
  const minutes = (new Date(to).getMinutes() - new Date(from).getMinutes());
  return `${hours}:${minutes}`
}
export const validFileType = (file) => {
  const fileTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ];
  return fileTypes.includes(file.type);
}



export const checkOverlappingDates = (timeFrom, timeTo, checkTimeConflict) => {
  return checkTimeConflict.some((elem) => {
    return (!((moment(timeTo).diff(moment(elem.From))) < 0 ||
      (moment(timeFrom).diff(moment(elem.To))) > 0
    ))
  })
}
export const validFileTypePDF = (file) => {
  const fileTypes = [
    "application/pdf",
  ];
  return fileTypes.includes(file.type);
}
// start the time out
const EXPIRE_TIME = 1000 * 60 * 60 * 5;
setTimeout(function () {
  localStorage.clear();
  window.location.reload(false);
}, EXPIRE_TIME);