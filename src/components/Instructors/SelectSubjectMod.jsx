import React, { Component } from 'react'
import { getInfo } from '../helperMethods';
import LabBooking from './LabBooking'
export default class SelectSubjectMod extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: false,
            subject: ""
        }
    }
    subjectHandler = (index) => {
        this.setState({ subject: getInfo().data.Teach[index], display: true })
    }
    render() {
        let allSubject = ""
        if (getInfo().data.Teach.length > 1) {
            allSubject = getInfo().data.Teach.map((subject, index) => {
                return (
                    <div key={index} onClick={() => this.subjectHandler(index)}>
                        <button className="modal__btn">{subject}</button>
                    </div>
                )
            })
        } else this.setState({ subject: getInfo().data.Teach[0], display: true })
        return (
            <div>
                {(this.state.display) ? <LabBooking For={this.state.subject} /> :
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
