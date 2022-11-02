import React, { Component } from 'react'
import * as StyledTable from '../Styles/styledTable'
import PrintStudentTable from './PrintStudentTable'
import { examDuration } from '../helperMethods';
import ReactToPrint from "react-to-print";
import Swal from "sweetalert2";

import { UpdateStudentAttendantsByExamId } from '../ApiConfig/Api'
import '../Styles/printStyle.css'
import { FcPrint } from 'react-icons/fc';
export default class StudentBookedInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toggle: false,
            Students: props.data.Students
        }
    }
    saveFileHandler = () => {
        this.setState({ toggle: !this.state.toggle })
    }
    handleGradeChange = (index, event) => {
        let Students = Object.assign(this.state.Students);
        Students[index].Grade = parseInt(event.target.value);
        this.setState({ Students });
    }
    handlePresentChange = (index, event) => {
        let Students = Object.assign(this.state.Students);
        Students[index].isPresent = event.target.checked;
        this.setState({ Students });
    }
    examFinish = (data, id) => {
        UpdateStudentAttendantsByExamId(data, id)
            .then(response => {
                if (response.status === 200) Swal.fire({ icon: 'success', title: response.data.message });
                else Swal.fire({ icon: 'success', title: response.data.message });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({ icon: 'success', title: error });
            })
    }
    handleSubmit = () => {
        const { Students } = this.state;
        const { data } = this.props
        const DATA = { Students, For: data.For }
        this.examFinish(DATA, data._id)
    }
    handleAttendance = () => {
        let Students = Object.assign(this.state.Students);
        for (let currentStudentIndex = 0; currentStudentIndex < Students.length; currentStudentIndex++) {
            const currentStudent = Students[currentStudentIndex];
            currentStudent.isPresent = !currentStudent.isPresent;
            this.setState({ Students });
        }

    }
    render() {
        let allStudents = (
            <StyledTable.TableTr>
                <StyledTable.TableTd colSpan={5} className="tableBody">لايوجد متدربين</StyledTable.TableTd>
            </StyledTable.TableTr>
        )
        if (this.props.data.Students.length > 0) {
            allStudents = this.props.data.Students.map((currentStudent, currentStudentIndex) => {
                const STUDENT_INFO = currentStudent.Student;
                const CURRENT_STUDENT = this.state.Students[currentStudentIndex]
                return (
                    <StyledTable.TableTr key={currentStudentIndex}>
                        <StyledTable.TableTd className="tableBody">{currentStudentIndex + 1}</StyledTable.TableTd>
                        <StyledTable.TableTd className="tableBody">{STUDENT_INFO.StudentId}</StyledTable.TableTd>
                        <StyledTable.TableTd className="tableBody">{STUDENT_INFO.FullName}</StyledTable.TableTd>
                        <StyledTable.TableTd className="tableBody"><input className='grade--input' type='number' name='Grade' value={CURRENT_STUDENT.Grade} onChange={e => this.handleGradeChange(currentStudentIndex, e)} /></StyledTable.TableTd>
                        <StyledTable.TableTd className="tableBody checkbox--container">
                            <input className='checkbox' type='checkbox' name='isPresent' checked={CURRENT_STUDENT.isPresent} onChange={e => this.handlePresentChange(currentStudentIndex, e)} />
                            <span class='indicator' /></StyledTable.TableTd>
                    </StyledTable.TableTr>
                )
            })
        }

        return (
            <>
                <div className='print--icon--container'>
                    <ReactToPrint
                        trigger={() => <FcPrint className='print--icon' />}
                        content={() => this.componentRef}
                    />
                    <PrintStudentTable ref={el => (this.componentRef = el)} student={this.props.data.Students} subject={this.props.data.For} duration={examDuration(this.props.data.From, this.props.data.To)} />
                </div>
                <PrintStudentTable  student={this.props.data.Students} subject={this.props.data.For} duration={examDuration(this.props.data.From, this.props.data.To)} />

                <StyledTable.TableWithTitleWrapper>
                    <StyledTable.TableWrapper>
                        <StyledTable.TableContainer id='studentTable'>
                            <StyledTable.TableHedContainer>
                                <StyledTable.Tr>
                                    <StyledTable.TableTh className="tableHeader">{" "}</StyledTable.TableTh>
                                    <StyledTable.TableTh className="tableHeader">  الرقم الاكاديمي</StyledTable.TableTh>
                                    <StyledTable.TableTh className="tableHeader"> اسم المتدرب</StyledTable.TableTh>
                                    <StyledTable.TableTh className="tableHeader"> الدرجة </StyledTable.TableTh>
                                    <StyledTable.TableTh className="tableHeader"> حاضر </StyledTable.TableTh>
                                </StyledTable.Tr>
                            </StyledTable.TableHedContainer>
                            <StyledTable.TableBodyContainer>
                                {allStudents}
                                <StyledTable.TableTd colSpan={4}><StyledTable.AcReButton Blue={true} onClick={() => this.handleSubmit()}>حفض وإرسال</StyledTable.AcReButton></StyledTable.TableTd>
                                <StyledTable.TableTd className="tableBody checkbox--container">
                                    <input className='checkbox' type='checkbox' name='isPresent' onClick={() => this.handleAttendance()} />
                                    <span class='indicator' /></StyledTable.TableTd>
                            </StyledTable.TableBodyContainer>
                        </StyledTable.TableContainer>
                    </StyledTable.TableWrapper >
                </StyledTable.TableWithTitleWrapper>
            </>
        )
    }
}