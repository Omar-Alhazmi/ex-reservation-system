import React, { Component } from 'react'
import { InstructorFileRegistration, InstructorSingleRegistration } from '../ApiConfig/Api';
import { validFileType } from '../helperMethods';
import Swal from "sweetalert2";
import { CgSoftwareUpload } from 'react-icons/cg';

export default class InstructorsManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      file: "",
      Data: {
        FullName: "",
        Email: "",
        password: "",
        InstructorId: "",
        Phone: "",
        InstructorReference: "",
        Teach: "",
        HasPermissionTo: ""
      }
    }
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handelFileSubmit = this.handelFileSubmit.bind(this);
    this.toggleHandler = this.toggleHandler.bind(this);
  }
  InstructorRegistrationFromFile = (Team) => {
    const { file } = this.state
    if (file) {
      if (!validFileType(file)) {
        throw Swal.fire({
          title: ` الرجاء التأكد من امتداد  الملف  ان يكون تابع لملفات {xls,xlsx} `,
          icon: 'error',
          showCancelButton: false,
        })
      }
    }
    InstructorFileRegistration(file)
      .then(response => {
        console.log(response);
        if (response === "Error") {
          Swal.fire({
            title: ` ${response.data.message}`,
            icon: 'error',
            showCancelButton: false,
          })
        }
        try {
          Swal.fire({
            title: ` تم تسجيل المدربين  بنجاح`,
            icon: 'success',
            confirmButtonText: 'موافق',
            showCancelButton: false,
          })
          this.toggleHandler()
        }
        catch (error) {
          Swal.fire({
            title: ` ${response.data.message}`,
            icon: 'error',
            showCancelButton: false,
          })
        }
      })
  }

  handleChange(e) {
    const Data = { ...this.state.Data, [e.target.name]: e.target.value }
    this.setState(() => ({ Data }))
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
  toggleHandler = (e) => {
    this.setState({ show: !this.state.show })
  }

  render() {
    const { Data, file } = this.state
    let filePh;
    if(file !== "") filePh = file.name
        else filePh = "الرجاء ارفاق الملف";
    return (
      <>
        <div className="LoginContainer">
          <form className='login-form' onSubmit={e => this.handelFileSubmit(e)}>
            {/* <div className="flex-row">
            <label className="lf--label" htmlFor="InstructorId">
                <IoMdFingerPrint />
              </label>
              <input id="username"
                required
                className='lf--input'
                placeholder='اسم المستخدم'
                name="InstructorId"
                type="text"
                onChange={e => this.handleChange(e)}
                value={this.state.InstructorId} />
            </div> */}
            <div className="flex-row">
              <label className="lf--label" for="file">
                <CgSoftwareUpload />
              </label>
              <input id="file"
                //  required
                className='lf--input uploadFile'
                name="file"
                accept={validFileType(file)}
                type="file"
                onChange={e => this.handleFileChange(e)}
              />
              <label className="imageLabel" for="file">{filePh}</label>
            </div>
            <input className='lf--submit' type='submit' value='رفع الملف وتسجيل المدربين' onClick={e => this.handelFileSubmit(e)} />
          </form>
        </div>
      </>
    )
  }
}