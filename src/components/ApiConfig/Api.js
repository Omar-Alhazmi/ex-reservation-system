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
            Subject: req.Subject,
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
            Subject: req.Subject,
            Instructor_id: req.Instructor_id
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
    return await axios.post(`${apiURL}api/student/book/new/test/${id}`, req,config)
}
export const InstructorsLogin = async (req) => {
    return await axios.post(`${apiURL}api/Instructor/login`, req)
}
export const StudentsLogin = async (req) => {
    return await axios.post(`${apiURL}api/Student/login`, req)
}
export const getAllTestAvailableForStudent = (id,req) => {
    return axios.post(`${apiURL}api/get/all/available/test/byStudent/${id}`,req, config);
  }
//---------------All Update-----------------------//

export const UpdateLabById = async (req,id) => {
    return await axios.post(`${apiURL}api/update/lab/${id}`, req, config)
}
export const UpdateInstructorById = async (req,id) => {
  return await axios.post(`${apiURL}api/update/Instructor/by/${id}`, req, config)
}


//---------------All GET Request-------------------//
  export const getInstructorById = (id) => {
    return axios.get(`${apiURL}api/get/all/Instructor/${id}`);
  }
  export const getInstructors = () => {
    return axios.get(`${apiURL}api/get/all/Instructor`);
  }
  export const getAllDivision = () => {
    return axios.get(`${apiURL}api/Find/All/Divisions`);
  }
  
  export const getAllAvailableLabs = () => {
    return axios.get(`${apiURL}api/get/all/available/lab`,config);
  }
  export const getAllBookedLabByInstructorId = (id) => {
    return axios.get(`${apiURL}api/Find/all/booked/Lab/${id}`,config);
  }
  export const getAllBookedLabByStudentId = (id) => {
    return axios.get(`${apiURL}api/Find/all/booked/test/${id}`,config);
  }
  export const getAllLabs = () => {
    return axios.get(`${apiURL}api/get/all/lab`);
  }
  export const getStudentsByInstructorId = (id) => {
    return axios.get(`${apiURL}api/Find/All/Division/by/instructorId/${id}`);
  }
  export const getAllInstructorId = () => {
    return axios.get(`${apiURL}api/get/all/InstructorId`,config);
  }
  export const getAllStudents = () => {
    return axios.get(`${apiURL}api/get/all/Student`,config);
  }
  //---------------All remove Request-------------------//
export const RemoveAppointmentByLabId = async (req,id) => {
    return await axios.post(`${apiURL}api/remove/appointment/by/Lab/${id}`, req, config)
}
export const RemoveExamBookedByStudentId = async (id,req) => {
  return await axios.post(`${apiURL}api/student/delete/booked/test/${id}`, req, config)
}
  export const RemoveLabById = (id) => {
    return axios.delete(`${apiURL}api/delete/lab/by/${id}`);
}

export const RemoveInstructorById = (id) => {
  return axios.delete(`${apiURL}api/remove/instructor/by/${id}`);
}
