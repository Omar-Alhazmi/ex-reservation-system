import jwt_decode from 'jwt-decode';

export const checkStorage = () => {
  return (localStorage.getItem('currentUser') !== undefined && localStorage.getItem('currentUser')  !== null) ?true:false ;
};
export const getToken = () => {
  return (checkStorage()) ? localStorage.getItem('currentUser') : ""
};
export const getInfo = () => {
  return (checkStorage()) ? jwt_decode(localStorage.getItem('currentUser')) : ""
};
export const getId = () => {
  if (checkStorage()) {
    return getInfo().data._id
  }
}

export const validFileType = (file) => {
  const fileTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ];
  return fileTypes.includes(file.type);
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