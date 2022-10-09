import React, { Component } from 'react'
import {NewLabBooking} from '../ApiConfig/Api'
export default class BookingConformation extends Component {

  render() {
    const { toggle, From, To,Lab} = this.props
    return (
        <div className='modalContainer'>
                <div className="modal-container" id="modal-opened">
                    <div className="modal">
                        <form >
                            <div className="modal__details">
                                <div className="flex-row-file modal__btn">
                                    <label className="lf-label-file" for="file">
                                    </label>
                                    <label className="fileLabel" for="file">{Lab +" "+From + " " + To}</label>
                                </div>
                            </div>
                            <p className="modal__text"></p>
                            <button className="modal__btn" >حفض وإرسال &rarr;</button>
                            <button className="link-2" onClick={toggle}></button>
                        </form>
                    </div>
                </div>
            </div>
    )
  }
}
