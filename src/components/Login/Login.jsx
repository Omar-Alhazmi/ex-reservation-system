import React, { Component } from 'react'
import '../Styles/login.css';
import Swal from "sweetalert2";
import { getInfo } from "../helperMethods";
import axios from 'axios';
import { createBrowserHistory } from 'history';
import apiURL from '../ApiConfig/ApiConfig';
import { IoMdFingerPrint } from 'react-icons/io';
import { CgLastpass} from 'react-icons/cg';
import  logo  from "../Images/tvtc.png";
const history = createBrowserHistory();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InstructorId: "",
      password: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handelSubmit(e) {
    e.preventDefault();
    let checkValidation = true
    Object.entries(this.state).forEach(([key, value]) => {
      if (value === "") {
        return checkValidation = false;
      }
    })
    if (checkValidation === false) {
      Swal.fire({ icon: 'error', title: "تأكد من ادخال البيانات بشكل صحيح" });
    } else {
    axios
      .post(`${apiURL}api/Instructor/login`, {
        InstructorId: this.state.InstructorId,
        password: this.state.password
      })
      .then(res => {
        console.log(res.data);
        try{
        if (res.data.success === false) {
          return Swal.fire({ icon: 'error', title: res.data.message })
        }
        localStorage.setItem("currentUser", res.data.token);
        localStorage.setItem('CountTime', new Date());
        let jwt = getInfo().data.Role;
        if (jwt === undefined) {
          history.push("/");
          Swal.fire(` ${jwt}`, "", 'error');
        }
        else if (jwt === "Instructor") {
          console.log(jwt);
          Swal.fire({ icon: 'success', title: ` مرحبا  ${getInfo().data.FullName} `,showConfirmButton: false,timer: 1500 });
          history.push('#/Instructor')
        } else if (jwt === "SysAdmin") {
          console.log(jwt);
          history.push("#/SysDashboard");
          Swal.fire({ icon: 'success', title: ` مرحبا  ${getInfo().data.FullName} `,showConfirmButton: false,timer: 1500 });
        }
         else {
          Swal.fire(` اسم المستخدم او الرقم السري غير صحيح`, "", 'error');
        }
        window.location.reload(false);
        return res;
      
      }catch{
        Swal.fire({ icon: 'error', title: res.data.message});

      }})
  }}
  render() {
    return (
      <>
        <div className="LoginContainer">
          <form className='login-form' onSubmit={e => this.handelSubmit(e)}>
            <div className="login-logo-container">
            <img className='logo' src={logo} alt="logo" />
            </div>
            <div className="flex-row">
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
            </div>
            <div className="flex-row">
            <label className="lf--label" htmlFor="password">
                <CgLastpass />
              </label>
              <input id="password"
                className='lf--input'
                placeholder='كلمة المرور'
                name="password"
                type='password'
                onChange={e => this.handleChange(e)}
                value={this.state.password} />
            </div>
            <input className='lf--submit' type='submit' value='تسجيل الدخول' onClick={e => this.handelSubmit(e)} />
          </form>
        </div>
      </>
    )
  }
}
export {Login};