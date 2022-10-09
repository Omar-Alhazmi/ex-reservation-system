import React, { Component } from 'react'
import { StudentSingleRegistration } from '../ApiConfig/Api';
import Swal from "sweetalert2";
import { AiOutlineMail, AiFillIdcard, AiOutlineMobile } from 'react-icons/ai';
import { CgLastpass, CgRename} from 'react-icons/cg';
import {MdOutlineIntegrationInstructions} from 'react-icons/md';
import UploadFileForm from './UploadFileForm';

export default class StudentManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      FullName: "",
      Email: "",
      password: "",
      StudentId: "",
      Phone: "",
      StudentReference: "",
      Study: "",
      Instructor: ""
    }
    this.handelSubmit = this.handelSubmit.bind(this);
    this.toggleHandler = this.toggleHandler.bind(this);
  }
  RegisterSingleStudent = (data) => {
    StudentSingleRegistration(data)
      .then(response => {
        console.log(response);
        let errMessage = response.data.message
        console.log(errMessage);
        if (response.data.success === false && errMessage === "Email") {
          Swal.fire({ icon: 'error', title: "البريد الالكتروني مسجل من قبل " });
        }
        else if (response.data.success === true) {
          Swal.fire({ icon: 'success', title: "تم تسجيل المتدرب بنجاح " });
        }
        else {
          Swal.fire({ icon: 'error', title: "الرجاء التأكد  من ادخال البيانات بشكل صحيح" });
        }
      })
      .catch(error => {
        Swal.fire({ icon: 'error', title: `حدث خطا` });
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handelSubmit = e => {
    if(this.props.id)this.setState({ Instructor: this.props.id }) 
    const newStudent = this.state;
    e.preventDefault();
    this.RegisterSingleStudent(newStudent);
  };
  toggleHandler = (e) => {
    this.setState({ show: !this.state.show })
  }
  render() {
    const { FullName, StudentId, Email, Phone, password, show, StudentReference,Study, Instructor} = this.state;
    return (
      <>
        {(!show) ? <div className="LoginContainer">
          <form className='login-form' >
            <div className="flex-row">
              <label className="lf--label" htmlFor="Email">
                <AiOutlineMail />
              </label>
              <input id="Email"
                required
                className='lf--input'
                placeholder='البريد الالكتروني'
                name="Email"
                type="text"
                onChange={e => this.handleChange(e)}
                value={Email} />
            </div>
            <div className="flex-row">
              <label className="lf--label" htmlFor="password">
                <CgLastpass />
              </label>
              <input
                required
                id="password"
                className='lf--input'
                placeholder='كلمة المرور'
                name="password"
                type='password'
                onChange={e => this.handleChange(e)}
                value={password} />
            </div>
            <div className="flex-row">
              <label className="lf--label" htmlFor="FullName">
                <CgRename />
              </label>
              <input
                required
                id="FullName"
                className='lf--input'
                placeholder='اسم المتدرب'
                name="FullName"
                type="text"
                onChange={e => this.handleChange(e)}
                value={FullName} />
            </div>
            <div className="flex-row">
              <label className="lf--label" htmlFor="StudentId">
                <AiFillIdcard />
              </label>
              <input
                required
                id="StudentId"
                className='lf--input'
                placeholder='رقم المتدرب'
                name="StudentId"
                type="number"
                onChange={e => this.handleChange(e)}
                value={StudentId} />
            </div>
            <div className="flex-row">
              <label className="lf--label" htmlFor="StudentReference">
                <AiFillIdcard />
              </label>
              <input
                required
                id="StudentReference"
                className='lf--input'
                placeholder='الرقم المرجعي'
                name="StudentReference"
                type="number"
                onChange={e => this.handleChange(e)}
                value={StudentReference} />
            </div>
        {(this.props.id)?"":
        <div className="flex-row">
              <label className="lf--label" htmlFor="Instructor">
                <CgRename />
              </label>
              <input
                required
                id="Instructor"
                className='lf--input'
                placeholder='رقم المدرب'
                name="Instructor"
                type="text"
                onChange={e => this.handleChange(e)}
                value={Instructor} />
            </div>}
            <div className="flex-row">
              <label className="lf--label" htmlFor="Study">
                <MdOutlineIntegrationInstructions />
              </label>
              <input
                required
                id="Study"
                className='lf--input'
                placeholder='اسم المادة'
                name="Study"
                type="text"
                onChange={e => this.handleChange(e)}
                value={Study} />
            </div>
            <div className="flex-row">
              <label className="lf--label" htmlFor="Phone">
                <AiOutlineMobile />
              </label>
              <input
                required
                id="Phone"
                className='lf--input'
                placeholder='رقم الجوال '
                name="Phone"
                type="number"
                onChange={e => this.handleChange(e)}
                value={Phone} />
            </div>
            <input className='lf--submit' type='submit' onClick={e => this.handelSubmit(e)} value='تسجيل المتدرب'/>
            {(this.props.id)?"": <input className='lf--submit' onClick={e => this.toggleHandler(e)} value='رفع الملف وتسجيل المتدربين' />}
          </form>
        </div>
          :
          <UploadFileForm toggleHandler={this.toggleHandler} from={"students"} />
        }
      </>
    )
  }
}
