import React, { Component } from 'react'
import '../Styles/login.css';
import Swal from "sweetalert2";
import { getInfo } from "../helperMethods";
import { createBrowserHistory } from 'history';
import { IoMdFingerPrint } from 'react-icons/io';
import { CgLastpass } from 'react-icons/cg';
import logo from "../Images/logo.png";
import { InstructorsLogin, StudentsLogin } from "../ApiConfig/Api"
const history = createBrowserHistory();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: "",
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
    const { Id, password } = this.state
    const InstructorLoginCredential = { InstructorId: Id, password: password }
    const loginCredential = { StudentId: Id, password: password }

    let checkValidation = true
    Object.entries(this.state).forEach(([key, value]) => {
      if (value === "") {
        return checkValidation = false;
      }
    })
    if (checkValidation === false) {
      Swal.fire({ icon: 'error', title: "تأكد من ادخال البيانات بشكل صحيح" });
    } else {
      StudentsLogin(loginCredential)
        .then(response => {
          try {
            console.log(response.data.success);
            if (response.data.success === false) {
              InstructorsLogin(InstructorLoginCredential)
                .then(res => {
                  try {
                    if (res.data.success !== false) {
                      localStorage.setItem("currentUser", res.data.token);
                      localStorage.setItem('CountTime', new Date());
                      let jwt = getInfo().data.Role;
                      if (jwt === undefined) {
                        history.push("/");
                        Swal.fire(` ${jwt}`, "", 'error');
                      }
                      else if (jwt === "Instructor") {
                        Swal.fire({ icon: 'success', title: ` مرحبا  ${getInfo().data.FullName} `, showConfirmButton: false, timer: 1500 });
                        history.push('#/Instructor')
                      } else if (jwt === "SysAdmin") {
                        history.push("#/Moderator/Home");
                        Swal.fire({ icon: 'success', title: ` مرحبا  ${getInfo().data.FullName} `, showConfirmButton: false, timer: 1500 });
                      }
                      window.location.reload(false);
                      return res;
                    } else {
                      Swal.fire(` اسم المستخدم او الرقم السري غير صحيح`, "", 'error');
                    }
                  } catch {
                    console.log(res);
                    Swal.fire({ icon: 'error', title: res.data });

                  }
                })
            } else {
              localStorage.setItem("currentUser", response.data.token);
              localStorage.setItem('CountTime', new Date());
              let jwt = getInfo().data;
              if (jwt === undefined) {
                history.push("/");
                Swal.fire(` ${jwt}`, "حدث خطأ", 'error');
              } else {
                Swal.fire({ icon: 'success', title: ` مرحبا  ${getInfo().data.FullName} `, showConfirmButton: false, timer: 1500 });
                history.push('#/Students/Home')
                window.location.reload(false);
              }
            }
          } catch {
            console.log(response);
          }
        })
    }
  }
  render() {
    return (
      <>
        <div className="LoginContainer">
          <form className='login-form' onSubmit={e => this.handelSubmit(e)}>
            <div className="login-logo-container">
              <img className='logo' src={logo} alt="logo" />
            </div>
            <div className="flex-row">
              <label className="lf--label" htmlFor="Id">
                <IoMdFingerPrint />
              </label>
              <input id="username"
                required
                className='lf--input'
                placeholder='اسم المستخدم'
                name="Id"
                type="text"
                onChange={e => this.handleChange(e)}
                value={this.state.Id} />
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
export { Login };