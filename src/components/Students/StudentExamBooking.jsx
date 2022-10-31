import React, { Component } from 'react'
import {getAllTestAvailableForStudent} from '../ApiConfig/Api';
import BookingConformation from '../Instructors/BookingConformation'
import * as Cards from '../Styles/cards'

import {getInfo,dateFormat,timeFormat} from '../helperMethods';
export default class StudentExamBooking extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         AvailableTest:[],
         labId: "",
         toggle: false,
         from: "",
         to: "",
         LabCapacity: "",
         lab_id: "",
      }
    }

    componentDidMount(){ 
        const req = {For: this.props.For}
        console.log(getInfo().data._id, req);
        getAllTestAvailableForStudent(getInfo().data._id,req)   
        .then(response =>{
            console.log(response);
            this.setState({AvailableTest: response.data})
        }).catch(error =>{
            console.log(error);
        })
    }
    toggleHandler = e => {
        e.preventDefault();
        this.setState({ toggle: !this.state.toggle })
      }
    labHandler = (labIndex) => {
        const { AvailableTest } = this.state
        this.setState({
          lab_id: AvailableTest[labIndex]._id,
          labId: AvailableTest[labIndex].LabReference,
          LabCapacity: AvailableTest[labIndex].LabCapacity,
          from: AvailableTest[labIndex].From,
          to: AvailableTest[labIndex].To,
          toggle: !this.state.toggle
        })
      }
      render() {
        const { AvailableTest, toggle, labId, from, to, lab_id, LabCapacity } = this.state
        const propsData = { From: from, To: to, Lab: lab_id, labId: labId, LabCapacity: LabCapacity,For: this.props.For }
        let allLabs =  <h1>لايوجد اختبارات متاحة</h1>
        if (AvailableTest.length > 0) {
          allLabs = AvailableTest.map((available, labIndex) => {
              return (
                <Cards.SingleCard key={labIndex} className={(available.LabCapacity > 0) ? "available" : 'isBooked'} onClick={(available.LabCapacity > 0) ? () => this.labHandler(labIndex) : null}>
                  <Cards.CardsH2>{available.LabReference}</Cards.CardsH2>
                  <Cards.CardsP>{available.LabCapacity}</Cards.CardsP>
                  <Cards.CardsP>{`${dateFormat(available.From)} `}</Cards.CardsP>
                  <Cards.CardsP>{`${timeFormat(available.From)} - ${timeFormat(available.To)}`}</Cards.CardsP>
                </Cards.SingleCard>
              )
            })
        }
        return (
          <div>
               <Cards.TeamContainer>
              <Cards.CardsContainer id="Teams" >
                <Cards.CardsWrapper>
                  {allLabs}
                </Cards.CardsWrapper>
              </Cards.CardsContainer>
            </Cards.TeamContainer>
            {(!toggle) ? "" : <BookingConformation toggle={this.toggleHandler} data={propsData} LabCapacity={LabCapacity} />}
          </div >
        )
      }
    }
    
