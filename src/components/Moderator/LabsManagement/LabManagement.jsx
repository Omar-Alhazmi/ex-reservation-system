import React, { Component } from 'react'
import { LabRegistration } from '../../ApiConfig/Api';
import Swal from "sweetalert2";
import { MdReduceCapacity, MdNewLabel } from 'react-icons/md';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import InformationTable from './InformationTable'
export default class LabManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LabId: "",
      LabCapacity: 0,
      Available: [],
      yearAndMonth: "",
      day: "",
      timeFrom: "",
      timeTo: ""
    }
    this.handelSubmit = this.handelSubmit.bind(this);
  }
  RegisterNewLab = (data) => {
    LabRegistration(data)
      .then(response => {
        console.log(response);
        let errMessage = response.data.message
        console.log(errMessage);
        if (response.status === 200) {
          Swal.fire({ icon: 'success', title: "تم اظافة القاعة بنجاح  " });
        }
        else {
          Swal.fire({ icon: 'error', title: "الرجاء التأكد  من ادخال البيانات بشكل صحيح" });
        }
      })
      .catch(error => {
        console.log(error);
        if(error.response.data.header === "all_data_up_to_date") Swal.fire({ icon: 'warning', title: error.response.data.message});
        Swal.fire({ icon: 'error', title: `حدث خطا` });
      });
  };

  deleteLastAvailableItem = e => {
    e.preventDefault();
    const newArr = this.state.Available
    newArr.pop()
    this.setState({ Available: newArr })

  }
  dateAndTimeHandler = e => {
    e.preventDefault();
    const { yearAndMonth, day, timeFrom, timeTo,Available } = this.state
    if (yearAndMonth.toString().length > 0 && day.toString().length > 0 && timeFrom.toString().length >0 && timeTo.toString().length > 0) {
      let ym = (dayjs(yearAndMonth.$d).toJSON()).slice(0, 8);
      let d = day.$D;
      let tf = timeFrom.$d.toString().split(" ");
      let tto = timeTo.$d.toString().split(" ");
      tf = tf[4]
      tto = tto[4]
      const From = `${ym}${d} ${tf}`
      const To = `${ym}${d} ${tto}`
      if(new Date(From).getTime() > new Date(To).getTime()){
        Swal.fire({ icon: 'error', title: "الرجاء التأكد  من ادخال الوقت بشكل صحيح" });
        console.log("if");
        this.setState({timeFrom: "" ,timeTo: "" })
        return;
      }else{
        this.setState(prevState => ({
        Available: [...prevState.Available, { From, To, isAvailable: true }]
      }))
      console.log(Available);}
    }
    else Swal.fire({ icon: 'error', title: "الرجاء التأكد  من ادخال البيانات بشكل صحيح" })
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
  handelSubmit = e => {
    const { LabId, LabCapacity, Available } = this.state, newLab = { LabId, LabCapacity, Available };
    e.preventDefault();
    (newLab.Available.length === 0) ? Swal.fire({ icon: 'error', title: "الرجاء التأكد  اظافة موعد واحد على الاقل" }) :
    (LabId.length > 0 && LabCapacity.length > 0 )?this.RegisterNewLab(newLab):Swal.fire({ icon: 'error', title: "الرجاء التأكد  من ادخال البيانات بشكل صحيح"});
  };
  render() {
    const { LabId, LabCapacity, yearAndMonth, day, timeFrom, timeTo, Available } = this.state;
    let toDay = new Date();
    let nextYear = new Date();
    nextYear = (nextYear.getFullYear() + 1) + '-' + nextYear.getMonth() + '-' + nextYear.getDate();
    toDay = (toDay.getFullYear()) + '-' + toDay.getMonth() + '-' + toDay.getDate();
    let selectedMonth = ` ${(dayjs(yearAndMonth.$d).toJSON()).slice(0, 8)}01`
    let lastDayInMonth = dayjs(selectedMonth).daysInMonth();
    return (
      <>
        <div className="LoginContainer lab-in">
          <form className='login-form' >
            <div className="flex-row">
              <label className="lf--label" htmlFor="LabId">
                <MdNewLabel />
              </label>
              <input id="LabId"
                required
                className='lf--input'
                placeholder='رقم القاعة'
                name="LabId"
                type="text"
                onChange={e => this.handleChange(e)}
                value={LabId} />
            </div>
            <div className="flex-row">
              <label className="lf--label" htmlFor="LabCapacity">
                < MdReduceCapacity />
              </label>
              <input
                required
                id="LabCapacity"
                className='lf--input'
                placeholder='الطاقة الاستيعابية'
                name="LabCapacity"
                type='number'
                onChange={e => this.handleChange(e)}
                value={LabCapacity} />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex-row">
                <DatePicker
                  views={['year', 'month']}
                  label="السنة والشهر"
                  minDate={dayjs(toDay)}
                  maxDate={dayjs(nextYear)}
                  value={yearAndMonth}
                  onChange={(newValue) => { this.setState({ yearAndMonth: newValue, day: selectedMonth }) }}
                  // onChange={e => this.handleChange(e)}
                  renderInput={(params) => <TextField {...params} helperText={null} />}
                />
                {(yearAndMonth !== "") ? <DatePicker
                  views={['day']}
                  label="اليوم"
                  minDate={selectedMonth}
                  maxDate={selectedMonth.slice(0, 9) + lastDayInMonth}
                  value={day}
                  onChange={(newValue) => { this.setState({ day: newValue }) }}
                  renderInput={(params) => <TextField {...params} helperText={null} />}
                /> : ""}
              </div>
              <div className="flex-row">
                {(day !== "") ? <DesktopTimePicker
                  label="بداية الفترة"
                  value={timeFrom}
                  onChange={(newValue) => { this.setState({ timeFrom: newValue }) }}
                  renderInput={(params) => <TextField {...params} />}
                /> : ""}
                {(timeFrom !== "") ? <DesktopTimePicker
                  label="نهاية الفترة"
                  value={timeTo}
                  onChange={(newValue) => { this.setState({ timeTo: newValue }) }}
                  renderInput={(params) => <TextField {...params} />}
                /> : ""}
              </div>
            </LocalizationProvider>
            <input className='lf--submit' type='submit' onClick={e => this.dateAndTimeHandler(e)} value='اضافة الموعد' />
            <input className='lf--submit' type='submit' onClick={e => this.deleteLastAvailableItem(e)} value='حذف اخر موعد ' />
            <input className='lf--submit' onClick={e => this.handelSubmit(e)} value='اضافة القاعة وتسجيل المواعيد' />
          </form>
          <InformationTable data={Available} LabId={LabId} LabCapacity={LabCapacity} />
        </div>
      </>
    )
  }
}