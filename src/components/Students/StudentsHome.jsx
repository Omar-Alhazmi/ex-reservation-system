import React, { Component } from 'react'
import { getAllBookedLabByStudentId, RemoveExamBookedByStudentId } from '../ApiConfig/Api';
import { getId, dateFormat, timeFormat,getHoursDiff,DayIs } from '../helperMethods';
import * as StyledTable from '../Styles/styledTable'
import { MdDeleteSweep } from 'react-icons/md';
import Swal from "sweetalert2";

import '../Styles/spinner.css'
export default class StudentsHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: [],
      removeBookingLimit:24
    }
  }

  componentDidMount() {
    // Mack API call 
    getAllBookedLabByStudentId(getId())
      .then((response) => {
        console.log(response);
        this.setState({ response: response.data.BookedExam })
      })

      .catch((error) => {
      })
  }
  removeBookedAppointment = (id, currentAppointment) => {
    RemoveExamBookedByStudentId(id, currentAppointment)
      .then(response => {
        if (response.status === 200) {
          Swal.fire({ icon: 'success', title: response.data.message });
          window.location.reload(false);
        }
      }).catch(error => {
        if (error.response.status === 405) Swal.fire({ icon: 'warning', title: error.response.data.message });
        else {Swal.fire({ icon: 'error', title: `حدث خطا` })}
      })
  }
  removeAppointment = (index) => {
    const { response,removeBookingLimit } = this.state
    if(getHoursDiff(new Date(response[index].From), new Date()) <= removeBookingLimit) Swal.fire({ icon: 'warning', title: "لايمكن حذف او تعديل الاختبار قبل 24 ساعة من موعده",      confirmButtonText: 'موافق ',})
    else {Swal.fire({
      title: 'تأكيد الحذف',
      text: "سيتم حذف الموعد نهائيا",
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#d33',
      denyButtonColor: '#3085d6',
      confirmButtonText: 'نعم, تأكيد الحذف  ',
      denyButtonText: `رجوع`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeBookedAppointment(getId(), {BookingRefId:response[index]._id})
      }
    })
  }
  }
  render() {
    let allExam = ""
    const { response } = this.state
    if (response) {
      allExam = (
            <StyledTable.TableTr>
              <StyledTable.TableTd colSpan={5} className="tableBody">لايوجد اختبارات محجوزة</StyledTable.TableTd>
            </StyledTable.TableTr>
      )
    }
    if (response) {
      if (response.length > 0) {
        allExam = response.map((BookedLab, BookedLabIndex) => {
          return (
            <StyledTable.TableTr key={BookedLabIndex}>
              <StyledTable.TableTd className="tableBody">{BookedLab.LabReference}</StyledTable.TableTd>
              <StyledTable.TableTd className="tableBody">{DayIs(BookedLab.From)}</StyledTable.TableTd>
              <StyledTable.TableTd className="tableBody date-cell">{dateFormat(BookedLab.From)}</StyledTable.TableTd>
              <StyledTable.TableTd className="tableBody date-cell">{`${timeFormat(BookedLab.From)} - ${timeFormat(BookedLab.To)}`}</StyledTable.TableTd>
              <StyledTable.TableTd className="tableBody table--operation--container"><div onClick={() => this.removeAppointment(BookedLabIndex)} className='single--icon' > <MdDeleteSweep className='setting--icons'  color='#ff5722' /></div>  </StyledTable.TableTd>
            </StyledTable.TableTr>
          )
        })
      }
    }
    return (
      <StyledTable.TableWrapper>
        <StyledTable.TableContainer>
          <StyledTable.TableHedContainer>
          </StyledTable.TableHedContainer>
          <StyledTable.TableHedContainer>
            <tr>
              <StyledTable.TableTh className="tableHeader"> رقم القاعة</StyledTable.TableTh>
              <StyledTable.TableTh className="tableHeader"> اليوم</StyledTable.TableTh>
              <StyledTable.TableTh className="tableHeader"> التاريخ</StyledTable.TableTh>
              <StyledTable.TableTh className="tableHeader"> الوقت</StyledTable.TableTh>
              <StyledTable.TableTh className="tableHeader"> ادارة الحجز</StyledTable.TableTh>
            </tr>
          </StyledTable.TableHedContainer>
          <StyledTable.TableBodyContainer>
            {allExam}
          </StyledTable.TableBodyContainer>
        </StyledTable.TableContainer>
      </StyledTable.TableWrapper >
    )
  }
}
