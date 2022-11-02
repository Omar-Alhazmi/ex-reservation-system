import React, { Component } from 'react'
import logo from '../Images/logo.png'
import * as MainHeader from '../Styles/MainHeaderStyle'
import '../Styles/printStyle.css'

export default class PrintStudentTable extends Component {
    render() {
        let allStudents = "..."
        if (this.props.student.length > 0) {
            allStudents = this.props.student.map((currentStudent, currentStudentIndex) => {
                return (
                    <tr className='cell--border print--break' key={currentStudentIndex}>
                        <td className="table--cell">{currentStudentIndex + 1}</td>
                        <td className="table--cell">{currentStudent.Student.StudentId}</td>
                        <td className="table--cell">{currentStudent.Student.FullName}</td>
                        <td className="table--cell">{"  \t\t\t \t "}</td>
                    </tr>
                )
            })
        }
        return (
            <>
                <table className='print--container table--direction hide' >
                    <thead><tr><td>
                        <div class="header-space">  <div class="header"><MainHeader.Image src={logo} alt="" /> </div>
                            <h3 className='print--heder--subject'>{`اختبار مادة:\t  ${this.props.subject}`}</h3>
                            <h4 className='print--heder--duration'>{`مدة الاختبار : ${this.props.duration} س`}</h4>
                        </div>
                    </td></tr></thead>
                    <tbody><tr><td className='content--container'>
                        <table className='print--mode table--cell table--direction' id='studentTable'>
                            <thead>
                                <tr className='print--break'>
                                    <th className="table--cell">{" "}</th>
                                    <th className="table--cell">  الرقم الاكاديمي</th>
                                    <th className="table--cell"> اسم المتدرب</th>
                                    <th className="table--cell">{"\t التوقيع"}</th>
                                </tr>
                            </thead>
                            <tbody className='tbody-container'>
                                {allStudents}
                            </tbody>
                        </table>
                    </td></tr></tbody>
                    <tfoot><tr ><td>
                        <div class="footer-space"><div class="footer"></div></div>
                    </td></tr></tfoot>
                </table>
            </>
        )
    }
}
