import React, { Component } from 'react'
import * as Cards from '../Styles/cards'
import { getAllLabs,getAllAvailableLabs } from '../ApiConfig/Api';
import BookingConformation from './BookingConformation'

import {dateFormat,timeFormat} from '../helperMethods';
export default class LabBooking extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      allLabs:[],
      filteredLab:[],
      labId: "",
      toggle: false,
      from: "",
      to: "",
      LabCapacity: "",
      lab_id: "",
      LabFilter: false
    }
  }
  componentDidMount() {
    getAllLabs()
      .then((response) => {
        this.setState({ allLabs: response.data, data: response.data})
      })
      .catch((error) => {
      })
      getAllAvailableLabs()
      .then((res) => {
        this.setState({ filteredLab: res.data })
      })
      .catch((error) => {
      })
  }
  toggleHandler = e => {
    e.preventDefault();
    this.setState({ toggle: !this.state.toggle })
  }
  filterHandler = e => {
    e.preventDefault();
    const {LabFilter,allLabs,filteredLab}=this.state
    this.setState({ LabFilter: !LabFilter })
    if(!LabFilter)this.setState({ data: filteredLab }) 
    else this.setState({ data: allLabs })
  }

  labHandler = (labIndex, AvailableIndex) => {
    const { data } = this.state
    const time = data[labIndex].Available[AvailableIndex]
    this.setState({
      lab_id: data[labIndex]._id,
      labId: data[labIndex].LabId,
      LabCapacity: data[labIndex].LabCapacity,
      from: time.From,
      to: time.To,
      toggle: !this.state.toggle
    })
  }
  render() {
    const { data, toggle, labId, from, to, lab_id, LabCapacity,LabFilter } = this.state
    const propsData = { From: from, To: to, Lab: lab_id, labId: labId, LabCapacity: LabCapacity,For: this.props.For }
    let allLabs = <div class="spinner">Loading...</div>
    if (data.length > 0) {
      allLabs = data.map((lab, labIndex) => {
        return lab.Available.map((available, AvailableIndex) => {
          return (
            <Cards.SingleCard key={AvailableIndex} className={(available.isAvailable) ? "available" : 'isBooked'} onClick={(available.isAvailable) ? () => this.labHandler(labIndex, AvailableIndex) : null}>
              <Cards.CardsH2>{lab.LabId}</Cards.CardsH2>
              <Cards.CardsP>{lab.LabCapacity}</Cards.CardsP>
              <Cards.CardsP>{`${dateFormat(available.From)} `}</Cards.CardsP>
              <Cards.CardsP>{`${timeFormat(available.From)} - ${timeFormat(available.To)}`}</Cards.CardsP>
            </Cards.SingleCard>
          )
        })
      })
    }
    return (
      <div>
        <button className="modal__btn secondary--nav" onClick={e =>this.filterHandler(e)} > {(!LabFilter)?'اظهار القاعات المتاحة فقط' : 'اظهار جميع القاعات'}</button>      
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
