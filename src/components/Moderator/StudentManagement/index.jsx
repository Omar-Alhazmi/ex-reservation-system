import React, { Component } from 'react'
import { StudentSingleRegistration, getAllInstructorId,UpdateStudentById,RemoveStudentById } from '../../ApiConfig/Api';

import Swal from "sweetalert2";
import { AiOutlineMail, AiFillIdcard, AiOutlineMobile } from 'react-icons/ai';
import { CgLastpass, CgRename } from 'react-icons/cg';
import { MdOutlineIntegrationInstructions } from 'react-icons/md';
import { GiClassicalKnowledge } from 'react-icons/gi';

import UploadFileForm from '../UploadFileForm';
import SearchForStudent from './SearchForStudent'
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
      StudentReference: [],
      Subject: "",
      Instructor_id: [],
      InstructorIds: [],
      _id:"",
      editClicked:false
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
  componentDidMount() {
    getAllInstructorId()
      .then(response => {
        this.setState({ InstructorIds: response.data })
      })
      .catch(error => Swal.fire({ icon: 'error', title: `حدث خطا` }))
  }
  DeleteStudent = (id) => {
    RemoveStudentById(id)
      .then(response => {
        if (response.data.success === true) {
          Swal.fire({ icon: 'success', title: response.data.message });
        }
      })
      .catch(error => Swal.fire({ icon: 'error', title: `حدث خطا` }))
  }
  UpdateStudent = (req) => {
    UpdateStudentById(req, req._id)
      .then(res => {
        if (res.data.success === true) Swal.fire({ icon: 'success', title: res.data.message });
      })
      .catch(error => {
        console.log(error);
        Swal.fire({ icon: 'error', title: error})})
  }
  handelUpdate = e => {
    const updateStudent = this.state;
    updateStudent.StudentReference.toString().split(',')
    updateStudent.Subject.toString().split(',')
    e.preventDefault();
    this.UpdateStudent(updateStudent);
  };
  handelSubmit = e => {
    if (this.props.id) this.setState({ Instructor_id: this.props.id })
    const newStudent = this.state;
    e.preventDefault();
    const { FullName, Instructor_id, Subject, StudentId, StudentReference, Phone } = this.state;
    if (
      (typeof FullName === "string" && FullName.trim().length !== 0) &&
      (typeof Instructor_id === "string" && Instructor_id.trim().length !== 0) &&
      (typeof Subject === "string" && Subject.trim().length !== 0) &&
      (typeof StudentId === "string" && StudentId.trim().length !== 0) &&
      (typeof StudentReference === "string" && StudentReference.trim().length !== 0) &&
      (typeof Phone === "string" && Phone.trim().length !== 0)) {
      this.RegisterSingleStudent(newStudent);
    } else {
      console.log(FullName, Instructor_id, Subject, StudentId, StudentReference, Phone);
      Swal.fire({
        icon: 'error',
        title: `الرجاء التأكد من ملء الحقول
   اسم المتدرب
   رقم المتدرب
    رقم الشعبة
    رقم المدرب 
    رقم الجوال
    مادة واحدة على الاقل

`})
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  toggleHandler = (e) => {
    this.setState({ show: !this.state.show })
  }
  onChange = (FullName, Email, StudentId, Phone, StudentReference, Subject, _id,Instructor_id) => {
    this.setState({ FullName, Email, StudentId, Phone, StudentReference, Subject, _id,Instructor_id })
  }
  handelEditToggle = () => {
    const { editClicked } = this.state
    if (editClicked) this.setState({ FullName: "", StudentId: "", Email: "", Phone: "", password: "",Instructor_id:[],_id:"", StudentReference: [], Subject: [] })
    this.setState({ editClicked: !editClicked });
  }
  handleOptionChange(evt) {
    this.setState({Instructor_id: [...evt.target.selectedOptions].map(o => o.value)}); 
  }
  StudentDeleteHandler = () => {
    Swal.fire({
      title: 'تأكيد الحذف',
      text: `سيتم حذف ${this.state.FullName} نهائيا من النظام`,
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#d33',
      denyButtonColor: '#3085d6',
      confirmButtonText: 'نعم, تاكيد الحذف',
      denyButtonText: `رجوع`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.DeleteStudent(this.state._id);
      }
    })
  };
  render() {
    const { FullName, StudentId, Email, Phone, password, show, StudentReference, Subject, Instructor_id, InstructorIds, editClicked } = this.state;
    const Form =  <div className="LoginContainer avoid--element-conflict">
    <form className='login-form' >
      <div className="flex-row">
        <label className="lf--label" >
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
        <label className="lf--label" >
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
        <label className="lf--label" >
          {/* htmlFor="FullName"> */}
          <CgRename />
        </label>
        <input
          required
          id="FullName"
          className='lf--input'
          disabled={(editClicked) ? "disabled" : ""}
          placeholder='* اسم المتدرب'
          name="FullName"
          type="text"
          onChange={e => this.handleChange(e)}
          value={FullName} />
      </div>
      <div className="flex-row">
        <label className="lf--label" >
          {/* htmlFor="StudentId"> */}
          <AiFillIdcard />
        </label>
        <input
          required
          id="StudentId"
          className='lf--input'
          disabled={(editClicked) ? "disabled" : ""}
          placeholder='* رقم المتدرب'
          name="StudentId"
          type="number"
          onChange={e => this.handleChange(e)}
          value={StudentId} />
      </div>
      <div className="flex-row">
        <label className="lf--label" >
          {/* htmlFor="StudentReference"> */}
          <GiClassicalKnowledge />
        </label>
        <input
          required
          id="StudentReference"
          className='lf--input'
          placeholder='* رقم الشعبة'
          name="StudentReference"
          type="string"
          onChange={e => this.handleChange(e)}
          value={StudentReference} />
      </div>
      {(this.props.id) ? "" :
        <div className="flex-row">
          <label className="lf--label" >
            {/* htmlFor="Instructor"> */}
            <CgRename />
          </label>
          <select 
          multiple={(editClicked) ? true : false}
          className='lf--input'
          size={InstructorIds.length} 
          name="Instructor_id"
          value={Instructor_id} onChange={(editClicked) ?e =>this.handleOptionChange(e): e => this.handleChange(e)}>
            {InstructorIds.map((option,index) => (
              <option key={index} value={option.Instructor_id}>{option.InstructorId}</option>
            ))}
          </select>
        </div>}
      <div className="flex-row">
        <label className="lf--label" >
          {/* htmlFor="Subject"> */}
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
        <label className="lf--label" >
          {/* htmlFor="Phone"> */}
          <AiOutlineMobile />
        </label>
        <input
          required
          id="Phone"
          className='lf--input'
          placeholder='* رقم الجوال '
          name="Phone"
          type="number"
          onChange={e => this.handleChange(e)}
          value={Phone} />
      </div>
      <input className='lf--submit' type='submit'  onClick={(editClicked) ? e => this.handelUpdate(e) : e => this.handelSubmit(e)} value={(editClicked)  ? 'حفض وارسال' : 'تسجيل المتدرب'}  />
      {(this.props.id ) ? "" : <input className='lf--submit' onClick={(editClicked) ? () => this.handelEditToggle() : e => this.toggleHandler(e)}  value={(editClicked) ? 'رجوع' : 'رفع الملف وتسجيل المتدربين'} />}
      {(editClicked) ? <input className='lf--submit red'  onClick={() => this.StudentDeleteHandler()} value='حذف المتدرب' /> : ""}
    </form>
  </div>
    return (
      <>
        {
          (!editClicked) ?
            <>
              {Form}
              <SearchForStudent  handelEditToggle={this.handelEditToggle} onNameChange={this.onChange}/>
            </>
            :<>{Form} </>
        }
        {(!show) ? "" : <UploadFileForm toggleHandler={this.toggleHandler} from={"students"} />}
      </>
    )
  }
}
