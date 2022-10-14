import React, { Component } from 'react'
import { getInfo } from '../helperMethods';
import StudentExamBooking from '../Students/StudentExamBooking';
import LabBooking from './LabBooking'
export default class SelectSubjectMod extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: false,
            subject: getInfo().data.Subject[0],
        }
    }
    subjectHandler = (index) => {
        this.setState({ subject: getInfo().data.Subject[index], display: true })
    }
    render() {
        const subject = getInfo().data.Subject;
        let allSubject = <div class="spinner">Loading...</div>
        if (subject.length > 1) {
            allSubject = subject.map((subject, index) => {
                return (
                    <div key={index} onClick={() => this.subjectHandler(index)}>
                        <button className="modal__btn">{subject}</button>
                    </div>
                )
            })
        }
        return (
            <div>
                {(getInfo().data.Role === "Student" && (this.state.display || subject.length === 1))? <StudentExamBooking For={this.state.subject}/> : (getInfo().data.Role === "Instructor" &&(this.state.display || subject.length === 1)) ? <LabBooking For={this.state.subject} /> :
                    <div className='modalContainer'>
                        <div className="modal-container" id="modal-opened">
                            <div className="modal">
                                <p className="modal__text"></p>
                                {allSubject}
                            </div>
                        </div>
                    </div>}
            </div>
        )
    }
}
