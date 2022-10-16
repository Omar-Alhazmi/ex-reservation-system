import React, { Component } from 'react'
import { NewLabBooking,StudentReserveNewTest } from '../ApiConfig/Api'
import Swal from "sweetalert2";
import { getId, dateFormat, timeFormat, getInfo } from '../helperMethods';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default class BookingConformation extends Component {

    NewBooking = (data) => {
        let currentUser
        if(getInfo().data.Role === "Instructor") currentUser= NewLabBooking  
        else{
             currentUser = StudentReserveNewTest
             data = {BookingRefId:this.props.data.Lab}
        }
        currentUser(data, getId())
            .then(response => {
                Swal.fire({ icon: 'success', title: "تم حجز القاعة بنجاح " });
                if(getInfo().data.Role === "Instructor"){
                history.push('#/Instructor/Home');
                window.location.reload(false);
                }else{
                    history.push('#/Students/Home');
                    window.location.reload(false);
                }
            })
            .catch(error => {
                console.log(error);
                if(error.response.data)Swal.fire({ icon: 'warning', title: error.response.data.message });
                else Swal.fire({ icon: 'error', title: error });
            });
    };
    handleSubmit = e => {
        e.preventDefault();
        const { From, To, Lab, labId, LabCapacity, For } = this.props.data;
        const newBooking = { From: From, To: To, Lab_id: Lab, LabReference: labId, LabCapacity: LabCapacity, For: For }
        this.NewBooking(newBooking);
    }
    render() {
        const { From, To, labId } = this.props.data
        const date = dateFormat(From);
        const time = `${timeFormat(From)} - ${timeFormat(To)}`;
        let labDisplay = ""
        if (labId.length === 10) labDisplay = `المبنى: ${labId[4]} الدور: ${labId[5]} القاعة: ${labId.slice(7, 10)}`
        return (
            <div className='modalContainer'>
                <div className="modal-container" id="modal-opened">
                    <div className="modal">
                        <form className='form__container'>
                            <div className="modal__details">
                                <h1 className="modal__title">بيانات الحجز</h1>
                                <p className="modal__text">{` المعمل: ${labId}`}</p>
                                {(labDisplay !== "") ? <p className="modal__text">{labDisplay}</p> : ""}
                                <p className="modal__text"> التاريخ: {date} </p>
                                <p className="modal__text"> الوقت: {time} </p>
                            </div>
                            <p className="modal__text"></p>
                            <button className="modal__btn" onClick={e => this.handleSubmit(e)}>تأكيد الحجز  &rarr;</button>
                            <button className="link-2" onClick={this.props.toggle}></button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
