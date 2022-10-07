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

