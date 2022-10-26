import React, { Component } from 'react'

import { InstructorSingleRegistration, UpdateInstructorById, RemoveInstructorById } from '../../ApiConfig/Api';

import Swal from "sweetalert2";
import { AiOutlineMail, AiFillIdcard, AiOutlineMobile } from 'react-icons/ai';
import { CgLastpass, CgRename } from 'react-icons/cg';
import { GiClassicalKnowledge } from 'react-icons/gi';
import { MdOutlineIntegrationInstructions } from 'react-icons/md';

import InstructorsTable from './InstructorsTable'
import UploadFileForm from '../UploadFileForm';
export default class InstructorsManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      FullName: "",
      Email: "",
      password: "",
      InstructorId: "",
      Phone: "",
      InstructorReference: [],
      Subject: [],
      HasPermissionTo: "",
      editClicked: false,
      _id: ""
    }
    this.handelSubmit = this.handelSubmit.bind(this);
    this.toggleHandler = this.toggleHandler.bind(this);
  }
  RegisterSingleInstructor = (data) => {
    InstructorSingleRegistration(data)
      .then(response => {
        console.log(response);
        let errMessage = response.data.message
        console.log(errMessage);
        if (response.data.success === false && errMessage === "Email") {
          Swal.fire({ icon: 'error', title: "البريد الالكتروني مسجل من قبل " });
        }
        else if (response.data.success === true) {
          Swal.fire({ icon: 'success', title: "تم تسجيل المتدرب بنجاح  " });
        }
        else {
          Swal.fire({ icon: 'error', title: "الرجاء التأكد  من ادخال البيانات بشكل صحيح" });
        }
      })
      .catch(error => {
        Swal.fire({ icon: 'error', title: `حدث خطا` });
      });
  };
  UpdateInstructor = (req) => {
    console.log(req);
    UpdateInstructorById(req, req._id)
      .then(res => {
        if (res.data.success === true) Swal.fire({ icon: 'success', title: res.data.message });
      })
      .catch(error => Swal.fire({ icon: 'error', title: `حدث خطا` }))
  }
  DeleteInstructor = (id) => {
    RemoveInstructorById(id)
      .then(response => {
        if (response.data.success === true) {
          Swal.fire({ icon: 'success', title: response.data.message });
        }
      })
      .catch(error => Swal.fire({ icon: 'error', title: `حدث خطا` }))
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handelSubmit = e => {
    const newInstructor = this.state;
    const { FullName, InstructorReference, Subject, InstructorId } = this.state;

    e.preventDefault();
    if ((typeof FullName === "string" && FullName.trim().length !== 0) || (typeof InstructorReference === "string" && InstructorReference.trim().length !== 0) || (typeof Subject === "string" && Subject.trim().length !== 0) || (typeof InstructorId === "string" && InstructorId.trim().length !== 0)){
      this.RegisterSingleInstructor(newInstructor);
    }else{
      Swal.fire({ icon: 'error', 
      title: `الرجاء التأكد من ملء الحقول
    اسم الدرب
    رقم الشعبة
    مادة واحدة على الاقل
    رقم المدرب التعريفي
`})
    }
  };
  onChange = (FullName, Email, InstructorId, Phone, InstructorReference, Subject, _id) => {
    this.setState({ FullName, Email, InstructorId, Phone, InstructorReference, Subject, _id })
  }
  handelUpdate = e => {
    const updateInstructor = this.state;
    updateInstructor.InstructorReference.toString().split(',')
    updateInstructor.Subject.toString().split(',')
    e.preventDefault();
    this.UpdateInstructor(updateInstructor);
  };
  toggleHandler = (e) => {
    this.setState({ show: !this.state.show })
  }
  handelEditToggle = () => {
    const { editClicked } = this.state
    if (editClicked) this.setState({ FullName: "", InstructorId: "", Email: "", Phone: "", password: "", InstructorReference: [], Subject: [] })
    this.setState({ editClicked: !editClicked });
  }
  InstructorDeleteHandler = () => {
    Swal.fire({
      title: 'تأكيد الحذف',
      text: `سيتم حف ${this.state.FullName} نهائيا من النظام`,
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#d33',
      denyButtonColor: '#3085d6',
      confirmButtonText: 'نعم, حذف تاكيد الحذف',
      denyButtonText: `رجوع`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.DeleteInstructor(this.state._id);
      }
    })
  };
  render() {
    const { FullName, InstructorId, Email, Phone, password, show, InstructorReference, Subject, editClicked } = this.state;
    const From = <div className="LoginContainer avoid--element-conflict">
      <form className='login-form' onSubmit={(editClicked) ? e => this.handelUpdate(e) : e => this.handelSubmit(e)}>
        <div className="flex-row">
          <label className="lf--label"  >
            {/* htmlFor="Email"> */}
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
          <label className="lf--label"  >
            {/* htmlFor="password"> */}
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
          <label className="lf--label"  >
            {/* htmlFor="NationalId"> */}
            <CgRename />
          </label>
          <input
            required
            id="FullName"
            className={"lf--input"}
            disabled={(editClicked) ? "disabled" : ""}
            placeholder='* اسم المدرب'
            name="FullName"
            type="text"
            onChange={e => this.handleChange(e)}
            value={FullName} />
        </div>
        {(!editClicked) ? <div className="flex-row">
          <label className="lf--label"  >
            {/* htmlFor="InstructorId"> */}
            <AiFillIdcard />
          </label>
          <input
            required
            id="InstructorId"
            className='lf--input'
            placeholder='* رقم المدرب'
            name="InstructorId"
            type="number"
            onChange={e => this.handleChange(e)}
            value={InstructorId} />
        </div> : ""}
        <div className="flex-row">
          <label className="lf--label"  >
            {/* htmlFor="InstructorId"> */}
            <GiClassicalKnowledge />
          </label>
          <input
            required
            id="InstructorReference"
            className='lf--input'
            placeholder='* رقم الشعبة'
            name="InstructorReference"
            type="text"
            onChange={e => this.handleChange(e)}
            value={InstructorReference} />
        </div>
        <div className="flex-row">
          <label className="lf--label"  >
            {/* htmlFor="NationalId"> */}
            <MdOutlineIntegrationInstructions />
          </label>
          <input
            required
            id="Subject"
            className='lf--input'
            placeholder='* اسم المادة'
            name="Subject"
            type="text"
            onChange={e => this.handleChange(e)}
            value={Subject} />
        </div>
        <div className="flex-row">
          <label className="lf--label"  >
            {/* htmlFor="Phone"> */}
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
        <input className='lf--submit' type='submit' onClick={(editClicked) ? e => this.handelUpdate(e) : e => this.handelSubmit(e)} value={(editClicked) ? 'حفض وارسال' : 'تسجيل المدرب'} />
        <input className='lf--submit' onClick={(editClicked) ? () => this.handelEditToggle() : e => this.toggleHandler(e)} value={(editClicked) ? 'رجوع' : 'رفع الملف وتسجيل المدربين'} />
        {(editClicked) ? <input className='lf--submit red' onClick={e => this.InstructorDeleteHandler(e)} value='حذف المدرب' /> : ""}
      </form>
    </div>
    return (
      <>
        {
          (!editClicked) ?
            <>
              {From}
              <InstructorsTable handelEditToggle={this.handelEditToggle} onNameChange={this.onChange} />
            </>
            : <>{From}</>}
        {(!show) ? "" : <UploadFileForm toggleHandler={this.toggleHandler} from={"instructor"} />}
      </>
    )
  }
}