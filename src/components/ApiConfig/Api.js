import apiURL from './ApiConfig';
import axios from 'axios';
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
    // const data = {
    //     FullName: req.FullName,
    //     Email: req.Email,
    //     password: req.password,
    //     InstructorId: req.InstructorId,
    //     Phone: req.Phone,
    //     InstructorReference: req.InstructorReference,
    //     Teach: req.Teach,
    //     HasPermissionTo: req.HasPermissionTo
    // }
    try {
        const res = await axios.post(`${apiURL}api/Instructor/register`, req, config);
        console.log(res);
    } catch (err) {
        return console.log(err);
    }
}
//========================= Add Instructors From File =============================\\
export const InstructorFileRegistration = async (File) => {
    const formData = new FormData();
    formData.append("file", File);
    try {
        const res = await axios.post(`${apiURL}api/upload/Instructor/register/fromFile`, formData, config);
        console.log(res);
        window.location.reload(false);
    } catch (err) {
        return console.log(err);
    }
};
