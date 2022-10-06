import React, { Component } from 'react'
import '../Styles/popupModal.css'
import Swal from "sweetalert2";
import { CgSoftwareUpload } from 'react-icons/cg';
import { checkStorage, getToken, validFileType } from '../helperMethods';
import apiURL from '../ApiConfig/ApiConfig';
import axios from 'axios';
export default class UploadFileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: ""
        }
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handelFileSubmit = this.handelFileSubmit.bind(this);
    }
    InstructorRegistrationFromFile = (file) => {
        const config = {
            headers: {}
        }
        if (checkStorage()) {
            config.headers['Authorization'] = `Bearer ${getToken()}`
        }
        if (file === "" || file === null || file === undefined) {
            throw Swal.fire({
                title: ` الرجاء ارفاق الملف`,
                icon: 'error',
                showCancelButton: false,
            })
        } else {
            if (!validFileType(file)) {
                throw Swal.fire({
                    title: ` الرجاء التأكد من امتداد  الملف  ان يكون تابع لملفات {xls,xlsx} `,
                    icon: 'error',
                    showCancelButton: false,
                })
            }
        }
        let endPoint = this.props.from;
        (endPoint === "instructor") ? endPoint = 'api/upload/Instructor/register/fromFile' : endPoint = 'api/upload/Student/register/fromFile';
        const formData = new FormData();
        formData.append("file", file);
        axios.post(`${apiURL}${endPoint}`, formData, config)
            .then(res => {
                Swal.fire({
                    title: ` تم التسجيل  بنجاح`,
                    icon: 'success',
                    confirmButtonText: 'موافق',
                    showCancelButton: false,
                })
                this.props.toggleHandler()
            }
            ).catch(err => {
                console.log(err.response);
                Swal.fire({
                    title: ` ${err.response.data.message}`,
                    icon: 'warning',
                    showCancelButton: false,
                })
            });
    }
    handleFileChange(e) {
        const file = e.target.files[0];
        this.setState({ file: file })
    }
    handelFileSubmit = e => {
        e.preventDefault();
        const { file } = this.state
        this.InstructorRegistrationFromFile(file);
    };
    render() {
        const { file } = this.state
        console.log(file);
        let filePh = ""
        if (file !== "") filePh = file.name
        else filePh = "الرجاء ارفاق الملف";
        return (
            <div className='modalContainer'>
                <div className="modal-container" id="modal-opened">
                    <div className="modal">
                        <form onSubmit={e => this.handelFileSubmit(e)}>
                            <div className="modal__details">
                                <div className="flex-row-file modal__btn">
                                    <label className="lf-label-file" for="file">
                                        <CgSoftwareUpload />
                                    </label>
                                    <input type="file"
                                        id="file"
                                        required
                                        className='lf--input uploadFile'
                                        name="file"
                                        accept={validFileType(file)}
                                        onChange={e => this.handleFileChange(e)}
                                    />
                                    <label className="fileLabel" for="file">{filePh}</label>
                                </div>
                            </div>
                            <p className="modal__text"></p>
                            <button className="modal__btn" onClick={e => this.handelFileSubmit(e)} >حفض وإرسال &rarr;</button>
                            <button className="link-2" onClick={this.props.toggleHandler}></button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
