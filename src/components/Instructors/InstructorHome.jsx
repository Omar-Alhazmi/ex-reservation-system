import React, { Component } from 'react'
import { getAllBookedLabByInstructorId, RemoveAppointmentByInstructorById, expiredAppointment } from '../ApiConfig/Api';
import { getId, dateFormat, timeFormat, DayIs } from '../helperMethods';
import * as StyledTable from '../Styles/styledTable'
import StudentBookedInfo from './StudentBookedInfo';
import { MdDeleteSweep } from 'react-icons/md';
import FinishedExams from '../Students/FinishedExams';

import Swal from "sweetalert2";

import '../Styles/spinner.css'
let allStudents
export default class InstructorHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentBooking: [],
      selectedRef: false,
      students: [],
      finishedExam: []
    }
  }

  componentDidMount() {
    // Mack API call 
    getAllBookedLabByInstructorId(getId())
      .then((response) => {
        this.setState({ currentBooking: response.data.currentBooking, finishedExam: response.data.finishedExam })
      })
      .catch((error) => {
      })
    expiredAppointment();
  }
  removeBookedAppointment = (id, currentAppointment) => {
    RemoveAppointmentByInstructorById(id, currentAppointment)
      .then(response => {
        if (response.status === 200) {
          Swal.fire({ icon: 'success', title: response.data.message });
          window.location.reload(false);
        }
      }).catch(error => {
        if (error.response.status === 405) Swal.fire({ icon: 'warning', title: error.response.data.message });
        else { Swal.fire({ icon: 'error', title: `حدث خطا` }) }
      })
  }
  removeAppointment = (index) => {
    const { currentBooking } = this.state
    // if (getHoursDiff(new Date(currentBooking[index].From), new Date()) <= removeBookingLimit) Swal.fire({ icon: 'warning', title: "لايمكن حذف او تعديل الاختبار قبل 24 ساعة من موعده", confirmButtonText: 'موافق ', })
    // else {
    Swal.fire({
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
        this.removeBookedAppointment(getId(), { BookingRefId: currentBooking[index]._id, Lab_id: currentBooking[index].Lab_id })
      }
    })
    // }
  }
  selectHandler = (index) => {
    const { selectedRef, currentBooking } = this.state
    this.setState({ selectedRef: !selectedRef, students: currentBooking[index] })
  }
  render() {
    const { currentBooking, selectedRef, students,finishedExam } = this.state
    if (currentBooking) {
      allStudents = (
        <StyledTable.TableTr>
        <StyledTable.TableTd colSpan={5} className="tableBody">لايوجد اختبارات محجوزة</StyledTable.TableTd>
      </StyledTable.TableTr>
      )
    }
    if (currentBooking) {
      if (currentBooking.length > 0) {
        allStudents = currentBooking.map((BookedLab, BookedLabIndex) => {
          return (
            <StyledTable.TableTr className='single--icon' key={BookedLabIndex} onClick={() => this.selectHandler(BookedLabIndex)}>
              <StyledTable.TableTd className="tableBody">{BookedLab.LabReference}</StyledTable.TableTd>
              <StyledTable.TableTd className="tableBody">{BookedLab.LabCapacity}</StyledTable.TableTd>
              <StyledTable.TableTd className="tableBody">{DayIs(BookedLab.From)}</StyledTable.TableTd>
              <StyledTable.TableTd className="tableBody date-cell">{dateFormat(BookedLab.From)}</StyledTable.TableTd>
              <StyledTable.TableTd className="tableBody date-cell">{`${timeFormat(BookedLab.From)} - ${timeFormat(BookedLab.To)}`}</StyledTable.TableTd>
              <StyledTable.TableTd className="tableBody table--operation--container"><div onClick={() => this.removeAppointment(BookedLabIndex)} className='single--icon' > <MdDeleteSweep className='setting--icons' color='#ff5722' /></div>  </StyledTable.TableTd>
            </StyledTable.TableTr>
          )
        })
      }
    }
    return (
      <div>
        {(!selectedRef) ? <><StyledTable.TableWithTitleWrapper>
          <StyledTable.TableTitle>اختبارات قادمة</StyledTable.TableTitle>
          <StyledTable.TableWrapper>
            <StyledTable.TableContainer>
              <StyledTable.TableHedContainer>
              </StyledTable.TableHedContainer>
              <StyledTable.TableHedContainer>
                <StyledTable.Tr>
                  <StyledTable.TableTh className="tableHeader"> رقم القاعة</StyledTable.TableTh>
                  <StyledTable.TableTh className="tableHeader"> الطاقة الاستيعابية</StyledTable.TableTh>
                  <StyledTable.TableTh className="tableHeader"> اليوم</StyledTable.TableTh>
                  <StyledTable.TableTh className="tableHeader"> التاريخ</StyledTable.TableTh>
                  <StyledTable.TableTh className="tableHeader"> الوقت</StyledTable.TableTh>
                  <StyledTable.TableTh className="tableHeader"> ادارة الحجز</StyledTable.TableTh>

                </StyledTable.Tr>
              </StyledTable.TableHedContainer>
              <StyledTable.TableBodyContainer>
                {allStudents}
              </StyledTable.TableBodyContainer>
            </StyledTable.TableContainer>
          </StyledTable.TableWrapper >
        </StyledTable.TableWithTitleWrapper>
          {(finishedExam.length > 0) ?
            <StyledTable.TableWithTitleWrapper>
              <StyledTable.TableTitle>اختبارات تم الانتهاء منها</StyledTable.TableTitle>
              <FinishedExams finishedExam={finishedExam} />
            </StyledTable.TableWithTitleWrapper>
            : ""}
        </>
          : <StudentBookedInfo data={students} toggle={this.selectHandler} />}
      </div>
    )
  }
}
