import React, { Component } from 'react'
import { UpdateStudentAttemptsById } from '../ApiConfig/Api';
import Swal from "sweetalert2";

export default class IncreaseStudentAttempt extends Component {
constructor(props) {
  super(props)

  this.state = {
    increaseAttempts:0
  }
}
    updateAttempt = ( id, For ) => {
        UpdateStudentAttemptsById(For, id)
            .then(response => {
                if (response.status === 200) Swal.fire({ icon: 'success', title: response.data.message });
                else Swal.fire({ icon: 'success', title: response.data.message });
            })
            .catch(error => Swal.fire({ icon: 'error', title: "حدث خطا" }))
    }
    handleSubmit =()=>{
        const { id, For } = this.props.data
        const {increaseAttempts} = this.state
        const data ={For , increaseAttempts}
        this.updateAttempt(id, data )
    }
    render() {
        return (
            <div className='modalContainer'>
                <div className="modal-container" id="modal-opened">
                    <div className="modal">
                        <form className='form__container'>
                            <div className="modal__details">
                                <p className="modal__text">الرجاء اختيار عدد المحاولات المراد اضافتها</p>
                                <div className='flex--space--around'>
                                <p className="modal__text"> <button className="modal__btn" onClick={e => this.setState({increaseAttempts: 1})}>1</button></p>
                                <p className="modal__text"> <button className="modal__btn" onClick={e => this.setState({increaseAttempts:2})}>2</button></p>
                                <p className="modal__text"> <button className="modal__btn" onClick={e => this.setState({increaseAttempts:3})}>3</button></p>
                                </div>
                            </div>
                            <p className="modal__text"></p>
                            <button className="modal__btn" onClick={e => this.handleSubmit(e)}>تأكيد &rarr;</button>
                            <button className="link-2" onClick={this.props.toggle}></button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
