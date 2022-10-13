import apiURL from './ApiConfig';
import axios from 'axios';
import Swal from "sweetalert2";

import { checkStorage, getToken } from '../helperMethods';
//================== Helper Method ============================||
const config = {
    headers: {}
}
if (checkStorage()) {
    config.headers['Authorization'] = `Bearer ${getToken()}`
}

//================== Helper Method ============================||
//---------------All POST Request-------------------//

//========================= Register Single Instructor =============================\\
export const InstructorSingleRegistration = async (req) => {
    return axios({
        method: 'POST',
        url: apiURL + 'api/Instructor/register',
        data: {
            FullName: req.FullName,
            Email: req.Email,
            password: req.password,
            InstructorId: req.InstructorId,
            Phone: req.Phone,
            InstructorReference: req.InstructorReference,
            Teach: req.Teach,
            HasPermissionTo: req.HasPermissionTo
        }
    },
    config)
}
//========================= Add Instructors From File =============================\\
export const InstructorFileRegistration = async (File) => {
    const formData = new FormData();
    formData.append("file", File);
    return await axios.post(`${apiURL}api/upload/Instructor/register/fromFile`, formData, config)
        .then(res => {
            if (res === "Error") {
                Swal.fire({
                    title: ` ${res.data.message}`,
                    icon: 'error',
                    showCancelButton: false,
                })
            }
            window.location.reload(false)
        }
        ).catch(err => console.log(err));
};
//========================= Register Single Student =============================\\
export const StudentSingleRegistration = async (req) => {
    return axios({
        method: 'POST',
        url: apiURL + 'api/Student/register',
        data: {
            FullName: req.FullName,
            Email: req.Email,
            password: req.password,
            StudentId: req.StudentId,
            Phone: req.Phone,
            StudentReference: req.StudentReference,
            Study: req.Study,
            Instructor: req.Instructor
        },
        config: config
    })
}
//========================= Register Single Student =============================\\
export const LabRegistration = async (req) => {
    return await axios.post(`${apiURL}api/add/new/lab`, req, config)
}
export const NewLabBooking = async (req,id) => {
    return await axios.post(`${apiURL}api/instructor/booking/new/lab/${id}`, req, config)
}
export const StudentReserveNewTest = async (req,id) => {
    return await axios.post(`${apiURL}api/student/book/new/test/${id}`, req)
}
export const InstructorsLogin = async (req) => {
    return await axios.post(`${apiURL}api/Instructor/login`, req)
}
export const StudentsLogin = async (req) => {
    return await axios.post(`${apiURL}api/Student/login`, req)
}
//---------------All GET Request-------------------//
export const getInstructorById = (id) => {
    return axios.get(`${apiURL}api/get/all/Instructor/${id}`);
  }
  
  export const getAllAvailableLabs = () => {
    return axios.get(`${apiURL}api/get/all/available/lab`);
  }
  export const getAllBookedLabByInstructorId = (id) => {
    return axios.get(`${apiURL}api/Find/all/booked/Lab/${id}`,config);
  }
  export const getAllLabs = (id) => {
    return axios.get(`${apiURL}api/get/all/lab`);
  }
export const getStudentsByInstructorId = (id) => {
    return axios.get(`${apiURL}api/Find/All/Division/by/instructorId/${id}`);
  }
  export const getAllTestAvailableForStudent = (id,req) => {
    return axios.get(`${apiURL}  api/get/all/available/test/byStudent/${id}`,req);
  }
